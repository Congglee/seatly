# PostgreSQL trên Neon Database: điểm nổi bật và khác biệt

## Tổng quan

Neon không thay đổi bản chất của PostgreSQL. Khi dùng Neon, bạn vẫn đang dùng PostgreSQL thật, nên các khái niệm cốt lõi như SQL, transaction, index, constraint, MVCC, migration, ORM connector `postgresql` của Prisma... vẫn giữ nguyên.

Điểm khác biệt lớn nằm ở cách Neon triển khai PostgreSQL theo hướng cloud-native và serverless. Nói ngắn gọn, Neon không cố tạo ra một loại database mới, mà thay đổi mạnh trải nghiệm vận hành, scale và quy trình phát triển.

## Bối cảnh trong dự án TableTap

Trong codebase hiện tại:

- Backend `tabletap-server` dùng Prisma `^5.16.1` với PostgreSQL datasource tại `tabletap-server/prisma/schema.prisma:5`
- Web dùng Next.js `14.2.35` tại `tabletap-web/package.json:14`
- File `tabletap-server/.env:7` hiện đang trỏ tới PostgreSQL local

Điều này cho thấy dự án đã sẵn sàng tốt để chuyển sang Neon vì Prisma hỗ trợ Neon khá rõ ràng, đặc biệt trong mô hình dùng pooled connection cho runtime và direct connection cho migration.

## Neon nổi bật ở điểm nào?

### 1. Tách `compute` và `storage`

Đây là khác biệt kiến trúc quan trọng nhất.

- Ở PostgreSQL tự host truyền thống, compute và storage thường gắn chặt với nhau trên cùng VM hoặc cùng database node
- Ở Neon, compute và storage được tách riêng
- Kết quả là việc scale compute, tạo branch, sleep/wake database và quản lý chi phí trở nên linh hoạt hơn nhiều

Ý nghĩa thực tế:

- Không cần suy nghĩ kiểu “muốn clone môi trường thì phải copy nguyên database server”
- Có thể bật/tắt compute theo nhu cầu mà không thay đổi cách dữ liệu được lưu trữ
- Hợp với workload hiện đại, nhất là app cloud và serverless

### 2. `Database branching`

Đây là tính năng khiến Neon khác biệt rõ rệt so với nhiều dịch vụ PostgreSQL managed truyền thống.

- Có thể tạo nhánh database gần như tức thì
- Mỗi branch có thể dùng cho dev, staging, preview hoặc test riêng
- Cảm giác vận hành giống Git branch nhưng áp dụng cho database

Lợi ích thực tế:

- Mỗi feature branch của code có thể đi kèm một database branch tương ứng
- Test migration an toàn hơn
- Giảm rủi ro phá dữ liệu của môi trường chính khi thử nghiệm
- Hữu ích cho CI/CD và preview environment

### 3. `Autoscaling` và khả năng `scale to zero`

Neon được thiết kế theo hướng serverless:

- Compute có thể scale theo tải
- Khi không có traffic, compute có thể ngủ để tiết kiệm chi phí
- Khi có request trở lại, compute được đánh thức

Điểm mạnh:

- Tối ưu chi phí cho môi trường dev, staging hoặc ứng dụng chưa có traffic liên tục
- Không phải trả tiền kiểu “giữ nguyên một VM 24/7 chỉ để chờ request”

Điểm cần lưu ý:

- Có thể có `cold start` khi database vừa thức dậy
- Request đầu tiên sau thời gian rảnh có thể chậm hơn một database always-on

### 4. `Built-in connection pooling`

Neon cung cấp pooler sẵn, rất hợp cho môi trường serverless hoặc môi trường có nhiều kết nối ngắn hạn.

- Runtime app nên dùng pooled connection string
- Các lệnh Prisma CLI như migrate hoặc introspection nên dùng direct connection string

Với Prisma, mô hình thường dùng là:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

Trong đó:

- `DATABASE_URL`: trỏ tới endpoint có `-pooler`
- `DIRECT_URL`: trỏ tới endpoint direct, không qua pooler

Vì sao cần tách hai URL?

- Pooler rất phù hợp cho runtime production
- Nhưng migration, schema push, introspection thường cần direct connection để tránh các giới hạn từ transaction pooling

### 5. Trải nghiệm backup/restore và quản lý môi trường tốt hơn

Nhờ kiến trúc cloud-native, Neon làm tốt các tác vụ như:

- Tạo môi trường mới nhanh
- Khôi phục hoặc truy cập trạng thái dữ liệu thuận tiện hơn
- Hỗ trợ workflow phát triển nhanh hơn so với cách tự vận hành thủ công

## So sánh Neon với PostgreSQL tự host

| Tiêu chí | PostgreSQL tự host | PostgreSQL trên Neon |
| --- | --- | --- |
| Vận hành | Tự lo cài đặt, backup, patch, monitoring, HA | Neon quản lý phần lớn hạ tầng |
| Chi phí nhàn rỗi | Thường phải trả tiền cho VM luôn bật | Có thể tiết kiệm hơn nhờ scale-to-zero |
| Kiểm soát | Toàn quyền với OS, config, network, tuning | Ít quyền kiểm soát hạ tầng sâu hơn |
| Tạo môi trường dev/staging | Thường chậm và thủ công hơn | Branch database nhanh và tiện |
| Cold start | Không có nếu luôn bật | Có thể có khi compute ngủ |
| Phù hợp | Hệ thống cần kiểm soát rất sâu | App cloud-native, team muốn low-ops |

