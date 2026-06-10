# [BE] Develop Staff Order Handling and Payment APIs

## Task Title

> **[BE] Develop Staff Order Handling and Payment APIs**

## Task Description

```
### 🔹 User Story

> As an employee or owner
> I want to review guest orders, update item statuses and mark guest orders as paid
> So that Seatly can support the full service flow after a guest submits an order.

---

### 🔹 Business Context

Sau khi guest tạo order, staff phải có khả năng tiếp nhận và xử lý từng line item. Phần này cần bao gồm:

- lấy danh sách order theo khoảng thời gian
- cập nhật từng order
- thanh toán theo `guestId`

Đây là phần kết thúc vòng đời cơ bản của đơn trong Sprint 2 và cần bám đúng các trạng thái đã chốt trong tài liệu Seatly.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ API staff lấy danh sách và chi tiết order

- lấy order list phục vụ staff screen
- hỗ trợ filter cơ bản theo thời gian hoặc điều kiện tối thiểu nếu cần
- lấy order detail theo `id`

---

### 2️⃣ API cập nhật trạng thái order

- cho phép staff cập nhật `Pending`, `Processing`, `Rejected`, `Delivered`, `Paid`
- gắn `orderHandlerId` khi staff xử lý

---

### 3️⃣ API thanh toán đơn theo guest session

- gom các order chưa hoàn tất của một guest
- cập nhật sang `Paid`
- phản ánh đúng simple payment flow của Seatly

---

#### ❌ Không bao gồm

- Không triển khai hóa đơn thuế, payment gateway hoặc POS integration
- Không triển khai `OrderStatusLog`
- Không triển khai báo cáo doanh thu nâng cao

Task này chỉ tập trung **order handling và simple payment ở mức core/MVP**.
```

## Task Labels

- `Feature`
- `🔴 High`
- `🔴 Hard`

## Task Checklist

**Staff Order Handling Acceptance Criteria**

- [ ] Có API list/detail cho order phục vụ staff workflow
- [ ] Có API cập nhật trạng thái order với `orderHandlerId`
- [ ] Có API thanh toán theo `guestId` cho simple payment flow
- [ ] Luồng trạng thái order bám đúng phạm vi tài liệu Seatly hiện tại
- [ ] Kết quả API đủ dùng cho staff order page và guest order tracking page trong Sprint 2
