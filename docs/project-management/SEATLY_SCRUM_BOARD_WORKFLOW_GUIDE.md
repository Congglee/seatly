# Seatly – Agile Scrum Board (Nhóm 13)

## 📋 1. Product Backlog Guide

### Instruction Card Title

> **📘 [READ FIRST] – Hướng dẫn cột Product Backlog**

### Instruction Card Description

````
# 📌 HƯỚNG DẪN CỘT PRODUCT BACKLOG

---

## 🎯 Product Backlog là gì?

Product Backlog là **danh sách toàn bộ công việc của dự án Seatly**.

Bao gồm:

- Feature (tính năng mới)
- Bug (lỗi cần sửa)
- Improvement (cải tiến)
- Research (nghiên cứu kỹ thuật)
- Documentation (tài liệu)

Đây là **nguồn công việc dài hạn** của dự án.

⚠️ Không thực hiện công việc trực tiếp từ cột này.
Chỉ những task được chọn trong Sprint Planning mới được chuyển sang Sprint Backlog.

---

# 🆕 Ai có thể thêm task?

Tất cả thành viên đều có thể thêm task vào Product Backlog.

Tuy nhiên, task phải tuân theo format chuẩn bên dưới.
Không thêm task mơ hồ hoặc thiếu thông tin.

---

# 📝 FORMAT CHUẨN KHI TẠO TASK

---

## 1️⃣ Tiêu đề (Card Title)

Viết ngắn gọn theo format:

```
[FE] Implement Login Page
[BE] Develop Register API
[FE] Implement Product Detail Page
[BUG] Fix login redirect issue
```

Tiêu đề phải rõ ràng, không viết kiểu:

- “Làm backend”
- “Fix bug”
- “Update hệ thống”

---

## 2️⃣ Description (bắt buộc)

Sử dụng cấu trúc sau:

### 🔹 User Story

> As a [role]
> I want to [action]
> So that [business value]

Ví dụ:

> As a user
> I want to register an account
> So that I can access the Seatly system.

---

### 🔹 Business Context (1–3 dòng)

Giải thích ngắn gọn vì sao cần tính năng này.

Ví dụ:

Tính năng đăng ký là bước đầu tiên để người dùng có thể sử dụng hệ thống và thực hiện mua hàng.

---

### 🔹 Scope

- Bao gồm:
- Không bao gồm:

Ví dụ:

Bao gồm:

- Tạo tài khoản bằng email/password
- Validate dữ liệu đầu vào

Không bao gồm:

- Đăng nhập bằng Google
- Quản lý hồ sơ người dùng

---

## 3️⃣ Acceptance Criteria (Checklist Trello)

Phải thêm Checklist thể hiện điều kiện hoàn thành.

Ví dụ:

- [ ] Người dùng nhập email hợp lệ
- [ ] Mật khẩu tối thiểu 6 ký tự
- [ ] Tạo tài khoản thành công lưu vào database
- [ ] Không lỗi console

⚠️ Nếu chưa có Acceptance Criteria → không được đưa vào Sprint.

---

# 🏷️ LABEL BẮT BUỘC

Mỗi task phải có:

### 1️⃣ Loại công việc (bắt buộc)

- Feature
- Bug
- Improvement
- Research
- Documentation

### 2️⃣ Priority

- 🔴 High
- 🟡 Medium
- 🔵 Low

### 3️⃣ Độ khó (Estimation)

- 🟢 Easy
- 🟡 Medium
- 🔴 Hard

Không được để task không có label.

---

# 📏 QUY TẮC CHIA NHỎ TASK

- Task phải có khả năng hoàn thành trong 1 Sprint (≈ 1 tuần).
- Nếu quá lớn → người tạo task có trách nhiệm chia nhỏ.
- Thành viên khác có thể góp ý để đảm bảo task đủ nhỏ và rõ ràng.

Ví dụ:

❌ “Xây dựng hệ thống xác thực người dùng”
✅ “Implement Register API”
✅ “Implement Login API”
✅ “Create Login UI”
✅ “Validate JWT middleware”

---

# 🔍 DEFINITION OF READY (DoR)

Một task được xem là “Ready” khi:

- Có tiêu đề đúng format
- Có User Story rõ ràng
- Có Acceptance Criteria
- Có đầy đủ Label
- Không quá lớn

Chỉ task đạt đủ điều kiện này mới được đưa vào Sprint.

---

# 🔢 SẮP XẾP BACKLOG

Backlog được sắp xếp theo:

1. Priority (High → Medium → Low)
2. Giá trị mang lại cho sản phẩm
3. Mức độ phụ thuộc kỹ thuật

Trưởng nhóm có quyền điều chỉnh thứ tự ưu tiên khi cần.

---

# 🚫 KHÔNG ĐƯỢC

- Không thêm task mơ hồ
- Không thêm task trùng lặp
- Không bỏ Acceptance Criteria
- Không để task thiếu label
- Không chuyển thẳng sang In Progress

---

# 🎯 MỤC TIÊU CỦA PRODUCT BACKLOG

Backlog phải:

- Rõ ràng
- Có thể kiểm tra được
- Có thể ưu tiên được
- Phản ánh đúng tình trạng dự án
- Dễ hiểu với thành viên mới

Product Backlog tốt → Sprint dễ thành công.
Backlog mơ hồ → Sprint dễ thất bại.
````

### Instruction Card Checklist

- [ ] Tiêu đề đúng format ([FE]/[BE]/[BUG]…)
- [ ] Có User Story rõ ràng (As a … I want … So that …)
- [ ] Có Acceptance Criteria (Checklist)
- [ ] Có Label loại công việc (Feature/Bug/…)
- [ ] Có Label Priority (High/Medium/Low)
- [ ] Có Label Độ khó (Easy/Medium/Hard)
- [ ] Task đủ nhỏ để hoàn thành trong 1 Sprint (~1 tuần)
- [ ] Không trùng lặp với task khác

