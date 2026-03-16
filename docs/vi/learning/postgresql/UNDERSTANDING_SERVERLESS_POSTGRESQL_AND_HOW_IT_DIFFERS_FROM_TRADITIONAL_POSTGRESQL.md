# Hiểu về Serverless PostgreSQL và sự khác biệt so với PostgreSQL truyền thống

## Mở đầu

Khi Neon quảng cáo là `Serverless PostgreSQL`, điều đó không có nghĩa là PostgreSQL không còn server. Ý đúng hơn là bạn không còn phải trực tiếp quản lý server database theo cách truyền thống nữa. Hạ tầng phía sau vẫn có server, nhưng việc provisioning, scaling, sleep/wake, pooling và nhiều phần vận hành khác đã được dịch vụ cloud xử lý thay cho bạn.

Vì vậy, `Serverless PostgreSQL` nên được hiểu là:

- vẫn là PostgreSQL thật
- vẫn dùng SQL, transaction, index, constraint, migration như bình thường
- nhưng được cung cấp theo mô hình cloud-native, linh hoạt hơn về compute và vận hành

## Cách nhìn đơn giản nhất

### PostgreSQL truyền thống

Bạn thường nghĩ theo mô hình:

- có một database server hoặc database instance chạy liên tục
- bạn hoặc cloud provider phải giữ instance đó luôn sẵn sàng
- tài nguyên như CPU, RAM, disk được cấp tương đối cố định
- muốn scale thì phải nâng cấp instance, thêm replica, tuning pool hoặc thay đổi hạ tầng

### Serverless PostgreSQL

Bạn nghĩ theo mô hình:

- database là một dịch vụ được kích hoạt theo nhu cầu
- compute có thể tự scale theo tải
- khi không có traffic, compute có thể giảm mạnh hoặc ngủ
- bạn trả tiền gần hơn với mức sử dụng thực tế thay vì chỉ trả cho một instance luôn bật

## PostgreSQL truyền thống hoạt động ra sao?

Trong mô hình truyền thống hoặc managed kiểu cổ điển:

- database thường chạy trên một máy chủ hoặc một instance luôn-on
- `compute` và `storage` thường gắn khá chặt với nhau
- connection từ ứng dụng đi thẳng tới instance database đó
- nếu tải tăng, bạn phải tăng cấu hình hoặc thêm tầng phụ trợ như read replica, connection pooler

Điều này rất quen thuộc và ổn định, nhưng đổi lại:

- có thể tốn chi phí khi traffic thấp
- tạo môi trường dev/staging/test mới thường chậm hơn
- team phải suy nghĩ nhiều hơn về vận hành database

## Serverless PostgreSQL hoạt động như thế nào?

Với các dịch vụ như Neon, ý tưởng chính là tách phần xử lý truy vấn khỏi phần lưu trữ dữ liệu.

### Thành phần chính

- `Storage`: nơi dữ liệu được lưu bền vững
- `Compute`: nơi PostgreSQL engine xử lý query, transaction, execution plan
- `Pooler`: lớp trung gian giúp quản lý nhiều kết nối hiệu quả hơn, đặc biệt trong môi trường serverless

### Luồng hoạt động đơn giản

1. Ứng dụng gửi query tới endpoint database
2. Request đi qua pooler hoặc tới compute
3. Nếu compute đang ở trạng thái ngủ, hệ thống đánh thức nó
4. PostgreSQL engine thực thi query
5. Dữ liệu được đọc hoặc ghi vào lớp storage
6. Khi không còn tải trong một khoảng thời gian, compute có thể thu nhỏ hoặc ngủ lại

## Điểm khác biệt lớn giữa hai mô hình

| Khía cạnh          | PostgreSQL truyền thống   | Serverless PostgreSQL               |
| ------------------ | ------------------------- | ----------------------------------- |
| Mô hình vận hành   | Instance luôn chạy        | Dịch vụ kích hoạt theo nhu cầu      |
| Compute            | Thường cố định hơn        | Linh hoạt hơn, có thể autoscale     |
| Storage            | Gắn khá chặt với instance | Thường tách khỏi compute            |
| Chi phí nhàn rỗi   | Vẫn tốn tiền cho instance | Có thể tối ưu hơn khi ít traffic    |
| Tạo môi trường mới | Thường chậm hoặc thủ công | Nhanh hơn, nhất là nếu có branching |
| Độ ổn định latency | Rất đều nếu always-on     | Có thể bị ảnh hưởng bởi cold start  |

## Vì sao Neon được gọi là Serverless PostgreSQL?

Neon là một ví dụ điển hình của hướng tiếp cận này vì họ không chỉ host PostgreSQL trên cloud, mà còn thêm các đặc tính cloud-native như:

- tách `compute` và `storage`
- `autoscaling`
- khả năng `scale to zero`
- `built-in connection pooling`
- `database branching`

Trong đó, `database branching` là điểm rất khác biệt: bạn có thể tạo một nhánh database riêng cho dev, test hoặc preview environment nhanh hơn nhiều so với cách clone database truyền thống.

## Lợi ích của Serverless PostgreSQL

### 1. Ít phải vận hành hơn

Bạn không phải tự lo quá nhiều về:

- provisioning server
- patching cơ bản
- backup và khôi phục ở mức nền tảng
- quản lý hạ tầng database theo kiểu thủ công

Điều này đặc biệt hữu ích cho team nhỏ hoặc dự án muốn tập trung vào phát triển sản phẩm.