### Khi nào tự host có lợi hơn?

- Cần quyền kiểm soát rất sâu với PostgreSQL và hệ điều hành
- Cần tinh chỉnh mạng, disk, replication hoặc extension đặc thù
- Workload ổn định 24/7 và muốn latency cực kỳ đều

### Khi nào Neon có lợi hơn?

- Không muốn tự vận hành database server
- Muốn tăng tốc dev workflow
- Cần nhiều môi trường dev/staging/test
- Hệ thống triển khai theo hướng cloud hoặc serverless

## So sánh Neon với managed PostgreSQL truyền thống như RDS / Cloud SQL

Neon và các dịch vụ như AWS RDS, Google Cloud SQL hay Azure Database for PostgreSQL đều là managed PostgreSQL, nhưng triết lý khá khác nhau.

### Managed PostgreSQL truyền thống

Thường mạnh ở:

- Mô hình always-on ổn định
- Networking enterprise quen thuộc
- Cách vận hành gần với PostgreSQL truyền thống
- Dễ phù hợp với tổ chức đã có kinh nghiệm DBA hoặc hạ tầng cloud lớn

### Neon

Thường mạnh ở:

- `Database branching`
- `Autoscaling`
- `Scale to zero`
- Trải nghiệm tối ưu cho developer workflow hiện đại
- Dùng tốt với serverless platform như Vercel hoặc các hệ thống scale linh hoạt

### Tóm tắt khác biệt

- Nếu ưu tiên workflow phát triển nhanh, preview environment và ít vận hành, Neon rất hấp dẫn
- Nếu ưu tiên độ ổn định kiểu truyền thống, private networking enterprise, tuning quen thuộc và tải luôn nóng, RDS hoặc Cloud SQL thường là lựa chọn bảo thủ hơn

## So sánh Neon với Supabase

Supabase và Neon không hoàn toàn cùng bài toán.

### Supabase

Supabase là một platform rộng hơn, ngoài PostgreSQL còn có:

- Auth
- Storage
- Realtime
- Edge Functions

### Neon

Neon tập trung mạnh vào chính database layer:

- Serverless PostgreSQL
- Branching
- Pooling
- Workflow phát triển hiện đại

### Chọn thế nào?

- Nếu chỉ cần một PostgreSQL managed rất tốt theo hướng serverless, Neon là lựa chọn gọn và đúng trọng tâm
- Nếu muốn một backend platform all-in-one, Supabase có thể hấp dẫn hơn

## Những điểm cần chú ý khi dùng Neon với Prisma trong dự án này

Hiện tại `tabletap-server/prisma/schema.prisma:5` đang có:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Nếu chuyển sang Neon, cấu hình nên được mở rộng thành:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

Và trong `.env` nên tách rõ:

```env
DATABASE_URL="postgresql://USER:PASSWORD@YOUR-ENDPOINT-pooler.REGION.aws.neon.tech/DBNAME?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@YOUR-ENDPOINT.REGION.aws.neon.tech/DBNAME?sslmode=require"
```

### Vì sao cấu hình này hợp với TableTap?

Vì backend đang dùng Prisma, nên:

- Runtime query của app có thể đi qua pooler để xử lý kết nối hiệu quả hơn
- Prisma migrate và các lệnh CLI có thể dùng direct connection ổn định hơn
- Mô hình này đặc biệt hợp nếu backend sau này deploy trên môi trường cloud có khả năng scale theo traffic

## Neon phù hợp với TableTap khi nào?

Neon rất hợp nếu bạn định hướng TableTap theo các tiêu chí sau:

- Muốn giảm công sức vận hành database
- Muốn có dev/staging environment tách biệt nhanh
- Có nhu cầu test feature branch kèm database branch riêng
- Backend triển khai theo hướng hiện đại trên cloud
- Muốn tối ưu chi phí khi môi trường không chạy liên tục

## Khi nào nên cân nhắc lựa chọn khác?

Bạn có thể cân nhắc RDS, Cloud SQL hoặc tự host nếu:

- Hệ thống chạy tải lớn ổn định cả ngày
- Cần latency rất đều, hạn chế tối đa cold start
- Cần kiểm soát hạ tầng sâu hơn mức Neon cho phép
- Có yêu cầu enterprise/compliance/networking đặc thù

## Kết luận

Neon không làm PostgreSQL trở thành một hệ quản trị khác. Điều Neon thay đổi là cách PostgreSQL được triển khai và sử dụng trong môi trường cloud hiện đại.

Điểm mạnh lớn nhất của Neon không nằm ở SQL mới hay cú pháp mới, mà ở các lợi ích vận hành và phát triển:

- `Database branching`
- `Autoscaling`
- `Scale to zero`
- `Built-in connection pooling`
- Trải nghiệm `low-ops` cho team phát triển

Với stack hiện tại của TableTap gồm Fastify + Prisma + Next.js, Neon là một lựa chọn rất hợp lý nếu ưu tiên tốc độ phát triển, ít vận hành và workflow hiện đại. Nếu về sau hệ thống chuyển sang tải lớn, luôn nóng và cần kiểm soát hạ tầng sâu hơn, lúc đó mới nên so sánh nghiêm túc với RDS, Cloud SQL hoặc phương án tự host.