---

## 📋 2. Sprint Backlog Guide

### Instruction Card Title

> **📘 [READ FIRST] – Hướng dẫn cột Sprint Backlog**

### Instruction Card Description

```
# 📌 HƯỚNG DẪN CỘT SPRINT BACKLOG

---

## 🎯 Sprint Backlog là gì?

Sprint Backlog là **danh sách các task mà nhóm cam kết hoàn thành trong 1 Sprint (≈ 1 tuần)**.

Các task trong cột này:

- Được chọn từ Product Backlog
- Đạt Definition of Ready
- Phù hợp với Sprint Goal

Sprint Backlog thể hiện **cam kết chính thức** của Sprint.

---

# 🏁 Sprint Goal (Bắt buộc)

Mỗi Sprint phải có **một mục tiêu rõ ràng**.

Ví dụ:

- Hoàn thành chức năng Login & Register
- Triển khai hệ thống giỏ hàng
- Hoàn thiện xác thực người dùng

⚠️ Mọi task được đưa vào Sprint phải đóng góp trực tiếp cho Sprint Goal.
Không chọn task không liên quan.

---

# 🆕 CÁCH CHỌN TASK VÀO SPRINT

- Tất cả thành viên có thể tự chọn task.
- Task phải liên quan đến Sprint Goal.
- Task phải đạt Definition of Ready.

### 📌 Giới hạn lựa chọn

- Mỗi thành viên chỉ nên chọn tối đa **5 task / Sprint**.
- Cần cân nhắc độ khó (Easy / Medium / Hard).
- Không nên chọn nhiều task Hard cùng lúc.

Cam kết phải thực tế và đảm bảo chất lượng.

---

# 🔄 LUỒNG DI CHUYỂN TASK

1. Product Backlog
2. Sprint Backlog
3. To Do (This Sprint) → Bắt đầu thực hiện
4. In Progress
5. Code Review
6. Testing
7. Done (Sprint Done)

⚠️ Sprint Backlog không phải nơi làm việc trực tiếp.
Task phải được chuyển sang “To Do (This Sprint)” trước khi bắt đầu.

---

# 👤 ASSIGN & DUE DATE

Trước khi Sprint bắt đầu:

- Mỗi task phải được assign cho ít nhất 1 thành viên.
- Mỗi task phải có Due Date trong phạm vi Sprint.

Điều này giúp rõ trách nhiệm và theo dõi tiến độ.

---

# ➕ THÊM TASK TRONG QUÁ TRÌNH SPRINT

Có thể thêm task mới nếu:

- Đã hoàn thành toàn bộ task hiện tại
- Task mới hỗ trợ trực tiếp Sprint Goal
- Hoặc là bug nghiêm trọng cần xử lý ngay

❌ Không thêm task không liên quan đến Sprint Goal.

Sprint không phải nơi làm việc tùy hứng.

---

# 🔁 SPRINT SYNC (1–2 LẦN / SPRINT)

Trong mỗi Sprint, nhóm tổ chức **1–2 buổi Sprint Sync ngắn (5–10 phút)** để:

- Cập nhật tiến độ
- Trao đổi vướng mắc
- Đảm bảo các task vẫn đi đúng Sprint Goal

Ngoài ra, tiến độ có thể được cập nhật qua Trello hoặc kênh chat nội bộ (Zalo/Slack).

Sprint Sync giúp:

- Tránh lệch mục tiêu
- Giảm tình trạng task bị chậm
- Tăng tính minh bạch

---

# ⏳ QUY TẮC MINH BẠCH TRẠNG THÁI

Không có Daily Standup cố định mỗi ngày.

Tuy nhiên:

- Không được để task “đứng yên” quá **2 ngày**.
- Nếu task bị chậm hoặc blocked, phải:
  - Comment cập nhật
  - Hoặc ghi rõ lý do

Board phải luôn phản ánh đúng trạng thái thực tế.

---

# 🔚 KẾT THÚC SPRINT

Khi Sprint kết thúc:

1. Trưởng nhóm review toàn bộ Sprint.
2. Kiểm tra các task đã Done.
3. Đánh giá Sprint Goal có đạt được hay không.
4. Task chưa hoàn thành → chuyển lại Product Backlog để refine lại.
5. Ghi nhận bài học và đề xuất cải tiến trong cột Retrospective.

Sprint không chỉ hoàn thành task, mà còn cải tiến quy trình.

---

# 🚫 KHÔNG ĐƯỢC

- Không đưa task chưa đạt DoR vào Sprint
- Không chọn task không liên quan Sprint Goal
- Không chọn quá 5 task/người
- Không để task không cập nhật quá 2 ngày
- Không giữ task chưa xong lại trong Sprint sau khi kết thúc

---

# 🎯 MỤC TIÊU CỦA SPRINT BACKLOG

Sprint Backlog phải:

- Thể hiện cam kết rõ ràng
- Phản ánh đúng năng lực thực tế
- Hướng toàn bộ nỗ lực về Sprint Goal
- Minh bạch và có thể kiểm soát

Sprint có kỷ luật → Tiến độ ổn định.
Sprint tùy hứng → Dự án mất kiểm soát.
```

### Instruction Card Checklist

