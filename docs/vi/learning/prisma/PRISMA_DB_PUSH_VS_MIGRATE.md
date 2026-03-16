# Phân tích chi tiết `npx prisma db push` và `npx prisma migrate`

## Bối cảnh

Trong dự án `tabletap`, Prisma schema đang nằm tại `tabletap-server/prisma/schema.prisma` và datasource đang dùng `postgresql`. Đây là một bối cảnh rất phù hợp để phân biệt hai cách cập nhật schema database phổ biến trong Prisma:

- `npx prisma db push`
- workflow migration với `npx prisma migrate`

Hai cách này đều nhằm đưa thay đổi từ `schema.prisma` xuống cơ sở dữ liệu, nhưng mục tiêu, mức độ kiểm soát và cách dùng trong dự án thực tế hoàn toàn khác nhau.

## Nhìn nhanh để dễ nhớ

- `db push` = làm database giống schema ngay lập tức
- `migrate` = ghi lại lịch sử thay đổi schema để mọi môi trường cùng đi đúng một lộ trình

Nếu chỉ cần đồng bộ nhanh ở local, `db push` rất tiện.

Nếu cần teamwork, review, CI/CD và production an toàn, `migrate` là workflow phù hợp hơn.

## 1. `npx prisma db push` là gì?

### Mục đích sử dụng

`npx prisma db push` được dùng để đồng bộ trực tiếp Prisma schema hiện tại xuống database. Mục tiêu chính là giúp database phản ánh đúng mô hình đang có trong `schema.prisma` mà không cần tạo migration files.

Lệnh này thường phù hợp khi:

- đang làm prototype
- đang học Prisma
- đang phát triển nhanh ở local
- schema còn thay đổi liên tục
- chưa cần quản lý lịch sử thay đổi database một cách chặt chẽ

### Cách thức hoạt động

Khi chạy lệnh này, Prisma sẽ:

1. Đọc file `schema.prisma`
2. So sánh schema hiện tại với database đang kết nối qua `DATABASE_URL`
3. Xác định các thay đổi cần áp dụng
4. Cập nhật trực tiếp database để database khớp với schema mới nhất

Điểm rất quan trọng:

- không tạo migration SQL để commit vào git
- không tạo lịch sử version hóa thay đổi schema như workflow migration chuẩn

### Ưu điểm

- nhanh, ít bước, dễ dùng
- rất phù hợp cho thử nghiệm và iterate nhanh
- giảm ceremony trong giai đoạn đầu dự án
- thuận tiện khi local database có thể reset dễ dàng

### Nhược điểm

- không có migration file để review
- khó audit lịch sử thay đổi schema
- khó đảm bảo các môi trường khác nhau cùng ở đúng một trạng thái
- không phù hợp làm quy trình chính cho production lâu dài

## 2. `npx prisma migrate` là gì?

### Lưu ý về tên lệnh

Trong thực tế, Prisma thường được dùng qua các lệnh:

- `npx prisma migrate dev`
- `npx prisma migrate deploy`

Nhiều người gọi chung là “dùng `migrate`”, nhưng workflow thực tế cần phân biệt rõ local development và production deployment.

### Mục đích sử dụng

Workflow `migrate` được dùng để quản lý thay đổi schema database theo từng version có lịch sử. Đây là cách tiếp cận phù hợp hơn cho dự án thật, làm việc nhóm, review code và triển khai nhiều môi trường.

### Cách thức hoạt động

Khi chạy `npx prisma migrate dev --name ten_migration`, Prisma thường sẽ:

1. Đọc `schema.prisma`
2. So sánh schema hiện tại với trạng thái migration đã có
3. Tạo migration mới trong `prisma/migrations`
4. Sinh SQL tương ứng với thay đổi schema
5. Áp migration lên database local/dev
6. Ghi nhận migration đã chạy trong bảng `_prisma_migrations`

Khi chạy `npx prisma migrate deploy`, Prisma sẽ:

1. Kiểm tra các migration chưa được áp dụng
2. Áp các migration còn thiếu lên database đích theo đúng thứ tự

### Ưu điểm

