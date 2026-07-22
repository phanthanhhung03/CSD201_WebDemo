# Kế Hoạch & Hướng Dẫn Kiểm Thử (Testing Plan & Guide) - PointerVision DSA

Tài liệu này cung cấp Kế hoạch kiểm thử (Test Plan) chi tiết từng bước để kiểm tra toàn bộ các tính năng, thuật toán con trỏ, hiệu ứng visualizer và trình điều khiển của ứng dụng **PointerVision DSA**.

---

## 🚀 1. HƯỚNG DẪN KHỞI CHẠY ỨNG DỤNG

### Bước 1: Mở Terminal tại thư mục dự án
```bash
cd "e:\Meterials\FPT\4. SUM26\CSD201\CSD_WEB"
```

### Bước 2: Khởi chạy Server Phát Triển (Dev Server)
*(Lưu ý: gõ đúng `npm`, tránh gõ nhầm thành `mpm`)*
```bash
npm run dev
```

### Bước 3: Truy cập trình duyệt
Mở trình duyệt web (Chrome, Edge, Firefox) và truy cập đường dẫn:
👉 **`http://localhost:5173`** (hoặc cổng hiển thị trong terminal).

---

## 📋 2. KẾ HOẠCH KIỂM THỬ TỪNG CẤU TRÚC DỮ LIỆU (DSA TEST CASES)

### 🔹 Kịch Bản 1: Singly Linked List (SLL)
| Thao tác | Hành động test | Kết quả kỳ vọng |
| :--- | :--- | :--- |
| **Nạp mẫu** | Bấm nút **"Mẫu"** | Xuất hiện 4 Node: `[10] -> [20] -> [30] -> [40] -> NULL`. Con trỏ `HEAD` trỏ Node 10, `TAIL` trỏ Node 40. |
| **Thêm Đầu** | Nhập `5` -> Bấm **"Thêm Đầu"** | Node `[5]` xuất hiện ở vùng chờ -> Trỏ `5.next -> 10` -> Cập nhật `HEAD` trỏ vào `5`. |
| **Thêm Cuối** | Nhập `50` -> Bấm **"Thêm Cuối"** | Node `[50]` tạo ra -> Trỏ `40.next -> 50` -> Cập nhật `TAIL` trỏ vào `50`. |
| **Thêm Index**| Nhập Giá trị `25`, Index `2` -> Bấm **"Thêm Index"** | Con trỏ `curr` truy vết đến Node 20 (index 1) -> Trỏ `25.next -> 30` -> Trỏ `20.next -> 25`. |
| **Xóa Đầu** | Bấm **"Xóa Đầu"** | Node đầu tiên đổi sang màu đỏ -> Con trỏ `HEAD` nhảy sang Node kế tiếp -> Node cũ biến mất. |
| **Xóa Cuối** | Bấm **"Xóa Cuối"** | Con trỏ `curr` duyệt tìm Node kế cuối -> Trỏ `curr.next = NULL` -> `TAIL` lùi về Node trước đó. |
| **Tìm Kiếm** | Nhập `30` -> Bấm **"Tìm Kiếm"** | Con trỏ `curr` highlight từng Node từ `HEAD` -> Dừng và highlight xanh lá tại Node 30 (*TÌM THẤY*). |

---

### 🔹 Kịch Bản 2: Doubly Linked List (DLL)
| Thao tác | Hành động test | Kết quả kỳ vọng |
| :--- | :--- | :--- |
| **Chuyển Tab**| Bấm Tab **"DLL"** ở Header | Hiển thị 4 Node với **2 đường mũi tên song song giữa mỗi cặp Node** (`next` màu xanh cyan, `prev` màu tím). |
| **Thêm Đầu** | Nhập `99` -> Bấm **"Thêm Đầu"** | Nối 2 chiều: `99.next -> head` và `head.prev -> 99` -> Cập nhật `HEAD` mới. |
| **Xóa Cuối** | Bấm **"Xóa Cuối"** | Node cuối đổi màu đỏ -> Cập nhật `TAIL = TAIL.prev` -> Ngắt kết nối `TAIL.next = NULL`. |

---

### 🔹 Kịch Bản 3: Circular Linked List (CLL)
| Thao tác | Hành động test | Kết quả kỳ vọng |
| :--- | :--- | :--- |
| **Chuyển Tab**| Bấm Tab **"CLL"** ở Header | Màn hình hiển thị đường mũi tên **uốn cong từ Node cuối (TAIL) trỏ ngược về Node đầu (HEAD)**. |
| **Duyệt Vòng**| Bấm **"Duyệt Vòng (Traverse)"** | Con trỏ `curr` đi qua từng Node và quay trở lại Node `HEAD` ban đầu -> Kết thúc vòng lặp. |

