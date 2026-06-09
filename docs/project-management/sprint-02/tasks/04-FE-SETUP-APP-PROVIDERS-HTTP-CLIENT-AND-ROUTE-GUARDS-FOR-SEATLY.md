# [FE] Setup App Providers, HTTP Client and Route Guards for Seatly

## Task Title

> **[FE] Setup App Providers, HTTP Client and Route Guards for Seatly**

## Task Description

```
### 🔹 User Story

> As a frontend team
> I want to establish the shared app architecture for session handling, API calls and protected routes
> So that all Sprint 2 screens can be implemented on a consistent frontend foundation instead of the current Next.js starter.

---

### 🔹 Business Context

`seatly-web` hiện vẫn là `create-next-app` starter. Seatly cần sớm có frontend foundation rõ ràng qua `providers`, `lib/http.ts`, `queries`, session token handling và `middleware.ts` hoặc cơ chế tương đương cho role-based route protection.

Seatly không cần copy toàn bộ hệ thống đó ngay, nhưng Sprint 2 cần một nền tảng đủ tốt để triển khai nhanh các màn hình core.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Thiết lập frontend shared architecture

- cấu trúc thư mục cho `apis`, `queries`, `providers`, `lib`, `schemas` hoặc tương đương
- query provider và app provider tối thiểu

---

### 2️⃣ Tạo HTTP client dùng chung

- gọi được API backend
- đính kèm access token khi cần
- chuẩn bị xử lý login / logout / refresh session ở mức phù hợp Sprint 2

---

### 3️⃣ Thiết lập route/session guard ở frontend

- phân tách khu public, guest và manage
- chặn truy cập sai vai trò ở mức tối thiểu
- chuẩn bị app shell để các màn hình sau dùng tiếp

---

#### ❌ Không bao gồm

- Không triển khai i18n đầy đủ trong Sprint 2
- Không triển khai dark mode, analytics, SEO nâng cao
- Không implement toàn bộ token refresh orchestration phức tạp nếu chưa cần

Task này chỉ tập trung **dựng frontend foundation cho các màn hình Sprint 2**.
```

## Task Labels

- `Improvement`
- `🔴 High`
- `🟡 Medium`

## Task Checklist

**Frontend Foundation Acceptance Criteria**

- [ ] `seatly-web` có shared structure rõ ràng cho API, query, provider và utility layer
- [ ] Có HTTP client dùng lại được cho guest và staff flows
- [ ] Có query/provider foundation để các page Sprint 2 dùng tiếp
- [ ] Có route/session guard tối thiểu cho public, guest và manage area
- [ ] Frontend foundation không còn ở trạng thái starter page đơn thuần