- có file migration rõ ràng để commit vào git
- dễ review schema change trong pull request
- phù hợp với teamwork và nhiều môi trường
- hỗ trợ CI/CD và deployment an toàn hơn
- giúp truy vết tiến hóa schema theo thời gian

### Nhược điểm

- nhiều bước hơn `db push`
- khi schema thay đổi liên tục có thể sinh nhiều migration nhỏ
- cần kỷ luật hơn trong cách làm việc
- các thay đổi phức tạp như rename field, data migration hoặc refactor relation cần cẩn thận hơn

## 3. So sánh trực tiếp

| Tiêu chí                             | `npx prisma db push`                | `npx prisma migrate`               |
| ------------------------------------ | ----------------------------------- | ---------------------------------- |
| Mục tiêu chính                       | Đồng bộ schema nhanh xuống database | Quản lý thay đổi schema có lịch sử |
| Tạo migration file                   | Không                               | Có                                 |
| Lưu lịch sử thay đổi                 | Không đầy đủ                        | Có                                 |
| Phù hợp prototype                    | Rất phù hợp                         | Hơi nặng nếu chỉ thử nghiệm        |
| Phù hợp teamwork                     | Hạn chế                             | Rất phù hợp                        |
| Phù hợp production                   | Không nên là lựa chọn chính         | Nên ưu tiên                        |
| Review qua git                       | Gần như không                       | Rất tốt                            |
| Tốc độ thao tác                      | Nhanh                               | Chậm hơn một chút                  |
| Mức độ kiểm soát                     | Thấp hơn                            | Cao hơn                            |
| Khả năng tái lập giữa các môi trường | Hạn chế                             | Tốt                                |

## 4. Ảnh hưởng đến cơ sở dữ liệu

### Khi dùng `db push`

- database được cập nhật trực tiếp để khớp với schema mới nhất
- không có các bước thay đổi được lưu dưới dạng migration SQL có version
- phù hợp khi dữ liệu chưa quá quan trọng hoặc môi trường có thể reset dễ dàng

### Khi dùng `migrate`

- database được cập nhật theo từng migration cụ thể
- có bảng `_prisma_migrations` để theo dõi trạng thái đã chạy
- dễ kiểm soát hơn giữa local, staging và production

## 5. Ảnh hưởng đến quá trình phát triển dự án

### Nếu dự án dùng `db push`

- tăng tốc phát triển ở giai đoạn đầu
- giảm số bước thao tác khi thay đổi schema thường xuyên
- nhưng về lâu dài dễ thiếu kiểm soát nếu nhiều người cùng tham gia

Rủi ro chính:

- khó review schema change
- khó đồng bộ nhiều môi trường
- dễ xảy ra lệch trạng thái database giữa các máy

### Nếu dự án dùng `migrate`

- có thêm bước tạo và quản lý migration
- ban đầu chậm hơn một chút
- nhưng rất có lợi khi dự án lớn dần và cần quy trình rõ ràng

Lợi ích lâu dài:

- dễ onboarding thành viên mới
- dễ review thay đổi trong pull request
- dễ deploy và truy vết sự cố liên quan đến schema

## 6. Workflow phù hợp với `db push`

### Khi nào nên chọn workflow này

Chọn `db push` khi:

- bạn đang thiết kế schema lần đầu
- bạn cần thử nghiệm nhanh nhiều thay đổi nhỏ
- bạn làm việc chủ yếu trên local
- dữ liệu hiện tại chưa phải dữ liệu production quan trọng

### Workflow điển hình

1. Chỉnh sửa model trong `schema.prisma`
2. Chạy `npx prisma db push`
3. Chạy `npx prisma generate`
4. Cập nhật code backend nếu cần
5. Test logic ứng dụng

### Ví dụ minh họa

Giả sử bạn thêm field `phone` vào model `Account`:

```prisma
model Account {
  id       Int     @id @default(autoincrement())
  name     String
  email    String  @unique
  password String
  phone    String?
}
```

Sau đó chạy:

```bash
npx prisma db push
npx prisma generate
```

Kết quả:

