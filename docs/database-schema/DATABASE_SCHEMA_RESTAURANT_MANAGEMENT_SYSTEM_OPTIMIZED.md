# Database Schema: Seatly (Current + Minimal Future Extensions)

## Direct Answer: Chiến lược hiện tại

Schema hiện tại của **Seatly** phải bám theo **legacy 8 bảng gốc** đã chốt, không quay lại hướng cũ có `dining_sessions` hay `restaurants`.

Phần dữ liệu hiện tại gồm:

- `Account`
- `Dish`
- `DishSnapshot`
- `RestaurantTable`
- `Order`
- `RefreshToken`
- `Guest`
- `Socket`

Ngoài ra, để phục vụ cho một số tính năng nâng cấp về sau, schema được mở rộng **nhẹ** bằng cách:

- thêm cột mới vào bảng hiện có
- thêm số lượng tối thiểu các bảng mới cần thiết

## 1. Tổng quan và định hướng thiết kế

### Triết lý thiết kế chính

Schema của Seatly được xây dựng theo nguyên tắc:

- **Mỗi bản ghi trong `Order` là một line item**
- **`Guest` là session tạm thời của khách tại bàn**
- **`DishSnapshot` dùng để lưu bản chụp thông tin món tại thời điểm đặt**
- **Thiết kế ưu tiên phục vụ tại bàn bằng QR**
- **Không mở rộng sang các module enterprise trong giai đoạn hiện tại**

### Định hướng triển khai

Hệ thống được thiết kế theo hướng **một quán / một phạm vi vận hành đơn giản**, không triển khai multi-restaurant ở giai đoạn hiện tại.

## 2. Thiết kế bảng và mối quan hệ

### Nhóm 1: Tài khoản nội bộ

#### `Account`

Bảng này lưu tài khoản nội bộ của quán, gồm các vai trò chính như:

- Owner
- Employee

Ngoài ra, `ownerId` là self-reference để thể hiện liên kết sở hữu / quản lý giữa các account nếu cần.

#### `RefreshToken`

Dùng để quản lý phiên đăng nhập của tài khoản nội bộ.

### Nhóm 2: Bàn và guest session

#### `RestaurantTable`

Đây là bảng quản lý **bàn vật lý trong quán**.

Mỗi bàn có:

- số bàn
- sức chứa
- trạng thái bàn
- `token` riêng để tạo QR code

Ngoài ra, các cột mở rộng sau đã được thêm để phục vụ giai đoạn sau:

- `isOccupied` **(cột thêm mới)**
- `occupiedAt` **(cột thêm mới)**
- `lastActivityAt` **(cột thêm mới)**

Các cột này phục vụ **Auto Table Occupancy** và theo dõi hoạt động của bàn.

#### `Guest`

Khách trong Seatly là **guest vãng lai**, không cần đăng ký tài khoản đầy đủ.

Mỗi `Guest`:

- gắn với một `RestaurantTable` qua `tableNumber`
- có tên hiển thị
- có `refreshToken` tạm thời để quay lại phiên nếu cần

Ngoài ra có thêm các cột mới:

- `sessionStatus` **(cột thêm mới)**
- `lastActivityAt` **(cột thêm mới)**
- `expiresAt` **(cột thêm mới)**
- `endedAt` **(cột thêm mới)**

Các cột này được thêm để hỗ trợ **Auto session timeout**.

### Nhóm 3: Menu, snapshot và order

#### `Dish`

Đây là bảng lưu menu hiện tại của quán.

Ngoài các cột gốc, bảng có thêm:

- `isOutOfStock` **(cột thêm mới)**
- `stockUpdatedAt` **(cột thêm mới)**
- `estimatedPrepMinutes` **(cột thêm mới)**

Các cột này phục vụ:

- **Out-of-stock indicator**
- **Estimated Cooking Time (ETA)**

#### `DishSnapshot`

Bảng này dùng để lưu snapshot của món tại thời điểm khách order.

Điểm quan trọng là nếu sau này món bị đổi giá, đổi tên, đổi ảnh hoặc đổi trạng thái trong menu thì order cũ vẫn giữ nguyên thông tin lịch sử.

