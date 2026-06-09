# Database Schema: Tổng quan các bảng chính

Tài liệu này cung cấp cái nhìn tổng quan, ngắn gọn và dễ theo dõi về các bảng chính trong database của **Seatly**, giúp hình dung rõ **vai trò của từng bảng** và cách chúng **liên kết với nhau** trong hệ thống.

## Lưu ý rất quan trọng

Schema hiện tại của Seatly **không có**:

- `restaurants`
- `dining_sessions`
- `table_requests` trong bản gốc legacy
- `order_status_logs` trong bản gốc legacy
- mô hình multi-restaurant

Schema **source of truth hiện tại** gồm **8 bảng gốc**:

- `Account`
- `Dish`
- `DishSnapshot`
- `RestaurantTable`
- `Order`
- `RefreshToken`
- `Guest`
- `Socket`

Ngoài ra, để chuẩn bị cho các tính năng nâng cấp về sau, schema có thể bổ sung:

- **3 bảng mới tối thiểu**: `OrderBatch`, `OrderStatusLog`, `TableRequest`
- **một số cột mở rộng** trong các bảng hiện có

Nhưng các phần bổ sung này là để **phục vụ giai đoạn sau**, không làm thay đổi ưu tiên hiện tại là hoàn thiện tính năng cốt lõi.

## 1. Bảng `Account`

### Tổng quan

Bảng `Account` lưu thông tin tài khoản nội bộ của quán, gồm các vai trò như:

- `Owner`
- `Employee`

Đây là bảng phục vụ cho nhóm người dùng vận hành hệ thống, không phải khách hàng tại bàn.

### Các thuộc tính chính

- `id`: khóa chính
- `name`
- `email`
- `password`
- `avatar`
- `role`
- `ownerId`: self-reference tới `Account.id`
- `createdAt`
- `updatedAt`

### Mối quan hệ chính

Một `Account` có thể liên quan tới nhiều:

- `RefreshToken`
- `Order` với vai trò người xử lý order
- `Socket`
- `OrderStatusLog` với vai trò người đổi trạng thái **(bảng thêm mới cho mở rộng)**
- `TableRequest` với vai trò người xử lý request **(bảng thêm mới cho mở rộng)**

## 2. Bảng `RefreshToken`

### Tổng quan

Bảng `RefreshToken` dùng để quản lý phiên đăng nhập của tài khoản nội bộ.

### Các thuộc tính chính

- `token`: khóa chính
- `accountId`
- `expiresAt`
- `createdAt`

### Mối quan hệ chính

Nhiều `RefreshToken` có thể thuộc về một `Account`.

## 3. Bảng `RestaurantTable`

### Tổng quan

Bảng `RestaurantTable` dùng để quản lý **bàn vật lý** trong quán. Đây là một bảng rất quan trọng vì nó gắn trực tiếp với nghiệp vụ quét **QR code tại bàn**.

Mỗi bàn có một `token` riêng. Khi khách quét QR, hệ thống sẽ dùng token này để xác định đúng bàn mà khách đang ngồi.

### Các thuộc tính chính

- `number`: khóa chính
- `capacity`
- `status`
- `token`
- `createdAt`
- `updatedAt`

### Các cột mở rộng đã bổ sung cho tương lai

- `isOccupied` **(cột thêm mới)**: cờ đánh dấu bàn đang có khách hay không
- `occupiedAt` **(cột thêm mới)**: thời điểm bàn được xem là bắt đầu có khách
- `lastActivityAt` **(cột thêm mới)**: thời điểm hoạt động gần nhất của bàn

> Các cột này được thêm để hỗ trợ **Auto Table Occupancy** và theo dõi hoạt động bàn trong tương lai.  
> Tuy nhiên, ưu tiên hiện tại vẫn là hoàn thiện luồng core trước.

### Mối quan hệ chính

Một `RestaurantTable` có thể có nhiều:

- `Guest`
- `Order`
- `OrderBatch` **(bảng thêm mới cho mở rộng)**
- `TableRequest` **(bảng thêm mới cho mở rộng)**

