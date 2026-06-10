# [BE] Develop Guest Session Entry API for QR Table Flow

## Task Title

> **[BE] Develop Guest Session Entry API for QR Table Flow**

## Task Description

```
### 🔹 User Story

> As a guest at a table
> I want to enter my name and join the correct table using its QR token
> So that I can start ordering without creating a full account.

---

### 🔹 Business Context

Theo tài liệu Seatly, guest session là một phần lõi của sản phẩm. Guest login cần đi theo `name + tableNumber + token`, sau đó tạo `Guest` record và cấp token riêng cho guest.

Đây là điểm bắt đầu bắt buộc của QR ordering flow. Nếu chưa có API này, guest sẽ không thể vào đúng bàn hoặc tạo session để đặt món.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Guest login / join table API

- nhận `name`, `tableNumber`, `token`
- kiểm tra bàn tồn tại và token đúng
- chặn các trạng thái bàn không được phục vụ theo rule Seatly chọn
- tạo `Guest` session mới gắn với `tableNumber`

---

### 2️⃣ Guest token issuance

- cấp `accessToken` và `refreshToken` cho guest session
- lưu refresh token theo đúng mô hình `Guest`

---

### 3️⃣ Guest logout / refresh session API

- cho phép guest logout khỏi phiên hiện tại
- cho phép refresh guest session khi access token hết hạn trong Sprint 2 flow

---

#### ❌ Không bao gồm

- Không implement auto session timeout nâng cao
- Không implement merge nhiều guest session thành một group logic phức tạp
- Không implement request bill / call staff ở task này

Task này chỉ tập trung **guest session entry đúng với QR table flow cốt lõi**.
```

## Task Labels

- `Feature`
- `🔴 High`
- `🟡 Medium`

## Task Checklist

**Guest Session Entry API Acceptance Criteria**

- [ ] Có API cho guest vào bàn bằng `name + tableNumber + token`
- [ ] API kiểm tra đúng token bàn và trạng thái bàn trước khi tạo session
- [ ] Guest session được lưu trong bảng `Guest` và nhận access/refresh token riêng
- [ ] Có API logout và refresh token cho guest session
- [ ] Guest auth flow đủ dùng để frontend chuyển từ màn hình vào bàn sang guest menu
