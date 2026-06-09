# Phân tích Chi tiết Tính năng Core: Đặt món qua QR Code

## Tầm quan trọng

Tính năng **đặt món qua QR Code tại bàn** là **chức năng cốt lõi nhất** của dự án **Seatly**.

Đây là tính năng tạo ra giá trị khác biệt chính của hệ thống: thay vì khách phải chờ nhân viên mang menu giấy, ghi món rồi chuyển đơn thủ công, khách chỉ cần quét QR tại bàn để xem menu, gọi món và theo dõi trạng thái xử lý ngay trên điện thoại.

## Mục tiêu của tính năng

Tính năng này được xây dựng để giải quyết các nhu cầu chính sau:

- Khách có thể **truy cập đúng menu của bàn đang ngồi**
- Khách có thể **vào bàn mà không cần tạo tài khoản phức tạp**
- Khách có thể **tự chọn món và gửi order**
- Nhân viên có thể **nhận và xử lý order nhanh hơn**
- Cả khách và nhân viên có thể **theo dõi trạng thái món theo thời gian thực**
- Hệ thống có thể **lưu đúng dữ liệu lịch sử của món tại thời điểm order**

## Luồng hoạt động của tính năng

Tính năng này có thể mô tả qua 6 bước chính.

### Bước 1: Khách quét mã QR tại bàn

Mỗi bàn trong quán có một mã QR riêng. Khi khách dùng điện thoại quét mã này, hệ thống nhận được `token` tương ứng với bàn.

Ví dụ, QR có thể dẫn tới một URL như:

`https://seatly.app/menu?token=abc123`

Hệ thống dùng `RestaurantTable.token` để tra cứu và xác định:

- khách đang ngồi ở bàn nào
- bàn đó có hợp lệ hay không
- bàn có đang được phép phục vụ hay không

### Bước 2: Tạo guest session tạm thời

Sau khi xác định được bàn, hệ thống tạo hoặc ghi nhận một `Guest` session tạm thời cho người dùng hiện tại.

Khác với hướng cũ, schema hiện tại **không dùng `dining_sessions`**.
Thay vào đó, thông tin liên kết chính nằm ở:

- `Guest.tableNumber`
- `Order.tableNumber`
- `Order.guestId`

Nếu triển khai mở rộng về sau, session timeout có thể được hỗ trợ bằng:

- `Guest.sessionStatus` **(cột thêm mới)**
- `Guest.lastActivityAt` **(cột thêm mới)**
- `Guest.expiresAt` **(cột thêm mới)**
- `Guest.endedAt` **(cột thêm mới)**

Nhưng cần nhấn mạnh rằng các cột này là để chuẩn bị cho **phase nâng cấp**, còn ưu tiên hiện tại vẫn là làm tốt luồng core trước.

### Bước 3: Khách nhập tên để vào bàn

Khách không cần đăng ký tài khoản kiểu email/password.

Thay vào đó, hệ thống chỉ yêu cầu nhập một tên hiển thị ngắn, ví dụ:

- Anh Nam
- Bàn mình
- Khách 1

Sau đó hệ thống tạo một bản ghi trong bảng `Guest`, gắn với `tableNumber` tương ứng.

Ngoài ra, hệ thống có thể sinh một `refreshToken` tạm thời để:

- ghi nhớ khách trên thiết bị hiện tại
- hỗ trợ quay lại giao diện nếu khách reload trang
- duy trì trải nghiệm đơn giản mà không cần đăng nhập đầy đủ

### Bước 4: Khách xem menu và chọn món

Sau khi vào bàn, khách sẽ thấy menu lấy từ bảng `Dish`.

Thông tin hiển thị thường gồm:

- tên món
- ảnh món
- giá hiện tại
- mô tả ngắn
- trạng thái còn món / hết món
- ETA dự kiến nếu có

Các phần mở rộng tương lai đã được chuẩn bị trong `Dish`:

- `isOutOfStock` **(cột thêm mới)**
- `stockUpdatedAt` **(cột thêm mới)**
- `estimatedPrepMinutes` **(cột thêm mới)**

Các cột này phục vụ:

- **Out-of-stock indicator**
- **Estimated Cooking Time (ETA)**

Nhưng ở giai đoạn hiện tại, nhóm vẫn nên ưu tiên trước việc hiển thị menu và đặt món ổn định.

### Bước 5: Khách đặt món và hệ thống tạo order

Khi khách nhấn nút **Đặt món**, hệ thống cần thực hiện 2 việc chính.

#### 5.1. Tạo dish snapshot

Trước tiên, hệ thống tạo một bản ghi mới trong `DishSnapshot`.

**Snapshot** là bản chụp thông tin món tại đúng thời điểm khách đặt, gồm các dữ liệu như:

- tên món
- giá tại lúc đặt
- mô tả
- ảnh món
- trạng thái món

Lý do phải dùng snapshot là để giữ đúng dữ liệu lịch sử.

#### 5.2. Tạo order line item

Sau khi có snapshot, hệ thống tạo bản ghi trong `Order`.

Thông tin chính của order gồm:

- `guestId`
- `tableNumber`
- `dishSnapshotId`
- `quantity`
- `status = 'Pending'`

