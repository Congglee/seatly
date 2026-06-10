# [FE] Implement Table Management Page with QR Preview

## Task Title

> **[FE] Implement Table Management Page with QR Preview**

## Task Description

```
### 🔹 User Story

> As an owner or employee
> I want to manage tables and preview each table QR entry point
> So that I can set up the physical tables for the guest QR ordering flow.

---

### 🔹 Business Context

Với Seatly, đây là màn hình quan trọng vì mỗi bàn cần có token/link riêng trước khi guest có thể quét QR và vào đúng flow.

Task này nên được tách riêng khỏi dish management để đảm bảo phạm vi rõ và dễ review/test.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Danh sách bàn trong khu quản trị

- hiển thị `number`, `capacity`, `status`
- lấy dữ liệu từ table API

---

### 2️⃣ Tạo / sửa / xoá bàn

- form tạo bàn
- form sửa bàn
- thao tác xoá bàn

---

### 3️⃣ QR preview / table entry link preview

- hiển thị QR hoặc ít nhất link bàn từ `tableNumber + token`
- hỗ trợ staff kiểm tra nhanh điểm vào guest flow

---

#### ❌ Không bao gồm

- Không implement in ấn hàng loạt QR code
- Không implement auto occupancy UI
- Không implement floor plan hoặc sơ đồ bàn nâng cao

Task này chỉ tập trung **quản lý bàn và kiểm tra QR entry point ở mức core**.
```

## Task Labels

- `Feature`
- `🔴 High`
- `🟡 Medium`

## Task Checklist

**Table Management UI Acceptance Criteria**

- [ ] Có trang quản lý bàn trong `manage` area
- [ ] Trang hiển thị danh sách bàn từ backend API
- [ ] Có thao tác tạo, sửa, xoá bàn ở mức cơ bản
- [ ] Mỗi bàn có QR preview hoặc link preview để dùng cho guest QR flow
- [ ] Table management page đủ dùng để chuẩn bị dữ liệu thật cho guest entry task
