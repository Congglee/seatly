# [BE] Develop Guest Order Creation API with Dish Snapshot

## Task Title

> **[BE] Develop Guest Order Creation API with Dish Snapshot**

## Task Description

```
### 🔹 User Story

> As a guest
> I want to submit my selected dishes from the QR menu
> So that the system creates valid line-item orders and preserves dish data history at order time.

---

### 🔹 Business Context

Đây là phần trung tâm nhất của Sprint 2. Khi guest đặt món, backend phải:

- kiểm tra guest session và bàn còn hợp lệ
- kiểm tra trạng thái món
- tạo `DishSnapshot`
- tạo từng dòng `Order` với `status = Pending`

Logic này map trực tiếp với tài liệu core feature của Seatly nên cần được tách thành task riêng, không gộp chung với guest login hay staff order handling.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ API guest tạo order line items

- nhận danh sách món + số lượng từ guest đã đăng nhập
- mỗi món tạo thành một `Order` record riêng

---

### 2️⃣ Kiểm tra điều kiện nghiệp vụ trước khi tạo order

- guest session còn hợp lệ
- bàn còn hợp lệ
- dish còn được phép order
- số lượng hợp lệ

---

### 3️⃣ Áp dụng `DishSnapshot` pattern

- tạo snapshot từ `Dish` tại thời điểm đặt món
- `Order` tham chiếu sang snapshot tương ứng
- dữ liệu lịch sử món không bị ảnh hưởng khi menu thay đổi về sau

---

#### ❌ Không bao gồm

- Không implement `OrderBatch`
- Không implement quick reorder
- Không implement order timeline/history nâng cao

Task này chỉ tập trung **guest submit order đúng với line-item + snapshot pattern của Seatly**.
```

## Task Labels

- `Feature`
- `🔴 High`
- `🔴 Hard`

## Task Checklist

**Guest Order Creation Acceptance Criteria**

- [ ] Có API guest tạo danh sách `Order` từ các món đã chọn
- [ ] Mỗi món đặt sinh đúng một `DishSnapshot` và một `Order` line item tương ứng
- [ ] Order mới mặc định vào trạng thái đầu luồng nghiệp vụ (ví dụ `Pending`)
- [ ] API chặn được trường hợp bàn hoặc món không còn hợp lệ để order
- [ ] Logic backend bám đúng core rule `Guest + RestaurantTable + Order + DishSnapshot`
