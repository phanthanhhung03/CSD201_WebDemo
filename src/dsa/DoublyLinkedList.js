/**
 * Doubly Linked List (Danh sách liên kết đôi)
 * Triển khai đầy đủ con trỏ hai chiều: prev và next kèm Animation Reverse từng bước mượt mà.
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

  // 🔄 ANIMATION REVERSE TỪNG BƯỚC CHO DLL (Step-by-step Reverse animation for Doubly Linked List)
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

    // Capture initial ordered nodes array
    const allNodesInOrder = [];
    let tempNode = this.head;
    while (tempNode) {
      allNodesInOrder.push(tempNode);
      tempNode = tempNode.next;
    }

    // Dynamic maps of nextId and prevId for each step snapshot
    const nextPointerMap = {};
    const prevPointerMap = {};
    const nodeByIdMap = new Map();

    allNodesInOrder.forEach((node) => {
      nextPointerMap[node.id] = node.next ? node.next.id : null;
      prevPointerMap[node.id] = node.prev ? node.prev.id : null;
      nodeByIdMap.set(node.id, node);
    });

    const createSnapshotForReverse = (statusMap, pointers, line, logText) => {
      return {
        nodes: allNodesInOrder.map((node) => ({
          id: node.id,
          value: node.value,
          nextId: nextPointerMap[node.id],
          prevId: prevPointerMap[node.id],
          nextVal: nextPointerMap[node.id] ? nodeByIdMap.get(nextPointerMap[node.id]).value : 'NULL',
          prevVal: prevPointerMap[node.id] ? nodeByIdMap.get(prevPointerMap[node.id]).value : 'NULL',
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

    steps.push(createSnapshotForReverse(
      { [curr.id]: 'active' },
      { head: this.head.id, tail: this.tail.id, current: curr.id },
      0,
      `Bắt đầu Đảo Ngược Doubly Linked List: Khởi tạo curr = HEAD (Node(${curr.value})).`
    ));

    while (curr) {
      // Step A: Chuẩn bị swap
      steps.push(createSnapshotForReverse(
        { [curr.id]: 'active' },
        { head: this.head.id, tail: this.tail.id, current: curr.id },
        2,
        `[ĐẢO BƯỚC 1/2] Đang đứng tại Node(${curr.value}). Chuẩn bị tráo con trỏ prev và next.`
      ));

      // Swap actual pointers
      temp = curr.prev;
      curr.prev = curr.next;
      curr.next = temp;

      // Update dynamic maps for this snapshot step
      prevPointerMap[curr.id] = curr.prev ? curr.prev.id : null;
      nextPointerMap[curr.id] = curr.next ? curr.next.id : null;

      // Step B: Hoán đổi xong cho curr
      steps.push(createSnapshotForReverse(
        { [curr.id]: 'found' },
        { head: this.head.id, tail: this.tail.id, current: curr.id },
        3,
        `[ĐẢO BƯỚC 2/2] ĐÃ HOÁN ĐỔI 2 CHIỀU: Node(${curr.value}).prev <-> Node(${curr.value}).next.`
      ));

      // Advance curr to its former next (which is now curr.prev)
      curr = curr.prev;
    }

    // Reassign head and tail
    const oldHead = this.head;
    if (temp) {
      this.head = temp.prev;
    }
    this.tail = oldHead;

    steps.push({
      nodes: allNodesInOrder.map((node) => ({
        id: node.id,
        value: node.value,
        nextId: nextPointerMap[node.id],
        prevId: prevPointerMap[node.id],
        nextVal: nextPointerMap[node.id] ? nodeByIdMap.get(nextPointerMap[node.id]).value : 'NULL',
        prevVal: prevPointerMap[node.id] ? nodeByIdMap.get(prevPointerMap[node.id]).value : 'NULL',
        status: 'found'
      })),
      headId: this.head.id,
      tailId: this.tail.id,
      size: this.size,
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 4,
      log: `🎉 HOÀN TẤT ĐẢO NGƯỢC DLL! Cập nhật HEAD = Node(${this.head.value}) và TAIL = Node(${this.tail.value}).`
    });

    return steps;
  }
}
