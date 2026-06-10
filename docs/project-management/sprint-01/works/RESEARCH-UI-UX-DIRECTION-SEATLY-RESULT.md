# Seatly UI/UX Research Result

## Mục tiêu

Tài liệu này tổng hợp phần research UI/UX cho Seatly theo đúng scope MVP hiện tại:

- `Guest`: mobile-first QR ordering
- `Employee`: web dashboard xử lý order
- `Owner/Manager`: web dashboard theo dõi vận hành cơ bản

Tài liệu này chỉ tập trung vào research và synthesis. Không bao gồm prototype, mockup, Figma, AI design tool, hoặc implement UI vào codebase.

## Scope bám theo tài liệu sản phẩm

Research này bám vào luồng core hiện tại của Seatly:

- quét QR để vào đúng bàn
- nhập tên ngắn để tạo guest session tạm thời
- xem menu và đặt món
- xem trạng thái order gần realtime
- nhân viên xử lý order theo trạng thái
- chủ quán theo dõi vận hành cơ bản
- simple payment / bill review

Không mở rộng research sang các nhánh ngoài scope core như:

- `TableRequest` đầy đủ
- ETA nâng cao
- order timeline chi tiết
- quick reorder
- auto occupancy
- auto session timeout
- inventory / CRM / ERP / loyalty / delivery ecosystem / POS hardware
- multi-restaurant / multi-branch

## Danh sách UI references

### 1) Square QR Code Ordering

- URL: `https://squareup.com/us/en/online-ordering/qr-code-ordering`
- Loại nguồn: official product page
- Màn hình/pattern áp dụng:
  - mobile QR menu / ordering
  - order submit flow
  - simple payment / pay-at-order direction
- Điểm mạnh:
  - rất sát bài toán scan QR theo bàn và đặt món tại bàn
  - thể hiện rõ tư duy mobile-first, thao tác ngắn, giảm wait time
  - hợp để tham khảo sticky CTA, cart-first behavior, và luồng order đơn giản
- Giới hạn:
  - landing page không show toàn bộ chi tiết từng screen nội bộ
  - phù hợp làm reference flow và product direction hơn là copy visual trực tiếp
- Gợi ý chụp screenshot cho Trello:
  - hero section có mô tả QR ordering
  - các block nói về order/pay/operations

### 2) GloriaFood QR Code Restaurant Menu

- URL: `https://www.gloriafood.com/qr-code-restaurant-menu`
- Loại nguồn: official product page
- Màn hình/pattern áp dụng:
  - mobile QR menu / dish list
  - dine-in ordering
  - simple payment / bill review direction
- Điểm mạnh:
  - rất phù hợp với quán ăn / quán nước nhỏ đến vừa
  - nhấn mạnh menu trực tiếp trên điện thoại, category structure và optional online payment
  - phù hợp để tham khảo hierarchy cho menu, CTA order, và thông điệp giảm thời gian chờ
- Giới hạn:
  - visual detail của product screen trên landing page chưa quá sâu
- Gợi ý chụp screenshot cho Trello:
  - phần demo QR ordering
  - phần mô tả dine-in ordering và online payment

### 3) GloriaFood Product Screenshots

- URL: `https://www.gloriafood.com/product-screenshots`
- Loại nguồn: official screenshot pack
- Màn hình/pattern áp dụng:
  - menu browsing
  - one-page checkout / order summary
  - restaurant admin panel
- Điểm mạnh:
  - có ảnh giao diện rõ hơn landing page chính
  - hữu ích để tham chiếu cách tổ chức menu, checkout, admin panel trong ngữ cảnh restaurant ordering
- Giới hạn:
  - không phải toàn bộ screen đều là QR dine-in specific
  - cần chọn đúng screenshot gần với scope Seatly
- Gợi ý chụp screenshot cho Trello:
  - online ordering widget
  - restaurant mobile app
  - restaurant admin panel

### 4) Toast Mobile Order & Pay

- URL: `https://pos.toasttab.com/products/mobile-order-and-pay`
- Loại nguồn: official product page
- Màn hình/pattern áp dụng:
  - guest ordering flow
  - cart / order summary
  - payment handoff / reduced-friction checkout
