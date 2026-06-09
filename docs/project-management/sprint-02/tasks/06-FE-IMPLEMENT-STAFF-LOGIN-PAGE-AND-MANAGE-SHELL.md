# [FE] Implement Staff Login Page and Manage Shell

## Task Title

> **[FE] Implement Staff Login Page and Manage Shell**

## Task Description

```
### 🔹 User Story

> As an owner or employee
> I want to log in and enter a protected management area
> So that I can access the operational screens required in Sprint 2.

---

### 🔹 Business Context

Seatly hiện chưa có bất kỳ màn hình quản trị nào, nên task này phải được làm sớm để các page quản lý bàn, món và order có nơi gắn vào.

Task này chỉ tập trung staff entry point và app shell, không gộp các feature quản trị cụ thể.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Trang staff login

- form đăng nhập bằng `email` và `password`
- gọi staff auth API
- lưu session frontend ở mức cần thiết

---

### 2️⃣ Manage layout / shell

- tạo layout riêng cho khu quản trị
- có điều hướng cơ bản tới `tables`, `dishes`, `orders`
- hiển thị trạng thái đăng nhập tối thiểu

---

### 3️⃣ Chuyển hướng sau đăng nhập

- sau khi login thành công, điều hướng vào khu `manage`
- chặn người chưa đăng nhập truy cập route quản trị

---

#### ❌ Không bao gồm

- Không implement employee account management page
- Không implement dashboard analytics
- Không implement profile/setting nâng cao trong task này

Task này chỉ tập trung **entry shell của backoffice Sprint 2**.
```

## Task Labels

- `Feature`
- `🔴 High`
- `🟡 Medium`

## Task Checklist

**Staff Login & Manage Shell Acceptance Criteria**

- [ ] Có trang login cho staff kết nối được với backend auth API
- [ ] Sau khi login thành công, user được vào `manage` area
- [ ] Có manage layout hoặc navigation shell cho các màn hình Sprint 2
- [ ] User chưa đăng nhập không thể truy cập trực tiếp các route quản trị chính
- [ ] Task không gộp thêm dashboard hoặc account management ngoài phạm vi cần thiết