---

### 🔹 Kịch Bản 4: Stack (Mô phỏng LIFO chiều dọc)
| Thao tác | Hành động test | Kết quả kỳ vọng |
| :--- | :--- | :--- |
| **Chuyển Tab**| Bấm Tab **"STACK"** | Khung container xếp theo **cột dọc**. Con trỏ `TOP` chỉ vào phần tử trên cùng. |
| **PUSH** | Nhập `99` -> Bấm **"PUSH"** | Node 99 thả từ trên xuống đỉnh Stack -> `TOP` trỏ vào 99. |
| **POP** | Bấm **"POP"** | Node ở đỉnh đổi màu đỏ và rút ra khỏi Stack -> `TOP` chuyển xuống phần tử bên dưới. |
| **PEEK** | Bấm **"PEEK"** | Node ở đỉnh highlight màu xanh lá, log hiển thị giá trị ở `TOP`. |

---

### 🔹 Kịch Bản 5: Queue (Mô phỏng FIFO hàng ngang)
| Thao tác | Hành động test | Kết quả kỳ vọng |
| :--- | :--- | :--- |
| **Chuyển Tab**| Bấm Tab **"QUEUE"** | Hàng ngang với nhãn `FRONT` (đầu ra - màu đỏ) và `REAR` (đầu vào - màu xanh). |
| **ENQUEUE**| Nhập `77` -> Bấm **"ENQUEUE"** | Node 77 vào ở phía phải (`REAR`) -> Cập nhật con trỏ `REAR`. |
| **DEQUEUE**| Bấm **"DEQUEUE"** | Node ở phía trái (`FRONT`) rời khỏi hàng -> `FRONT` chuyển sang Node kế tiếp. |

---

### 🔹 Kịch Bản 6: Binary Search Tree (BST)
| Thao tác | Hành động test | Kết quả kỳ vọng |
| :--- | :--- | :--- |
| **Chuyển Tab**| Bấm Tab **"BST"** | Cây nhị phân hiển thị dạng đồ thị tròn phân nhánh với con trỏ `ROOT` ở Node 50. |
| **Thêm Node**| Nhập `25` -> Bấm **"Thêm vào BST"** | So sánh 25 < 50 (sang trái), 25 > 20 (sang phải) -> Chèn 25 làm con phải của 20. Các đường nối nét đứt nối tự động. |
| **Duyệt Cây**| Chọn **In-Order** -> Bấm **"Thực Hiện Duyệt"** | Thuật toán duyệt Trái -> Gốc -> Phải: các Node đổi màu xanh lam theo thứ tự tăng dần giá trị. |

---

## 🎛️ 3. KIỂM THỬ TRÌNH ĐIỀU KHIỂN & GIAO DIỆN (PLAYBACK & UI)

1. **Test Nút Play / Pause**:
   - Khi bấm một thao tác (ví dụ Insert), animation tự động phát.
   - Bấm **"TẠM DỪNG"**: Animation dừng lại đúng bước hiện tại.
   - Bấm **"TỰ ĐỘNG PHÁT"**: Animation tiếp tục chạy.

2. **Test Nút Step Forward / Step Back**:
   - Tạm dừng animation -> Bấm nút **"Lùi 1 bước"** ($\leftarrow$) và **"Tới 1 bước"** ($\rightarrow$).
   - Quan sát con trỏ và Node quay lại đúng vị trí của bước trước đó.

3. **Test Speed Control Slider**:
   - Bấm chọn mức **"Chậm"** (Slow - 1.5s): Chuyển động bước diễn ra thong thả.
   - Bấm chọn mức **"Nhanh"** (Fast - 0.35s): Chuyển động lướt nhanh.

4. **Test Pseudocode Tracker & Log Panel**:
   - Kiểm tra khung **Pseudocode**: Dòng code tương ứng với bước hiện tại được highlight viền cyan glow rực rỡ.
   - Kiểm tra khung **Pointer Log**: Hiển thị log giải thích bằng **Tiếng Việt** chuẩn xác.

---

## ✅ CHECKLIST ĐÁNH GIÁ CHẤT LƯỢNG (DEFINITION OF DONE)

- [x] Không có lỗi console crash hoặc màn hình trắng.
- [x] Không dùng mảng tĩnh JS Array để làm giả lập (Dùng đối tượng `Node` & con trỏ `next`, `prev`, `left`, `right`).
- [x] Mũi tên SVG vẽ chính xác các con trỏ `head`, `tail`, `top`, `front`, `rear`, `root`.
- [x] Responsive giao diện đẹp mắt trên màn hình máy tính và laptop.
