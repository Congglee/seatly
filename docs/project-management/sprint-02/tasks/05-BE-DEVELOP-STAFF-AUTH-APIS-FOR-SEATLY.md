# [BE] Develop Staff Auth APIs for Seatly

## Task Title

> **[BE] Develop Staff Auth APIs for Seatly**

## Task Description

```
### 🔹 User Story

> As an owner or employee
> I want to log in, refresh session and log out from Seatly backoffice
> So that I can securely access the management features needed for Sprint 2.

---

### 🔹 Business Context

Staff auth của Sprint 2 cần có nhóm API `/auth` với login, refresh token rotation và logout. Đây là phần tối thiểu Seatly cần có trước khi mở các màn hình quản lý bàn, món và order.

Sprint 2 chỉ cần auth cho tài khoản nội bộ. Guest session sẽ được triển khai ở task riêng để tránh gộp phạm vi.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Staff login API

- đăng nhập bằng `email` và `password`
- kiểm tra credential hợp lệ
- trả về `accessToken`, `refreshToken` và thông tin account cơ bản

---

### 2️⃣ Refresh token API cho staff

- xác thực refresh token
- rotate refresh token
- cấp access token mới
- lưu refresh token vào bảng `RefreshToken`

---

### 3️⃣ Staff logout API

- xoá refresh token hiện tại
- đảm bảo session cũ không dùng lại được

---

#### ❌ Không bao gồm

- Không implement Google OAuth login
- Không implement forgot password / reset password
- Không implement employee management API đầy đủ trong task này

Task này chỉ tập trung **hoàn thành staff auth tối thiểu để mở đường cho backoffice Sprint 2**.
```

## Task Labels

- `Feature`
- `🔴 High`
- `🟡 Medium`

## Task Checklist

**Staff Auth API Acceptance Criteria**

- [ ] Có API login cho staff trả về account info, access token và refresh token
- [ ] Có API refresh token với cơ chế rotation cho staff
- [ ] Có API logout xoá refresh token tương ứng
- [ ] Logic auth sử dụng bảng `RefreshToken` đúng với schema hiện tại của Seatly
- [ ] Staff auth đủ dùng cho các route quản lý bàn, món và order ở Sprint 2
