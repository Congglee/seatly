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
