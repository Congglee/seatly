# Phân tích Mối quan hệ giữa các Bảng (Database Schema)

## Tầm quan trọng của mối quan hệ giữa các bảng

Mối quan hệ giữa các bảng là phần xương sống của database schema. Với **Seatly**, phần này đặc biệt quan trọng vì hệ thống phải phản ánh đúng luồng phục vụ tại bàn:

**bàn → guest session → món → order → trạng thái → thanh toán**

## Các loại mối quan hệ cơ bản

| Loại quan hệ          | Mô tả                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------- |
| **Một-một (1-1)**     | Một bản ghi ở bảng A gắn với duy nhất một bản ghi ở bảng B                             |
| **Một-nhiều (1-N)**   | Một bản ghi ở bảng A có thể liên kết với nhiều bản ghi ở bảng B                        |
| **Nhiều-nhiều (N-N)** | Nhiều bản ghi ở bảng A liên kết với nhiều bản ghi ở bảng B, thường cần bảng trung gian |

Trong schema hiện tại của **Seatly**, phần lớn quan hệ là **1-N**.

## Mối quan hệ giữa các bảng trong schema Seatly

## 1. Nhóm tài khoản nội bộ

| Quan hệ                      | Loại | Khóa ngoại                          | Mô tả                                                                 |
| ---------------------------- | ---- | ----------------------------------- | --------------------------------------------------------------------- |
| `Account` ↔ `Account`        | 1-N  | `Account.ownerId`                   | Một owner có thể liên kết với nhiều account cấp dưới                  |
| `Account` ↔ `RefreshToken`   | 1-N  | `RefreshToken.accountId`            | Một tài khoản có thể có nhiều refresh token                           |
| `Account` ↔ `Socket`         | 1-N  | `Socket.accountId`                  | Một tài khoản có thể có nhiều kết nối realtime                        |
| `Account` ↔ `Order`          | 1-N  | `Order.orderHandlerId`              | Một nhân viên có thể xử lý nhiều order                                |
| `Account` ↔ `OrderStatusLog` | 1-N  | `OrderStatusLog.changedByAccountId` | Một tài khoản có thể tạo nhiều log đổi trạng thái **(bảng thêm mới)** |
| `Account` ↔ `TableRequest`   | 1-N  | `TableRequest.handlerId`            | Một nhân viên có thể xử lý nhiều request từ bàn **(bảng thêm mới)**   |

## 2. Nhóm bàn và guest session

| Quan hệ                            | Loại | Khóa ngoại                 | Mô tả                                                      |
| ---------------------------------- | ---- | -------------------------- | ---------------------------------------------------------- |
| `RestaurantTable` ↔ `Guest`        | 1-N  | `Guest.tableNumber`        | Một bàn có thể có nhiều guest theo thời gian               |
| `RestaurantTable` ↔ `Order`        | 1-N  | `Order.tableNumber`        | Một bàn có thể có nhiều order                              |
| `RestaurantTable` ↔ `OrderBatch`   | 1-N  | `OrderBatch.tableNumber`   | Một bàn có thể có nhiều batch order **(bảng thêm mới)**    |
| `RestaurantTable` ↔ `TableRequest` | 1-N  | `TableRequest.tableNumber` | Một bàn có thể có nhiều request hỗ trợ **(bảng thêm mới)** |
| `Guest` ↔ `Socket`                 | 1-N  | `Socket.guestId`           | Một guest có thể có nhiều kết nối realtime                 |
| `Guest` ↔ `OrderBatch`             | 1-N  | `OrderBatch.guestId`       | Một guest có thể có nhiều batch order **(bảng thêm mới)**  |
| `Guest` ↔ `TableRequest`           | 1-N  | `TableRequest.guestId`     | Một guest có thể gửi nhiều request **(bảng thêm mới)**     |

### Giải thích nhanh

Đây là nhóm quan hệ rất quan trọng của Seatly.

