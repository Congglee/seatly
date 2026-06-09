# [BE] Develop Dish Management APIs for Seatly

## Task Title

> **[BE] Develop Dish Management APIs for Seatly**

## Task Description

```
### 🔹 User Story

> As an owner or employee
> I want to manage dishes in the active menu
> So that guests can view orderable menu items from the QR menu and staff can maintain menu accuracy.

---

### 🔹 Business Context

Luồng guest menu của Seatly đọc trực tiếp từ module `Dish`, sau đó kiểm tra `status` khi đặt món. Vì vậy Seatly cần hoàn thiện dish APIs trước khi có thể triển khai menu thật ở frontend.

Ở Sprint 2, phần dish management nên giữ gọn theo đúng MVP: CRUD cơ bản + trạng thái món, chưa mở rộng sang kho, ETA hay upload media workflow hoàn chỉnh.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ API lấy danh sách và chi tiết món

- lấy menu list cho guest/staff
- lấy dish detail theo `id`

---

### 2️⃣ API tạo món mới

- tạo `name`, `price`, `description`, `image`, `status`

---

### 3️⃣ API cập nhật món

- cập nhật nội dung món hiện tại
- hỗ trợ đổi trạng thái `Available` / `Unavailable` / `Hidden` hoặc tương đương theo enum Seatly chọn

---

### 4️⃣ API xoá món

- xoá món khỏi menu hiện tại
- vẫn giữ nguyên logic snapshot cho các order đã phát sinh ở task sau

---

#### ❌ Không bao gồm

- Không implement inventory
- Không implement ETA nâng cao
- Không bắt buộc triển khai upload ảnh bằng media service trong task này
- Không làm reporting món bán chạy

Task này chỉ tập trung **dish CRUD đủ để phục vụ menu thật cho guest flow**.
```

## Task Labels

- `Feature`
- `🔴 High`
- `🟡 Medium`

## Task Checklist

**Dish Management API Acceptance Criteria**

- [ ] Có API list/detail/create/update/delete cho `Dish`
- [ ] Dish data có đủ trường tối thiểu cho QR menu và order flow
- [ ] Có trạng thái món để staff có thể ẩn món hoặc đánh dấu không thể đặt
- [ ] Logic dish API không phá vỡ `DishSnapshot` pattern sẽ dùng ở order task
- [ ] Menu APIs đủ dùng cho staff manage page và guest menu page trong Sprint 2
