/**
 * Singly Linked List (Danh sách liên kết đơn)
 * Triển khai chuẩn bản chất Node & con trỏ với thuật toán Đảo Ngược (Reverse) mô phỏng từng bước đổi hướng mũi tên thực tế.
 */

export class SLLNode {
  constructor(value, id = null) {
    this.id = id || `node_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.value = value;
    this.next = null;
  }
}

export class SinglyLinkedListEngine {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Snapshot lấy danh sách Node theo thứ tự từ head -> tail hiện tại
  snapshotNodes(statusMap = {}, newNode = null) {
    const list = [];
    let curr = this.head;
    const visited = new Set();
    while (curr && !visited.has(curr.id)) {
      visited.add(curr.id);
      list.push({
        id: curr.id,
        value: curr.value,
        nextId: curr.next ? curr.next.id : null,
        status: statusMap[curr.id] || 'default'
      });
      curr = curr.next;
    }
    return {
      nodes: list,
      headId: this.head ? this.head.id : null,
      tailId: this.tail ? this.tail.id : null,
      size: this.size,
      newNode: newNode ? {
        id: newNode.id,
        value: newNode.value,
        status: statusMap[newNode.id] || 'new'
      } : null
    };
  }

  setInitialData(values) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    for (const val of values) {
      const node = new SLLNode(val);
      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        this.tail.next = node;
        this.tail = node;
      }
      this.size++;
    }
    return this.snapshotNodes();
  }

  insertHead(value) {
    const steps = [];
    const newNode = new SLLNode(value);

    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'new' }, newNode),
      pointers: { head: this.head?.id, tail: this.tail?.id, newNode: newNode.id },
      pseudocodeLine: 0,
      log: `Khởi tạo Node mới Node(${value}).`
    });

    newNode.next = this.head;
    steps.push({
      nodes: [
        { id: newNode.id, value: newNode.value, nextId: this.head ? this.head.id : null, status: 'new' },
        ...this.snapshotNodes().nodes
      ],
      headId: this.head?.id,
      tailId: this.tail?.id,
      size: this.size,
      pointers: { head: this.head?.id, tail: this.tail?.id, newNode: newNode.id },
      pseudocodeLine: 1,
      log: `Trỏ newNode.next -> head (${this.head ? 'Node(' + this.head.value + ')' : 'NULL'}).`
    });

    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.size++;

    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 2,
      log: `Cập nhật con trỏ head trỏ tới Node(${value}). Thêm đầu thành công! (Size = ${this.size})`
    });

    return steps;
  }

  insertTail(value) {
    const steps = [];
    const newNode = new SLLNode(value);

    steps.push({
      ...this.snapshotNodes({}, newNode),
      pointers: { head: this.head?.id, tail: this.tail?.id, newNode: newNode.id },
      pseudocodeLine: 0,
      log: `Tạo newNode = Node(${value}).`
    });

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
      steps.push({
        ...this.snapshotNodes({ [newNode.id]: 'found' }),
        pointers: { head: this.head.id, tail: this.tail.id },
        pseudocodeLine: 1,
        log: `Danh sách rỗng: Gán head = tail = newNode(${value}).`
      });
      return steps;
    }

    const oldTailId = this.tail.id;
    this.tail.next = newNode;

    steps.push({
      ...this.snapshotNodes({ [oldTailId]: 'active', [newNode.id]: 'new' }),
      pointers: { head: this.head.id, tail: oldTailId, newNode: newNode.id },
      pseudocodeLine: 2,
      log: `Trỏ tail.next (${this.tail.value}) tới newNode (${value}).`
    });

    this.tail = newNode;
    this.size++;

    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 3,
      log: `Cập nhật con trỏ tail = newNode(${value}). Thêm cuối thành công! (Size = ${this.size})`
    });

    return steps;
  }

  insertAtIndex(index, value) {
    if (index <= 0) return this.insertHead(value);
    if (index >= this.size) return this.insertTail(value);

    const steps = [];
    const newNode = new SLLNode(value);

    steps.push({
      ...this.snapshotNodes({}, newNode),
      pointers: { head: this.head?.id, tail: this.tail?.id, newNode: newNode.id },
      pseudocodeLine: 0,
      log: `Khởi tạo newNode = Node(${value}) để chèn tại vị trí index = ${index}.`
    });

    let curr = this.head;
    let i = 0;

    while (curr && i < index - 1) {
      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'active' }, newNode),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id, newNode: newNode.id },
        pseudocodeLine: 3,
        log: `Truy vết con trỏ curr -> Node(${curr.value}) tại vị trí index ${i}.`
      });
      curr = curr.next;
      i++;
    }

    steps.push({
      ...this.snapshotNodes({ [curr.id]: 'active' }, newNode),
      pointers: { head: this.head.id, tail: this.tail.id, current: curr.id, newNode: newNode.id },
      pseudocodeLine: 3,
      log: `Tìm thấy Node trước vị trí chèn: Node(${curr.value}) tại index ${index - 1}.`
    });

    newNode.next = curr.next;
    steps.push({
      ...this.snapshotNodes({ [curr.id]: 'active' }, newNode),
      pointers: { head: this.head.id, tail: this.tail.id, current: curr.id, newNode: newNode.id },
      pseudocodeLine: 4,
      log: `Trỏ newNode.next -> curr.next (${curr.next ? 'Node(' + curr.next.value + ')' : 'NULL'}).`
    });

    curr.next = newNode;
    this.size++;

    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id, newNode: newNode.id },
      pseudocodeLine: 5,
      log: `Trỏ curr.next -> newNode. Đã chèn Node(${value}) vào vị trí ${index}! (Size = ${this.size})`
    });

    return steps;
  }

  deleteHead() {
    const steps = [];
    if (!this.head) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: {},
        pseudocodeLine: 0,
        log: `Danh sách rỗng! Không thể xóa.`
      });
      return steps;
    }

    const temp = this.head;
    steps.push({
      ...this.snapshotNodes({ [temp.id]: 'deleting' }),
      pointers: { head: this.head.id, tail: this.tail.id, temp: temp.id },
      pseudocodeLine: 1,
      log: `Đánh dấu temp = head (Node(${temp.value})).`
    });

    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this.size--;

    steps.push({
      ...this.snapshotNodes(),
      pointers: { head: this.head?.id, tail: this.tail?.id },
      pseudocodeLine: 2,
      log: `Di chuyển con trỏ head sang head.next. Đã xóa Node đầu! (Size = ${this.size})`
    });

    return steps;
  }

  deleteTail() {
    const steps = [];
    if (!this.head) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: {},
        pseudocodeLine: 0,
        log: `Danh sách rỗng!`
      });
      return steps;
    }

    if (this.head === this.tail) {
      const tempId = this.head.id;
      steps.push({
        ...this.snapshotNodes({ [tempId]: 'deleting' }),
        pointers: { head: tempId, tail: tempId },
        pseudocodeLine: 1,
        log: `Danh sách chỉ có 1 Node (${this.head.value}). Xóa Node duy nhất.`
      });
      this.head = null;
      this.tail = null;
      this.size = 0;
      steps.push({
        ...this.snapshotNodes(),
        pointers: {},
        pseudocodeLine: 2,
        log: `Gán head = tail = NULL. Danh sách trở nên rỗng.`
      });
      return steps;
    }

    let curr = this.head;
    while (curr.next !== this.tail) {
      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'active' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: 2,
        log: `Duyệt curr -> Node(${curr.value}) để tìm Node kế cuối.`
      });
      curr = curr.next;
    }

    steps.push({
      ...this.snapshotNodes({ [curr.id]: 'active', [this.tail.id]: 'deleting' }),
      pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
      pseudocodeLine: 2,
      log: `Tìm thấy Node kế cuối: Node(${curr.value}). Xóa tail Node(${this.tail.value}).`
    });

    curr.next = null;
    this.tail = curr;
    this.size--;

    steps.push({
      ...this.snapshotNodes({ [this.tail.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 3,
      log: `Cập nhật tail = curr, tail.next = NULL. Đã xóa Node cuối! (Size = ${this.size})`
    });

    return steps;
  }

  deleteAtIndex(index) {
    if (index < 0 || index >= this.size) {
      return [{
        ...this.snapshotNodes(),
        pointers: { head: this.head?.id, tail: this.tail?.id },
        pseudocodeLine: 0,
        log: `Chỉ số index ${index} không hợp lệ! (Size = ${this.size})`
      }];
    }
    if (index === 0) return this.deleteHead();
    if (index === this.size - 1) return this.deleteTail();

    const steps = [];
    let curr = this.head;
    let i = 0;

    while (i < index - 1) {
      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'active' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: 3,
        log: `Duyệt curr sang Node(${curr.value}) tại vị trí index ${i}.`
      });
      curr = curr.next;
      i++;
    }

    const temp = curr.next;
    steps.push({
      ...this.snapshotNodes({ [curr.id]: 'active', [temp.id]: 'deleting' }),
      pointers: { head: this.head.id, tail: this.tail.id, current: curr.id, temp: temp.id },
      pseudocodeLine: 4,
      log: `Tìm thấy Node(${temp.value}) tại index ${index}. Tiến hành bỏ qua liên kết.`
    });

    curr.next = temp.next;
    this.size--;

    steps.push({
      ...this.snapshotNodes({ [curr.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 5,
      log: `Cập nhật curr.next = temp.next. Xóa Node tại index ${index} thành công! (Size = ${this.size})`
    });

    return steps;
  }

  deleteValue(val) {
    const steps = [];
    if (!this.head) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: {},
        pseudocodeLine: 0,
        log: `Danh sách rỗng!`
      });
      return steps;
    }

    if (this.head.value === val) {
      return this.deleteHead();
    }

    let curr = this.head;
    while (curr.next && curr.next.value !== val) {
      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'active' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: 3,
        log: `Kiểm tra curr.next.value (${curr.next.value}) != ${val}. Duyệt tiếp curr.`
      });
      curr = curr.next;
    }

    if (!curr.next) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: { head: this.head.id, tail: this.tail.id },
        pseudocodeLine: 4,
        log: `Không tìm thấy Node có giá trị = ${val} trong danh sách.`
      });
      return steps;
    }

    const temp = curr.next;
    steps.push({
      ...this.snapshotNodes({ [curr.id]: 'active', [temp.id]: 'deleting' }),
      pointers: { head: this.head.id, tail: this.tail.id, current: curr.id, temp: temp.id },
      pseudocodeLine: 5,
      log: `Tìm thấy Node có giá trị = ${val} tại temp (Node(${temp.value})).`
    });

    curr.next = temp.next;
    if (temp === this.tail) {
      this.tail = curr;
    }
    this.size--;

    steps.push({
      ...this.snapshotNodes({ [curr.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 5,
      log: `Trỏ curr.next = temp.next. Đã xóa Node(${val})! (Size = ${this.size})`
    });

    return steps;
  }

  search(val) {
    const steps = [];
    let curr = this.head;
    let idx = 0;

    while (curr) {
      const isMatch = curr.value === val;
      steps.push({
        ...this.snapshotNodes({ [curr.id]: isMatch ? 'found' : 'active' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: isMatch ? 2 : 3,
        log: isMatch
          ? `TÌM THẤY! Node(${curr.value}) trùng khớp tại vị trí index = ${idx}.`
          : `So sánh Node(${curr.value}) với ${val} -> Không trùng khớp. Chuyển sang next.`
      });

      if (isMatch) return steps;
      curr = curr.next;
      idx++;
    }

    steps.push({
      ...this.snapshotNodes(),
      pointers: { head: this.head?.id, tail: this.tail?.id },
      pseudocodeLine: 4,
      log: `Đã duyệt hết danh sách. Không tìm thấy giá trị ${val}.`
    });

    return steps;
  }

  traverse() {
    const steps = [];
    if (!this.head) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: {},
        pseudocodeLine: 0,
        log: `Danh sách SLL rỗng.`
      });
      return steps;
    }

    let curr = this.head;
    let idx = 0;
    while (curr) {
      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'visited' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: 3,
        log: `[Traverse] Duyệt qua Node(${curr.value}) tại chỉ số index ${idx}.`
      });
      curr = curr.next;
      idx++;
    }

    steps.push({
      ...this.snapshotNodes(),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 4,
      log: `Đã hoàn tất duyệt toàn bộ ${this.size} Node trong SLL.`
    });

    return steps;
  }

  getFirst() {
    const steps = [];
    if (!this.head) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: {},
        pseudocodeLine: 0,
        log: `Danh sách rỗng! Get First trả về NULL.`
      });
      return steps;
    }

    steps.push({
      ...this.snapshotNodes({ [this.head.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 1,
      log: `[Get First] Phần tử đầu tiên (HEAD) có giá trị = ${this.head.value}.`
    });

    return steps;
  }

  getLast() {
    const steps = [];
    if (!this.tail) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: {},
        pseudocodeLine: 0,
        log: `Danh sách rỗng! Get Last trả về NULL.`
      });
      return steps;
    }

    steps.push({
      ...this.snapshotNodes({ [this.tail.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 1,
      log: `[Get Last] Phần tử cuối cùng (TAIL) có giá trị = ${this.tail.value}.`
    });

    return steps;
  }

  getByIndex(index) {
    if (index < 0 || index >= this.size) {
      return [{
        ...this.snapshotNodes(),
        pointers: { head: this.head?.id, tail: this.tail?.id },
        pseudocodeLine: 0,
        log: `Chỉ số index ${index} nằm ngoài phạm vi! (Size = ${this.size})`
      }];
    }

    const steps = [];
    let curr = this.head;
    let i = 0;

    while (i < index) {
      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'active' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: 2,
        log: `Duyệt tìm index ${index}: Đang ở Node(${curr.value}) tại index ${i}.`
      });
      curr = curr.next;
      i++;
    }

    steps.push({
      ...this.snapshotNodes({ [curr.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
      pseudocodeLine: 3,
      log: `[Get By Index ${index}] Tìm thấy Node(${curr.value}) tại chỉ số index ${index}!`
    });

    return steps;
  }

  // 🔄 ANIMATION REVERSE MÔ PHỎNG TỪNG BƯỚC THỰC TẾ (Step-by-Step Pointer Reversal Simulation)
  reverse() {
    const steps = [];
    if (!this.head || !this.head.next) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: { head: this.head?.id, tail: this.tail?.id },
        pseudocodeLine: 0,
        log: `Danh sách có ít hơn 2 Node, giữ nguyên.`
      });
      return steps;
    }

    // Capture initial order of Node objects (positions stay fixed during loop animation)
    const initialNodeList = [];
    let tempNode = this.head;
    while (tempNode) {
      initialNodeList.push(tempNode);
      tempNode = tempNode.next;
    }

    // Dynamic map tracking nextId for each node step-by-step
    const nextPointerMap = {};
    initialNodeList.forEach((node) => {
      nextPointerMap[node.id] = node.next ? node.next.id : null;
    });

    const createLoopStepSnapshot = (statusMap, pointers, line, logText) => {
      return {
        nodes: initialNodeList.map((node) => ({
          id: node.id,
          value: node.value,
          nextId: nextPointerMap[node.id],
          status: statusMap[node.id] || 'default'
        })),
        headId: this.head.id,
        tailId: this.tail.id,
        size: this.size,
        pointers,
        pseudocodeLine: line,
        log: logText
      };
    };

    // Step 0: Khởi tạo biến phụ prev = null, current = head, next = null
    let prev = null;
    let curr = this.head;
    let next = null;

    steps.push(createLoopStepSnapshot(
      { [curr.id]: 'active' },
      { head: this.head.id, tail: this.tail.id, current: curr.id },
      0,
      `[KHỞI TẠO REVERSE] Gán prev = NULL, current = HEAD (Node(${curr.value})), next = NULL.`
    ));

    let loopCount = 1;
    while (curr) {
      // ---------------------------------------------------------------------
      // 1. next = current.next (Highlight Node mà next đang trỏ tới)
      // ---------------------------------------------------------------------
      next = curr.next;

      const status1 = { [curr.id]: 'active' };
      if (prev) status1[prev.id] = 'visited';
      if (next) status1[next.id] = 'new';

      const pointers1 = {
        head: this.head.id,
        tail: this.tail.id,
        current: curr.id,
        ...(next ? { next: next.id } : {}),
        ...(prev ? { prev: prev.id } : {})
      };

      steps.push(createLoopStepSnapshot(
        status1,
        pointers1,
        3,
        `[Vòng ${loopCount} - Bước 1/3] next = current.next -> Highlight Node(${next ? next.value : 'NULL'}) mà con trỏ NEXT tham chiếu.`
      ));

      // ---------------------------------------------------------------------
      // 2. current.next = prev (THỂ HIỆN TRỰC TIẾP MŨI TÊN ĐỔI HƯỚNG BẤT KỲ LÚC NÀO!)
      // ---------------------------------------------------------------------
      nextPointerMap[curr.id] = prev ? prev.id : null; // Đổi hướng con trỏ next trong map!

      const status2 = { [curr.id]: 'found' };
      if (prev) status2[prev.id] = 'visited';
      if (next) status2[next.id] = 'new';

      const pointers2 = {
        head: this.head.id,
        tail: this.tail.id,
        current: curr.id,
        ...(next ? { next: next.id } : {}),
        ...(prev ? { prev: prev.id } : {})
      };

      steps.push(createLoopStepSnapshot(
        status2,
        pointers2,
        4,
        `[Vòng ${loopCount} - Bước 2/3] 🔄 ĐỔI HƯỚNG MŨI TÊN: current.next = prev! Mũi tên Node(${curr.value}).next ${prev ? 'XOAY NGƯỢC RÕ RÀNG trỏ về Node(' + prev.value + ')' : 'ngắt liên kết trỏ về NULL'}.`
      ));

      // Actual internal pointer update
      curr.next = prev;

      // ---------------------------------------------------------------------
      // 3. prev = current; current = next (Tiến con trỏ sang vòng sau)
      // ---------------------------------------------------------------------
      prev = curr;
      curr = next;

      if (curr) {
        steps.push(createLoopStepSnapshot(
          { [curr.id]: 'active', [prev.id]: 'visited' },
          {
            head: this.head.id,
            tail: this.tail.id,
            current: curr.id,
            prev: prev.id
          },
          5,
          `[Vòng ${loopCount} - Bước 3/3] Tiến con trỏ: prev = Node(${prev.value}), current = Node(${curr.value}).`
        ));
      }

      loopCount++;
    }

    // ---------------------------------------------------------------------
    // BƯỚC CUỐI: Cập nhật HEAD = prev (40) và TAIL = oldHead (10)
    // Sắp xếp lại danh sách Node từ trái sang phải với HEAD nằm bên trái!
    // ---------------------------------------------------------------------
    const oldHead = this.head;
    this.head = prev;
    this.tail = oldHead;

    steps.push({
      ...this.snapshotNodes({ [this.head.id]: 'found', [this.tail.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 6,
      log: `🎉 HOÀN TẤT THUẬT TOÁN REVERSE! Đã sắp xếp lại danh sách từ trái sang phải: HEAD (${this.head.value}) -> TAIL (${this.tail.value}). All arrows updated!`
    });

    return steps;
  }
}