### 2. Hợp với traffic không ổn định

Nếu ứng dụng có traffic tăng giảm thất thường, mô hình serverless thường tận dụng tài nguyên tốt hơn mô hình instance luôn bật.

Ví dụ:

- ban ngày có nhiều request
- ban đêm gần như không có request
- môi trường staging chỉ dùng khi test

Trong các trường hợp này, trả tiền theo mức sử dụng thực tế thường hợp lý hơn.

### 3. Tốt cho serverless app và cloud app hiện đại

Các ứng dụng deploy trên Vercel, container scale động hoặc môi trường function-based thường tạo nhiều kết nối ngắn hạn. Serverless PostgreSQL thường được thiết kế để xử lý tốt hơn cho kiểu workload này, nhất là khi có pooler tích hợp.

### 4. Tạo môi trường nhanh hơn

Nếu dịch vụ hỗ trợ branching như Neon, bạn có thể:

- tạo database branch cho từng feature
- test migration an toàn hơn
- có staging hoặc preview environment độc lập

Đây là lợi ích rất lớn cho workflow phát triển hiện đại.

### 5. Tối ưu chi phí cho dev/staging

Nhiều dự án không cần một database mạnh và luôn bật cho mọi môi trường. Serverless PostgreSQL giúp giảm lãng phí ở các môi trường chỉ dùng theo đợt.

## Hạn chế và đánh đổi

### 1. `Cold start`

Nếu compute được phép ngủ khi không sử dụng, request đầu tiên sau thời gian rảnh có thể chậm hơn bình thường. Đây là một đánh đổi phổ biến của mô hình serverless.

### 2. Ít quyền kiểm soát hạ tầng sâu

So với tự host hoặc một số mô hình managed truyền thống, bạn có thể không có toàn quyền với:

- hệ điều hành
- disk layout
- networking sâu
- một số cấu hình hoặc extension đặc thù

### 3. Không phải workload nào cũng phù hợp

Nếu hệ thống:

- luôn nóng 24/7
- có tải lớn liên tục
- yêu cầu latency cực đều
- cần tuning hạ tầng rất sâu

thì PostgreSQL always-on truyền thống hoặc managed kiểu RDS/Cloud SQL có thể hợp hơn.

### 4. Cần hiểu đúng về connection model

Serverless app thường sinh nhiều kết nối ngắn hạn. Nếu cấu hình sai pooling hoặc migration URL, bạn có thể gặp lỗi connection hoặc hành vi không mong muốn.

Ví dụ với Prisma + Neon, nên tách:

- `DATABASE_URL` cho pooled runtime connection
- `DIRECT_URL` cho migration và các lệnh CLI

## Liên hệ với codebase TableTap

Trong dự án hiện tại:

- `tabletap-server/prisma/schema.prisma:5` đang cấu hình datasource PostgreSQL
- `tabletap-server/.env:7` hiện đang dùng local PostgreSQL
- backend dùng Prisma `^5.16.1`

Điều này khá phù hợp để chuyển sang một dịch vụ Serverless PostgreSQL như Neon, đặc biệt nếu backend sau này chạy trên hạ tầng cloud có khả năng scale linh hoạt.

Với Prisma, cấu hình khuyến nghị khi dùng Neon thường là:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

Và trong `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@YOUR-ENDPOINT-pooler.REGION.aws.neon.tech/DBNAME?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@YOUR-ENDPOINT.REGION.aws.neon.tech/DBNAME?sslmode=require"
```

Ý nghĩa:

- app runtime dùng pooled connection để chịu tải kết nối tốt hơn
- Prisma migrate hoặc schema command dùng direct connection để ổn định hơn

## Khi nào nên dùng Serverless PostgreSQL?

Nên cân nhắc mạnh khi:

- ứng dụng còn mới hoặc traffic chưa ổn định
- muốn giảm công vận hành
- có nhiều môi trường dev, test, staging
- deploy trên cloud hiện đại hoặc serverless platform
- cần tăng tốc developer workflow

## Khi nào nên cân nhắc kỹ hơn?

Nên đánh giá thêm nếu:

- hệ thống luôn chạy tải cao và ổn định cả ngày
- cần latency rất đều
- cần kiểm soát hạ tầng hoặc networking sâu
- có yêu cầu enterprise hoặc compliance đặc thù

## Một hiểu lầm phổ biến

`Serverless` không có nghĩa là không tồn tại server.

Ý đúng là:

- server vẫn tồn tại ở phía nhà cung cấp
- nhưng bạn không trực tiếp quản lý chúng theo cách truyền thống
- tài nguyên được cấp phát linh hoạt hơn và được trừu tượng hóa khỏi ứng dụng của bạn

## Kết luận

Serverless PostgreSQL là PostgreSQL được cung cấp theo mô hình cloud-native, nơi hạ tầng vận hành được tự động hóa nhiều hơn và compute được phân bổ linh hoạt hơn so với mô hình instance truyền thống.

Neon là ví dụ tiêu biểu vì họ kết hợp nhiều đặc điểm mạnh trong cùng một dịch vụ:

- PostgreSQL thật
- kiến trúc tách `compute` và `storage`
- `autoscaling`
- `scale to zero`
- `connection pooling`
- `database branching`

Với dự án như TableTap dùng Fastify + Prisma + Next.js, đây là hướng đáng cân nhắc nếu ưu tiên phát triển nhanh, ít vận hành và muốn tận dụng workflow cloud hiện đại.