- [ ] Sprint Goal đã được xác định rõ ràng
- [ ] Task được chọn liên quan trực tiếp đến Sprint Goal
- [ ] Task đã đạt Definition of Ready từ Product Backlog
- [ ] Mỗi task đã được assign cho ít nhất 1 thành viên
- [ ] Mỗi task đã có Due Date trong phạm vi Sprint
- [ ] Mỗi thành viên không chọn quá 5 task
- [ ] Đã cân nhắc độ khó (Easy/Medium/Hard) hợp lý
- [ ] Các task được chuyển sang "To Do (This Sprint)" trước khi bắt đầu làm

## 📋 3. To Do (This Sprint) Guide

### Instruction Card Title

> **📘 [READ FIRST] – Hướng dẫn cột To do (This Sprint)**

### Instruction Card Description

```
# 📌 HƯỚNG DẪN CỘT TO DO (THIS SPRINT)

---

## 🎯 To Do (This Sprint) là gì?

To Do là **danh sách các task của Sprint mà thành viên chuẩn bị bắt đầu thực hiện ngay**.

Khác với Sprint Backlog (nơi cam kết),
To Do là **điểm bắt đầu hành động thực tế**.

Task chỉ được đưa vào To Do khi thành viên thực sự sẵn sàng làm.

---

# 🔄 LUỒNG DI CHUYỂN TASK

Product Backlog
→ Sprint Backlog (Cam kết đầu Sprint)
→ **To Do (Chuẩn bị thực thi)**
→ In Progress
→ Code Review
→ Testing
→ Done

⚠ Sprint Backlog chỉ là điểm cam kết.
Khi Sprint bắt đầu, task sẽ được di chuyển sang To Do để thực hiện.

---

# ✅ ĐIỀU KIỆN ĐƯA TASK VÀO TO DO

Trước khi chuyển task sang To Do, phải đảm bảo:

- Task đã được assign cho 1 thành viên cụ thể
- Task có Due Date trong phạm vi Sprint
- Task có đầy đủ thông tin kỹ thuật cần thiết
- Task liên quan trực tiếp đến Sprint Goal

Các điều kiện này thường đã được kiểm tra từ Sprint Backlog.

---

# ▶ KHI BẮT ĐẦU LÀM TASK

Khi thành viên thực sự bắt đầu làm:

- Kéo task từ To Do → In Progress
- Không cần comment xác nhận bắt đầu

Board phải phản ánh đúng trạng thái thực tế.

---

# 🎯 NGUYÊN TẮC SỬ DỤNG TO DO

- Chỉ đưa task vào To Do khi thực sự sẵn sàng làm
- Không đưa nhiều task vào To Do để “giữ chỗ”
- Không để task nằm ở To Do quá lâu mà không chuyển sang In Progress

To Do không phải danh sách chờ.
To Do là danh sách chuẩn bị hành động.

---

# 🚫 KHÔNG ĐƯỢC

- Không chuyển toàn bộ task Sprint vào To Do ngay từ đầu
- Không để task ở To Do mà không có người chịu trách nhiệm
- Không dùng To Do như nơi lưu trữ tạm

---

# 🛑 XỬ LÝ TASK BỊ CHẶN (BLOCKED)

Nếu task chưa thể bắt đầu do phụ thuộc hoặc trở ngại:

- Giữ task ở To Do
- Gắn label “Blocked”
- Comment rõ lý do

Việc này giúp cả nhóm dễ nhận biết và xử lý kịp thời.

---

# 🎯 MỤC TIÊU CỦA CỘT TO DO

To Do phải:

- Phản ánh chính xác những gì sắp được thực hiện
- Giúp thành viên tập trung
- Tránh làm nhiều việc cùng lúc
- Tăng tính minh bạch trong Sprint

To Do rõ ràng → Sprint trôi chảy.
To Do lộn xộn → Sprint mất kiểm soát.
```

### Instruction Card Checklist

- [ ] Task thuộc Sprint hiện tại và phù hợp Sprint Goal
- [ ] Task đã được assign cho 1 thành viên cụ thể
- [ ] Task có Due Date trong phạm vi Sprint
- [ ] Không còn phụ thuộc hoặc blocker chưa xử lý
- [ ] Thành viên thực sự sẵn sàng bắt đầu làm trong 24h
- [ ] Đã đọc kỹ Acceptance Criteria và hiểu rõ yêu cầu

## 📋 4. In Progress Guide

### Instruction Card Title

> **📘 [READ FIRST] – Hướng dẫn cột In Progress**

### Instruction Card Description