## 4. Bảng `Guest`

### Tổng quan

Bảng `Guest` lưu thông tin **guest session tạm thời** của khách tại bàn.

Khách của Seatly không cần đăng ký tài khoản phức tạp. Họ chỉ cần nhập tên để vào bàn, đặt món, theo dõi trạng thái món hoặc gửi yêu cầu hỗ trợ.

### Các thuộc tính chính

- `id`
- `name`
- `tableNumber`
- `refreshToken`
- `refreshTokenExpiresAt`
- `createdAt`
- `updatedAt`

### Các cột mở rộng đã bổ sung cho tương lai

- `sessionStatus` **(cột thêm mới)**: `Active`, `Idle`, `Expired`, `Closed`
- `lastActivityAt` **(cột thêm mới)**: mốc hoạt động gần nhất của guest
- `expiresAt` **(cột thêm mới)**: thời điểm session dự kiến hết hạn
- `endedAt` **(cột thêm mới)**: thời điểm kết thúc session

> Các cột này được thêm để hỗ trợ **Auto session timeout** và quản lý session khách tốt hơn trong tương lai.

### Mối quan hệ chính

Một `Guest` có thể có nhiều:

- `Order`
- `Socket`
- `OrderBatch` **(bảng thêm mới cho mở rộng)**
- `TableRequest` **(bảng thêm mới cho mở rộng)**

## 5. Bảng `Dish`

### Tổng quan

Bảng `Dish` lưu **menu hiện tại** của quán.

### Các thuộc tính chính

- `id`
- `name`
- `price`
- `description`
- `image`
- `status`
- `createdAt`
- `updatedAt`

### Các cột mở rộng đã bổ sung cho tương lai

- `isOutOfStock` **(cột thêm mới)**: đánh dấu món đang hết hàng
- `stockUpdatedAt` **(cột thêm mới)**: thời điểm cập nhật trạng thái hết hàng gần nhất
- `estimatedPrepMinutes` **(cột thêm mới)**: thời gian chuẩn bị dự kiến của món

> Các cột này được thêm để hỗ trợ **Out-of-stock indicator** và **Estimated Cooking Time (ETA)**.

### Mối quan hệ chính

Một `Dish` có thể có nhiều `DishSnapshot`.

## 6. Bảng `DishSnapshot`

### Tổng quan

Bảng `DishSnapshot` dùng để **chụp lại thông tin món tại thời điểm khách đặt món**.

Đây là một bảng rất quan trọng vì nó giúp giữ đúng dữ liệu lịch sử. Nếu sau này món bị đổi giá, đổi tên, đổi ảnh hoặc đổi trạng thái trong menu, các order cũ vẫn hiển thị đúng theo thời điểm đã đặt.

### Các thuộc tính chính

- `id`
- `name`
- `price`
- `description`
- `image`
- `status`
- `dishId`
- `updatedAt`
- `createdAt`

### Mối quan hệ chính

Nhiều `DishSnapshot` có thể tham chiếu về một `Dish`. Trong triển khai hiện tại, hệ thống có thể tạo snapshot mới mỗi lần phát sinh order để giữ lịch sử dữ liệu ổn định.

## 7. Bảng `Order`

### Tổng quan

Bảng `Order` là bảng trung tâm để lưu từng món mà khách đã đặt.

Mỗi bản ghi trong `Order` là **một line item**, tức là **một dòng món** trong đơn.

### Các thuộc tính chính

- `id`
- `guestId`
- `tableNumber`
- `dishSnapshotId`
- `quantity`
- `orderHandlerId`
- `status`
- `createdAt`
- `updatedAt`

### Các cột mở rộng đã bổ sung cho tương lai

- `orderBatchId` **(cột thêm mới)**: dùng để gom nhiều line item thuộc cùng một lần submit / reorder
- `estimatedReadyAt` **(cột thêm mới)**: ETA dự kiến hoàn thành cho line item này