Nếu có nhân viên xử lý, hệ thống cập nhật thêm `orderHandlerId`.

Ở mức mở rộng sau này, `Order` còn có thêm:

- `orderBatchId` **(cột thêm mới)**
- `estimatedReadyAt` **(cột thêm mới)**

Các cột này hỗ trợ:

- nhóm các line item theo cùng một lần submit
- quick reorder
- history theo batch
- ETA chi tiết hơn

### Bước 6: Theo dõi trạng thái món theo thời gian thực

Sau khi order được tạo, khách có thể theo dõi trạng thái món gần như realtime.

Theo schema hiện tại, luồng trạng thái cơ bản là:

- `Pending`
- `Processing`
- `Rejected`
- `Delivered`
- `Paid`

Nếu nhóm muốn nâng cấp phần history/timeline sau này, có thể dùng thêm bảng:

- `OrderStatusLog` **(bảng thêm mới)**

Bảng này giúp lưu các lần đổi trạng thái để hiển thị timeline rõ hơn.

## Vai trò của các bảng chính

| Bảng              | Vai trò                                                                        |
| ----------------- | ------------------------------------------------------------------------------ |
| `RestaurantTable` | Lưu thông tin bàn và `token`, dùng để xác định bàn khi quét QR                 |
| `Guest`           | Lưu guest session tạm thời của khách tại bàn                                   |
| `Dish`            | Lưu menu hiện tại                                                              |
| `DishSnapshot`    | Lưu snapshot thông tin món tại thời điểm order                                 |
| `Order`           | Lưu từng line item món khách đã đặt                                            |
| `Socket`          | Hỗ trợ quản lý kết nối realtime                                                |
| `OrderStatusLog`  | Lưu lịch sử thay đổi trạng thái order **(bảng thêm mới cho phase sau)**        |
| `TableRequest`    | Hỗ trợ Call Staff / Request Bill **(bảng thêm mới cho phase sau)**             |
| `OrderBatch`      | Gom nhóm order theo một lần submit / reorder **(bảng thêm mới cho phase sau)** |

## Lợi ích của tính năng

### Đối với khách hàng

Khách có trải nghiệm chủ động hơn trong quá trình gọi món. Họ không cần đợi nhân viên mang menu, không cần gọi nhân viên để ghi món ngay từ đầu, và cũng có thể theo dõi món của mình đang ở trạng thái nào.

### Đối với quán

Với quán ăn / quán nước nhỏ đến vừa, tính năng này giúp giảm tải đáng kể cho nhân viên, hạn chế sai sót khi ghi món thủ công, đồng thời toàn bộ dữ liệu được đưa vào hệ thống ngay từ đầu nên dễ theo dõi và dễ quản lý hơn.

## Lưu ý quan trọng khi triển khai

### 1. Bảo mật QR token

`RestaurantTable.token` phải là chuỗi đủ ngẫu nhiên, duy nhất và khó đoán.

### 2. Quản lý guest session chặt chẽ

Đây là phần rất quan trọng.

Khi khách không còn hoạt động hoặc sau khi thanh toán xong, hệ thống cần có cách kết thúc hoặc hết hạn guest session hợp lý để tránh dùng nhầm dữ liệu cũ. Việc này về sau có thể hỗ trợ bằng các cột timeout trong `Guest` và `RestaurantTable`.

### 3. Snapshot pattern là bắt buộc

Mỗi lần khách đặt món, hệ thống nên tạo **snapshot mới** để giữ nguyên lịch sử dữ liệu.

### 4. Hỗ trợ nhiều khách cùng một bàn

Hệ thống nên cho phép nhiều guest cùng tham gia tại một `RestaurantTable`.

### 5. Realtime là phần tạo khác biệt

Nếu có thể triển khai ở mức vừa phải, nên ưu tiên ít nhất các realtime event sau:

- có order mới
- đổi trạng thái order
- có request gọi nhân viên mới
- cập nhật trạng thái bàn khi cần

## Kết luận

Tính năng **Đặt món qua QR Code** là trung tâm của toàn bộ hệ thống **Seatly**.

Đây không chỉ là tính năng xem menu rồi gửi order, mà là một luồng nghiệp vụ hoàn chỉnh gồm:

- xác định đúng bàn qua QR
- ghi nhận guest session tạm thời
- xem menu
- tạo order line item
- lưu snapshot dữ liệu món
- cập nhật trạng thái realtime

Nếu trình bày trong báo cáo hoặc bảo vệ, nên nhấn mạnh 4 ý này:

- **QR code** giúp gắn khách với đúng bàn
- **Guest session** giúp quản lý khách tạm thời tại bàn
- **DishSnapshot** giúp giữ đúng lịch sử món tại thời điểm order
- **Realtime tracking** giúp nâng trải nghiệm phục vụ tại bàn

Ngoài ra, cần nói rõ rằng các bảng/cột mới như `OrderBatch`, `OrderStatusLog`, `TableRequest` và các cột mở rộng trong `Dish`, `Guest`, `RestaurantTable`, `Order` là phần **chuẩn bị cho nâng cấp tương lai**, còn **ưu tiên hiện tại vẫn là hoàn thiện các tính năng cốt lõi trước**.