- cột `phone` được thêm trực tiếp vào bảng `Account`
- Prisma Client được cập nhật để code app có thể dùng field mới
- không có migration file nào được tạo

### Khi nào nên dừng workflow này

Khi schema bắt đầu ổn định hơn, có nhiều người cùng làm, hoặc dự án cần deploy bài bản, nên chuyển dần sang workflow migration chuẩn.

## 7. Workflow phù hợp với `migrate`

### Khi nào nên chọn workflow này

Chọn `migrate` khi:

- dự án đã bước vào giai đoạn ổn định hơn
- có nhiều developer cùng tham gia
- có staging hoặc production
- cần review và version control schema change
- cần deployment an toàn, có thể lặp lại

### Workflow điển hình trong local development

1. Chỉnh sửa `schema.prisma`
2. Chạy `npx prisma migrate dev --name ten_thay_doi`
3. Prisma tạo migration SQL mới
4. Chạy `npx prisma generate` nếu cần
5. Commit cả thay đổi schema và thư mục migration vào git

### Workflow điển hình khi deploy

1. Pull code mới trên server hoặc CI runner
2. Chạy `npx prisma migrate deploy`
3. Prisma áp các migration còn thiếu lên database đích

### Ví dụ minh họa

Vẫn với thay đổi thêm `phone` vào `Account`, bạn chạy:

```bash
npx prisma migrate dev --name add_account_phone
npx prisma generate
```

Prisma có thể tạo một thư mục như:

```text
prisma/migrations/20260311120000_add_account_phone/
```

Bên trong có file SQL, ví dụ:

```sql
ALTER TABLE "Account" ADD COLUMN "phone" TEXT;
```

Khi deploy:

```bash
npx prisma migrate deploy
```

Kết quả:

- migration được áp dụng đúng thứ tự
- các môi trường dùng chung một lịch sử thay đổi
- team dễ review và truy vết hơn

## 8. Tình huống nên dùng từng lệnh

### Nên dùng `npx prisma db push` khi

- bạn đang học hoặc khám phá Prisma
- bạn đang làm prototype hoặc proof of concept
- schema còn thay đổi liên tục từng giờ hoặc từng ngày
- dữ liệu chỉ là dữ liệu local/dev và có thể reset

### Nên dùng `npx prisma migrate` khi

- dự án cần phát triển bền vững
- team có nhiều người cùng thao tác trên schema
- database là thành phần quan trọng của sản phẩm
- bạn cần review schema change qua git
- bạn cần triển khai lên staging hoặc production

## 9. Áp dụng vào dự án `tabletap`

Trong codebase hiện tại, schema ở `tabletap-server/prisma/schema.prisma` đã có khá nhiều model và relation như:

- `Account`
- `Order`
- `Guest`
- `RestaurantTable`
- `OrderBatch`
- `OrderStatusLog`
- `TableRequest`

Với mức độ liên kết như vậy:

- nếu chỉ đang ở giai đoạn thử nghiệm, `db push` vẫn hữu ích vì nhanh
- nhưng nếu dự án tiến xa hơn về teamwork, staging, production hoặc CI/CD, workflow `migrate` sẽ phù hợp và an toàn hơn nhiều

Nói cách khác, schema càng lớn và quan hệ càng phức tạp thì giá trị của migration history càng cao.

## 10. Kết luận

`npx prisma db push` và `npx prisma migrate` không phải là hai lệnh cạnh tranh trực tiếp theo kiểu “một cái đúng, một cái sai”. Chúng phục vụ hai giai đoạn và hai mục tiêu khác nhau trong vòng đời phát triển dự án.

- `db push` tối ưu cho tốc độ, thử nghiệm và sự linh hoạt
- `migrate` tối ưu cho kiểm soát, cộng tác nhóm, review, CI/CD và production

Nếu bạn đang prototype hoặc học Prisma, hãy ưu tiên `db push`.

Nếu bạn đang xây dựng một dự án thực tế cần quản lý database nghiêm túc, hãy chuyển sang workflow `migrate` càng sớm càng tốt khi schema bắt đầu ổn định.
