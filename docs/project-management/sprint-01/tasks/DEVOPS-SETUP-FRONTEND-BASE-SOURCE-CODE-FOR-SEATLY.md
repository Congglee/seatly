# [DEVOPS] Setup Frontend Base Source Code for Seatly

## Task Title

> **[DEVOPS] Setup Frontend Base Source Code for Seatly**

## Task Description

````
### 🔹 User Story

> As a development team
> I want to set up the frontend base source code in `seatly-web`
> So that Seatly has a stable frontend foundation for implementing the core guest, staff and owner flows in the next tasks.

---

### 🔹 Business Context

Seatly là **web app phục vụ tại bàn bằng QR** dành cho quán ăn / quán đồ uống nhỏ đến vừa, với các luồng cốt lõi như QR menu, guest session tại bàn, guest ordering, realtime order tracking và giao diện vận hành cho nhân viên / chủ quán.

Do định hướng dự án đã thay đổi, task này cần được cập nhật lại để phản ánh đúng **frontend foundation thực tế đã được setup** cho Seatly, thay vì giữ mô tả cũ theo hướng chung chung hoặc theo scope không còn phù hợp.

Frontend base thực tế đang có:

- **Next.js 14**
- **React 18**
- **TypeScript 5**
- **App Router** trong `src/app`
- **TailwindCSS + PostCSS**
- **ESLint** với `eslint-config-next`
- local fonts qua `next/font/local`

Đây là nền tảng source code ban đầu để nhóm tiếp tục triển khai UI cho các màn hình core của Seatly trong các task sau, không phải task xây dựng feature hoàn chỉnh.

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Setup frontend base project

Thiết lập frontend base project trong `seatly-web` với các thành phần nền tảng đã được chọn cho Seatly, bao gồm:

- framework, runtime và version chính
- scripts cơ bản (`dev`, `build`, `start`, `lint`)
- routing approach hiện tại
- cấu hình TypeScript cơ bản
- linting / styling tooling đã tích hợp
- fonts và cấu hình nền cơ bản để tiếp tục mở rộng ở các task sau

---

### 2️⃣ Thiết lập cấu trúc source code frontend cơ bản

Thiết lập cấu trúc source code đủ gọn để bắt đầu phát triển frontend theo hướng App Router.

Cấu trúc hiện tại cần phản ánh rõ:

- frontend đang dùng `src/app`
- đã có `layout.tsx`, `page.tsx`, `globals.css`, `fonts/`
- có thể mở rộng thêm các thư mục khác ở phase sau khi bắt đầu implement feature thật
- chưa yêu cầu hoàn thiện feature modules hoặc kiến trúc frontend đầy đủ ngay trong task setup base

---

### 3️⃣ Đặt frontend trong cùng repository với backend

Frontend hiện nằm cùng repository với backend theo cấu trúc:

```
seatly/
  seatly-server/
  seatly-web/
```

Yêu cầu cần phản ánh đúng rằng frontend và backend nằm trong **cùng một repository**, mỗi app có `package.json` riêng và có thể chạy độc lập.

Task này chỉ yêu cầu thống nhất vị trí và nền tảng source code trong cùng repository, không bắt buộc phải có workspace monorepo tooling hoàn chỉnh ở root.

---

### 4️⃣ Đồng bộ frontend base với định hướng mới của sản phẩm

Frontend base này phải được mô tả là nền tảng để triển khai các nhóm màn hình / luồng cốt lõi của Seatly về sau, ví dụ:

- QR guest menu
- guest entry / nhập tên
- guest ordering
- realtime order tracking
- staff / owner operational screens
- simple payment flow

---

### ❌ Không bao gồm

- Không implement business features hoàn chỉnh của Seatly
- Không kết nối API backend
- Không cấu hình authentication hoàn chỉnh
- Không cài đặt thêm state management như Zustand
- Không cài đặt thêm data fetching layer như TanStack Query
- Không cài đặt Shadcn/UI hoặc design system hoàn chỉnh
- Không thiết lập test automation, CI/CD hoặc production deployment
- Không bắt buộc thiết lập workspace monorepo orchestration hoàn chỉnh ở root

Các phần trên sẽ được triển khai trong các **task frontend / DevOps tiếp theo**.

Task này chỉ tập trung **setup frontend base source code cho Seatly theo định hướng hiện tại của dự án**.
````

## Task Attachments

- [Seatly Github](https://github.com/Congglee/seatly)

## Task Labels

- `Improvement`
- `🔴 High`
- `🟡 Medium`

## Task Checklist

**Frontend Base Setup Acceptance Criteria**

- [ ] Frontend base project trong `seatly-web` được setup với `Next.js 14`, `React 18`, `TypeScript`, `App Router`
- [ ] TailwindCSS, PostCSS, ESLint và local fonts được tích hợp ở mức base để tiếp tục mở rộng trong các task sau
- [ ] Cấu trúc source code cơ bản của frontend được thiết lập trong `src/app` với `layout.tsx`, `page.tsx`, `globals.css`, `fonts/`
- [ ] Frontend được đặt cùng repository với backend và có thể chạy độc lập qua các scripts cơ bản
- [ ] Frontend base được mô tả đúng là nền tảng cho các luồng core mới của Seatly, không còn theo hướng cũ của dự án