- Điểm mạnh:
  - tốt cho tư duy thao tác nhanh, upsell vừa phải, checkout ít bước
  - hợp để tham khảo sticky cart CTA, add-more flow, và summary trước submit
- Giới hạn:
  - thiên về platform tổng thể hơn là show full UI detail
  - cần chắt lọc để tránh kéo Seatly sang scope enterprise
- Gợi ý chụp screenshot cho Trello:
  - hero section
  - section mô tả guest ordering / pay experience

### 5) Domino's Order Tracker

- URL: `https://www.dominos.com/en/tracker`
- Loại nguồn: real product reference
- Màn hình/pattern áp dụng:
  - near-realtime order tracking
  - status progression cho guest
- Điểm mạnh:
  - thể hiện rất rõ nguyên tắc status ít nhưng dễ hiểu
  - phù hợp để học cách tạo cảm giác order đang tiến triển mà không cần timeline dài
  - có thể map tốt sang trạng thái `Pending -> Processing -> Delivered -> Paid`
- Giới hạn:
  - không phải QR dine-in product
  - chỉ nên dùng cho tracking pattern, không dùng cho toàn bộ flow
- Gợi ý chụp screenshot cho Trello:
  - tracker stepper / progress states

### 6) Material Design 3 - Text Fields

- URL: `https://m3.material.io/components/text-fields/guidelines`
- Loại nguồn: official design system
- Màn hình/pattern áp dụng:
  - guest entry / name input
  - validation / helper text / input state
- Điểm mạnh:
  - rất phù hợp cho screen nhập tên ngắn trước khi vào bàn
  - giúp chuẩn hóa label, hint, validation, focus state và error state
  - hợp cho form chỉ có 1 input và 1 CTA chính
- Giới hạn:
  - là component guideline, không phải restaurant-specific flow
- Gợi ý chụp screenshot cho Trello:
  - text field states
  - examples về helper text / error text

### 7) Material Design 3 - Bottom Sheets

- URL: `https://m3.material.io/components/bottom-sheets/guidelines`
- Loại nguồn: official design system
- Màn hình/pattern áp dụng:
  - cart summary
  - modifier picker
  - confirm order sheet
- Điểm mạnh:
  - rất phù hợp với mobile-first vì giữ user trong context menu hiện tại
  - tốt cho add-to-cart, chỉnh quantity, note ngắn, review nhanh trước submit
- Giới hạn:
  - chỉ là interaction pattern, không phải full ordering app
- Gợi ý chụp screenshot cho Trello:
  - standard bottom sheet
  - modal bottom sheet usage

### 8) Shopify Polaris Table

- URL: `https://shopify.dev/docs/api/admin-extensions/latest/polaris-web-components/layout-and-structure/table`
- Loại nguồn: official design system
- Màn hình/pattern áp dụng:
  - staff order management dashboard
  - owner / manager operations dashboard
  - simple payment / bill review table
- Điểm mạnh:
  - phù hợp cho data table có filter nhẹ, trạng thái rõ, và cấu trúc admin rõ ràng
  - giúp tham khảo dashboard dạng vận hành thay vì dashboard trang trí
- Giới hạn:
  - bối cảnh ecommerce/admin, cần đơn giản hóa để hợp restaurant SMB
- Gợi ý chụp screenshot cho Trello:
  - examples của table layout
  - responsive table / compact layout nếu có

### 9) Ant Design Components

- URL: `https://ant.design/components/table`
- URL phụ: `https://ant.design/components/tag`
- URL phụ: `https://ant.design/components/progress`
- Loại nguồn: official design system
- Màn hình/pattern áp dụng:
  - order queue table
  - status tag/chip
  - lightweight progress cho operational overview
- Điểm mạnh:
  - mạnh ở dashboard data-heavy, status visualization, filter/sort cơ bản
  - dễ map sang `New`, `Preparing`, `Ready`, `Completed`, `Paid`
- Giới hạn:
  - nếu bê nguyên style rất dễ thành giao diện enterprise generic
  - nên học pattern, không lấy visual làm hướng cuối cùng
- Gợi ý chụp screenshot cho Trello:
  - table examples
  - tag examples
  - progress examples

### 10) roshanx0/restaurant-ordering-saas

