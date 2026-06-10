# Phân tích Dự án Seatly

## Tầm quan trọng của việc phân tích dự án

Phân tích dự án là bước rất quan trọng vì nó giúp cả nhóm hiểu rõ bài toán thực sự cần giải quyết, phạm vi hệ thống và hướng triển khai phù hợp.

Đối với dự án **Seatly**, việc phân tích càng quan trọng vì nhóm đã chốt rõ định hướng: tập trung vào **số hóa quy trình phục vụ tại bàn bằng QR code**, thay vì xây dựng một hệ thống quản lý nhà hàng quá rộng hoặc quá phức tạp.

## Các vai trò trong quá trình phân tích và phát triển

| Vai trò                         | Trách nhiệm chính                                                                                     |
| ------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Business Analyst (BA)**       | Phân tích bài toán, làm rõ yêu cầu nghiệp vụ, xác định phạm vi hệ thống và chuẩn hóa tài liệu yêu cầu |
| **Designer**                    | Thiết kế UI/UX dựa trên luồng nghiệp vụ và tài liệu phân tích                                         |
| **Backend / Database Designer** | Thiết kế cơ sở dữ liệu, mô hình hóa thực thể và quan hệ giữa các thành phần                           |
| **Backend Developer**           | Xây dựng API, xử lý logic nghiệp vụ, xác thực người dùng, quản lý order và realtime                   |
| **Frontend Developer**          | Xây dựng giao diện cho khách và nhân viên, kết nối API, hiển thị dữ liệu và trạng thái realtime       |
| **Tester / QA**                 | Kiểm thử chức năng, luồng nghiệp vụ và đảm bảo hệ thống hoạt động đúng yêu cầu                        |

## Chức năng chính của dự án

Dự án **Seatly** tập trung vào 3 nhóm người dùng chính: **Owner, Employee và Guest**.

### 1. Owner

- Quản lý tài khoản cá nhân.
- Quản lý nhân viên thông qua `Account`.
- Quản lý danh sách bàn và mã QR của từng bàn qua `RestaurantTable`.
- Quản lý thực đơn: thêm, sửa, ẩn món, cập nhật trạng thái còn món / hết món.
- Theo dõi tình hình vận hành cơ bản.

### 2. Nhân viên

- Đăng nhập và quản lý thông tin tài khoản cá nhân.
- Nhận và xử lý order do khách gửi từ QR menu.
- Cập nhật trạng thái món theo tiến trình xử lý theo schema hiện tại, ví dụ: `Pending → Processing → Delivered → Paid` hoặc `Rejected`.
- Nhận các yêu cầu hỗ trợ từ bàn như **Call Staff** hoặc **Request Bill** nếu tính năng mở rộng được bật.
- Hỗ trợ theo dõi bàn nào đang có khách, bàn nào đang trống.
- Hỗ trợ thanh toán.

### 3. Khách hàng

- Quét mã QR tại bàn để truy cập đúng menu của bàn đó.
- Nhập tên để tạo guest session tạm thời mà không cần tạo tài khoản phức tạp.
- Xem menu trực quan trên điện thoại.
- Chọn món, nhập số lượng và gửi order.
- Theo dõi trạng thái món theo thời gian thực.
- Gửi yêu cầu hỗ trợ tới nhân viên.
- Xem lại các món đã gọi trong guest session hiện tại.

## Nghiệp vụ cốt lõi của Seatly

Khách ngồi vào bàn và quét mã QR của bàn đó. Hệ thống xác định đúng `RestaurantTable` qua `token`, sau đó tạo hoặc cho phép sử dụng một `Guest` session tạm thời gắn với `tableNumber`. Khách nhập tên, xem menu, chọn món và gửi order. Mỗi món được đặt sẽ được lưu thành một **line item** riêng trong bảng `Order`.

Nhân viên nhận order, xử lý và cập nhật trạng thái món. Trong suốt quá trình phục vụ, khách có thể tiếp tục gọi thêm món, theo dõi tiến độ xử lý hoặc gửi yêu cầu hỗ trợ như gọi nhân viên hay yêu cầu thanh toán.

Đây là phần nghiệp vụ trung tâm của hệ thống và cũng là phần quan trọng nhất cần bám sát khi thiết kế database, use case, giao diện và báo cáo.

## Giao diện người dùng (UI)

Hệ thống Seatly dự kiến bao gồm các màn hình chính sau:

- **Trang quản lý:** dành cho Owner/Nhân viên để quản lý bàn, menu, order và yêu cầu hỗ trợ từ khách.
- **QR Guest Menu:** giao diện dành cho khách sau khi quét QR, hiển thị menu đơn giản trên điện thoại.
- **Trang vào bàn / nhập tên:** màn hình yêu cầu khách nhập tên để bắt đầu guest session tạm thời.
- **Trang đặt món:** giao diện cho khách chọn món, chỉnh số lượng và gửi order.
- **Trang theo dõi đơn hàng:** hiển thị trạng thái các món đã gọi theo thời gian thực.
- **Màn hình xử lý order cho nhân viên:** hiển thị danh sách order theo bàn hoặc theo thời gian.
- **Màn hình yêu cầu hỗ trợ tại bàn:** hiển thị các request như gọi nhân viên hoặc yêu cầu thanh toán nếu triển khai tính năng mở rộng.
- **Màn hình thanh toán:** cho phép xem danh sách món đã gọi, tổng tiền và hoàn tất thanh toán đơn giản.

## Ghi chú định hướng

Tài liệu này đã được cập nhật theo schema hiện tại của **Seatly**.

- **Không còn dùng** `restaurants`
- **Không còn dùng** `dining_sessions`
- **Không quay lại** hướng multi-restaurant
- **Source of truth hiện tại** là 8 bảng gốc: `Account`, `Dish`, `DishSnapshot`, `RestaurantTable`, `Order`, `RefreshToken`, `Guest`, `Socket`
- Ngoài ra có thể bổ sung **một số cột mới** và **3 bảng mới tối thiểu** cho các tính năng nâng cấp về sau: `OrderBatch`, `OrderStatusLog`, `TableRequest`

Tuy nhiên, ưu tiên hiện tại vẫn là hoàn thiện **phần core** trước, sau đó mới triển khai các phần mở rộng này.
