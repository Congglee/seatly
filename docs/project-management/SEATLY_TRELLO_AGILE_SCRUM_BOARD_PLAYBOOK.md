# Seatly – Agile & Scrum Trello Board Playbook (Nhóm 13)

> Tài liệu này hệ thống hoá toàn bộ cách nhóm vận hành Trello board “Seatly – Agile Scrum Board (Nhóm 13)” theo Agile & Scrum (phiên bản tinh gọn), dành cho cả người mới lẫn người đã có kinh nghiệm.  
> Mục tiêu: **dễ onboarding – minh bạch tiến độ – kiểm soát chất lượng – cải tiến liên tục**.

---

## 0) Tổng quan nhanh: Board này dùng để làm gì?

Board của nhóm được thiết kế để mô phỏng một quy trình phát triển phần mềm theo vòng lặp (iterative development), trong đó công việc được kéo qua các trạng thái từ **yêu cầu → thực hiện → review → test → hoàn thành → rút kinh nghiệm**.

Các cột chính trong workflow:

1. **Product Backlog**
2. **Sprint Backlog**
3. **To Do (This Sprint)**
4. **In Progress**
5. **Code Review**
6. **Testing**
7. **Done (Sprint Done)**
8. **Retrospective**
9. **Completed – All Sprints** _(lưu trữ)_

Hai cột bổ trợ (không nằm trong luồng xử lý task):

- **Resources** _(thư viện tài nguyên dự án)_
- **Rules** _(Working Agreement / quy tắc làm việc của nhóm)_

---

## 1) Nguyên tắc cốt lõi (Team Principles)

### 1.1 Minh bạch (Transparency)

- Mọi công việc phải nằm trên board, không “làm chui” ngoài board.
- **Không để task “đứng yên” quá 2 ngày** (không di chuyển cột, không comment, không cập nhật).

### 1.2 Chất lượng trước tiến độ

- Không được “đẩy Done cho đẹp” khi chưa qua đủ Review + Testing.
- **Acceptance Criteria** là tiêu chuẩn bắt buộc để xác định “xong thật sự”.

### 1.3 Kỷ luật nhưng tinh gọn

- Không “Scrum nghi lễ” nặng nề; nhóm dùng **Sprint Sync 1–2 lần/Sprint** thay cho Daily Standup.
- Vẫn giữ lõi Scrum: Sprint Goal, cam kết Sprint, review cuối Sprint, retrospective.

---

## 2) Chuẩn hoá thẻ (Card Conventions)

### 2.1 Title format (bắt buộc)

Dùng prefix theo loại/phạm vi để nhìn phát biết ngay:

- `[FE] Implement Login Page`
- `[BE] Develop Register API`
- `[DEVOPS] Setup CI/CD Pipeline`
- `[BUG] Fix login redirect issue`

**Không viết mơ hồ** kiểu: “Làm backend”, “Fix bug”, “Update hệ thống”.

### 2.2 Labels (khuyến nghị tổ chức theo nhóm)

**(A) Loại công việc (bắt buộc)**  
Feature / Bug / Improvement / Research / Documentation

**(B) Phạm vi kỹ thuật (tuỳ chọn nhưng nên có)**  
Frontend / Backend / DevOps

**(C) Priority (bắt buộc)**  
🔴 High / 🟡 Medium / 🔵 Low

**(D) Độ khó (bắt buộc)**  
🟢 Easy / 🟡 Medium / 🔴 Hard

**(E) Trạng thái đặc biệt**

- `Blocked` → **màu cam đậm** (Dark Orange) để nổi bật, tránh trùng với Bug (đỏ).

### 2.3 Description template (chuẩn cho Product Backlog)

**User Story**

- As a [role]
- I want to [action]
- So that [business value]

**Business Context** (1–3 dòng)  
**Scope**

- Bao gồm:
- Không bao gồm:

**Acceptance Criteria** _(Checklist Trello)_

- [ ] …
- [ ] …

---

## 3) Quy trình làm việc theo Scrum (phiên bản nhóm Seatly)

### 3.1 Sprint cadence (nhịp Sprint)

- **1 Sprint ≈ 1 tuần**
- Có thể điều chỉnh sau khi chạy thực tế, nhưng nên cố định để dễ báo cáo và quen nhịp.

### 3.2 Sprint events (các hoạt động chính)

- **Sprint Planning**: chốt Sprint Goal + chọn task vào Sprint.
- **Sprint Sync (giữa Sprint – ngày 3 hoặc 4)**: đồng bộ nhanh 5–10 phút, phát hiện bottleneck.
- **Sprint Review (cuối Sprint)**: xem kết quả Done, đối chiếu Sprint Goal.
- **Sprint Retrospective (cuối Sprint)**: rút kinh nghiệm quy trình và tạo action items.

---