- URL: `https://github.com/roshanx0/restaurant-ordering-saas`
- Loại nguồn: open-source example
- Màn hình/pattern áp dụng:
  - QR menu / customer ordering page
  - realtime orders
  - restaurant dashboard
  - bills / reports structure
- Điểm mạnh:
  - mapping khá sát Seatly vì có QR menu, realtime orders và dashboard cùng lúc
  - có app structure rõ để tham khảo information architecture giữa guest và dashboard
- Giới hạn:
  - repo còn mới, độ trưởng thành chưa cao
  - có yếu tố multi-tenant, cần loại bỏ phần vượt scope Seatly
- Gợi ý chụp screenshot cho Trello:
  - README feature list
  - application structure trong README

### 11) Mordris/RestaurantPOSapp

- URL: `https://github.com/Mordris/RestaurantPOSapp`
- Loại nguồn: open-source example có screenshot thật
- Màn hình/pattern áp dụng:
  - tables view
  - order page cho staff
  - order history
  - PDF receipt / bill review
- Điểm mạnh:
  - README có screenshot thật cho `Tables View`, `Order Page`, `History Page`, `PDF Receipt`
  - rất hữu ích để tham khảo dashboard staff-side và payment/bill review
- Giới hạn:
  - thiên về POS/staff side hơn guest QR ordering
  - visual mang tính reference implementation hơn là polished product
- Gợi ý chụp screenshot cho Trello:
  - `Tables View`
  - `Order Page`
  - `History Page`
  - `PDF Receipt`

## Mapping nhanh giữa reference và màn hình core của Seatly

| Màn hình core                | References phù hợp nhất                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| guest entry / nhập tên       | Material Text Fields, Square, Toast                                                   |
| QR menu / dish list          | Square, GloriaFood QR Menu, GloriaFood Screenshots, roshanx0/restaurant-ordering-saas |
| order summary / submit order | Toast, Square, Material Bottom Sheets, GloriaFood Screenshots                         |
| realtime order tracking      | Domino's Tracker, roshanx0/restaurant-ordering-saas                                   |
| staff order handling         | Shopify Polaris Table, Ant Design, Mordris/RestaurantPOSapp                           |
| owner / manager dashboard    | Shopify Polaris Table, Ant Design, roshanx0/restaurant-ordering-saas                  |
| simple payment / bill review | Square, GloriaFood QR Menu, Mordris/RestaurantPOSapp                                  |

## Pattern synthesis theo role

### `Guest` - mobile-first

#### Guest entry / name input

- Luồng nên cực ngắn: `Scan QR -> xác nhận bàn -> nhập tên -> vào menu`
- Chỉ nên có 1 input chính là `name` và 1 CTA chính là `Continue` hoặc `Start ordering`
- Cần helper text rất ngắn để giải thích tên này dùng để nhân viên phân biệt order tại bàn
- Không nên đưa form dài, login, hoặc yêu cầu thông tin không cần thiết

#### QR menu / dish list

- Nên dùng `category chips` hoặc segmented tabs để nhảy nhanh giữa nhóm món
- Nên có `sticky cart CTA` hoặc sticky footer để khách luôn thấy số món đã chọn
- Dish card ưu tiên các dữ liệu: tên món, giá, mô tả ngắn, ảnh nhỏ, trạng thái available/out-of-stock
- Tránh card quá cao hoặc ảnh quá lớn vì sẽ làm chậm scan menu trên mobile

#### Order summary / submit order

- `Bottom sheet` là pattern phù hợp để review cart mà không rời khỏi flow menu quá xa
- Thông tin cần rõ: món, số lượng, note, subtotal, phụ phí nếu có, CTA submit duy nhất
- Tránh chia nhiều bước checkout phức tạp trong MVP

#### Realtime order tracking

- Chỉ nên hiển thị số ít trạng thái rõ nghĩa
- Gợi ý nhóm trạng thái giao diện:
  - `Pending`: quán đã nhận
  - `Processing`: đang làm món
  - `Delivered`: đã phục vụ
  - `Paid`: đã thanh toán
  - `Rejected`: chỉ hiển thị khi thực sự xảy ra exception
- Ưu tiên cảm giác cập nhật rõ ràng hơn là timeline chi tiết

