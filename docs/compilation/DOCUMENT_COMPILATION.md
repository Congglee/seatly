# TỔNG HỢP TÀI LIỆU (UPDATED TO CURRENT SEATLY SCHEMA)

> **Trạng thái tài liệu:** Đã cập nhật đồng bộ theo **database schema mới nhất** của dự án **Seatly**.  
> **Source of truth hiện tại:** schema legacy **8 bảng gốc** + **các cột mở rộng** + **3 bảng bổ trợ mới** phục vụ tính năng nâng cấp trong tương lai.  
> **Ưu tiên triển khai:** hoàn thiện **các tính năng cốt lõi trước** (QR menu, guest ordering, order processing, realtime tracking, table management, simple payment), sau đó mới triển khai các tính năng mở rộng như auto occupancy, call staff, order history/timeline, quick reorder, ETA nâng cao, auto session timeout.

## Danh sách tài liệu

- 1. PROJECT_BRIEF.md
- 2. PROJECT_ANALYSIS.md
- 3. DATABASE_SCHEMA_OVERVIEW_OF_MAIN_TABLES.md
- 4. DIRECTION_AND_SCOPE_OF_THE_DATABASE_SCHEMA.md
- 5. DATABASE_SCHEMA_RESTAURANT_MANAGEMENT_SYSTEM_OPTIMIZED.md
- 6. ANALYSIS_OF_RELATIONSHIPS_BETWEEN_TABLES_DATABASE_SCHEMA.md
- 7. DETAILED_ANALYSIS_OF_CORE_FEATURE_ORDER_VIA_QR_CODE.md

---

## 1. PROJECT_BRIEF.md