## 4) Giải thích chi tiết từng cột (kèm cách dùng)

> Mỗi cột đều nên có 1 **instruction card** (thẻ hướng dẫn) đặt ở đầu cột.

---

### 4.1 Product Backlog

**Mục đích**  
Nơi chứa **toàn bộ** ý tưởng, yêu cầu, bug, cải tiến, research… của Seatly. Đây là “kho việc dài hạn”.

**Ai thêm được?**  
Tất cả thành viên đều có thể thêm, **không cần thông báo trước**. Nhưng phải theo chuẩn.

**Không làm trực tiếp từ đây**  
Task chỉ được làm khi đã được chọn vào Sprint (Sprint Backlog).

**Definition of Ready (DoR) – tối thiểu**  
Một task chỉ được xem là sẵn sàng để đưa vào Sprint khi:

- Title đúng format
- Description rõ ràng + Scope
- Có Acceptance Criteria (Checklist)
- Có labels: loại công việc + priority + độ khó

**Checklist gợi ý cho instruction card Product Backlog**

- ☐ Tiêu đề đúng format
- ☐ Có User Story rõ ràng
- ☐ Có Acceptance Criteria (Checklist)
- ☐ Có label loại công việc
- ☐ Có Priority
- ☐ Có độ khó (Easy/Medium/Hard)
- ☐ Task đủ nhỏ để hoàn thành trong 1 Sprint
- ☐ Không trùng lặp task khác

---

### 4.2 Sprint Backlog

**Mục đích**  
Danh sách các task mà nhóm **cam kết** hoàn thành trong Sprint (1 tuần), dựa trên Sprint Goal.

**Sprint Goal (bắt buộc)**  
Mỗi Sprint có 1 mục tiêu. Ví dụ: “Hoàn thành Login & Register”.

**Cách chọn task**

- Task phải liên quan Sprint Goal
- Task phải đạt DoR
- Mỗi thành viên **tối đa 5 task / Sprint**
- Cân nhắc độ khó để không overcommit

**Rule thêm task giữa Sprint (có điều kiện)**

- Chỉ thêm khi đã hoàn thành các task đang làm
- Task mới phải hỗ trợ Sprint Goal (hoặc bug nghiêm trọng)

**Time rule**

- Reviewer phản hồi trong 1 ngày; task không nằm “kẹt” quá 2 ngày ở Code Review / Testing (xem các cột sau).

**Checklist gợi ý cho instruction card Sprint Backlog (Sprint Entry Checklist)**

- ☐ Sprint Goal rõ ràng
- ☐ Task liên quan Sprint Goal
- ☐ Task đạt DoR
- ☐ Task đã assign
- ☐ Task có Due Date (trong Sprint)
- ☐ Mỗi người ≤ 5 task
- ☐ Cân nhắc độ khó hợp lý
- ☐ Đúng flow: Sprint Backlog → To Do → In Progress…

---

### 4.3 To Do (This Sprint)

**Mục đích**  
Danh sách các task trong Sprint mà thành viên **chuẩn bị bắt đầu làm ngay**.

**Quan trọng**

- Sprint Backlog là “cam kết đầu Sprint” (phương án B).
- Khi Sprint bắt đầu, task được **di chuyển sang To Do** để chuẩn bị thực thi.
- **Chỉ đưa vào To Do khi thực sự sẵn sàng làm**, tránh biến To Do thành nơi “xếp hàng”.

**Điều kiện vào To Do**

- Đã assign
- Có Due Date
- Có đủ thông tin kỹ thuật

**Bắt đầu làm**

- Kéo To Do → In Progress

**Blocked**

- Nếu chưa thể bắt đầu, giữ ở To Do + gắn label `Blocked` + comment lý do.

**Checklist gợi ý cho instruction card To Do (Ready to Execute Checklist)**

- ☐ Thuộc Sprint hiện tại và phù hợp Sprint Goal
- ☐ Đã assign
- ☐ Có Due Date
- ☐ Không còn blocker chưa xử lý _(hoặc đã gắn Blocked + comment)_
- ☐ Sẵn sàng bắt đầu trong 24h
- ☐ Đã đọc và hiểu Acceptance Criteria

---

### 4.4 In Progress

**Mục đích**  
Task đang được thực hiện **thực sự**.

**WIP limit**

- Mỗi thành viên chỉ nên làm tối đa **3–4 task cùng lúc**.

**Rule minh bạch**

- Không để task “đứng yên” quá 2 ngày → phải comment cập nhật.

**Scope creep**

- Nhỏ: cập nhật trong task hiện tại.
- Lớn: tạo task mới ở Product Backlog.

**Blocked**

- Giữ ở In Progress + gắn `Blocked` + comment lý do.

**Điều kiện sang Code Review**

- Hoàn thành Acceptance Criteria
- Self-test/self-verify trước

