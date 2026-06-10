# [BE] Setup Socket.IO Realtime for Order Flows

## Task Title

> **[BE] Setup Socket.IO Realtime for Order Flows**

## Task Description

```
### 🔹 User Story

> As a guest or staff user
> I want order events to be pushed in near realtime
> So that both sides can react quickly to new orders, status changes and payment updates.

---

### 🔹 Business Context

`Realtime tracking` là một trong các giá trị nổi bật nhất của Seatly. Hệ thống cần dùng `Socket.IO` để phát các event như `new-order`, `update-order`, `payment` và lưu `socketId` vào bảng `Socket`.

Sprint 2 chưa cần một event set quá rộng, nhưng cần tối thiểu các event phục vụ trực tiếp cho QR ordering flow.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Tích hợp Socket.IO vào backend Fastify

- đăng ký plugin realtime
- xác thực socket bằng access token
- phân biệt manager/staff và guest connection

---

### 2️⃣ Lưu mapping socket vào database

- dùng bảng `Socket` để map `accountId` hoặc `guestId`
- cập nhật lại khi reconnect

---

### 3️⃣ Phát các event core của Sprint 2

- `new-order`
- `update-order`
- `payment`

Các event này cần được bắn từ đúng backend flow khi order được tạo, cập nhật hoặc thanh toán.

---

#### ❌ Không bao gồm

- Không implement notification center đầy đủ
- Không implement call staff realtime
- Không implement refresh-token/logout socket events nếu chưa thực sự cần trong Sprint 2

Task này chỉ tập trung **realtime đủ dùng cho core QR ordering flow**.
```

## Task Labels

- `Improvement`
- `🔴 High`
- `🔴 Hard`

## Task Checklist

**Socket.IO Realtime Acceptance Criteria**

- [ ] Backend Fastify có Socket.IO plugin hoạt động được với JWT auth
- [ ] Bảng `Socket` được dùng để map connection của guest hoặc staff
- [ ] Có emit các event `new-order`, `update-order`, `payment` từ backend core flow
- [ ] Manager/staff và guest nhận đúng nhóm sự kiện liên quan
- [ ] Realtime foundation đủ để frontend Sprint 2 subscribe và refetch dữ liệu đúng lúc
