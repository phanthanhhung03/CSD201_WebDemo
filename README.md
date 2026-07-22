# 🌐 PointerVision DSA - Interactive Pointer Visualizer

**PointerVision** là một ứng dụng web giáo dục tương tác trực quan hóa các **Cấu trúc Dữ liệu & Thuật toán (DSA)** cơ bản, được thiết kế đặc biệt giúp người học dễ dàng hiểu rõ bản chất hoạt động của các **Con Trỏ (Pointers & Node Class)**.

---

## ⚡ Các Tính Năng Nổi Bật

- **Chuẩn Bản Chất Con Trỏ (No Array Cheats)**: Triển khai 100% bằng đối tượng `Node` và các liên kết con trỏ (`next`, `prev`, `left`, `right`).
- **6 Cấu Trúc Dữ Liệu Căn Bản**:
  1. **Singly Linked List (SLL)**: Thêm/xóa đầu, cuối, index, xóa giá trị, tìm kiếm.
  2. **Doubly Linked List (DLL)**: Mũi tên liên kết 2 chiều (`next` & `prev`).
  3. **Circular Linked List (CLL)**: Mũi tên uốn cong nối vòng từ Node cuối (`tail`) về Node đầu (`head`).
  4. **Stack (Linked List)**: Ngăn xếp LIFO với đồ họa cột đứng và con trỏ `TOP`.
  5. **Queue (Linked List)**: Hàng đợi FIFO với hàng ngang và con trỏ `FRONT`/`REAR`.
  6. **Binary Search Tree (BST)**: Cây tìm kiếm nhị phân phân nhánh tự động, hỗ trợ chèn, xóa 0/1/2 con, tìm kiếm và 4 thuật toán duyệt cây (`In-Order`, `Pre-Order`, `Post-Order`, `BFS`).
- **Engine Mô Phỏng Từng Bước (Step-by-Step Generator)**: Tự động ghi lại snapshot từng bước thực thi để người dùng tùy ý Play, Pause, Lùi bước, Tới bước hoặc chỉnh Tốc độ (Chậm, Vừa, Nhanh).
- **Mã Giả (Pseudocode) & Nhật Ký Tiếng Việt**: Highlighting chính xác dòng lệnh pseudocode đang chạy kèm nhật ký giải thích chi tiết logic con trỏ bằng Tiếng Việt.
- **Đồ Họa & Animation Mượt Mà**: Kết hợp **Framer Motion** và hệ thống đường vẽ **Custom SVG Arrows** động.

---

## 🛠️ Công Nghệ Sử Dụng

- **Framework**: ReactJS (Functional Components & React Hooks)
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4 (Glassmorphism & Dark Mode)
- **Animation**: Framer Motion
- **Icons**: Lucide React

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Yêu cầu môi trường
- **Node.js**: Phiên bản `>= 18.0.0`
- **npm**: Phiên bản `>= 9.0.0`

### 2. Cài đặt các thư viện phụ thuộc (Dependencies)
Mở Terminal tại thư mục dự án và chạy:
```bash
npm install
```

### 3. Chạy Server Phát Triển (Dev Server)
```bash
npm run dev
```
Sau khi lệnh chạy thành công, mở trình duyệt tại địa chỉ:
👉 **`http://localhost:5173`**

### 4. Biên dịch Dự án cho Production
```bash
npm run build
```
Sản phẩm đóng gói sẽ nằm trong thư mục `dist/`.

---

## 🧪 Hướng Dẫn Kiểm Thử (Testing Guide)

### 1. Test Singly Linked List (SLL)
- Bấm nút **"Mẫu"** trên thanh Header để nạp dữ liệu mẫu (`10 -> 20 -> 30 -> 40`).
- Nhập giá trị `5` $\rightarrow$ Bấm **"Thêm Đầu"**: Quan sát Node 5 xuất hiện, trỏ `5.next -> 10`, sau đó `HEAD` cập nhật sang Node 5.
- Nhập giá trị `50` $\rightarrow$ Bấm **"Thêm Cuối"**: Quan sát Node 50 được nối vào cuối và `TAIL` trỏ sang 50.
- Nhập `30` $\rightarrow$ Bấm **"Tìm Kiếm"**: Con trỏ `curr` truy vết từng Node cho đến khi dừng và highlight màu xanh lá tại Node 30.