#### `Order`

Bảng `Order` lưu từng line item món được đặt.

Mỗi record đại diện cho:

- guest nào đặt
- bàn nào
- dùng snapshot món nào
- số lượng bao nhiêu
- staff nào xử lý
- trạng thái hiện tại

Ngoài ra, bảng có thêm:

- `orderBatchId` **(cột thêm mới)**
- `estimatedReadyAt` **(cột thêm mới)**

Các cột này hỗ trợ:

- nhóm nhiều line item theo một lần đặt
- ETA theo từng line item
- quick reorder
- history theo batch

### Nhóm 4: Bảng mới phục vụ tính năng nâng cấp

#### `OrderBatch` **(bảng thêm mới)**

Bảng này dùng để gom nhiều dòng `Order` thành một lần submit hoặc một lần quick reorder.

Lợi ích:

- dễ hiển thị lịch sử theo đợt gọi món
- hỗ trợ quick reorder
- hỗ trợ logic gộp món giống nhau

#### `OrderStatusLog` **(bảng thêm mới)**

Bảng này lưu lịch sử thay đổi trạng thái của order.

Lợi ích:

- timeline theo dõi đơn
- truy vết thao tác
- hiển thị history rõ ràng

#### `TableRequest` **(bảng thêm mới)**

Bảng này dùng để lưu yêu cầu từ bàn như:

- CallStaff
- NeedSupport
- RequestBill
- Other

Lợi ích:

- làm cho Seatly không chỉ là QR menu tĩnh
- hỗ trợ tương tác phục vụ tại bàn thực sự

## 3. Điều chỉnh so với tài liệu cũ và lợi ích

### Loại bỏ các giả định cũ không còn đúng

Các tài liệu cũ từng mô tả theo hướng:

- có `restaurants`
- có `dining_sessions`
- có multi-restaurant
- có session trung gian kiểu nhà hàng đầy đủ

Những giả định này **không còn đúng** với source of truth hiện tại.

### Logic mới đúng với schema hiện tại

Schema hiện tại của Seatly phải được hiểu theo trục chính:

- `RestaurantTable`
- `Guest`
- `Order`
- `DishSnapshot`

Đây là 4 thành phần lõi phản ánh trực tiếp nghiệp vụ hiện tại.

## 4. Lộ trình triển khai theo giai đoạn

### Giai đoạn Core / MVP

Ở giai đoạn đầu, hệ thống chỉ cần tập trung vào:

- đăng nhập staff
- quản lý bàn
- quản lý menu
- quét QR vào bàn
- tạo guest session
- đặt món
- cập nhật trạng thái order
- theo dõi order realtime
- thanh toán đơn giản

### Giai đoạn mở rộng sau

Sau khi phần core ổn định, có thể mở rộng thêm:

- call staff
- out-of-stock indicator
- ETA
- order timeline/history
- quick reorder
- auto occupancy
- auto session timeout

Những phần này đã được chuẩn bị trong schema bằng **cột thêm mới** và **3 bảng mới tối thiểu**, nhưng **chưa phải trọng tâm triển khai ngay**.

## 5. Kết luận

Schema hiện tại của **Seatly** cần được hiểu là:

- một schema tối ưu cho **web app phục vụ tại bàn bằng QR code**
- giữ nguyên **8 bảng gốc** làm nền
- mở rộng nhẹ bằng một số cột và bảng mới tối thiểu
- không quay lại hướng schema cũ có `dining_sessions`
- không mở rộng sang enterprise modules trong giai đoạn hiện tại

Phần quan trọng nhất cần nhớ khi trình bày là:

- `Guest` đại diện cho guest session tạm thời tại bàn
- `Order` là line item
- `DishSnapshot` giữ lịch sử món tại thời điểm order
- `RestaurantTable.token` là điểm vào của QR flow
- các bảng/cột mới chỉ nhằm **chuẩn bị cho giai đoạn nâng cấp sau**, không thay đổi ưu tiên hiện tại là hoàn thiện **core features**