```
# 📌 HƯỚNG DẪN CỘT IN PROGRESS

---

## 🎯 In Progress là gì?

In Progress là **các task đang được thực hiện thực sự** trong Sprint.

Task chỉ được chuyển vào In Progress khi thành viên đã bắt đầu làm việc.

Đây là cột phản ánh khối lượng công việc đang xử lý tại thời điểm hiện tại.

---

# ▶ CÁCH CHUYỂN TASK VÀO IN PROGRESS

Khi bắt đầu làm:

- Kéo task từ To Do → In Progress
- Không cần comment xác nhận bắt đầu

Board phải phản ánh đúng trạng thái thực tế.

---

# 🔢 GIỚI HẠN SỐ LƯỢNG TASK (WIP LIMIT)

Mỗi thành viên chỉ nên thực hiện tối đa **3–4 task cùng lúc**.

Không nên:

- Làm quá nhiều task song song
- Chuyển task vào In Progress khi chưa thực sự bắt đầu

Làm ít nhưng hoàn thành tốt hơn làm nhiều nhưng dang dở.

---

# ⏳ CẬP NHẬT TIẾN ĐỘ

Áp dụng quy tắc:

> Không để task “đứng yên” quá 2 ngày.

Nếu task chưa hoàn thành sau 2 ngày mà không có thay đổi:

- Comment cập nhật tình trạng
- Hoặc ghi rõ lý do chậm

Điều này giúp đảm bảo minh bạch và tránh task bị quên.

---

# 🔄 XỬ LÝ PHÁT SINH PHẠM VI (SCOPE CREEP)

Trong quá trình làm:

- Nếu phát sinh nhỏ → có thể cập nhật trực tiếp trong task hiện tại
- Nếu phát sinh lớn, vượt phạm vi ban đầu → tạo task mới ở Product Backlog

Không tự ý mở rộng task làm ảnh hưởng tiến độ Sprint.

---

# 🛑 XỬ LÝ TASK BỊ CHẶN (BLOCKED)

Nếu task bị phụ thuộc hoặc gặp trở ngại:

- Giữ task ở In Progress
- Gắn label “Blocked”
- Comment ngắn gọn mô tả vấn đề

Không bắt buộc phải báo trưởng nhóm,
nhưng việc cập nhật rõ ràng là trách nhiệm của người thực hiện.

---

# 🔁 ĐIỀU KIỆN CHUYỂN SANG CODE REVIEW

Task chỉ được chuyển sang Code Review khi:

- Tất cả Acceptance Criteria đã hoàn thành
- Nội dung hoặc code đã hoàn tất

Trước khi chuyển:

- Tự kiểm tra (self-verify)
- Với task kỹ thuật: test trên local
- Đảm bảo không có lỗi cơ bản

Chỉ chuyển sang Code Review khi task đã sẵn sàng để người khác đánh giá.

---

# 🚫 KHÔNG ĐƯỢC

- Không để quá 4 task cùng lúc
- Không để task ở In Progress mà không cập nhật
- Không chuyển sang Code Review khi chưa hoàn thành Acceptance Criteria
- Không mở rộng task lớn mà không tạo task mới

---

# 🎯 MỤC TIÊU CỦA CỘT IN PROGRESS

In Progress phải:

- Phản ánh chính xác công việc đang thực hiện
- Giữ số lượng task hợp lý
- Đảm bảo cập nhật minh bạch
- Tránh multi-tasking quá mức

In Progress được kiểm soát tốt → Sprint ổn định.
In Progress lỏng lẻo → Sprint dễ trễ hạn.
```

### Instruction Card Checklist

- [ ] Task đang được thực hiện thực sự (không phải chờ)
- [ ] Không vượt quá 3–4 task cùng lúc
- [ ] Đã đọc kỹ và bám sát Acceptance Criteria
- [ ] Đã cập nhật tiến độ nếu làm quá 2 ngày
- [ ] Không tự mở rộng phạm vi lớn ngoài yêu cầu ban đầu
- [ ] Nếu bị blocker → đã gắn label "Blocked" và comment lý do
- [ ] Đã self-test / tự kiểm tra trước khi chuyển sang Code Review

## 📋 5. Code Review Guide

### Instruction Card Title

> **📘 [READ FIRST] – Hướng dẫn cột Code Review**

### Instruction Card Description

````
# 📌 HƯỚNG DẪN CỘT CODE REVIEW

---

## 🎯 Code Review là gì?

Code Review là bước **kiểm soát chất lượng trước khi chuyển task sang Testing**.

Mọi task trong Sprint (kể cả task không phải code) đều phải được review và approve trước khi chuyển tiếp.

Mục tiêu của Code Review:

- Đảm bảo đúng Acceptance Criteria
- Đảm bảo chất lượng kỹ thuật
- Phát hiện lỗi sớm
- Cải thiện tiêu chuẩn làm việc của nhóm

---

# 👤 AI THỰC HIỆN REVIEW?

- Trưởng nhóm là reviewer chính.
- Các thành viên khác có thể tham gia góp ý.

⚠ Người thực hiện task:

- Được tự test / self-verify
- Không được tự review hoặc tự approve task của mình

Bắt buộc phải có ít nhất một người khác review và approve.

---

# 🔍 NỘI DUNG REVIEW BAO GỒM

Reviewer sẽ kiểm tra toàn diện:

- Đáp ứng đầy đủ Acceptance Criteria
- Logic nghiệp vụ chính xác
- UI/UX (đối với Frontend)
- Naming convention
- Clean code
- Performance cơ bản
- Security cơ bản
- Tuân thủ best practices

Review phải đủ kỹ lưỡng nhưng không kéo dài không cần thiết.

---

# 💬 FEEDBACK & COMMENT

Bắt buộc:

- Phải để lại comment cụ thể khi phát hiện vấn đề
- Ghi rõ lỗi hoặc đề xuất cải thiện
- Không approve mà không có nhận xét

Feedback cần rõ ràng, dễ hiểu và có hướng sửa cụ thể.

---

# ❌ XỬ LÝ KHI REVIEW KHÔNG ĐẠT

Nếu task chưa đạt yêu cầu:

1. Comment rõ lý do fail review
2. Thêm prefix vào tiêu đề:

```
[REVIEW-FAIL] Tên task gốc
```

Ví dụ:

```
[REVIEW-FAIL] [FE] Implement Login UI
```

1. **Chuyển task về lại cột In Progress để sửa**

Prefix `[REVIEW-FAIL]` giúp:

- Dễ nhận biết task cần sửa
- Phân biệt với bug từ Testing
- Tăng tính minh bạch trên board

Sau khi người thực hiện sửa xong và gửi review lại:

- Giữ nguyên prefix cho đến khi được approve
- Khi đã approve → remove prefix `[REVIEW-FAIL]`

⚠ Không tạo nhiều biến thể prefix khác nhau để tránh rối loạn.

---

# 🔁 VÒNG LẶP REVIEW (ITERATION)

Quy trình lặp lại như sau:

In Progress
→ Code Review
→ Fail → Quay lại In Progress để sửa
→ Review lại
→ Approve → Testing

