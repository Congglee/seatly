# [FE] Implement Staff Order Management Page for Handling and Payment

## Task Title

> **[FE] Implement Staff Order Management Page for Handling and Payment**

## Task Description

```
### 🔹 User Story

> As an employee or owner
> I want to review incoming orders, update their statuses and confirm payment for a guest session
> So that the service workflow can continue smoothly after guests place orders.

---

### 🔹 Business Context

Đây là màn hình backoffice quan trọng nhất của Sprint 2 vì nó nối trực tiếp với guest ordering flow. Trang này cần nhận realtime `new-order`, `update-order`, `payment`, cho phép staff xử lý line item và thanh toán theo guest.

Seatly nên ưu tiên bản đầu tiên của màn hình này trước dashboard hay account management.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Staff order list page

- hiển thị order list từ backend
- có filter cơ bản theo bàn, guest hoặc trạng thái nếu khả thi trong Sprint 2

---

### 2️⃣ Cập nhật trạng thái order

- thao tác đổi trạng thái order từ giao diện
- phản ánh ngay thay đổi sau khi gọi API thành công

---

### 3️⃣ Thanh toán theo guest session

- staff có thể chốt thanh toán cho guest session phù hợp
- đồng bộ lại danh sách order sau khi thanh toán

---

### 4️⃣ Nhận realtime event

- nhận `new-order`
- nhận `update-order`
- nhận `payment`

---

#### ❌ Không bao gồm

- Không implement dashboard analytics
- Không implement kitchen screen riêng
- Không implement advanced batching, timeline hoặc call staff queue

Task này chỉ tập trung **staff xử lý order core và simple payment cho Sprint 2**.
```

## Task Labels

- `Feature`
- `🔴 High`
- `🔴 Hard`

## Task Checklist

**Staff Order Management UI Acceptance Criteria**

- [ ] Có trang staff order management trong `manage` area
- [ ] Trang lấy được order list từ backend API
- [ ] Staff có thể cập nhật trạng thái từng order từ giao diện
- [ ] Staff có thể thao tác thanh toán theo guest session từ giao diện
- [ ] Trang nhận được realtime event cho order mới, cập nhật trạng thái và thanh toán
