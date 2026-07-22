/**
 * Doubly Linked List (Danh sách liên kết đôi)
 * Triển khai đầy đủ con trỏ hai chiều: prev và next kèm Animation Reverse mô phỏng từng bước đổi hướng mũi tên thực tế.
 */

export class DLLNode {
  constructor(value, id = null) {
    this.id = id || `dll_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedListEngine {
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
        prevId: curr.prev ? curr.prev.id : null,
        prevVal: curr.prev ? curr.prev.value : 'NULL',
        nextVal: curr.next ? curr.next.value : 'NULL',
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
      const node = new DLLNode(val);
      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      }
      this.size++;
    }
    return this.snapshotNodes();
  }

  insertHead(value) {
    const steps = [];
    const newNode = new DLLNode(value);

    steps.push({
      ...this.snapshotNodes({}, newNode),
      pointers: { head: this.head?.id, tail: this.tail?.id, newNode: newNode.id },
      pseudocodeLine: 0,
      log: `Tạo newNode = Node(${value}).`
    });

    newNode.next = this.head;
    if (this.head) {
      this.head.prev = newNode;
    }

    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'new' }, newNode),
      pointers: { head: this.head?.id, tail: this.tail?.id, newNode: newNode.id },
      pseudocodeLine: 2,
      log: `Nối hai chiều: newNode.next -> head và head.prev -> newNode.`
    });

    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.size++;

    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 3,
      log: `Cập nhật head = newNode(${value}). Thêm đầu DLL thành công! (Size = ${this.size})`
    });

    return steps;
  }

  insertTail(value) {
    const steps = [];
    const newNode = new DLLNode(value);

    steps.push({
      ...this.snapshotNodes({}, newNode),
      pointers: { head: this.head?.id, tail: this.tail?.id, newNode: newNode.id },
      pseudocodeLine: 0,
      log: `Tạo newNode = Node(${value}).`
    });

    if (!this.tail) {
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

    newNode.prev = this.tail;
    this.tail.next = newNode;

    steps.push({
      ...this.snapshotNodes({ [this.tail.id]: 'active', [newNode.id]: 'new' }),
      pointers: { head: this.head.id, tail: this.tail.id, newNode: newNode.id },
      pseudocodeLine: 2,
      log: `Nối hai chiều: tail.next = newNode và newNode.prev = tail.`
    });

    this.tail = newNode;
    this.size++;

    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 3,
      log: `Cập nhật con trỏ tail = newNode. Thêm cuối DLL hoàn tất! (Size = ${this.size})`
    });

    return steps;
  }

  insertAtIndex(index, value) {
    if (index <= 0) return this.insertHead(value);
    if (index >= this.size) return this.insertTail(value);

    const steps = [];
    const newNode = new DLLNode(value);

    steps.push({
      ...this.snapshotNodes({}, newNode),
      pointers: { head: this.head?.id, tail: this.tail?.id, newNode: newNode.id },
      pseudocodeLine: 0,
      log: `Tạo newNode = Node(${value}) chuẩn bị chèn DLL tại index = ${index}.`
    });

    let curr = this.head;
    let i = 0;
    while (i < index - 1) {
      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'active' }, newNode),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: 3,
        log: `Duyệt curr -> Node(${curr.value}) tại index ${i}.`
      });
      curr = curr.next;
      i++;
    }

    newNode.next = curr.next;
    newNode.prev = curr;

    steps.push({
      ...this.snapshotNodes({ [curr.id]: 'active' }, newNode),
      pointers: { head: this.head.id, tail: this.tail.id, current: curr.id, newNode: newNode.id },
      pseudocodeLine: 4,
      log: `Nối con trỏ 2 chiều cho newNode: next -> Node(${curr.next.value}), prev -> Node(${curr.value}).`
    });

    if (curr.next) {
      curr.next.prev = newNode;
    }
    curr.next = newNode;
    this.size++;

    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id, newNode: newNode.id },
      pseudocodeLine: 5,
      log: `Nối các con trỏ lân cận. Đã chèn Node(${value}) tại index ${index}! (Size = ${this.size})`
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
        log: `Danh sách rỗng, không thể xóa!`
      });
      return steps;
    }

    const temp = this.head;
    steps.push({
      ...this.snapshotNodes({ [temp.id]: 'deleting' }),
      pointers: { head: this.head.id, tail: this.tail.id, temp: temp.id },
      pseudocodeLine: 1,
      log: `Đánh dấu Node đầu temp = Node(${temp.value}) để xóa.`
    });

    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this.size--;

    steps.push({
      ...this.snapshotNodes(),
      pointers: { head: this.head?.id, tail: this.tail?.id },
      pseudocodeLine: 2,
      log: `Cập nhật head = head.next và head.prev = NULL. Đã xóa Node đầu! (Size = ${this.size})`
    });

    return steps;
  }

  deleteTail() {
    const steps = [];
    if (!this.tail) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: {},
        pseudocodeLine: 0,
        log: `Danh sách rỗng!`
      });
      return steps;
    }

    const temp = this.tail;
    steps.push({
      ...this.snapshotNodes({ [temp.id]: 'deleting' }),
      pointers: { head: this.head?.id, tail: this.tail.id, temp: temp.id },
      pseudocodeLine: 1,
      log: `Đánh dấu Node cuối temp = Node(${temp.value}).`
    });

    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    this.size--;

    steps.push({
      ...this.snapshotNodes(),
      pointers: { head: this.head?.id, tail: this.tail?.id },
      pseudocodeLine: 2,
      log: `Cập nhật tail = tail.prev và ngắt kết nối tail.next = NULL. (Size = ${this.size})`
    });

    return steps;
  }

  deleteAtIndex(index) {
    if (index < 0 || index >= this.size) {
      return [{
        ...this.snapshotNodes(),
        pointers: { head: this.head?.id, tail: this.tail?.id },
        pseudocodeLine: 0,
        log: `Index ${index} không hợp lệ!`
      }];
    }

    if (index === 0) return this.deleteHead();
    if (index === this.size - 1) return this.deleteTail();

    const steps = [];
    let curr = this.head;
    let i = 0;
    while (i < index) {
      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'active' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: 3,
        log: `Duyệt curr -> Node(${curr.value}) tại index ${i}.`
      });
      curr = curr.next;
      i++;
    }

    steps.push({
      ...this.snapshotNodes({ [curr.id]: 'deleting' }),
      pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
      pseudocodeLine: 4,
      log: `Tìm thấy Node(${curr.value}) tại index ${index} cần xóa.`
    });

    curr.prev.next = curr.next;
    curr.next.prev = curr.prev;
    this.size--;

    steps.push({
      ...this.snapshotNodes(),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 5,
      log: `Nối lại 2 chiều curr.prev.next = curr.next và curr.next.prev = curr.prev. Đã xóa Node! (Size = ${this.size})`
    });

    return steps;
  }

  search(val) {
    const steps = [];
    let curr = this.head;
    let idx = 0;

    while (curr) {
      const isFound = curr.value === val;
      steps.push({
        ...this.snapshotNodes({ [curr.id]: isFound ? 'found' : 'active' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: isFound ? 2 : 3,
        log: isFound
          ? `TÌM THẤY! Node(${curr.value}) tại vị trí index = ${idx}.`
          : `Kiểm tra Node(${curr.value}) khác ${val}. Tiếp tục duyệt next.`
      });

      if (isFound) return steps;
      curr = curr.next;
      idx++;
    }

    steps.push({
      ...this.snapshotNodes(),
      pointers: { head: this.head?.id },
      pseudocodeLine: 4,
      log: `Không tìm thấy giá trị ${val} trong DLL.`
    });

    return steps;
  }

  traverseForward() {
    const steps = [];
    if (!this.head) return steps;

    let curr = this.head;
    let idx = 0;
    while (curr) {
      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'visited' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: 2,
        log: `[Traverse Forward ->] Duyệt xuôi theo con trỏ NEXT: Node(${curr.value}) tại index ${idx}.`
      });
      curr = curr.next;
      idx++;
    }

    steps.push({
      ...this.snapshotNodes(),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 3,
      log: `Đã hoàn tất duyệt xuôi từ HEAD -> TAIL trong DLL.`
    });

    return steps;
  }

  traverseBackward() {
    const steps = [];
    if (!this.tail) return steps;

    let curr = this.tail;
    let idx = this.size - 1;
    while (curr) {
      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'visited' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: 2,
        log: `[Traverse Backward <-] Duyệt ngược theo con trỏ PREV: Node(${curr.value}) tại index ${idx}.`
      });
      curr = curr.prev;
      idx--;
    }

    steps.push({
      ...this.snapshotNodes(),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 3,
      log: `Đã hoàn tất duyệt ngược từ TAIL -> HEAD nhờ con trỏ PREV hai chiều!`
    });

    return steps;
  }

  // 🔄 REVERSE DLL ANIMATION MÔ PHỎNG TỪNG BƯỚC HOÁN ĐỔI THỰC TẾ
  reverse() {
    const steps = [];
    if (!this.head || !this.head.next) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: { head: this.head?.id, tail: this.tail?.id },
        pseudocodeLine: 0,
        log: `DLL có ít hơn 2 Node, giữ nguyên.`
      });
      return steps;
    }

    // Capture initial order of Node objects (positions stay fixed during loop animation)
    const initialNodes = [];
    let tempNode = this.head;
    while (tempNode) {
      initialNodes.push(tempNode);
      tempNode = tempNode.next;
    }

    const nextPointerMap = {};
    const prevPointerMap = {};
    const nodeMap = new Map();

    initialNodes.forEach((node) => {
      nextPointerMap[node.id] = node.next ? node.next.id : null;
      prevPointerMap[node.id] = node.prev ? node.prev.id : null;
      nodeMap.set(node.id, node);
    });

    const createLoopStepSnapshot = (statusMap, pointers, line, logText) => {
      return {
        nodes: initialNodes.map((node) => ({
          id: node.id,
          value: node.value,
          nextId: nextPointerMap[node.id],
          prevId: prevPointerMap[node.id],
          nextVal: nextPointerMap[node.id] ? nodeMap.get(nextPointerMap[node.id]).value : 'NULL',
          prevVal: prevPointerMap[node.id] ? nodeMap.get(prevPointerMap[node.id]).value : 'NULL',
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

    let curr = this.head;
    let temp = null;
    let loopCount = 1;

    steps.push(createLoopStepSnapshot(
      { [curr.id]: 'active' },
      { head: this.head.id, tail: this.tail.id, current: curr.id },
      0,
      `[KHỞI TẠO DLL REVERSE] Gán current = HEAD (Node(${curr.value})), temp = NULL.`
    ));

    while (curr) {
      // 1. temp = current.prev
      temp = curr.prev;

      steps.push(createLoopStepSnapshot(
        { [curr.id]: 'active', ...(temp ? { [temp.id]: 'new' } : {}) },
        { head: this.head.id, tail: this.tail.id, current: curr.id, ...(temp ? { temp: temp.id } : {}) },
        2,
        `[Vòng ${loopCount} - Bước 1/3] temp = current.prev -> Con trỏ temp trỏ vào ${temp ? 'Node(' + temp.value + ')' : 'NULL'}.`
      ));

      // 2. current.prev = current.next; current.next = temp (HOÁN ĐỔI THỰC TẾ)
      curr.prev = curr.next;
      curr.next = temp;

      prevPointerMap[curr.id] = curr.prev ? curr.prev.id : null;
      nextPointerMap[curr.id] = curr.next ? curr.next.id : null;

      steps.push(createLoopStepSnapshot(
        { [curr.id]: 'found' },
        { head: this.head.id, tail: this.tail.id, current: curr.id, ...(temp ? { temp: temp.id } : {}) },
        3,
        `[Vòng ${loopCount} - Bước 2/3] 🔄 HOÁN ĐỔI THỰC TẾ: current.prev <-> current.next cho Node(${curr.value})! Mũi tên prev và next đảo chiều!`
      ));

      // Advance curr to its former next (which is now curr.prev)
      curr = curr.prev;
      loopCount++;
    }

    // Reassign head and tail
    const oldHead = this.head;
    if (temp) {
      this.head = temp.prev;
    }
    this.tail = oldHead;

    steps.push({
      ...this.snapshotNodes({ [this.head.id]: 'found', [this.tail.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 4,
      log: `🎉 HOÀN TẤT THUẬT TOÁN REVERSE DLL! Đã sắp xếp lại vị trí từ trái sang phải: HEAD (${this.head.value}) <-> ... <-> TAIL (${this.tail.value}).`
    });

    return steps;
  }
}