**Checklist gợi ý cho instruction card In Progress (Working Rules Checklist)**

- ☐ Task đang được làm thật (không “giữ chỗ”)
- ☐ Không vượt WIP 3–4 task
- ☐ Bám Acceptance Criteria
- ☐ Nếu > 2 ngày: đã comment cập nhật
- ☐ Scope creep lớn → đã tách task mới
- ☐ Nếu blocked → đã gắn Blocked + comment
- ☐ Đã self-test trước khi sang Code Review

---

### 4.5 Code Review

**Mục đích**  
Cổng kiểm soát chất lượng trước Testing.

**Ai review?**

- Trưởng nhóm review chính; thành viên khác góp ý.
- Người làm task **không được tự approve**.

**Khi review fail**

- Comment rõ lý do
- Thêm prefix:  
  `"[REVIEW-FAIL] ..."`
- **Chuyển task về In Progress để sửa**

Sau khi approve → remove prefix `[REVIEW-FAIL]`.

**Time rule**

- Reviewer phản hồi trong 1 ngày làm việc
- Task không nằm ở Code Review quá 2 ngày

**Checklist gợi ý cho instruction card Code Review (Approval Checklist)**

- ☐ Đáp ứng Acceptance Criteria
- ☐ Không còn lỗi must-fix
- ☐ Logic nghiệp vụ đúng
- ☐ Naming convention ổn
- ☐ Không code dư thừa / debug log
- ☐ Người làm đã self-test
- ☐ Feedback must-fix đã resolve
- ☐ Nếu từng fail → đã remove `[REVIEW-FAIL]` trước khi chuyển Testing

---

### 4.6 Testing

**Mục đích**  
Kiểm thử cuối trước Done.

**Ai test?**

- Ưu tiên người khác test (không phải người code).
- Người code có thể self-test trước, nhưng không nên là tester chính.

**Nội dung test**

- Functional
- Logic & nghiệp vụ
- UI/UX
- Performance cơ bản
- Theo Acceptance Criteria

**Fail testing**

- Chuyển về In Progress
- Thêm prefix `[REVIEW-FAIL]`
- Bug nhỏ: comment trong task
- Bug lớn: tạo task Bug mới ở Product Backlog

**Done condition**

- Pass test + leader xác nhận + remove prefix

**Time rule**

- Không để task ở Testing quá 2 ngày
- Trong 2 ngày phải có ít nhất 1 người (không phải người code) test và phản hồi

**Checklist gợi ý cho instruction card Testing (Testing Verification Checklist)**

- ☐ Đã test toàn bộ Acceptance Criteria
- ☐ Functional đúng
- ☐ Logic nghiệp vụ đúng
- ☐ Không còn bug must-fix
- ☐ UI/UX ổn (nếu có UI)
- ☐ Không lỗi console / crash
- ☐ Đã test input valid & invalid cơ bản
- ☐ Nếu có bug: đã comment rõ
- ☐ Nếu bug lớn: đã tạo task Bug riêng
- ☐ Đủ điều kiện chuyển Done

---

### 4.7 Done (Sprint Done)

**Mục đích**  
Thành quả chính thức của Sprint (để demo, thống kê, báo cáo).

**Chỉ được chuyển Done khi**

- Pass Testing
- Leader xác nhận lần cuối
- Đáp ứng Sprint Goal
- Không còn prefix `[REVIEW-FAIL]`
- Không còn label Blocked
- Comment liên quan đã resolve

**Sau Sprint**

- Task Done sẽ được chuyển sang “Completed – All Sprints” để lưu trữ.

**Definition of Done (DoD) checklist (bắt buộc)**

- ☐ Hoàn thành Acceptance Criteria
- ☐ Pass Code Review
- ☐ Pass Testing
- ☐ Không còn lỗi must-fix
- ☐ Không còn `[REVIEW-FAIL]`
- ☐ Không còn Blocked
- ☐ Comment đã resolve
- ☐ Leader xác nhận
- ☐ Đóng góp Sprint Goal

---

### 4.8 Retrospective

**Mục đích**  
Cải tiến quy trình (Inspect & Adapt). Không phải “demo sản phẩm”.

**Cách làm (Cách A)**

- Mỗi Sprint tạo **1 card**: `Retro – Sprint X`
- Format bắt buộc: **Went well / Not well / Action items**
- Action items: tối đa 1–3 item/Sprint, có owner, có áp dụng từ Sprint sau.
- Action item nhỏ: giữ trong card Retro
- Action item lớn: tạo task ở Product Backlog

**Retrospective checklist**

- ☐ Went well đầy đủ
- ☐ Not well cụ thể (không chung chung)
- ☐ Nếu cần: nêu nguyên nhân chính
- ☐ 1–3 action items cụ thể
- ☐ Mỗi action item có owner
- ☐ Action item lớn đã tạo task ở Product Backlog
- ☐ Xác định cách áp dụng Sprint tiếp theo