> Các cột này được thêm để hỗ trợ **Order merging**, **Quick reorder**, **History theo batch**, và ETA chi tiết hơn.

### Mối quan hệ chính

Nhiều `Order` có thể thuộc về một:

- `Guest`
- `RestaurantTable`
- `Account` với vai trò `orderHandler`
- `OrderBatch` **(bảng thêm mới cho mở rộng)**

Một `Order` gắn với đúng một `DishSnapshot`.

## 8. Bảng `Socket`

### Tổng quan

Bảng `Socket` dùng để quản lý kết nối realtime giữa client và server.

### Các thuộc tính chính

- `socketId`
- `accountId`
- `guestId`

### Mối quan hệ chính

Nhiều `Socket` có thể thuộc về một:

- `Account`
- hoặc `Guest`

## 9. Bảng `OrderBatch` **(bảng thêm mới)**

### Tổng quan

`OrderBatch` là bảng mới được thêm để gom nhiều dòng `Order` thuộc cùng một lần đặt món hoặc một lần **quick reorder**.

### Vai trò chính

- nhóm nhiều line item theo một lần submit
- hỗ trợ lịch sử order theo nhóm
- hỗ trợ quick reorder
- hỗ trợ logic gộp món giống nhau ở tầng nghiệp vụ

### Các thuộc tính chính

- `id`
- `guestId`
- `tableNumber`
- `code`
- `status`
- `submittedAt`
- `completedAt`
- `cloneFromBatchId`
- `createdAt`
- `updatedAt`

> Bảng này được thêm để phục vụ **giai đoạn mở rộng**, không phải phần bắt buộc phải triển khai ngay ở MVP.

## 10. Bảng `OrderStatusLog` **(bảng thêm mới)**

### Tổng quan

`OrderStatusLog` lưu lịch sử thay đổi trạng thái của order.

### Các thuộc tính chính

- `id`
- `orderId`
- `fromStatus`
- `toStatus`
- `changedByAccountId`
- `note`
- `createdAt`

### Vai trò chính

- tạo timeline xử lý món
- hỗ trợ truy vết trạng thái
- hỗ trợ màn hình history/order timeline

> Bảng này được thêm để phục vụ **History / Order timeline** ở giai đoạn nâng cấp sau.

## 11. Bảng `TableRequest` **(bảng thêm mới)**

### Tổng quan

`TableRequest` lưu các yêu cầu hỗ trợ phát sinh từ bàn trong quá trình phục vụ.

### Ví dụ request thường gặp

- `CallStaff`
- `NeedSupport`
- `RequestBill`
- `Other`

### Các thuộc tính chính

- `id`
- `guestId`
- `tableNumber`
- `type`
- `status`
- `note`
- `handlerId`
- `resolvedAt`
- `createdAt`
- `updatedAt`

### Vai trò chính

- hỗ trợ nút **Call Staff / Gọi nhân viên**
- quản lý trạng thái request từ bàn
- giúp staff biết request nào đang chờ xử lý

> Bảng này được thêm để phục vụ **tính năng mở rộng**, nhưng vẫn rất hợp lý nếu nhóm muốn nâng cấp sau khi phần core đã ổn định.

## Kết luận

Nếu cần nhớ nhanh toàn bộ schema của Seatly, bạn chỉ cần nắm logic trung tâm như sau:

- `RestaurantTable` là bàn vật lý có QR
- `Guest` là session tạm thời của khách tại bàn
- `Dish` là menu hiện tại
- `DishSnapshot` là bản chụp món tại thời điểm đặt
- `Order` là từng line item khách gọi
- `Account` là tài khoản nội bộ
- `Socket` hỗ trợ realtime

Và ở mức mở rộng:

- `OrderBatch` nhóm nhiều order thành một lần đặt
- `OrderStatusLog` lưu timeline trạng thái
- `TableRequest` lưu yêu cầu hỗ trợ tại bàn

Ưu tiên hiện tại vẫn là hoàn thiện **các tính năng cốt lõi** trước, sau đó mới triển khai đầy đủ các bảng và cột mở rộng này.