### 2. Test Doubly Linked List (DLL)
- Bấm tab **"DLL"** ở thanh Header.
- Quan sát giữa các Node luôn hiển thị **2 đường mũi tên song song** (`next` màu xanh ở trên, `prev` màu tím ở dưới).
- Thử bấm **"Xóa Cuối"**: Node cuối đổi màu đỏ, `TAIL` lùi về Node trước đó và ngắt liên kết `TAIL.next = NULL`.

### 3. Test Circular Linked List (CLL)
- Bấm tab **"CLL"** ở thanh Header.
- Quan sát đường mũi tên uốn cong nối từ Node cuối về Node đầu (`tail.next -> head`).
- Bấm **"Duyệt Vòng (Traverse)"**: Con trỏ đi qua từng Node và quay trở lại `HEAD` để kết thúc.

### 4. Test Stack (Linked List)
- Bấm tab **"STACK"**. Màn hình chuyển sang giao diện cột đứng (LIFO).
- Bấm **"PUSH"**: Phần tử mới thả xuống từ trên vào vị trí `TOP`.
- Bấm **"POP"**: Phần tử trên cùng rút ra và `TOP` chuyển xuống Node bên dưới.

### 5. Test Queue (Linked List)
- Bấm tab **"QUEUE"**. Màn hình chuyển sang hàng ngang (FIFO) có nhãn `FRONT` và `REAR`.
- Bấm **"ENQUEUE"**: Thêm phần tử vào bên phải (`REAR`).
- Bấm **"DEQUEUE"**: Lấy phần tử ra ở bên trái (`FRONT`).

### 6. Test Binary Search Tree (BST)
- Bấm tab **"BST"**. Cây nhị phân dạng đồ thị tròn hiện ra với gốc `ROOT = 50`.
- Nhập `25` $\rightarrow$ Bấm **"Thêm vào BST"**: Node 25 tự động so sánh và chèn vào nhánh trái của 30, nhánh phải của 20.
- Chọn **In-Order** $\rightarrow$ Bấm **"Thực Hiện Duyệt"**: Các Node đổi màu xanh theo đúng thứ tự tăng dần giá trị.

### 7. Test Trình Điều Khiển Playback
- Bấm **"TẠM DỪNG"** trong khi animation đang chạy $\rightarrow$ Animation dừng lập tức.
- Bấm nút **"Lùi 1 bước"** ($\leftarrow$) hoặc **"Tới 1 bước"** ($\rightarrow$) để xem từng khung hình chi tiết.
- Chọn tốc độ **Chậm** (1.5s), **Vừa** (0.8s) hoặc **Nhanh** (0.35s) trên thanh trượt.

---

## 📂 Cấu Trúc Mã Nguồn

```
CSD_WEB/
├── src/
│   ├── dsa/                   # Logic cài đặt chuẩn Class Node & Con trỏ
│   │   ├── SinglyLinkedList.js
│   │   ├── DoublyLinkedList.js
│   │   ├── CircularLinkedList.js
│   │   ├── StackLL.js
│   │   ├── QueueLL.js
│   │   └── BinarySearchTree.js
│   ├── components/
│   │   ├── Canvas/            # Render đồ họa SVG Arrows & Nodes
│   │   ├── Header.jsx         # Selector Cấu trúc Dữ liệu
│   │   ├── ControlPanel.jsx   # Form thao tác và nút bấm thực thi
│   │   ├── PlaybackControls.jsx # Trình điều khiển Play/Pause/Speed
│   │   ├── CodePanel.jsx      # Pseudocode Tracker Highlight
│   │   └── LogPanel.jsx       # Nhật ký Tiếng Việt
│   ├── pseudocode/            # Mã giả thuật toán
│   ├── types/                 # Constants & Status
│   └── App.jsx                # State Management & Main Layout
├── index.html
├── vite.config.js
└── tailwind.config.js
```

---

## 📜 Giấy Phép (License)

Dự án phát triển phục vụ mục đích giáo dục và học tập Cấu trúc Dữ liệu & Thuật toán (CSD201 / DSA). MIT License.