**Ví dụ Retro (Seatly – Login/Register)**

- Went well: FE/BE thống nhất API sớm; Sprint Sync phát hiện sớm task kẹt.
- Not well: Task kẹt Code Review > 2 ngày; Testing dồn cuối Sprint.
- Action items: bắt buộc tag leader khi chuyển Code Review; cố định Sprint Sync ngày 3; giới hạn WIP 3 task/người.

---

### 4.9 Completed – All Sprints

**Mục đích**  
Cột lưu trữ lịch sử các Sprint đã hoàn thành.

**Cách dùng**

- Sau khi Sprint kết thúc, chuyển các task Done vào đây.
- Chỉ dùng để lưu trữ/thống kê/báo cáo, hạn chế chỉnh sửa.

---

## 5) Hai cột bổ trợ

### 5.1 Resources (thư viện dự án)

**Mục đích**: lưu link/tài liệu dự án (report template, slides, repo, testcases…).  
**Nguyên tắc**: mỗi loại tài nguyên 1 card.

Gợi ý card:

- GitHub Repositories
- Slides / Report Templates
- Test Cases (Excel)
- Reference Websites
- Setup Guides

### 5.2 Rules (Working Agreement)

**Mục đích**: quy tắc làm việc thống nhất, mỗi rule 1 card.  
**Nguyên tắc**: rule ngắn gọn, rõ ràng, có ví dụ; có thể cập nhật sau Retro.

Gợi ý card:

- Branching Rule
- Pull Request Rule
- Code Style Rule
- Commit Message Convention
- Review Time Rule
- WIP Limit Rule

---

## 6) Hướng dẫn vận hành board hiệu quả (Best Practices)

### 6.1 Đừng làm “to” một task

Một task quá lớn sẽ:

- khó estimate
- dễ trễ
- dễ scope creep

→ chia nhỏ theo deliverable cụ thể (API/UI/Test…)

### 6.2 Đừng “giữ chỗ” ở To Do / In Progress

To Do = sắp làm ngay  
In Progress = đang làm thật

### 6.3 Đừng bỏ qua comment khi fail review/test

Comment là “bằng chứng” và là “hướng sửa”.
Thiếu comment → task quay vòng tốn thời gian.

### 6.4 Đừng để bottleneck ở Code Review/Testing

Áp dụng time rule:

- review phản hồi trong 1 ngày
- không kẹt quá 2 ngày

### 6.5 Retro phải tạo ra action items

Không action items → Sprint sau lặp lỗi y chang.

---

## 7) Mẫu thẻ (templates) để copy nhanh

### 7.1 Template Product Backlog (copy-paste)

**Title**: `[FE] ...` / `[BE] ...` / `[BUG] ...`  
**Description**

- As a …
- I want …
- So that …

Business Context: …  
Scope:

- Bao gồm: …
- Không bao gồm: …

Acceptance Criteria (Checklist):

- [ ] …
- [ ] …

Labels:

- Type: …
- Priority: …
- Difficulty: …

### 7.2 Template Retro – Sprint X (copy-paste)

Went well:

- …

Not well:

- …

Action items:

1. Action: … | Owner: … | Áp dụng: Sprint …
2. Action: … | Owner: … | Áp dụng: Sprint …

---

## 8) Phụ lục: Từ điển nhanh (để onboard người mới)

- **Sprint**: 1 vòng làm việc (nhóm đang dùng 1 tuần).
- **Sprint Goal**: mục tiêu chung của Sprint.
- **Backlog**: danh sách việc cần làm.
- **Acceptance Criteria**: điều kiện để task được coi là đạt.
- **DoR (Definition of Ready)**: tiêu chuẩn để task đủ rõ ràng và sẵn sàng đưa vào Sprint.
- **DoD (Definition of Done)**: tiêu chuẩn để task được coi là Done thật sự.
- **WIP limit**: giới hạn số việc đang làm để tránh phân tán.
- **Scope creep**: phình phạm vi ngoài kế hoạch ban đầu.
- **Sprint Sync**: buổi đồng bộ giữa Sprint (ngày 3 hoặc 4) để phát hiện vấn đề sớm.

---

## 9) Kết luận

Board “Seatly – Agile Scrum Board (Nhóm 13)” được thiết kế theo hướng Scrum tinh gọn nhưng vẫn đủ kỷ luật để:

- theo dõi tiến độ minh bạch,
- kiểm soát chất lượng chặt,
- và cải tiến liên tục qua từng Sprint.

Nếu vận hành đúng rule, nhóm sẽ giảm mạnh tình trạng:

- task bị “chết”,
- bottleneck ở review/test,
- Done “ảo”,
- và Sprint lặp lại lỗi cũ.
