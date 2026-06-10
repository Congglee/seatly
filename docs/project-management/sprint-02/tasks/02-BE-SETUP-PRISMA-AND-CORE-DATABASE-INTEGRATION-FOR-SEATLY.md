# [BE] Setup Prisma and Core Database Integration for Seatly

## Task Title

> **[BE] Setup Prisma and Core Database Integration for Seatly**

## Task Description

```
### 🔹 User Story

> As a backend team
> I want to integrate Prisma and the core Seatly schema into `seatly-server`
> So that Sprint 2 features can be implemented on a real and consistent data layer instead of the current scaffold-only backend.

---

### 🔹 Business Context

Hiện tại `seatly-server` mới chỉ có `src/index.ts` in `Hello World`, trong khi các luồng QR ordering cốt lõi của Seatly đều phụ thuộc trực tiếp vào database schema, Prisma client và transaction logic.

Để Seatly có thể triển khai luồng core ở Sprint 2, backend cần được nâng cấp trước với schema bám theo source of truth của Seatly: `Account`, `Dish`, `DishSnapshot`, `RestaurantTable`, `Order`, `RefreshToken`, `Guest`, `Socket`.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Tích hợp Prisma vào `seatly-server`

- thêm `prisma` và `@prisma/client`
- tạo `prisma/schema.prisma`
- tạo Prisma client dùng lại trong backend
- chuẩn bị scripts và cấu hình cần thiết cho local development

---

### 2️⃣ Khai báo core schema đúng với Seatly

Schema phải phản ánh đúng định hướng hiện tại của Seatly:

- `RestaurantTable` dùng `number` và `token`
- `Guest` là guest session tạm thời theo bàn
- `Order` là line item
- `DishSnapshot` giữ lịch sử món tại thời điểm order
- `RefreshToken` dành cho tài khoản nội bộ
- `Socket` dành cho realtime mapping

---

### 3️⃣ Chuẩn bị database integration cho các task sau

- tạo nơi khởi tạo Prisma client tập trung
- đảm bảo backend có thể truy cập database từ route/controller về sau
- chuẩn bị migration hoặc `db push` workflow phù hợp cho Sprint 2

---

#### ❌ Không bao gồm

- Không implement business API hoàn chỉnh trong task này
- Không thêm các bảng future enhancement như `OrderBatch`, `OrderStatusLog`, `TableRequest` vào phạm vi bắt buộc của Sprint 2
- Không triển khai seed data lớn hoặc fixture hoàn chỉnh
- Không tối ưu production database, indexing nâng cao hoặc backup strategy

Task này chỉ tập trung **đưa Prisma và core schema thực sự vào `seatly-server`**.
```

## Task Labels

- `Improvement`
- `🔴 High`
- `🔴 Hard`

## Task Checklist

**Prisma & Core Database Integration Acceptance Criteria**

- [ ] `seatly-server` có Prisma dependencies và Prisma client dùng lại được trong codebase
- [ ] `prisma/schema.prisma` phản ánh đúng 8 bảng lõi hiện tại của Seatly
- [ ] Quan hệ chính giữa `RestaurantTable`, `Guest`, `Order`, `DishSnapshot`, `Account`, `RefreshToken`, `Socket` được khai báo đúng
- [ ] Database integration đủ sẵn sàng để các task auth, table, dish, guest và order của Sprint 2 dùng tiếp
- [ ] Task không kéo thêm các bảng/feature future enhancement vào phạm vi core bắt buộc