#### Simple payment / bill review

- MVP nên tập trung vào xem bill, tổng tiền tạm tính, trạng thái paid/unpaid
- Nếu có CTA thanh toán online thì vẫn cần cho phép flow đơn giản, không thêm quá nhiều branching

### `Employee` - web dashboard

- Màn hình mặc định nên là `active orders queue`, không phải analytics
- Mỗi row/card order nên ưu tiên: `table`, `guest name`, `items count`, `age`, `status`, `notes`
- Cần filter nhanh theo trạng thái `Pending`, `Processing`, `Delivered`, `Paid`, `Rejected`
- Status update nên là thao tác 1 chạm hoặc dropdown ngắn, không nhiều modal
- Realtime nên thể hiện qua badge số lượng order mới, highlight row mới, và phân tách queue rõ ràng
- Không nên nhồi feature table request hoặc các panel vận hành ngoài core ở giai đoạn này

### `Owner/Manager` - web dashboard

- Dashboard nên ưu tiên `operational snapshot` hơn chart phức tạp
- Các khối thông tin nên đủ gọn:
  - số order hôm nay
  - doanh thu hôm nay
  - số bàn đang active
  - order theo trạng thái
  - top món bán chạy cơ bản
- Nên kết hợp `KPI cards + status table/list + chart rất nhẹ` nếu cần
- Không nên đi sang hướng BI dashboard nặng hoặc multi-branch operations

## Core/MVP và future enhancement

### Core/MVP cần bám chặt

- guest entry với nhập tên ngắn
- mobile QR menu / dish list
- cart + order summary + submit order
- near-realtime order tracking mức cơ bản
- staff dashboard xử lý order theo trạng thái
- owner / manager dashboard cho vận hành cơ bản
- simple payment / bill review

### Future enhancement chỉ ghi nhận để tránh research lệch scope

- `TableRequest` workflow đầy đủ
- ETA nâng cao theo món
- order timeline chi tiết bằng log
- quick reorder
- auto occupancy
- auto session timeout
- analytics sâu hơn cho owner
- các flow mở rộng liên quan inventory, CRM, ERP, loyalty, delivery ecosystem, POS hardware
- multi-restaurant / multi-branch

## Visual direction đề xuất ở mức research

Đây chưa phải quyết định visual cuối cùng, nhưng từ các references có thể rút ra hướng an toàn cho Sprint sau:

- `Guest mobile`: ưu tiên giao diện sáng, sạch, khoảng trắng vừa phải, CTA nổi bật, hierarchy rõ, ảnh món dùng tiết chế
- `Realtime`: dùng status chip, stepper ngắn, hoặc progress nhóm trạng thái thay vì timeline dài
- `Staff`: ưu tiên dashboard dạng queue thực dụng, màu trạng thái rõ, thông tin quét nhanh trong 3-5 giây
- `Owner/Manager`: dashboard điều hành gọn, ít chart, nhiều số liệu vận hành trực tiếp hơn

## Các màn hình core nên ưu tiên thiết kế trước

1. `QR menu / dish list`
2. `order summary / submit order`
3. `guest entry / name input`
4. `staff order management dashboard`
5. `realtime order tracking`
6. `simple payment / bill review`
7. `owner / manager operations dashboard`

## Trello-ready checklist

Danh sách dưới đây có thể dùng trực tiếp khi đưa kết quả lên Trello card:

- [x] Có hơn 5 UI references với URL public
- [x] References bao phủ guest entry, QR menu, order summary, order tracking, staff dashboard, owner dashboard, simple payment
- [x] Có mapping giữa reference và màn hình/flow của Seatly
- [x] Có tổng hợp pattern cho `Guest`, `Employee`, `Owner/Manager`
- [x] Có phân biệt rõ `core/MVP` và `future enhancement`
- [x] Không bao gồm prototype, mockup, Figma, AI design tool

## Ghi chú vận hành

Do môi trường hiện tại không gắn trực tiếp với Trello card, nội dung này được chuẩn bị ở dạng markdown để có thể copy vào comment hoặc attachment của card. Phần screenshot attachment trên Trello nên được lấy trực tiếp từ các URL tham chiếu đã liệt kê ở trên để đáp ứng đúng checklist của task.
