# [DEVOPS] Setup Backend Base Source Code for Seatly

## Task Title

> **[DEVOPS] Setup Backend Base Source Code for Seatly**

## Task Description

```
### 🔹 User Story

> As a development team
> I want to set up the backend base source code in `seatly-server` and place it in the shared project repository
> So that Seatly has a stable backend foundation for implementing the core API and realtime flows in the next tasks.

---

### 🔹 Business Context

Seatly là **web app phục vụ tại bàn bằng QR** dành cho quán ăn / quán đồ uống nhỏ đến vừa, với các luồng cốt lõi như QR menu, guest session tại bàn, guest ordering, realtime order tracking và giao diện vận hành cho nhân viên / chủ quán.

Do định hướng dự án đã thay đổi, task này cần được cập nhật lại để phản ánh đúng **backend foundation thực tế đã được setup** cho Seatly, thay vì giữ mô tả cũ theo stack và workflow không còn đúng.

Backend base thực tế đang có:

- **Node.js**
- **TypeScript 5**
- **Fastify 4**
- **Nodemon + tsx** cho môi trường development
- **ESLint**
- **Prettier**

Đây là nền tảng source code ban đầu để nhóm tiếp tục triển khai API, database integration và business logic cho các luồng core của Seatly trong các task sau.

Việc chuẩn hóa nền tảng này giúp:

- đảm bảo cấu trúc code rõ ràng và nhất quán
- giúp các thành viên dễ dàng bắt đầu phát triển feature
- giảm xung đột code khi làm việc nhóm
- giữ workflow repository rõ ràng giữa backend và frontend trong cùng dự án

---

### 🔹 Scope

#### ✅ Bao gồm

### 1️⃣ Setup backend base project

Thiết lập backend base project trong `seatly-server` với các thành phần nền tảng đã được chọn cho Seatly, bao gồm:

- framework, runtime và version chính
- scripts cơ bản (`dev`, `build`, `start`, `lint`, `prettier`)
- cấu hình TypeScript cơ bản
- linting / formatting tooling đã tích hợp
- dev workflow với `nodemon` và `tsx`
- entry point backend ban đầu để tiếp tục mở rộng ở các task sau

---

### 2️⃣ Thiết lập cấu trúc source code backend cơ bản

Thiết lập cấu trúc source code đủ gọn để bắt đầu phát triển backend theo hướng mở rộng dần.

Cấu trúc hiện tại cần phản ánh rõ:

- backend đang dùng `src/`
- đã có entry point `src/index.ts`
- đã có cấu hình `tsconfig.json`, `nodemon.json`, `eslint.config.mjs`
- có thể mở rộng thêm routes, modules, services, database layer ở phase sau
- chưa yêu cầu hoàn thiện kiến trúc backend đầy đủ ngay trong task setup base

---

### 3️⃣ Đặt backend trong cùng repository với frontend

Backend hiện nằm cùng repository với frontend theo cấu trúc:

```

seatly/
seatly-server/
seatly-web/

```

Yêu cầu cần phản ánh đúng rằng backend và frontend nằm trong **cùng một repository**, mỗi app có `package.json` riêng và có thể chạy độc lập.

Task này chỉ yêu cầu thống nhất vị trí và nền tảng source code trong cùng repository, không bắt buộc phải có workspace monorepo tooling hoàn chỉnh ở root.

---

### 4️⃣ Thiết lập repository workflow ở mức nền tảng

Task này cần phản ánh rằng dự án có repository GitHub chung cho Seatly và backend base được đặt trong workflow làm việc chung của nhóm.

Phần workflow ở mức nền tảng nên bao gồm:

- repository chung cho backend / frontend
- làm việc qua branch riêng và Pull Request
- giữ cách tổ chức source code nhất quán cho các task sau

Không nên mô tả quá chi tiết các branch protection rules hoặc quy tắc nhánh nếu chưa phải source of truth hiện tại của dự án.

---

### 5️⃣ Đồng bộ backend base với định hướng mới của sản phẩm

Backend base này phải được mô tả là nền tảng để triển khai các nhóm logic / API cốt lõi của Seatly về sau, ví dụ:

- quản lý bàn và QR token
- guest session tại bàn
- menu / dish data
- order line item và trạng thái order
- realtime support cho guest / staff flows
- vận hành cơ bản cho nhân viên / chủ quán

---

### ❌ Không bao gồm

- Không cấu hình database
- Không tích hợp Prisma ORM
- Không thiết lập PostgreSQL
- Không tạo migration
- Không triển khai API business logic hoàn chỉnh
- Không cấu hình Docker
- Không thiết lập CI/CD pipeline
- Không triển khai server production
- Không bắt buộc thiết lập workspace monorepo orchestration hoàn chỉnh ở root

Những phần trên sẽ được thực hiện ở các task riêng trong các Sprint tiếp theo.

Task này chỉ tập trung **setup backend base source code và repository workflow nền tảng cho Seatly theo định hướng hiện tại của dự án**.
```

## Task Attachments

**Links:**

- [Seatly Github](https://github.com/Congglee/seatly)

## Task Labels

- `Improvement`
- `🔴 High`
- `🟡 Medium`

## Task Checklist

**Backend Base Project & GitHub Workflow Setup**

- [ ] Backend base project trong `seatly-server` được setup với `Node.js`, `TypeScript`, `Fastify`
- [ ] Nodemon, tsx, ESLint và Prettier được tích hợp ở mức base để tiếp tục mở rộng trong các task sau
- [ ] Cấu trúc source code cơ bản của backend được thiết lập với `src/index.ts`, `tsconfig.json`, `nodemon.json`, `eslint.config.mjs`
- [ ] Backend được đặt cùng repository với frontend và có thể chạy độc lập qua các scripts cơ bản
- [ ] Backend base được mô tả đúng là nền tảng cho các luồng core mới của Seatly, không còn theo hướng cũ của dự án