Không chuyển task sang Testing khi chưa được approve chính thức.

---

# ✅ ĐIỀU KIỆN APPROVE & CHUYỂN SANG TESTING

Task chỉ được chuyển sang Testing khi:

- Được reviewer approve
- Hoàn thành toàn bộ Acceptance Criteria
- Tất cả lỗi “must-fix” đã được resolve

Feedback dạng “nice-to-have” có thể xử lý sau nếu không ảnh hưởng chất lượng chính.

---

# ⏳ THỜI GIAN REVIEW

Để tránh bottleneck:

- Reviewer phải phản hồi trong tối đa 1 ngày làm việc
- Không để task nằm ở Code Review quá 2 ngày

Nếu quá thời hạn, cần chủ động nhắc.

---

# 📄 TASK KHÔNG PHẢI CODE

Các task như:

- Documentation
- Phân tích
- Thiết kế
- DevOps

Vẫn áp dụng quy trình review tương tự,
nhưng tiêu chí review linh hoạt theo loại task.

---

# 🚫 KHÔNG ĐƯỢC

- Không tự approve task của mình
- Không bỏ qua comment review
- Không chuyển sang Testing khi còn lỗi must-fix
- Không để task nằm ở Code Review quá 2 ngày
- Không sử dụng nhiều prefix khác nhau gây rối

---

# 🎯 MỤC TIÊU CỦA CỘT CODE REVIEW

Code Review phải:

- Bảo vệ chất lượng sản phẩm
- Giảm lỗi sang Testing
- Tăng tính minh bạch
- Giúp cả nhóm cải thiện kỹ năng

Review nghiêm túc → Sprint ổn định.
Review qua loa → Testing quá tải.
````

### Instruction Card Checklist

- [ ] Task đáp ứng đầy đủ Acceptance Criteria
- [ ] Không còn lỗi logic nghiệp vụ
- [ ] Không còn lỗi nghiêm trọng (must-fix)
- [ ] Code / nội dung rõ ràng, dễ hiểu
- [ ] Tuân thủ naming convention của dự án
- [ ] Không có đoạn code dư thừa hoặc comment thừa
- [ ] Đã self-test trước khi gửi review
- [ ] Tất cả feedback bắt buộc đã được resolve
- [ ] Không còn prefix [REVIEW-FAIL] (nếu có)

## 📋 6. Testing Guide

### Instruction Card Title

> **📘 [READ FIRST] – Hướng dẫn cột Testing**

### Instruction Card Description

````
# 📌 HƯỚNG DẪN CỘT TESTING

---

## 🎯 Testing là gì?

Testing là bước **kiểm thử cuối cùng trước khi task được chuyển sang Done (Sprint Done)**.

Mục tiêu của Testing:

- Xác nhận task hoạt động đúng theo Acceptance Criteria
- Phát hiện lỗi trước khi hoàn thành Sprint
- Đảm bảo chất lượng tổng thể của sản phẩm

Testing là bước kiểm tra thực tế, không chỉ xem code.

---

# 👤 AI THỰC HIỆN TESTING?

- Task sẽ được kiểm thử bởi các thành viên trong nhóm, **không phải người trực tiếp thực hiện task đó**.
- Người thực hiện task có thể tự test trước đó, nhưng testing chính thức nên do người khác thực hiện để đảm bảo khách quan.

---

# 🔍 NỘI DUNG TESTING BAO GỒM

Quá trình Testing cần kiểm tra:

- Functional: chức năng hoạt động đúng
- Logic & Business: xử lý nghiệp vụ chính xác
- UI/UX: hiển thị và trải nghiệm người dùng (nếu có)
- Performance cơ bản: không lỗi, không lag bất thường
- Đáp ứng đầy đủ Acceptance Criteria

Mức độ testing:

- Phù hợp quy mô project sinh viên
- Đủ kỹ để đảm bảo chất lượng
- Không quá phức tạp gây chậm tiến độ

---

# ❌ XỬ LÝ KHI TESTING KHÔNG ĐẠT

Nếu phát hiện lỗi trong quá trình testing:

1. Chuyển task về cột In Progress
2. Thêm prefix vào tiêu đề:

```
[REVIEW-FAIL] Tên task gốc
```

1. Comment rõ lỗi phát hiện

### Phân loại lỗi:

- Bug nhỏ → ghi rõ trong comment để sửa trực tiếp
- Bug lớn, vượt phạm vi task → tạo task Bug mới trong Product Backlog

Không giữ task ở Testing nếu chưa đạt yêu cầu.

---

# ✅ ĐIỀU KIỆN CHUYỂN SANG DONE (SPRINT DONE)

Task chỉ được chuyển sang Done khi:

- Vượt qua toàn bộ bước Testing
- Không còn lỗi nghiêm trọng
- Được xác nhận lại bởi trưởng nhóm
- Đã loại bỏ prefix `[REVIEW-FAIL]` (nếu có)

Done nghĩa là hoàn thành thực sự, không còn sửa thêm.

---

# ⏳ THỜI GIAN TESTING

Để tránh bottleneck:

- Không để task ở Testing quá 2 ngày
- Trong vòng 2 ngày phải có ít nhất một thành viên (không phải người code) test và phản hồi

Nếu chưa được test, cần chủ động nhắc.

---

# 📄 TASK KHÔNG PHẢI CODE

Các task như:

- Documentation
- Phân tích
- Thiết kế
- DevOps

Vẫn áp dụng quy trình testing tương tự,
nhưng tiêu chí sẽ linh hoạt theo tính chất task.

---

# 🚫 KHÔNG ĐƯỢC

- Không tự xác nhận pass cho task của mình
- Không chuyển sang Done khi còn bug nghiêm trọng
- Không bỏ qua Acceptance Criteria
- Không để task nằm ở Testing quá 2 ngày

