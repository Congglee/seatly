# [FE] Implement Dish Management Page for Seatly

## Task Title

> **[FE] Implement Dish Management Page for Seatly**

## Task Description

```
### 🔹 User Story

> As an owner or employee
> I want to manage menu dishes from the backoffice
> So that the guest QR menu always reflects the current dishes available for ordering.

---

### 🔹 Business Context

Guest menu chỉ có ý nghĩa khi staff có thể quản lý menu thật. Seatly cũng cần một page quản lý món riêng nhưng chỉ ở mức CRUD cơ bản để phục vụ luồng core của Sprint 2.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Danh sách món trong khu quản trị

- hiển thị tên, giá, trạng thái, mô tả ngắn hoặc ảnh nếu có

---

### 2️⃣ Tạo / sửa / xoá món

- form tạo món
- form sửa món
- thao tác xoá món

---

### 3️⃣ Quản lý trạng thái món

- staff có thể đổi trạng thái món để guest menu phản ánh đúng món có thể order

---

#### ❌ Không bao gồm

- Không implement upload media phức tạp nếu chưa sẵn sàng
- Không implement category management, combo hoặc modifier
- Không làm analytics món bán chạy

Task này chỉ tập trung **dish management page tối thiểu cho core QR menu flow**.
```

## Task Labels

- `Feature`
- `🔴 High`
- `🟡 Medium`

## Task Checklist

**Dish Management UI Acceptance Criteria**

- [ ] Có trang quản lý món trong `manage` area
- [ ] Trang lấy được danh sách món từ backend API
- [ ] Có thao tác tạo, sửa, xoá món ở mức cơ bản
- [ ] Trạng thái món được hiển thị và chỉnh sửa được từ giao diện quản trị
- [ ] Dish management page đủ dùng để tạo menu thật cho guest menu Sprint 2