```md
# PROJECT BRIEF

## Dự án: **Seatly**

## 1. Tổng quan dự án

**Seatly** là một web application hỗ trợ số hóa quy trình phục vụ tại bàn cho **quán ăn, quán nước nhỏ đến vừa** thông qua cơ chế **QR menu**, gọi món trực tiếp trên điện thoại, theo dõi trạng thái món theo thời gian thực và hỗ trợ quản lý vận hành cơ bản cho chủ quán và nhân viên.

Dự án được định hướng như một giải pháp **nhẹ, dễ dùng, chi phí hợp lý**, tập trung giải quyết các vấn đề vận hành phổ biến tại các mô hình kinh doanh phục vụ tại bàn như quán cà phê, quán trà sữa, quán ăn vặt, quán ăn gia đình hoặc quán nước quy mô nhỏ đến vừa. Seatly không đi theo hướng một hệ thống FnB/POS/ERP đầy đủ, mà ưu tiên tính đơn giản, dễ triển khai và phù hợp với nhu cầu thực tế của nhóm khách hàng mục tiêu.

## 2. Bối cảnh và vấn đề đặt ra

Nhiều quán ăn, quán nước nhỏ và vừa hiện vẫn vận hành theo phương thức thủ công hoặc bán thủ công. Khách hàng thường phải chờ nhân viên mang menu, gọi món trực tiếp tại bàn, trong khi nhân viên phải ghi nhớ hoặc ghi tay order, dễ dẫn đến nhầm món, nhầm số lượng, sót bàn hoặc chậm phục vụ. Đồng thời, chủ quán cũng gặp khó khăn trong việc nắm bắt tình trạng bàn, theo dõi order đang chờ xử lý và kiểm soát hiệu quả vận hành trong giờ cao điểm.

Trong khi đó, các hệ thống quản lý lớn trên thị trường thường được xây dựng theo hướng **FnB suite** hoặc **POS ecosystem** khá toàn diện, nhưng thường phức tạp, chi phí cao và có nhiều module vượt quá nhu cầu thực tế của quán nhỏ. Vì vậy, Seatly được xây dựng để trở thành một giải pháp vừa đủ, tập trung vào nghiệp vụ cốt lõi tại bàn, dễ tiếp cận và phù hợp hơn với nhóm khách hàng mục tiêu.

## 3. Mục tiêu dự án

Mục tiêu chính của Seatly là xây dựng một hệ thống hỗ trợ quán ăn, quán nước nhỏ đến vừa số hóa quy trình phục vụ tại bàn theo hướng đơn giản, rõ ràng và hiệu quả. Cụ thể, dự án hướng tới các mục tiêu sau:

- Giúp khách hàng xem menu và gọi món nhanh chóng bằng QR code tại bàn.
- Giảm tải cho nhân viên trong khâu nhận order và hỗ trợ phục vụ.
- Hạn chế sai sót trong quá trình gọi món, xử lý món và thanh toán.
- Hỗ trợ chủ quán theo dõi bàn, order và tình hình vận hành cơ bản.
- Tạo ra một nền tảng có thể phát triển tiếp trong tương lai nhưng vẫn đủ gọn để triển khai trong phạm vi dự án hiện tại.

## 4. Đối tượng người dùng

Seatly phục vụ ba nhóm người dùng chính.

### 4.1. Khách hàng tại bàn

Là người trực tiếp quét QR để xem menu, chọn món, gửi order, theo dõi trạng thái món và gửi yêu cầu hỗ trợ tới nhân viên. Nhóm người dùng này không cần đăng ký tài khoản chính thức.

### 4.2. Nhân viên quán

Là người tiếp nhận và xử lý order, theo dõi trạng thái món, phản hồi yêu cầu từ bàn, hỗ trợ thanh toán và đảm bảo quá trình phục vụ diễn ra liên tục, chính xác.

### 4.3. Chủ quán hoặc quản lý

Là người sử dụng hệ thống để quản lý menu, bàn, tài khoản nhân viên và theo dõi tình hình vận hành cơ bản của quán.

## 5. Khách hàng mục tiêu

Seatly hướng đến nhóm khách hàng mục tiêu là **các quán ăn, quán cà phê, quán trà sữa, quán nước và mô hình phục vụ tại bàn quy mô nhỏ đến vừa**, thường có một chi nhánh, số lượng bàn vừa phải và chưa có nhu cầu sử dụng các hệ thống quản trị lớn, phức tạp.

## 6. Phạm vi dự án

### 6.1. Phạm vi chức năng chính

Seatly tập trung vào các chức năng cốt lõi sau:

- Quản lý danh sách món ăn và trạng thái món.
- Quản lý bàn và QR code theo từng bàn.
- Hỗ trợ khách hàng gọi món trực tiếp bằng QR menu.
- Hỗ trợ nhân viên tiếp nhận và cập nhật trạng thái order.
- Theo dõi trạng thái món theo thời gian thực.
- Hỗ trợ khách hàng gọi nhân viên từ giao diện tại bàn.
- Hỗ trợ thanh toán đơn giản.
- Hỗ trợ quản lý guest session tạm thời tại bàn thông qua bảng `Guest`.
- Cung cấp giao diện quản lý cơ bản cho chủ quán.

### 6.2. Phạm vi không bao gồm ở giai đoạn hiện tại

Để đảm bảo dự án tập trung và khả thi, Seatly chưa ưu tiên các nhóm chức năng sau trong giai đoạn hiện tại:

- Quản lý kho nguyên vật liệu.
- Quản lý công thức hoặc định lượng món.
- Quản lý nhà cung cấp.
- Hệ thống CRM.
- Hệ thống ERP.
- Quản lý chuỗi nhiều chi nhánh.
- Tích hợp sâu với phần cứng chuyên dụng như máy POS, máy in bếp.
- Tích điểm, khách hàng thân thiết, marketing automation.
- Hệ sinh thái giao hàng đa kênh.

## 7. Mô tả nghiệp vụ cốt lõi

Nghiệp vụ trung tâm của Seatly xoay quanh quy trình phục vụ tại bàn.

Mỗi bàn trong quán được gắn với một mã QR riêng thông qua `RestaurantTable.token`. Khi khách hàng quét QR, hệ thống sẽ xác định đúng bàn tương ứng và mở ra giao diện menu cho bàn đó. Sau đó hệ thống tạo hoặc ghi nhận một **guest session tạm thời** thông qua bảng `Guest`, gắn với `tableNumber`.

Khách hàng có thể xem menu, chọn món, nhập số lượng và gửi order trực tiếp trên giao diện. Mỗi món được ghi nhận thành một dòng trong bảng `Order` để thuận tiện cho việc theo dõi trạng thái và mở rộng các nghiệp vụ sau này.

Ở phía nhân viên, hệ thống hiển thị các order mới phát sinh để nhân viên tiếp nhận và cập nhật trạng thái theo từng giai đoạn như `Pending`, `Processing`, `Rejected`, `Delivered`, `Paid`. Song song với đó, khách hàng có thể quan sát trạng thái món theo thời gian thực.

Khi cần hỗ trợ, khách hàng có thể sử dụng chức năng gọi nhân viên. Sau khi toàn bộ món đã được xử lý và thanh toán, bàn có thể được đưa về trạng thái sẵn sàng cho lượt khách tiếp theo.

## 8. Các tính năng chính của hệ thống

### 8.1. Tính năng dành cho khách hàng

Khách hàng có thể quét QR tại bàn để truy cập menu, xem thông tin món ăn, đặt món, theo dõi trạng thái order, xem lại các món đã gọi trong guest session hiện tại và gửi yêu cầu gọi nhân viên khi cần.

### 8.2. Tính năng dành cho nhân viên

Nhân viên có thể đăng nhập hệ thống, xem danh sách order theo trạng thái hoặc theo bàn, tiếp nhận order mới, cập nhật trạng thái món, nhận yêu cầu hỗ trợ từ bàn và hỗ trợ thanh toán.

### 8.3. Tính năng dành cho chủ quán hoặc quản lý

Chủ quán có thể quản lý món ăn, bàn, tài khoản nhân viên và theo dõi vận hành cơ bản như số bàn đang hoạt động, order theo trạng thái và các tín hiệu phục vụ tại bàn.

## 9. Giá trị mang lại

Đối với khách hàng, hệ thống giúp rút ngắn thời gian chờ, tăng tính chủ động khi gọi món và tạo trải nghiệm hiện đại, thuận tiện hơn. Đối với nhân viên, hệ thống giúp giảm tải công việc ghi nhận order thủ công, giảm sai sót và cải thiện khả năng phối hợp trong quá trình phục vụ. Đối với chủ quán, Seatly mang lại khả năng quan sát và kiểm soát vận hành tốt hơn.

Giá trị cốt lõi của Seatly không nằm ở việc cung cấp thật nhiều module, mà ở việc giải quyết tốt một quy trình rất cụ thể: **gọi món và phục vụ tại bàn một cách nhanh, rõ ràng và hiệu quả**.

## 10. Định vị cạnh tranh

Seatly không hướng tới cạnh tranh trực tiếp với các nền tảng quản lý lớn bằng số lượng tính năng. Thay vào đó, sản phẩm được định vị là một giải pháp **web app gọn nhẹ cho phục vụ tại bàn**, phù hợp với các quán nhỏ đến vừa đang cần một công cụ dễ dùng, ít rào cản triển khai và tập trung đúng nhu cầu thiết yếu.

## 11. Yêu cầu nghiệp vụ chính

Một số yêu cầu nghiệp vụ cần được đảm bảo xuyên suốt trong quá trình phát triển hệ thống gồm:

- Mỗi bàn phải có QR code riêng để tránh nhầm lẫn trong quá trình order.
- Mỗi guest session phải gắn đúng với một `RestaurantTable`.
- Mỗi món đặt cần được lưu thành một dòng `Order` riêng.
- Trạng thái order phải được quản lý rõ ràng theo luồng nghiệp vụ.
- Bàn phải phản ánh đúng trạng thái thực tế dựa trên dữ liệu `Guest`, `Order` và các cột trạng thái mở rộng của `RestaurantTable`.
- Khách hàng phải có thể sử dụng hệ thống mà không cần đăng ký tài khoản phức tạp.

## 12. Yêu cầu kỹ thuật định hướng

Seatly được định hướng triển khai theo mô hình web app theo kiến trúc client–server, trong đó giao diện người dùng, xử lý nghiệp vụ và dữ liệu được tách biệt rõ ràng. Hệ thống cần hỗ trợ tốt trên thiết bị di động cho phía khách hàng và trên trình duyệt web cho phía nhân viên, chủ quán.

Về kỹ thuật, hệ thống cần đảm bảo:

- Hỗ trợ quản lý dữ liệu bàn, món, khách, order và tài khoản nội bộ.
- Hỗ trợ cập nhật trạng thái gần thời gian thực.
- Hỗ trợ phân quyền theo vai trò tài khoản.
- Có cấu trúc dữ liệu đủ rõ để dễ mở rộng trong tương lai.
- Đảm bảo lưu trữ an toàn các thông tin nhạy cảm như mật khẩu và token.

## 13. Yêu cầu phi chức năng

Bên cạnh các chức năng nghiệp vụ, Seatly cần đáp ứng một số yêu cầu phi chức năng quan trọng: dễ sử dụng, phản hồi đủ nhanh, dữ liệu order đáng tin cậy, và cấu trúc đủ rõ để có thể bảo trì – mở rộng về sau.

## 14. Định hướng phát triển về sau

Sau khi hoàn thiện **các tính năng cốt lõi**, Seatly có thể mở rộng theo các hướng như:

- tự động phát hiện bàn đang có khách
- gọi nhân viên có trạng thái xử lý rõ ràng
- ETA nâng cao cho món
- timeline lịch sử order
- quick reorder
- auto session timeout
- báo cáo cơ bản nâng cao

Các phần này đã được chuẩn bị ở mức dữ liệu bằng **cột mở rộng** và **một số bảng bổ trợ mới**, nhưng **không phải ưu tiên triển khai trước phần lõi**.

## 15. Kết luận

Seatly là một web application tập trung vào bài toán số hóa quy trình phục vụ tại bàn cho quán ăn và quán nước nhỏ đến vừa. Dự án được định vị theo hướng tinh gọn, dễ sử dụng và bám sát nhu cầu thực tế thay vì chạy theo mô hình hệ thống quản lý tổng thể quá lớn. Với phạm vi được xác định rõ, nghiệp vụ cốt lõi mạch lạc và cấu trúc dữ liệu đủ chặt, Seatly là một hướng phát triển phù hợp cho bài tập lớn hiện tại.
```

