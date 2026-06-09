# [DOCUMENTATION] Create Standard Test Case Log Template (Seatly)

## Task Title

> **[DOCUMENTATION] Create Standard Test Case Log Template (Seatly)**

## Task Description

````
### 🔹 User Story

> As a QA/testing team
> I want to create a standardized template for managing test case logs
> So that testing activities for the Seatly system are documented clearly, consistently, and easy to trace during development and reporting.

---

### 🔹 Academic Context

Seatly là dự án bài tập lớn của môn **Công nghệ phần mềm**.
Trong quá trình phát triển, nhóm cần thực hiện kiểm thử các chức năng của hệ thống và ghi lại kết quả để:

- minh chứng quá trình testing trong báo cáo
- theo dõi kết quả kiểm thử của từng tính năng
- phát hiện lỗi và xác nhận khi lỗi được sửa
- trình bày tài liệu kiểm thử rõ ràng khi demo hoặc bảo vệ

Để đảm bảo việc ghi chép test case nhất quán, nhóm cần chuẩn hóa một **template dùng chung cho toàn bộ quá trình testing**.

Template này có thể được tạo bằng:

- **Excel**
- **Google Sheets**

miễn là cấu trúc bảng giống nhau và có thể dễ dàng cập nhật, chia sẻ cho cả nhóm.

Task này **chỉ thiết kế template tài liệu**, chưa thực hiện test thực tế.

---

### 🔹 Scope

#### ✅ Bao gồm

**1️⃣ Thiết kế cấu trúc template test case**

Template cần có ít nhất **1 sheet chính**:

**Sheet: Test Case Logs**

Các cột bắt buộc:

1. Test Case ID
2. Module / Feature
3. Test Case Description
4. Precondition
5. Test Steps
6. Expected Result
7. Actual Result
8. Status (Pass / Fail / Skip)
9. Tester
10. Test Date
11. Notes

---

**2️⃣ Thiết kế để có thể tái sử dụng**

Template phải đảm bảo:

- có thể dùng cho nhiều module của hệ thống Seatly
- không phụ thuộc vào một tính năng cụ thể
- có thể duplicate sheet cho từng Sprint hoặc từng giai đoạn testing
- dễ cập nhật khi thêm test case mới

---

**3️⃣ Cải thiện tính sử dụng của template**

Khuyến khích bổ sung các cải thiện giúp template dễ sử dụng hơn, ví dụ:

- dropdown cho cột **Status**
- freeze header row
- table formatting để dễ đọc
- conditional formatting cho Pass / Fail
- một dòng ví dụ minh họa cách ghi test case

---

### 📤 Output

Kết quả cần có:

**01 template test case log có thể sử dụng được**, được tạo bằng một trong hai cách:

- **Excel file**
- **Google Sheets**

Template phải:

- có cấu trúc bảng rõ ràng
- dễ sử dụng và chia sẻ cho cả nhóm

Nếu dùng Google Sheets:

- đính kèm **link share trong Trello card**

Nếu dùng Excel:

- upload **file vào Trello card attachment**

Tên file (nếu dùng Excel) có thể đặt như:

```
Seatly_TestCase_Template_v1.xlsx
```

---

### ❌ Không bao gồm

- Không điền test case thật của hệ thống
- Không thực hiện testing tính năng
- Không ghi bug hoặc test result thực tế
- Không tích hợp với tool test automation
- Không tạo báo cáo thống kê testing

Task này chỉ tập trung **thiết kế template tài liệu test case**.
````

## Task Attachments

**Links:**

[Seatly (QR Table Ordering) Logs](https://docs.google.com/spreadsheets/d/1-YlPzOpDAxXdtQe58oD2h4UxrZ4Y2JuLL0lBPWQGJ1M/edit?usp=sharing)

## Task Labels

- `Documentation`
- `🟡 Medium`
- `🟢 Easy`

## Task Checklist

**Seatly Test Case Log Template**

- [ ] Template có sheet "Test Case Logs" với đầy đủ các cột test case cần thiết
- [ ] Template có thể tái sử dụng cho nhiều module hoặc nhiều Sprint của Seatly
- [ ] Cột Status có dropdown (Pass / Fail / Skip) để đảm bảo ghi log nhất quán
- [ ] Template được định dạng rõ ràng và dễ sử dụng (header, freeze row, table format)
- [ ] Template được chia sẻ trong Trello card (file Excel hoặc link Google Sheets)
