# Cách tránh mất dữ liệu khi đồng bộ database với Prisma

Khi sử dụng `npx prisma db push` hoặc `npx prisma migrate dev`, việc Prisma cảnh báo rằng thay đổi hiện tại có thể xóa dữ liệu là hoàn toàn bình thường. Đây không phải là lỗi của Prisma, mà là cơ chế bảo vệ để nhắc bạn rằng schema change hiện tại có tính `destructive` - nghĩa là có nguy cơ làm mất dữ liệu nếu tiếp tục.

Điểm quan trọng nhất cần nhớ là: Prisma không thể tự bảo vệ dữ liệu cho bạn nếu chính thay đổi schema mang tính phá hủy. Vì vậy, cách an toàn không nằm ở việc luôn chọn `yes`, mà nằm ở workflow bạn sử dụng.

---

## Kết luận ngắn gọn

- Không dùng `npx prisma db push` cho production hoặc database có dữ liệu quan trọng.
- Không dùng `npx prisma migrate dev` trực tiếp trên production.
- Với dữ liệu quan trọng, workflow an toàn là:
  - local/dev: `npx prisma migrate dev`
  - staging/production: `npx prisma migrate deploy`
- Luôn backup trước các migration có rủi ro.
- Với thay đổi có thể làm mất dữ liệu, hãy dùng chiến lược migration nhiều bước thay vì sửa schema theo kiểu một lần là xong.

---

## Vì sao Prisma cảnh báo có thể mất dữ liệu?

Prisma thường cảnh báo khi phát hiện thay đổi schema có khả năng làm mất dữ liệu, ví dụ:

- xóa model hoặc xóa field
- đổi kiểu dữ liệu không tương thích, như `String` sang `Int`
- đổi field từ optional sang required khi dữ liệu cũ vẫn có `NULL`
- thay đổi relation làm foreign key cũ không còn hợp lệ
- làm lệch migration history so với trạng thái thật của database

Với `npx prisma migrate dev`, còn có thêm trường hợp Prisma yêu cầu reset database local nếu phát hiện `drift`, tức là database hiện tại không còn khớp với migration history trong project.

Điều này thường xảy ra khi:

- trước đây bạn dùng `db push`, sau đó chuyển sang `migrate`
- ai đó sửa database bằng tay
- migration files trong git không phản ánh đúng trạng thái database hiện tại

---

## Nguyên tắc an toàn quan trọng nhất

Muốn tránh mất dữ liệu khi sync database bằng Prisma, bạn nên tuân thủ các nguyên tắc sau:

- dùng đúng lệnh cho đúng môi trường
- không trộn `db push` và `migrate` bừa bãi trên cùng một database quan trọng
- backup trước khi chạy migration có rủi ro
- review kỹ thay đổi schema và SQL migration
- tránh thay đổi phá dữ liệu theo kiểu một bước
- ưu tiên workflow migration có lịch sử thay vì đồng bộ trực tiếp

---

## 1. Best practices với `npx prisma db push`

### Khi nào nên dùng

`db push` chỉ nên dùng khi:

- bạn đang làm prototype hoặc proof of concept
- database local là disposable, có thể reset bất cứ lúc nào
- dữ liệu không quan trọng
- bạn cần iterate schema rất nhanh

### Khi nào không nên dùng

Không nên dùng `db push` nếu:

- database đang chứa dữ liệu thật
- dự án có nhiều người cùng làm
- cần lịch sử schema change để review hoặc deploy
- đang làm việc với staging hoặc production

### Workflow an toàn với `db push`

```bash
npx prisma format
npx prisma validate
npx prisma db push
npx prisma generate
```

### Ý nghĩa của workflow này

- `format`: làm sạch `schema.prisma`
- `validate`: phát hiện lỗi schema trước khi chạm tới database
- `db push`: đồng bộ schema xuống database
- `generate`: cập nhật Prisma Client cho code app

### Quy tắc an toàn khi dùng `db push`

- chỉ dùng ở local hoặc môi trường thử nghiệm
- nếu Prisma cảnh báo mất dữ liệu, dừng lại và đánh giá kỹ
- nếu dữ liệu cần giữ, không chọn `yes` ngay
- nếu buộc phải tiếp tục, hãy backup trước

Nói ngắn gọn: nếu bạn thực sự sợ mất dữ liệu, `db push` không nên là workflow chính của bạn.

---

## 2. Best practices với `npx prisma migrate dev`

### Vai trò của `migrate dev`

`npx prisma migrate dev` được thiết kế cho môi trường development. Nó tạo migration files, lưu lịch sử schema change và áp migration lên database dev/local.

So với `db push`, đây là workflow an toàn và chuẩn hơn cho dự án nghiêm túc.

### Workflow chuẩn với `migrate dev`

```bash
npx prisma format
npx prisma validate
npx prisma migrate dev --name meaningful_change_name
npx prisma generate
```

### Sau đó nên làm gì

- review migration SQL vừa tạo
- test ứng dụng với schema mới
- commit cả `schema.prisma` và thư mục `prisma/migrations`

### Điều cần nhớ

Nếu Prisma yêu cầu reset local database, đừng chọn `yes` ngay nếu local DB đó có dữ liệu bạn cần giữ. Hãy dừng lại để kiểm tra nguyên nhân như drift hoặc migration history không khớp.

---

## 3. Workflow production an toàn

Production không nên dùng:

- `npx prisma db push`
- `npx prisma migrate dev`

Production nên dùng:

```bash
npx prisma migrate deploy
```

### Workflow chuẩn cho staging hoặc production

1. Tạo migration ở local bằng `npx prisma migrate dev`
2. Review migration SQL
3. Test migration ở staging
4. Backup database production
5. Deploy code
6. Chạy `npx prisma migrate deploy`

