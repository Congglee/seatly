# [FE] Implement Guest Menu and Order Submission Page

## Task Title

> **[FE] Implement Guest Menu and Order Submission Page**

## Task Description

```
### 🔹 User Story

> As a guest
> I want to browse the menu, adjust quantities and submit my selected dishes
> So that I can place an order directly from my phone without waiting for staff.

---

### 🔹 Business Context

Đây là màn hình trung tâm nhất ở phía guest. Seatly cần một giao diện gồm menu list + quantity controls + submit action, nhưng chỉ ưu tiên sự ổn định của luồng core, chưa mở rộng sang UX nâng cao.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Guest menu page

- hiển thị danh sách món từ dish API
- phản ánh trạng thái món không thể đặt
- ưu tiên mobile-first

---

### 2️⃣ Chọn số lượng món

- tăng/giảm số lượng
- quản lý danh sách món đang chọn tại client

---

### 3️⃣ Submit order

- gửi danh sách món đã chọn tới guest order API
- sau khi thành công điều hướng sang trang theo dõi order

---

#### ❌ Không bao gồm

- Không implement quick reorder
- Không implement modifier/add-on/combo
- Không implement ETA nâng cao hoặc recommendation engine

Task này chỉ tập trung **guest menu và thao tác gửi order ổn định cho Sprint 2**.
```

## Task Labels

- `Feature`
- `🔴 High`
- `🟡 Medium`

## Task Checklist

**Guest Menu & Order Submission Acceptance Criteria**

- [ ] Có page guest menu lấy dữ liệu từ backend dish API
- [ ] Guest có thể tăng/giảm số lượng từng món
- [ ] Món không thể order được hiển thị trạng thái phù hợp
- [ ] Guest submit order thành công qua guest order API
- [ ] Sau khi submit thành công, flow chuyển đúng sang trang guest order tracking
