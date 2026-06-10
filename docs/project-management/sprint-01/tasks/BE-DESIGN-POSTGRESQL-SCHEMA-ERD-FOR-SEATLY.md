# [BE] Design PostgreSQL Schema & ERD for Seatly

## Task Title

> **[BE] Design PostgreSQL Schema & ERD for Seatly**

## Task Description

```
### 🔹 User Story

> As a backend team
> I want to design a PostgreSQL database schema and ERD for Seatly
> So that the system has a clear, consistent, and scalable data structure for QR-based table ordering, guest session management, and realtime order tracking.

---

### 🔹 Business Context

Seatly không còn là một multi-tenant e-commerce platform.

Seatly là một **web app hỗ trợ quán ăn / quán đồ uống nhỏ đến vừa số hóa quy trình phục vụ tại bàn**, tập trung vào:

- QR menu theo từng bàn
- Gọi món tại bàn
- Quản lý guest session tạm thời qua `Guest`
- Theo dõi trạng thái món theo thời gian thực
- Thanh toán đơn giản

Vì vậy, database schema cần được thiết kế theo đúng phạm vi hiện tại của sản phẩm:

- Bám sát nghiệp vụ phục vụ tại bàn
- Nhất quán giữa database, use case và UI
- Phù hợp với backend NestJS và PostgreSQL
- Sẵn sàng để chuyển sang ORM (Prisma) ở sprint sau nếu cần

Source of truth hiện tại của schema gồm **8 bảng gốc**:

- `Account`
- `Dish`
- `DishSnapshot`
- `RestaurantTable`
- `Order`
- `RefreshToken`
- `Guest`
- `Socket`

Ngoài ra, schema mới nhất đã chuẩn bị **các phần mở rộng tối thiểu cho phase sau**, gồm:

- **3 bảng bổ trợ mới**: `OrderBatch`, `OrderStatusLog`, `TableRequest`
- **các cột mở rộng** trong `Dish`, `RestaurantTable`, `Guest`, `Order`

Các phần mở rộng này cần được phản ánh đúng trong thiết kế và ERD, nhưng phải được mô tả rõ là **future enhancement / phase sau**, không phải phạm vi core bắt buộc của MVP.

Task này tập trung vào việc chốt hướng kiến trúc dữ liệu tổng thể trước khi triển khai code.

---

### 🔹 Scope

#### ✅ Bao gồm

**1️⃣ Thiết kế database schema ở mức hệ thống**

Team cần xác định các thực thể cốt lõi và mối quan hệ chính phù hợp với Seatly, ví dụ theo các nhóm nghiệp vụ như:

- tài khoản nội bộ
- bàn và QR
- guest vãng lai
- menu / dishes
- dish snapshots
- orders
- realtime connections

Với schema mới nhất, trọng tâm cần bám là:

- `RestaurantTable` dùng `number` làm khóa chính và `token` làm điểm vào của QR flow
- `Guest` đại diện cho guest session tạm thời tại bàn qua `tableNumber`
- `Order` lưu **mỗi món là một line item** và gắn với `guestId`, `tableNumber`, `dishSnapshotId`
- `DishSnapshot` giữ dữ liệu lịch sử món tại thời điểm order
- `Account` và `RefreshToken` phục vụ tài khoản nội bộ
- `Socket` phục vụ kết nối realtime cho staff/guest
- `OrderBatch`, `OrderStatusLog`, `TableRequest` được thể hiện là phần mở rộng tối thiểu cho phase sau

Cần làm rõ:

- các entity chính
- quan hệ giữa các entity
- PK / FK
- cardinality
- các ràng buộc logic quan trọng

---

**2️⃣ Thể hiện đúng các quyết định thiết kế cốt lõi của Seatly**

Schema cần phản ánh rõ các định hướng nghiệp vụ đã chốt, đặc biệt là:

- **không dùng** `restaurants`
- **không dùng** `dining_sessions`
- **không quay lại** hướng multi-restaurant
- logic lõi xoay quanh `RestaurantTable + Guest + Order + DishSnapshot`
- `orders` được lưu theo từng line item
- `dish_snapshots` dùng để giữ giá/thông tin món tại thời điểm order
- schema dùng `tableNumber` làm foreign key tới `RestaurantTable.number`, không tự đổi sang `table_id`
- `table_requests`, `order_status_logs`, `order_batch` và các cột mở rộng chỉ là phần chuẩn bị cho giai đoạn nâng cấp
- dữ liệu bám theo flow QR ordering thay vì mô hình quản trị nhà hàng quá rộng

---

**3️⃣ Vẽ ERD trực quan**

Sử dụng một trong hai công cụ:

- [https://dbdiagram.io](https://dbdiagram.io "smartCard-inline")
  hoặc
- [https://drawsql.app](https://drawsql.app "smartCard-inline")

ERD phải:

- thể hiện đầy đủ entity chính
- thể hiện rõ các quan hệ giữa bảng
- phản ánh đúng nghiệp vụ cốt lõi của Seatly
- có thể public/share được cho cả nhóm

---

**4️⃣ Chuẩn bị deliverables**

Output cần có:

- Link ERD public/shareable
- Ảnh chụp màn hình ERD
- File DBML hoặc SQL export schema tương đương, phản ánh đủ 8 bảng gốc và các phần mở rộng tối thiểu đã chốt

---

#### ❌ Không bao gồm

- Không tạo migration
- Không cấu hình PostgreSQL trong codebase
- Không tích hợp Prisma ORM
- Không viết seed data
- Không triển khai API
- Không thêm lại các bảng/hướng cũ như `restaurants` hoặc `dining_sessions`
- Không mở rộng sang inventory, accounting, CRM hoặc các module enterprise khác
- Không tối ưu performance hoặc indexing nâng cao ngoài mức cần thiết cho thiết kế logic

Task này chỉ tập trung vào **thiết kế database schema và ERD** cho đúng phạm vi hiện tại của Seatly.
```

## Task Attachments

**Links:**

[Seatly Database Schema](https://dbdiagram.io/d/Seatly-69aa4c09a3f0aa31e1012799)

## Task Labels

- `Documentation`
- `🔴 High`
- `🔴 Hard`

## Task Checklist

**Database Schema & ERD Acceptance Criteria**

- [ ] Schema và ERD bám đúng source of truth hiện tại gồm 8 bảng gốc: `Account`, `Dish`, `DishSnapshot`, `RestaurantTable`, `Order`, `RefreshToken`, `Guest`, `Socket`
- [ ] Thiết kế thể hiện đúng logic lõi `RestaurantTable + Guest + Order + DishSnapshot`, trong đó `Order` là line item và `DishSnapshot` dùng để giữ lịch sử món tại thời điểm order
- [ ] ERD phản ánh đúng PK/FK/cardinality hiện tại, bao gồm việc dùng `RestaurantTable.number` / `tableNumber` thay vì `table_id`
- [ ] Nội dung task khẳng định rõ không dùng `restaurants`, không dùng `dining_sessions`, không quay lại hướng multi-restaurant
- [ ] Các bảng/cột mở rộng mới (`OrderBatch`, `OrderStatusLog`, `TableRequest` và các cột mở rộng trong `Dish`, `RestaurantTable`, `Guest`, `Order`) được thể hiện đúng là future enhancement / phase sau
- [ ] Có link ERD public/shareable, ảnh chụp màn hình ERD và file DBML hoặc SQL export tương đương để dùng lại cho các task sau