- `RestaurantTable` đại diện cho **bàn vật lý**
- `Guest` đại diện cho **guest session tạm thời**
- `Order` đại diện cho **line item mà guest đã đặt**

Điểm quan trọng cần nhớ là:
**schema hiện tại không dùng `dining_sessions`**.  
Logic hiện tại quản lý theo `RestaurantTable + Guest + Order`.

## 3. Nhóm menu, snapshot và order

| Quan hệ                     | Loại                                    | Khóa ngoại                    | Mô tả                                                                     |
| --------------------------- | --------------------------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| `Dish` ↔ `DishSnapshot`     | 1-N                                     | `DishSnapshot.dishId`         | Một món có thể tạo ra nhiều snapshot ở nhiều lần order                    |
| `Guest` ↔ `Order`           | 1-N                                     | `Order.guestId`               | Một guest có thể đặt nhiều món                                            |
| `DishSnapshot` ↔ `Order`    | 1-N hoặc gần 1-1 theo cách tạo snapshot | `Order.dishSnapshotId`        | Mỗi order gắn với một snapshot; thường tạo snapshot mới cho mỗi lần order |
| `Order` ↔ `OrderStatusLog`  | 1-N                                     | `OrderStatusLog.orderId`      | Một order có nhiều lần thay đổi trạng thái **(bảng thêm mới)**            |
| `OrderBatch` ↔ `Order`      | 1-N                                     | `Order.orderBatchId`          | Một batch có thể chứa nhiều line item **(bảng thêm mới + cột thêm mới)**  |
| `OrderBatch` ↔ `OrderBatch` | 1-N                                     | `OrderBatch.cloneFromBatchId` | Một batch reorder có thể clone từ batch cũ **(bảng thêm mới)**            |

### Giải thích nhanh

Đây là phần lõi giao dịch của hệ thống.

#### `Dish` ↔ `DishSnapshot`

Một món trong menu có thể được khách đặt nhiều lần ở nhiều thời điểm khác nhau. Mỗi lần đặt, hệ thống có thể tạo một snapshot mới để lưu lại thông tin món tại thời điểm đó.

#### `Order` là line item

Mỗi record trong `Order` là **một line item**, tức là một dòng món.

Ví dụ:

- 2 ly trà sữa → 1 line item
- 1 phần bánh ngọt → 1 line item khác

Thiết kế này giúp staff dễ đổi trạng thái từng món, dễ hiển thị realtime và dễ merge logic ở tầng nghiệp vụ.

## 4. Nhóm tương tác tại bàn

| Quan hệ                            | Loại | Khóa ngoại                 | Mô tả                                                        |
| ---------------------------------- | ---- | -------------------------- | ------------------------------------------------------------ |
| `Guest` ↔ `TableRequest`           | 1-N  | `TableRequest.guestId`     | Một guest có thể gửi nhiều request **(bảng thêm mới)**       |
| `RestaurantTable` ↔ `TableRequest` | 1-N  | `TableRequest.tableNumber` | Một bàn có nhiều request hỗ trợ **(bảng thêm mới)**          |
| `Account` ↔ `TableRequest`         | 1-N  | `TableRequest.handlerId`   | Một nhân viên có thể xử lý nhiều request **(bảng thêm mới)** |

### Giải thích nhanh

`TableRequest` là phần làm cho Seatly khác với một **QR menu tĩnh**.

Khách không chỉ xem menu và đặt món, mà còn có thể gửi yêu cầu như:

- gọi nhân viên
- yêu cầu hỗ trợ
- yêu cầu thanh toán

## Sơ đồ luồng dữ liệu chính

Đây là luồng nghiệp vụ cốt lõi của Seatly:

### Bước 1: Khách quét QR

Khách quét QR tại bàn. Hệ thống dùng `RestaurantTable.token` để tìm đúng bản ghi bàn.

### Bước 2: Tạo hoặc ghi nhận guest session

