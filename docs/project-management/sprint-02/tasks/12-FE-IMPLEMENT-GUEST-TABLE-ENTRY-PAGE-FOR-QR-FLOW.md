# [FE] Implement Guest Table Entry Page for QR Flow

## Task Title

> **[FE] Implement Guest Table Entry Page for QR Flow**

## Task Description

```
### 🔹 User Story

> As a guest
> I want to enter my name after scanning a table QR code
> So that I can join the correct table session and start ordering.

---

### 🔹 Business Context

Route vào bàn là bước đầu tiên của guest flow. Seatly cần một màn hình vào bàn rõ ràng, mobile-first và bám đúng logic `tableNumber + token`.

Task này là cầu nối giữa QR code ở bàn và khu vực guest của web app.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Trang guest entry theo bàn

- đọc `tableNumber` từ route
- đọc `token` từ query string hoặc entry link
- hiển thị form nhập tên guest

---

### 2️⃣ Kết nối guest session API

- submit dữ liệu vào guest login API
- lưu session frontend ở mức cần thiết

---

### 3️⃣ Chuyển guest sang khu menu

- sau khi vào bàn thành công, điều hướng sang guest menu
- xử lý trạng thái lỗi nếu token bàn không hợp lệ hoặc bàn không được phục vụ

---

#### ❌ Không bao gồm

- Không implement multi-step onboarding cho guest
- Không implement call staff hoặc request bill ở màn hình này
- Không mở rộng sang flow guest group management

Task này chỉ tập trung **màn hình vào bàn cho QR flow cốt lõi**.
```

## Task Labels

- `Feature`
- `🔴 High`
- `🟡 Medium`

## Task Checklist

**Guest Table Entry UI Acceptance Criteria**

- [ ] Có route/page guest entry theo `tableNumber`
- [ ] Page đọc được token bàn từ URL và gửi đúng payload tới guest session API
- [ ] Guest có thể nhập tên để vào bàn
- [ ] Sau khi thành công, guest được chuyển sang guest menu
- [ ] Page xử lý được các lỗi cơ bản như token sai hoặc bàn không hợp lệ
