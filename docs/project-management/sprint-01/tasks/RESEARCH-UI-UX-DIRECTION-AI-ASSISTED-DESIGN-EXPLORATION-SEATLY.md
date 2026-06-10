# [RESEARCH] UI/UX Direction & AI-assisted Design Exploration (Seatly)

## Task Title

> **[RESEARCH] UI/UX Direction & AI-assisted Design Exploration (Seatly)**

## Task Description

```
### 🔹 User Story

> As a product/design/frontend team
> I want to research UI/UX direction and create lightweight design exploration for Seatly
> So that the team can align a usable visual direction for the core QR ordering experience before implementing the frontend.

---

### 🔹 Business Context

Seatly là **web app phục vụ tại bàn bằng QR** dành cho quán ăn / quán đồ uống nhỏ đến vừa, tập trung vào luồng cốt lõi: khách quét QR vào đúng bàn, nhập tên để tạo guest session tạm thời, xem menu, đặt món, theo dõi trạng thái món gần realtime; nhân viên xử lý order và chủ quán theo dõi vận hành cơ bản.

UI/UX research của task này phải bám đúng scope hiện tại của sản phẩm:

- **mobile-first** cho `Guest`
- **web dashboard** cho `Employee` và `Owner/Manager`
- ưu tiên **core/MVP** trước
- phản ánh đúng luồng nghiệp vụ và phạm vi tài liệu hiện tại

Các hướng như `TableRequest` / call staff workflow đầy đủ, ETA nâng cao, order timeline, quick reorder, auto occupancy, auto session timeout chỉ được xem là **future enhancement để tham khảo**, không phải trọng tâm thiết kế bắt buộc trong task này.

---

### 🔹 Scope

#### ✅ Bao gồm

**1️⃣ Research UI/UX references**

Tìm và chọn tối thiểu **5 website / UI reference chất lượng**, ưu tiên các kiểu giao diện phù hợp với Seatly, bao phủ các nhóm màn hình và pattern sau:

- mobile QR menu / food ordering
- guest entry / name input
- order tracking gần realtime
- staff order management dashboard
- owner / manager operations dashboard
- simple payment / bill review

Các nguồn tham khảo có thể gồm:

- UI inspiration websites
- product UI showcases
- component libraries hoặc design systems
- open-source UI examples

Mục tiêu là tìm **layout, component structure hoặc interaction pattern** có thể áp dụng cho các màn hình core của Seatly:

- guest entry / nhập tên
- QR guest menu / dish list
- order summary / submit order
- realtime order tracking
- staff order handling
- table management / operations overview
- simple payment

---

**2️⃣ AI-assisted design exploration (khuyến khích, không bắt buộc)**

Có thể sử dụng các công cụ hỗ trợ thiết kế để tạo prototype nhanh, ví dụ:

- **Figma** để tạo wireframe hoặc mockup
- **AI design tools** để generate UI layout hoặc concept nhanh

Mục tiêu của bước này:

- tạo một số bản phác thảo UI ban đầu cho Seatly
- thử nghiệm layout, information hierarchy và role-based structure cho **3-5 màn hình core**, ví dụ:
  - guest entry / nhập tên
  - QR menu / dish list
  - order summary
  - realtime order tracking
  - staff order handling
  - owner / manager dashboard
  - simple payment

Prototype **không cần hoàn chỉnh pixel-perfect**.

---

**3️⃣ Synthesis để team dùng lại cho bước thiết kế / implement**

Kết quả research cần chỉ ra rõ:

- pattern nào phù hợp cho trải nghiệm **mobile-first** của khách
- cách thể hiện **trạng thái order / realtime update** trong UI
- cách phân tách **3 role chính**: `Guest`, `Employee`, `Owner/Manager`
- phần nào là **core/MVP**, phần nào chỉ là **future enhancement**
- hướng visual / information hierarchy đủ rõ để team sử dụng lại trong Sprint tiếp theo

---

### 📤 Output

Kết quả được ghi trực tiếp trong **Comments hoặc Attachments của Trello card**.

Cần bao gồm:

- danh sách tối thiểu **5 UI reference website**
- mỗi reference có:
  - URL
  - screenshot đính kèm (Trello attachment)
- mapping ngắn gọn giữa từng reference với màn hình / flow có thể áp dụng
- ghi chú ngắn về:
  - visual direction
  - mobile-first pattern
  - realtime pattern
  - dashboard pattern
- danh sách các màn hình core nên ưu tiên thiết kế trước

Nếu có prototype hoặc mockup:

- đính kèm **file hoặc link Figma / AI tool**

Không bắt buộc tạo tài liệu riêng (Docs / PDF / Notion), miễn toàn bộ nội dung cần thiết đã nằm trong Trello card.

---

### ❌ Không bao gồm

- Không implement UI vào codebase
- Không tạo component React / Next.js
- Không cấu hình design system chính thức
- Không chốt color palette, typography hoặc theme cuối cùng
- Không tạo mockup pixel-perfect bắt buộc
- Không mở rộng research sang multi-restaurant / multi-branch
- Không mở rộng sang inventory, CRM, ERP, loyalty, delivery ecosystem hoặc POS hardware workflow
- Không coi `TableRequest`, ETA nâng cao, order timeline, quick reorder, auto occupancy, auto session timeout là phạm vi core bắt buộc

Task này chỉ tập trung vào **UI/UX research và design exploration**.
```

## Task Labels

- `Research`
- `🟡 Medium`
- `🟡 Medium`

## Task Checklist

**Seatly UI/UX Research & Prototype Exploration**

- [ ] Thu thập tối thiểu 5 UI/UX references có URL và screenshot đính kèm trong Trello card
- [ ] References bao phủ các màn hình core chính: guest entry, QR menu / dish list, order tracking, staff / owner dashboard và simple payment
- [ ] Có tổng hợp ngắn gọn pattern phù hợp cho `Guest`, `Employee`, `Owner/Manager`, bao gồm mobile-first và realtime order status
- [ ] Có phân biệt rõ phần core/MVP với future enhancement để tránh research lệch scope
- [ ] Nếu có prototype/mockup: đính kèm file hoặc link Figma / AI tool cho 3-5 màn hình core
- [ ] Toàn bộ kết quả được tổng hợp ngay trong Trello card comment / attachment theo format dễ dùng lại cho bước thiết kế / implement