---

# 🎯 MỤC TIÊU CỦA CỘT TESTING

Testing phải:

- Bảo đảm chất lượng cuối cùng
- Giảm rủi ro lỗi khi demo
- Giữ Sprint ổn định
- Tăng tính minh bạch và trách nhiệm

Testing kỹ lưỡng → Done thực sự.
Testing qua loa → Done giả tạo.
````

### Instruction Card Checklist

- [ ] Đã kiểm tra toàn bộ Acceptance Criteria
- [ ] Chức năng hoạt động đúng theo yêu cầu
- [ ] Logic nghiệp vụ xử lý chính xác
- [ ] Không phát sinh lỗi nghiêm trọng (must-fix)
- [ ] Giao diện hiển thị đúng (nếu có UI)
- [ ] Không có lỗi console hoặc crash
- [ ] Đã test các trường hợp input cơ bản (valid & invalid)
- [ ] Nếu có bug → đã comment rõ ràng
- [ ] Nếu bug lớn → đã tạo task Bug riêng (nếu cần)
- [ ] Task đủ điều kiện chuyển sang Done

## 📋 7. Done (Sprint Done) Guide

### Instruction Card Title

> **📘 [READ FIRST] – Hướng dẫn cột Done (Sprint Done)**

### Instruction Card Description

````
# 📌 HƯỚNG DẪN CỘT DONE (SPRINT DONE)

---

## 🎯 Done (Sprint Done) là gì?

Done là trạng thái xác nhận **task đã hoàn thành chính thức trong Sprint**.

Một task ở Done nghĩa là:

- Đã hoàn tất toàn bộ quy trình
- Đã được kiểm tra và xác nhận
- Đáp ứng đầy đủ Sprint Goal

Done không phải là “code xong”,
mà là “hoàn thành thực sự”.

---

# ✅ ĐIỀU KIỆN CHUYỂN TASK SANG DONE

Task chỉ được chuyển sang Done khi:

- Đã pass toàn bộ bước Testing
- Được trưởng nhóm xác nhận lần cuối
- Đáp ứng đầy đủ Acceptance Criteria
- Phù hợp và đóng góp vào Sprint Goal
- Không còn prefix `[REVIEW-FAIL]`
- Không còn label “Blocked”
- Tất cả comment đã được resolve

Nếu thiếu bất kỳ điều kiện nào → không được chuyển Done.

---

# 📋 DEFINITION OF DONE (DoD) – CHECKLIST

Tên checklist nên đặt:

**“Definition of Done Checklist”**

```
☐ Đã hoàn thành toàn bộ Acceptance Criteria
☐ Đã pass Code Review
☐ Đã pass Testing
☐ Không còn lỗi nghiêm trọng (must-fix)
☐ Không còn prefix [REVIEW-FAIL]
☐ Không còn label Blocked
☐ Tất cả comment đã được resolve
☐ Được trưởng nhóm xác nhận
☐ Task đóng góp trực tiếp vào Sprint Goal
```

Task chỉ được coi là Done khi toàn bộ checklist được đáp ứng.

---

# 🔁 DONE KHÔNG PHẢI LÀ KẾT THÚC TUYỆT ĐỐI

Cột Done được sử dụng để:

- Demo cuối Sprint
- Thống kê số lượng task hoàn thành
- Làm báo cáo tiến độ

Sau khi Sprint kết thúc:

- Toàn bộ task trong Sprint sẽ được chuyển sang cột
  **“Completed – All Sprints”**
  để lưu trữ và theo dõi lịch sử.

Done là trạng thái hoàn thành của Sprint hiện tại,
không phải lưu trữ lâu dài.

---

# 🚫 KHÔNG ĐƯỢC

- Không đưa task vào Done khi chưa qua đủ các bước
- Không bỏ qua bước xác nhận của trưởng nhóm
- Không chỉnh sửa nội dung task sau khi đã ở Done
- Không để task có lỗi tồn đọng mà vẫn chuyển Done

Done phải phản ánh sự hoàn thành thực sự.

---

# 🎯 MỤC TIÊU CỦA CỘT DONE

Done phải:

- Thể hiện thành quả thực tế của Sprint
- Minh bạch và có thể báo cáo được
- Đảm bảo chất lượng trước khi lưu trữ
- Là cơ sở để đánh giá Sprint Goal

Done rõ ràng → Sprint chuyên nghiệp.
Done lỏng lẻo → Báo cáo thiếu tin cậy.
````

### Instruction Card Checklist

- [ ] Đã hoàn thành toàn bộ Acceptance Criteria
- [ ] Đã pass Code Review
- [ ] Đã pass Testing
- [ ] Không còn lỗi nghiêm trọng (must-fix)
- [ ] Không còn prefix [REVIEW-FAIL]
- [ ] Không còn label Blocked
- [ ] Tất cả comment đã được resolve
- [ ] Được trưởng nhóm xác nhận
- [ ] Task đóng góp trực tiếp vào Sprint Goal

## 8. Retrospective Guide

### Instruction Card Title

> **📘 [READ FIRST] – Hướng dẫn cột Retrospective**

### Instruction Card Description

````
# 📌 HƯỚNG DẪN CỘT RETROSPECTIVE

---

## 🎯 Retrospective là gì?

Retrospective là hoạt động diễn ra **sau khi Sprint kết thúc**, nhằm:

- Đánh giá cách nhóm đã làm việc trong Sprint
- Xác định điểm mạnh và điểm còn hạn chế
- Đề xuất hành động cải tiến cho Sprint tiếp theo

Retrospective tập trung vào **quy trình và teamwork**, không phải sản phẩm.