---

## 2. PROJECT_ANALYSIS.md

```md
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
```

---

## 3. DATABASE_SCHEMA_OVERVIEW_OF_MAIN_TABLES.md

```md
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
```

---

## 4. DIRECTION_AND_SCOPE_OF_THE_DATABASE_SCHEMA.md

```md
# Định hướng và Phạm vi của Database Schema

Tài liệu này dùng để xác định rõ **database schema của Seatly đang phục vụ bài toán nào, phạm vi đến đâu, và chủ động không bao phủ những phần nào**.

## 1. Định hướng tổng thể của schema hiện tại

Database schema hiện tại của **Seatly** được thiết kế để phục vụ một mục tiêu rất cụ thể:

> **Hỗ trợ số hóa quy trình phục vụ tại bàn bằng QR menu, gọi món realtime, quản lý bàn và thanh toán đơn giản cho quán ăn / quán đồ uống nhỏ đến vừa.**

Schema hiện tại **không** được thiết kế để trở thành một hệ thống ERP đầy đủ cho toàn bộ vận hành quán.

## 2. Source of truth hiện tại của schema

Schema mà dự án đang dùng hiện nay là:

### 2.1. 8 bảng gốc bắt buộc

- `Account`
- `Dish`
- `DishSnapshot`
- `RestaurantTable`
- `Order`
- `RefreshToken`
- `Guest`
- `Socket`

### 2.2. Các phần mở rộng tối thiểu đã chuẩn bị cho tương lai

#### Bảng mới được thêm

- `OrderBatch` **(bảng thêm mới)**
- `OrderStatusLog` **(bảng thêm mới)**
- `TableRequest` **(bảng thêm mới)**

#### Cột mới được thêm

- `Dish.isOutOfStock` **(cột thêm mới)**
- `Dish.stockUpdatedAt` **(cột thêm mới)**
- `Dish.estimatedPrepMinutes` **(cột thêm mới)**

- `RestaurantTable.isOccupied` **(cột thêm mới)**
- `RestaurantTable.occupiedAt` **(cột thêm mới)**
- `RestaurantTable.lastActivityAt` **(cột thêm mới)**

- `Guest.sessionStatus` **(cột thêm mới)**
- `Guest.lastActivityAt` **(cột thêm mới)**
- `Guest.expiresAt` **(cột thêm mới)**
- `Guest.endedAt` **(cột thêm mới)**

- `Order.orderBatchId` **(cột thêm mới)**
- `Order.estimatedReadyAt` **(cột thêm mới)**

## 3. Schema hiện tại đang bao quát tốt phần nào

### 3.1. Trải nghiệm phục vụ tại bàn bằng QR

Đây là phần mạnh nhất của schema.

Các bảng chính hỗ trợ luồng này gồm:

- `RestaurantTable`: xác định đúng bàn khi khách quét QR
- `Guest`: hỗ trợ khách vãng lai không cần tài khoản phức tạp
- `Order`: lưu các món khách đặt theo từng line item
- `Dish` và `DishSnapshot`: hỗ trợ menu hiện tại và snapshot lịch sử
- `Socket`: hỗ trợ realtime giữa giao diện khách và nhân viên

Ở mức mở rộng sau này, có thể dùng thêm:

- `TableRequest` cho gọi nhân viên
- `OrderStatusLog` cho timeline trạng thái
- `OrderBatch` cho quick reorder và history theo lần submit

### 3.2. Quản lý menu và trạng thái món

Schema hiện tại làm tốt phần menu cho quán nhỏ–vừa thông qua:

- `Dish`: menu hiện tại
- `DishSnapshot`: lưu snapshot tại thời điểm khách order

Ngoài ra, các cột mở rộng mới trong `Dish` đã chuẩn bị cho:

- trạng thái hết món
- thời gian chuẩn bị dự kiến (ETA)

### 3.3. Quản lý vận hành cơ bản của nhân viên

Schema hiện tại có hỗ trợ tốt cho vận hành nội bộ cơ bản, gồm:

- `Account`
- `RefreshToken`
- `Order.orderHandlerId`
- `Socket`

Ở mức mở rộng, có thể thêm:

- `OrderStatusLog` để truy vết đổi trạng thái
- `TableRequest.handlerId` để biết nhân viên nào xử lý request

### 3.4. Theo dõi order và dữ liệu vận hành cơ bản

Từ các bảng:

- `Order`
- `DishSnapshot`
- `Guest`
- `RestaurantTable`

hệ thống đã có thể:

- xem món đã gọi theo bàn
- theo dõi trạng thái món
- tính tổng tiền cơ bản từ snapshot giá và số lượng
- hiển thị lịch sử món trong guest session hiện tại

## 4. Schema hiện tại chưa bao quát những gì

Đây là phần rất quan trọng để chốt scope.

### 4.1. Không có multi-restaurant / multi-branch thực thụ

Schema hiện tại **không có** bảng `restaurants` và **không triển khai** mô hình multi-restaurant.

### 4.2. Không có dining session trung gian

Schema hiện tại **không có** bảng `dining_sessions`.

Thay vì dùng session trung gian như hướng cũ, logic hiện tại xoay quanh:

- `RestaurantTable`
- `Guest`
- `Order`
- `DishSnapshot`

Ở mức mở rộng, session timeout được hỗ trợ bằng các cột trạng thái/thời gian trong `Guest` và `RestaurantTable`, không bắt buộc cần một bảng `dining_sessions`.

### 4.3. Chưa hỗ trợ quản lý kho

Schema hiện tại **chưa hỗ trợ quản lý kho** như:

- nguyên liệu
- tồn kho
- nhập hàng
- nhà cung cấp

### 4.4. Chưa hỗ trợ công thức món và giá vốn

Schema hiện tại chưa có các bảng công thức, nguyên liệu món hoặc giá vốn.

### 4.5. Chưa hỗ trợ kế toán và tài chính chuyên sâu

Schema hiện tại chỉ phù hợp cho thanh toán đơn giản và dữ liệu order cơ bản, chưa đi vào tài chính – kế toán sâu.

### 4.6. Chưa hỗ trợ enterprise modules

Schema hiện tại không bao phủ:

- ERP
- CRM
- loyalty
- procurement
- payroll
- chuỗi chi nhánh
- analytics sâu

## 5. Vì sao phạm vi hiện tại là hợp lý

Định hướng hiện tại của database schema là hợp lý vì 3 lý do chính:

### 5.1. Tập trung đúng pain point

Phân khúc mục tiêu của Seatly là quán ăn / quán nước nhỏ đến vừa. Họ cần:

- gọi món nhanh hơn
- giảm thao tác thủ công
- dễ theo dõi order hơn
- dễ quản lý bàn hơn

### 5.2. Scope vừa sức cho bài tập lớn

Nếu nhóm tập trung vào các bảng lõi như:

- `Account`
- `Dish`
- `DishSnapshot`
- `RestaurantTable`
- `Order`
- `RefreshToken`
- `Guest`
- `Socket`

và chỉ xem các bảng/cột mở rộng là **phase sau**, thì vẫn đủ để làm:

- ERD
- database design
- API cơ bản
- UI khách
- UI staff
- báo cáo và bảo vệ

### 5.3. Dễ mở rộng về sau

Schema hiện tại có nền móng khá tốt để mở rộng sau này mà không phá vỡ cấu trúc chính, nhờ:

- `DishSnapshot` bảo toàn dữ liệu lịch sử
- `Order` theo line item
- `Guest` đủ linh hoạt để quản lý session tạm thời
- các cột thời gian/trạng thái mở rộng hỗ trợ occupancy + timeout
- các bảng mới tối thiểu hỗ trợ request, history và reorder

## 6. Định hướng lộ trình phát triển hợp lý

### Phase 1 — Core / MVP hiện tại

Tập trung vào:

- staff login
- quản lý bàn
- QR menu
- guest session tại bàn
- guest ordering
- realtime order tracking
- thanh toán đơn giản

### Phase 2 — Feature Enhancement

Có thể cân nhắc mở rộng thêm:

- `TableRequest`
- `OrderStatusLog`
- `OrderBatch`
- Out-of-stock indicator
- ETA
- Auto Table Occupancy
- Auto session timeout
- Quick reorder

### Phase 3 — Operational Expansion

Nếu muốn đi xa hơn sau này, có thể thêm:

- inventory cơ bản
- thống kê món bán chạy
- notification logs
- analytics đơn giản

### Phase 4 — Enterprise Expansion

Đây là hướng mở rộng xa hơn, ngoài phạm vi bài tập lớn:

- nhiều chi nhánh thực thụ
- supplier management
- accounting
- payroll
- CRM / loyalty
- full analytics
- ERP-level operations

## 7. Kết luận cuối cùng

Database schema hiện tại của **Seatly** có định hướng rất rõ:

Nó là một schema phục vụ **web app hỗ trợ phục vụ tại bàn bằng QR**, tập trung vào:

- quản lý bàn
- guest session tạm thời
- menu
- snapshot món
- order theo line item
- tracking trạng thái realtime
- thanh toán đơn giản

Và ở mức chuẩn bị mở rộng, schema đã có thêm:

- `OrderBatch`
- `OrderStatusLog`
- `TableRequest`
- các cột mới trong `Dish`, `RestaurantTable`, `Guest`, `Order`

Tuy nhiên, **đây không phải ưu tiên triển khai ngay**.  
Ưu tiên hiện tại vẫn là hoàn thiện **các chức năng cốt lõi** trước.

> **Schema của Seatly được thiết kế để tối ưu cho quy trình phục vụ tại bàn bằng QR, không phải để bao phủ toàn bộ vận hành hậu trường của một hệ thống ERP nhà hàng.**
```

---

## 5. DATABASE_SCHEMA_RESTAURANT_MANAGEMENT_SYSTEM_OPTIMIZED.md

```md
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
```

---

## 6. ANALYSIS_OF_RELATIONSHIPS_BETWEEN_TABLES_DATABASE_SCHEMA.md

```md
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
```

---

## 7. DETAILED_ANALYSIS_OF_CORE_FEATURE_ORDER_VIA_QR_CODE.md

```md
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
```