### Vì sao đây là cách an toàn hơn?

- production chỉ chạy các migration đã được tạo và review từ trước
- không có bước Prisma tự suy đoán rồi áp thẳng như `db push`
- dễ kiểm soát lịch sử thay đổi hơn

---

## 4. Cách xử lý thay đổi schema mà không làm mất dữ liệu

Đây là phần quan trọng nhất. Nếu thay đổi schema có tính phá hủy, đừng sửa theo kiểu một bước. Hãy dùng chiến lược nhiều bước.

### Ví dụ 1: đổi tên cột

Không nên làm trực tiếp:

- xóa `name`
- thêm `fullName`

Vì điều này khiến dữ liệu cũ ở `name` bị mất.

### Cách an toàn hơn

1. thêm cột mới `fullName?`
2. viết script hoặc SQL để copy dữ liệu từ `name` sang `fullName`
3. cập nhật application dùng `fullName`
4. sau khi chắc chắn mọi thứ ổn định, mới xóa `name` ở migration sau

### Ví dụ 2: đổi field từ optional sang required

Không nên làm ngay:

- đổi `phone String?` thành `phone String`

Nếu các row cũ còn `NULL`, migration có thể fail hoặc yêu cầu xử lý phá dữ liệu.

### Cách an toàn hơn

1. giữ `phone String?`
2. backfill dữ liệu để mọi record đều có giá trị `phone`
3. sau đó mới đổi sang `phone String`

### Ví dụ 3: đổi kiểu dữ liệu

Không nên làm trực tiếp:

- đổi `price String` thành `price Int`

### Cách an toàn hơn

1. thêm cột mới `priceInt Int?`
2. migrate dữ liệu từ `price` sang `priceInt`
3. cập nhật code ứng dụng dùng cột mới
4. xóa cột cũ trong migration sau

Đây là pattern rất phổ biến và an toàn: `expand -> migrate data -> switch app -> contract`.

---

## 5. Nếu bạn đã từng dùng cả `db push` và `migrate dev`

Đây là nguyên nhân rất phổ biến khiến Prisma cảnh báo reset hoặc đòi xóa data.

Khi bạn dùng `db push`, database thay đổi nhưng không có migration files tương ứng. Sau đó khi chuyển sang `migrate dev`, Prisma thấy:

- database thực tế đã thay đổi
- nhưng migration history trong project không phản ánh các thay đổi đó

Lúc này Prisma sẽ coi database đang bị `drift` và thường muốn reset để đưa mọi thứ về trạng thái nhất quán.

### Cách xử lý tốt hơn

- chọn một workflow chính về lâu dài, thường là `migrate`
- không tiếp tục trộn hai cách làm trên cùng một database quan trọng
- nếu trạng thái hiện tại đã rối, hãy:
  1. backup database
  2. xác định schema thực tế đang có
  3. tạo baseline migration phù hợp
  4. từ đó tiếp tục chỉ dùng workflow migration chuẩn

Với database có dữ liệu thật, cách xử lý thường không phải là tiếp tục bấm `yes`, mà là chuẩn hóa lại migration history một cách cẩn thận.

---

## 6. Checklist an toàn trước khi sync database bằng Prisma

Trước khi chạy bất kỳ lệnh nào ảnh hưởng đến database, hãy tự hỏi:

- đây có phải production hoặc staging không?
- database này có dữ liệu quan trọng không?
- thay đổi schema này có drop column, đổi type, đổi relation, hoặc đổi nullable không?
- mình đã backup chưa?
- mình đã chạy `npx prisma validate` chưa?
- mình đã review migration SQL chưa?
- mình có đang vô tình trộn `db push` với `migrate` trên cùng một DB không?

Nếu một trong các câu trả lời khiến bạn không chắc chắn, hãy dừng lại trước khi chọn `yes`.

---

## 7. Workflow khuyến nghị theo từng môi trường

### Local cá nhân, dữ liệu không quan trọng

```bash
npx prisma format
npx prisma validate
npx prisma db push
npx prisma generate
```

### Local hoặc team development, dữ liệu bắt đầu quan trọng

```bash
npx prisma format
npx prisma validate
npx prisma migrate dev --name meaningful_change_name
npx prisma generate
```

### Staging hoặc production

```bash
npx prisma migrate deploy
```

Kèm theo:

- backup database trước migration rủi ro
- review kỹ migration SQL
- dùng chiến lược nhiều bước với thay đổi phá dữ liệu

---

## 8. Nếu Prisma hỏi reset thì nên làm gì?

Thay vì chọn `yes` ngay, hãy làm theo trình tự sau:

1. dừng lệnh
2. xác định database hiện tại có phải chỉ là local disposable DB hay không
3. nếu có dữ liệu cần giữ, backup ngay
4. kiểm tra xem nguyên nhân là destructive change hay drift
5. quyết định workflow phù hợp hơn:
   - nếu là local test DB không quan trọng, có thể reset
   - nếu là DB quan trọng, không reset; hãy xử lý bằng migration an toàn hơn

---

## Kết luận

Muốn tránh mất dữ liệu khi đồng bộ database bằng Prisma, điều quan trọng nhất không phải là tìm cách “ép Prisma đừng cảnh báo”, mà là xây dựng workflow đúng chuẩn.

- `db push` chỉ nên dùng khi mất dữ liệu cũng không sao
- `migrate dev` nên dùng để tạo migration trong local development
- `migrate deploy` là lựa chọn đúng cho staging và production
- với dữ liệu quan trọng, luôn ưu tiên backup, review migration và dùng chiến lược migration nhiều bước

Nếu phải nhớ một câu duy nhất, hãy nhớ thế này:

> Khi dữ liệu quan trọng, đừng chọn nhanh hơn - hãy chọn an toàn hơn.
