# [BE] Develop Table Management APIs with QR Token for Seatly

## Task Title

> **[BE] Develop Table Management APIs with QR Token for Seatly**

## Task Description

```
### 🔹 User Story

> As an owner or employee
> I want to manage restaurant tables and their QR tokens
> So that each physical table can become a valid entry point for the guest QR ordering flow.

---

### 🔹 Business Context

Table module là điểm neo của toàn bộ guest flow: mỗi bàn cần có `number`, `status`, `capacity` và `token` để làm điểm vào cho QR flow. Seatly cũng bám chính logic này qua `RestaurantTable.token` và `RestaurantTable.number`.

Nếu chưa có table APIs, frontend Sprint 2 sẽ không thể tạo link QR, kiểm tra bàn hợp lệ hay đưa guest vào đúng bàn.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ API lấy danh sách và chi tiết bàn

- lấy table list
- lấy table detail theo `number`

---

### 2️⃣ API tạo bàn mới

- tạo `number`, `capacity`, `status`
- sinh `token` ngẫu nhiên cho QR flow
- kiểm tra trùng `number`

---

### 3️⃣ API cập nhật bàn

- cập nhật `capacity`, `status`
- hỗ trợ đổi token khi cần
- nếu đổi token thì vô hiệu session guest cũ theo nguyên tắc phù hợp

---

### 4️⃣ API xoá bàn

- xoá bàn theo `number`
- xử lý nhất quán với các bản ghi liên quan theo schema hiện tại

---

#### ❌ Không bao gồm

- Không implement auto occupancy
- Không implement analytics theo bàn
- Không thêm workflow nhiều chi nhánh hoặc nhiều khu vực bàn phức tạp

Task này chỉ tập trung **table CRUD và QR token support ở mức core/MVP**.
```

## Task Labels

- `Feature`
- `🔴 High`
- `🟡 Medium`

## Task Checklist

**Table Management API Acceptance Criteria**

- [ ] Có API list/detail/create/update/delete cho `RestaurantTable`
- [ ] Tạo bàn mới sinh `token` đủ dùng cho QR flow
- [ ] Cập nhật bàn hỗ trợ đổi token theo yêu cầu nghiệp vụ
- [ ] Validation cho `number`, `capacity`, `status` được xử lý rõ ràng
- [ ] Table APIs đủ dùng cho frontend QR preview và guest entry flow của Sprint 2
