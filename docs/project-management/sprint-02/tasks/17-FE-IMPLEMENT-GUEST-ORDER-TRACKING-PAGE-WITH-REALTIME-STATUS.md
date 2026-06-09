# [FE] Implement Guest Order Tracking Page with Realtime Status

## Task Title

> **[FE] Implement Guest Order Tracking Page with Realtime Status**

## Task Description

```
### 🔹 User Story

> As a guest
> I want to review my submitted orders and see their latest statuses in near realtime
> So that I know whether my dishes are pending, processing, delivered or paid.

---

### 🔹 Business Context

Theo tài liệu Seatly, giá trị của sản phẩm không chỉ nằm ở chỗ đặt món mà còn ở khả năng theo dõi trạng thái món. Trang guest order tracking cần subscribe `update-order` và `payment` events để refetch dữ liệu.

Sprint 2 cần hoàn thiện tối thiểu trải nghiệm này để có một demo end-to-end đúng tinh thần Seatly.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Trang hiển thị danh sách order của guest hiện tại

- load order list từ guest order API
- hiển thị món, số lượng, giá snapshot và trạng thái hiện tại

---

### 2️⃣ Tính tổng cơ bản

- tổng chưa thanh toán
- tổng đã thanh toán hoặc trạng thái tương đương nếu phù hợp

---

### 3️⃣ Nhận realtime update

- subscribe tối thiểu `update-order` và `payment`
- cập nhật lại UI khi backend phát event

---

#### ❌ Không bao gồm

- Không implement timeline chi tiết theo từng lần đổi trạng thái
- Không implement reorder
- Không implement request bill / call staff UI trong task này

Task này chỉ tập trung **order tracking gần realtime cho guest session hiện tại**.
```

## Task Labels

- `Feature`
- `🔴 High`
- `🟡 Medium`

## Task Checklist

**Guest Order Tracking Acceptance Criteria**

- [ ] Có page hiển thị danh sách order của guest hiện tại
- [ ] Trang hiển thị đúng thông tin snapshot và trạng thái order
- [ ] Có tổng cơ bản cho các món chưa thanh toán / đã thanh toán hoặc tương đương
- [ ] Frontend nhận và xử lý realtime event `update-order` và `payment`
- [ ] Guest tracking page đủ dùng để demo luồng theo dõi đơn sau khi đặt món
