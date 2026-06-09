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
