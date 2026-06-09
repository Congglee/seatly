# [BE] Implement Auth Config, JWT and Role Guards for Seatly

## Task Title

> **[BE] Implement Auth Config, JWT and Role Guards for Seatly**

## Task Description

```
### 🔹 User Story

> As a backend team
> I want to build the auth foundation with environment config, JWT utilities and role guards
> So that all protected APIs in Sprint 2 can share one consistent security and authorization layer.

---

### 🔹 Business Context

Auth flow backend của Seatly cần được tổ chức xoay quanh:

- environment config tập trung
- JWT access token / refresh token
- role-based hooks cho `Owner`, `Employee`, `Guest`
- preValidation guard áp dụng lại cho nhiều route

Seatly cần kế thừa tinh thần tổ chức này, nhưng chỉ tập trung vào scope cần thiết cho Sprint 2 và không bê nguyên các phần chưa cần như Google OAuth.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Thiết lập environment config backend

- đọc biến môi trường backend theo cấu trúc rõ ràng
- chuẩn bị các biến cho database, JWT secret, token expiry, client URL
- gom config vào một nơi để dùng lại cho auth và realtime

---

### 2️⃣ Tạo JWT utilities dùng chung

- hàm sign / verify access token
- hàm sign / verify refresh token
- token payload có role và user identity rõ ràng

---

### 3️⃣ Tạo auth hooks / guards cho route protection

- `requireLogined`
- `requireOwner`
- `requireEmployee`
- `requireGuest`

Các guard này cần đủ để bảo vệ staff APIs, guest APIs và route realtime ở Sprint 2.

---

#### ❌ Không bao gồm

- Không implement Google OAuth
- Không thêm permission matrix phức tạp ngoài role-based guard cơ bản
- Không triển khai audit log hoặc security monitoring nâng cao

Task này chỉ tập trung **xây auth foundation để các task API sau có thể dùng ngay**.
```

## Task Labels

- `Improvement`
- `🔴 High`
- `🟡 Medium`

## Task Checklist

**Auth Foundation Acceptance Criteria**

- [ ] Backend có environment config rõ ràng cho database, JWT và client URL
- [ ] JWT utilities tạo và verify được access token / refresh token theo role
- [ ] Auth hooks/guards cho `Owner`, `Employee`, `Guest` được tổ chức dùng lại được giữa các route
- [ ] Nền tảng auth backend không phụ thuộc vào Google OAuth hoặc feature ngoài scope Sprint 2
- [ ] Các task staff auth, guest auth và Socket.IO có thể tái sử dụng auth foundation này