- Sprint Review = đã làm được gì
- Sprint Retrospective = đã làm như thế nào

Không có Retrospective → Agile chỉ là hình thức.
Có Retrospective nghiêm túc → Sprint sau tốt hơn Sprint trước.

---

# 📅 THỜI ĐIỂM & LIÊN KẾT VỚI SPRINT SYNC

- Sprint kéo dài 1 tuần
- Sprint Sync diễn ra vào **giữa Sprint (ngày 3 hoặc 4)** để kiểm tra tiến độ
- Retrospective diễn ra **cuối Sprint**, sau khi hoàn tất Review và Done

Sprint Sync giúp điều chỉnh trong Sprint.
Retrospective giúp cải tiến giữa các Sprint.

---

# 🧾 CÁCH TRIỂN KHAI

Nhóm sử dụng:

👉 **1 thẻ duy nhất cho mỗi Sprint**

Tên thẻ:

```
Retro – Sprint X
```

Ví dụ:

```
Retro – Sprint 4
```

Trong thẻ này sẽ ghi toàn bộ nội dung Retrospective theo format bắt buộc.

---

# 📝 FORMAT RETRO (BẮT BUỘC)

Mỗi thẻ “Retro – Sprint X” phải gồm 3 phần sau:

---

## 1️⃣ Went well (Điều làm tốt)

Mục đích:

- Ghi nhận những điều đang hoạt động hiệu quả
- Xác định quy trình nên tiếp tục duy trì

### ✅ Ví dụ minh họa (Seatly)

- FE và BE thống nhất API sớm, không phải sửa nhiều lần.
- Sprint Sync giữa tuần giúp phát hiện sớm task bị kẹt.
- Không có task nào vi phạm rule 2 ngày ở In Progress.
- Testing phát hiện sớm lỗi validate email trước khi demo.

---

## 2️⃣ Not well (Điều chưa tốt)

Mục đích:

- Xác định điểm nghẽn thực tế
- Tập trung vào quy trình, không chỉ trích cá nhân

### ❌ Ví dụ không nên viết

- Code Review hơi chậm.
- Làm việc chưa hiệu quả.
- Cần cố gắng hơn.

### ✅ Ví dụ tốt (cụ thể – rõ ràng)

- 2 task nằm ở Code Review hơn 2 ngày, khiến Testing bị dồn cuối Sprint.
- Một thành viên mở 5 task In Progress cùng lúc, dẫn đến chậm tiến độ.
- Task “Login” bị mở rộng thêm tính năng ngoài phạm vi mà không tạo task mới.
- Sprint Sync chưa kiểm tra kỹ trạng thái Code Review nên không phát hiện bottleneck sớm.

---

## 3️⃣ Action items (Hành động cải tiến)

Đây là phần quan trọng nhất.

Action item phải:

- Cụ thể
- Có thể thực hiện
- Có Owner
- Có thời điểm áp dụng

### ❌ Ví dụ sai

- Làm việc nghiêm túc hơn.
- Review nhanh hơn.

### ✅ Ví dụ đúng (Seatly)

**Ví dụ 1 – Giải quyết Code Review chậm**

> Action: Khi task chuyển sang Code Review, bắt buộc tag leader trong comment.
> Owner: Người thực hiện task
> Áp dụng: Sprint tiếp theo

**Ví dụ 2 – Giảm WIP**

> Action: Giới hạn tối đa 3 task In Progress / người.
> Owner: Leader theo dõi
> Áp dụng: Sprint tiếp theo

**Ví dụ 3 – Kiểm soát Scope creep**

> Action: Nếu phát sinh ngoài phạm vi ban đầu, bắt buộc tạo task mới ở Product Backlog.
> Owner: Toàn team
> Áp dụng: Sprint tiếp theo

---

# 📋 SPRINT RETROSPECTIVE CHECKLIST

Tên checklist:

**“Sprint Retrospective Checklist”**

```
☐ Đã tổng hợp đầy đủ Went well
☐ Đã liệt kê rõ Not well
☐ Đã phân tích nguyên nhân chính (nếu cần)
☐ Đã xác định tối đa 1–3 action item cụ thể
☐ Mỗi action item có owner rõ ràng
☐ Action item lớn đã được tạo task mới trong Product Backlog
☐ Đã xác định cách áp dụng cho Sprint tiếp theo
```

Retrospective chỉ được xem là hoàn tất khi checklist này được đáp ứng.

---

# 🔄 XỬ LÝ ACTION ITEM

Sau Retrospective:

- Action item nhỏ → giữ trong thẻ Retro để theo dõi
- Action item lớn → tạo task mới trong Product Backlog

Retro không dùng để lưu trữ task kỹ thuật lớn.

---

# 🚫 KHÔNG ĐƯỢC

- Không biến Retrospective thành buổi chỉ trích cá nhân
- Không liệt kê quá nhiều action item
- Không bỏ qua action item đã đề ra
- Không làm Retro hình thức

Retrospective phải tạo ra thay đổi thực sự.

---

# 🎯 MỤC TIÊU CỦA CỘT RETROSPECTIVE

Retrospective phải:

- Giúp Sprint sau tốt hơn Sprint trước
- Giảm lỗi lặp lại
- Cải thiện kỷ luật làm việc
- Tối ưu workflow của toàn nhóm

Retrospective nghiêm túc → hệ thống ngày càng trưởng thành.
````

### Instruction Card Checklist

- [ ] Đã tổng hợp đầy đủ Went well
- [ ] Đã liệt kê rõ Not well
- [ ] Đã phân tích nguyên nhân chính (nếu cần)
- [ ] Đã xác định tối đa 1–3 action item cụ thể
- [ ] Mỗi action item có owner rõ ràng
- [ ] Action item lớn đã được tạo task mới trong Product Backlog
- [ ] Đã xác định cách áp dụng cho Sprint tiếp theo