Sau khi xác định được bàn, hệ thống tạo hoặc dùng một `Guest` session tạm thời đang còn hiệu lực cho trải nghiệm hiện tại.

### Bước 3: Khách tham gia vào bàn

Khách nhập tên. Hệ thống tạo bản ghi `Guest` gắn với `tableNumber`.

### Bước 4: Khách chọn món

Khách xem menu từ `Dish`, chọn món và nhập số lượng.

### Bước 5: Hệ thống tạo snapshot và order

Mỗi lần khách đặt món:

- tạo `DishSnapshot` mới
- tạo `Order` mới gắn với:
  - `guestId`
  - `tableNumber`
  - `dishSnapshotId`

Nếu triển khai mở rộng về sau, hệ thống có thể tạo thêm `OrderBatch`.

### Bước 6: Nhân viên xử lý

Nhân viên nhận order và cập nhật trạng thái trong `Order`. Nếu có mở rộng history/timeline, mỗi lần đổi trạng thái có thể tạo thêm bản ghi trong `OrderStatusLog`.

### Bước 7: Khách gửi request nếu cần

Trong lúc chờ món, khách có thể tạo `TableRequest`, ví dụ gọi nhân viên hoặc yêu cầu thanh toán.

### Bước 8: Kết thúc luồng phục vụ

Khi thanh toán xong và không còn hoạt động, hệ thống có thể đánh dấu kết thúc guest session hoặc để session tự hết hạn theo logic timeout trong `Guest`.

## Lưu ý quan trọng khi thiết kế

### 1. Schema hiện tại dùng `tableNumber` làm khóa ngoại

Khác với nhiều schema khác dùng `table_id`, schema hiện tại của Seatly dùng:

- `RestaurantTable.number` làm khóa chính
- `Guest.tableNumber`
- `Order.tableNumber`

Vì vậy khi hỗ trợ dự án, phải bám đúng source of truth này, không tự đổi sang `table_id`.

### 2. Không quay lại `dining_sessions` 🔥

Đây là điểm rất quan trọng.

Schema hiện tại **không có** `dining_sessions`. Nếu tài liệu cũ hoặc phân tích cũ có nhắc tới bảng này thì cần hiểu đó là hướng cũ, không còn là source of truth hiện tại.

### 3. Snapshot pattern vẫn là điểm mạnh 🔥

Việc dùng `DishSnapshot` là một quyết định thiết kế tốt vì nó bảo vệ dữ liệu lịch sử khi món đổi giá, đổi tên, đổi ảnh hoặc đổi trạng thái.

### 4. `TableRequest` và `OrderStatusLog` là phần mở rộng hợp lý

Nếu chỉ có bàn, menu và order thì hệ thống mới chỉ dừng ở mức gọi món cơ bản.

Khi thêm:

- `OrderStatusLog`
- `TableRequest`
- `OrderBatch`

schema trở nên sát hơn với trải nghiệm phục vụ tại bàn thực tế. Tuy nhiên, đây vẫn là **phase sau**, không phải trọng tâm triển khai trước core features.

## Kết luận

Nếu cần nhớ nhanh mối quan hệ giữa các bảng trong **Seatly**, bạn có thể hình dung như sau:

- `RestaurantTable` là bàn vật lý có QR
- `Guest` là guest session tạm thời tại bàn
- `Dish` là món trong menu hiện tại
- `DishSnapshot` là bản chụp món khi khách đặt
- `Order` là một line item món
- `OrderStatusLog` là lịch sử đổi trạng thái món **(bảng thêm mới)**
- `TableRequest` là yêu cầu hỗ trợ phát sinh tại bàn **(bảng thêm mới)**
- `OrderBatch` nhóm nhiều order theo một lần submit **(bảng thêm mới)**
- `Socket` hỗ trợ realtime cho khách và staff

Nói ngắn gọn, quan hệ trung tâm nhất của schema là:

**RestaurantTable → Guest / Order / TableRequest**

và trong phần order thì:

**Dish → DishSnapshot → Order**