## 9. Completed – All Sprints Guide

### Instruction Card Title

> **📘 [READ FIRST] – Hướng dẫn cột Completed (All Sprints)**

### Instruction Card Description

```
# 📌 HƯỚNG DẪN CỘT COMPLETED – ALL SPRINTS

---

## 🎯 Completed – All Sprints là gì?

Completed – All Sprints là cột **lưu trữ toàn bộ các Sprint đã hoàn thành** trong quy trình Agile & Scrum của dự án.

Sau khi một Sprint kết thúc:

- Các task ở cột Done (Sprint Done) sẽ được chuyển vào đây
- Mỗi Sprint được lưu trữ để theo dõi lịch sử phát triển

Cột này chỉ dùng để:

- Lưu trữ
- Thống kê
- Báo cáo
- Đối chiếu tiến độ qua từng Sprint

⚠ Không chỉnh sửa nội dung task sau khi đã được lưu trữ tại đây.

---

## 🎯 Mục tiêu của cột này

- Lưu giữ lịch sử phát triển dự án
- Thể hiện minh bạch các Sprint đã hoàn thành
- Phục vụ demo và báo cáo

Completed – All Sprints là “kho lưu trữ chính thức” của toàn bộ kết quả sau mỗi Sprint.
```

## 10. Resources Guide

### Instruction Card Title

> **📘 [READ FIRST] – Hướng dẫn cột Resources**

### Instruction Card Description

```
# 📌 HƯỚNG DẪN CỘT RESOURCES

---

## 🎯 Resources là gì?

Resources là cột dùng để **lưu trữ các tài nguyên phục vụ dự án Seatly**, bao gồm:

- GitHub repository
- Slides thuyết trình
- Báo cáo mẫu
- File test cases (Excel)
- Website tham khảo
- Tài liệu hướng dẫn
- Template sử dụng trong dự án

Cột này chỉ dùng để **tham khảo và lưu trữ**, không chứa task công việc.

---

## 🗂 CÁCH TỔ CHỨC

- Mỗi loại tài nguyên được tạo thành **một card riêng**
- Không gộp nhiều loại tài nguyên vào cùng một card

Ví dụ:

- `GitHub Repository`
- `Project Slides`
- `Test Cases – Sprint 1`
- `Reference Websites`
- `Report Template`

---

## 📝 NỘI DUNG MỖI CARD NÊN CÓ

Trong mỗi card cần:

- Mô tả ngắn gọn tài nguyên đó dùng để làm gì
- Link truy cập (Google Drive / GitHub / Figma / Website…)
- Phiên bản (nếu có)
- Người phụ trách cập nhật (nếu cần)

Ví dụ card “GitHub Repository”:

- Link repo chính
- Link repo backend
- Link repo frontend
- Quy định branch chính

---

## 🚫 KHÔNG ĐƯỢC

- Không tạo task vào cột Resources
- Không để tài nguyên quan trọng nằm rải rác trong chat
- Không xóa tài nguyên khi chưa thống nhất

---

## 🎯 Mục tiêu của cột này

- Hỗ trợ onboard thành viên mới
- Tập trung toàn bộ tài nguyên vào một nơi
- Giúp demo và báo cáo dễ dàng

Resources = thư viện dự án.
```

## 11. Rules Guide

### Instruction Card Title

> **📘 [READ FIRST] – Hướng dẫn cột Rules**

### Instruction Card Description

```
# 📌 HƯỚNG DẪN CỘT RULES

---

## 🎯 Rules là gì?

Rules là cột chứa **các quy tắc và thỏa thuận làm việc của nhóm (Working Agreement)**.

Mỗi rule được thể hiện bằng **một card riêng biệt** để:

- Dễ tra cứu
- Dễ cập nhật
- Dễ cải tiến sau Retrospective

Rules giúp đảm bảo quy trình Agile/Scrum được áp dụng thống nhất.

---

## 🗂 CÁCH TỔ CHỨC

Mỗi quy tắc là một card riêng.

Ví dụ:

- `Branching Rule`
- `Pull Request Rule`
- `Code Style Rule`
- `Commit Message Convention`
- `Review Time Rule`
- `WIP Limit Rule`

---

## 📝 NỘI DUNG MỖI CARD RULE NÊN CÓ

Mỗi card nên gồm:

1️⃣ Mô tả quy tắc
2️⃣ Lý do áp dụng (ngắn gọn)
3️⃣ Cách thực hiện cụ thể
4️⃣ Ví dụ minh họa (nếu cần)

---

### Ví dụ: Branching Rule

**Quy tắc:**

- Mỗi feature/bug phải làm trên branch riêng.
- Không commit trực tiếp vào main.

**Cách thực hiện:**

- `feature/login-ui`
- `bug/fix-auth-error`

**Lý do:**

- Tránh xung đột code
- Dễ review và rollback

---

## 🔄 CẬP NHẬT RULE

- Nếu Retrospective đề xuất thay đổi rule → cập nhật card tương ứng
- Không tạo rule mới mà không thảo luận

Rules phải linh hoạt, không cứng nhắc.

---

## 🚫 KHÔNG ĐƯỢC

- Không thêm rule mơ hồ
- Không tạo rule quá dài và phức tạp
- Không thay đổi rule mà không thống nhất

---

## 🎯 Mục tiêu của cột này

- Chuẩn hóa cách làm việc
- Giảm mâu thuẫn kỹ thuật
- Tăng tính chuyên nghiệp
- Hỗ trợ thành viên mới hòa nhập nhanh

Rules = nền tảng kỷ luật của team.
```
