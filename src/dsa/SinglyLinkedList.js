/**
 * Singly Linked List (Danh sách liên kết đơn)
 * Sử dụng đúng bản chất Node con trỏ (Node { value, next })
 * Tạo chuỗi Snapshot cho Visualizer
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

  // Clone danh sách Node hiện tại để tạo Snapshot
  snapshotNodes(statusMap = {}, newNode = null) {
    const list = [];
    let curr = this.head;
    while (curr) {
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

  // Khởi tạo danh sách mẫu
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

  // 1. Thêm vào Đầu (insertHead)
  insertHead(value) {
    const steps = [];
    const newNode = new SLLNode(value);

    // Step 0: Tạo newNode
    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'new' }, newNode),
      pointers: { head: this.head?.id, tail: this.tail?.id, newNode: newNode.id },
      pseudocodeLine: 0,
      log: `Khởi tạo Node mới có giá trị = ${value} tại vùng nhớ tạm.`
    });

    // Step 1: newNode.next = head
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

    // Step 2: head = newNode
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.size++;

    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 2,
      log: `Cập nhật con trỏ head trỏ tới Node mới (${value}). Thêm đầu hoàn tất!`
    });

    return steps;
  }

  // 2. Thêm vào Cuối (insertTail)
  insertTail(value) {
    const steps = [];
    const newNode = new SLLNode(value);

    // Step 0: Tạo newNode
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

    // Step 1: tail.next = newNode
    const oldTailId = this.tail.id;
    this.tail.next = newNode;

    steps.push({
      ...this.snapshotNodes({ [oldTailId]: 'active', [newNode.id]: 'new' }),
      pointers: { head: this.head.id, tail: oldTailId, newNode: newNode.id },
      pseudocodeLine: 2,
      log: `Trỏ tail.next (${this.tail.value}) tới newNode (${value}).`
    });

    // Step 2: tail = newNode
    this.tail = newNode;
    this.size++;

    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 3,
      log: `Cập nhật con trỏ tail trỏ tới newNode(${value}). Thêm cuối hoàn tất!`
    });

    return steps;
  }

  // 3. Thêm tại Vị trí Index (insertAtIndex)
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
        log: `Truy vết con trỏ curr -> Node(${curr.value}) tại vị trí ${i}.`
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

    // newNode.next = curr.next
    newNode.next = curr.next;
    steps.push({
      ...this.snapshotNodes({ [curr.id]: 'active' }, newNode),
      pointers: { head: this.head.id, tail: this.tail.id, current: curr.id, newNode: newNode.id },
      pseudocodeLine: 4,
      log: `Trỏ newNode.next -> curr.next (${curr.next ? 'Node(' + curr.next.value + ')' : 'NULL'}).`
    });

    // curr.next = newNode
    curr.next = newNode;
    this.size++;

    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id, newNode: newNode.id },
      pseudocodeLine: 5,
      log: `Trỏ curr.next -> newNode. Đã chèn thành công Node(${value}) vào vị trí ${index}!`
    });

    return steps;
  }

  // 4. Xóa Node Đầu (deleteHead)
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
      log: `Di chuyển con trỏ head sang head.next. Node(${temp.value}) đã được giải phóng khỏi danh sách!`
    });

    return steps;
  }

  // 5. Xóa Node Cuối (deleteTail)
  deleteTail() {
    const steps = [];
    if (!this.head) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: {},
        pseudocodeLine: 0,
        log: `Danh sách rỗng, không có Node để xóa.`
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
        log: `Tìm Node đứng trước tail: Duyệt curr -> Node(${curr.value}).`
      });
      curr = curr.next;
    }

    steps.push({
      ...this.snapshotNodes({ [curr.id]: 'active', [this.tail.id]: 'deleting' }),
      pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
      pseudocodeLine: 2,
      log: `Tìm thấy Node trước tail: Node(${curr.value}). Đánh dấu xóa tail Node(${this.tail.value}).`
    });

    curr.next = null;
    this.tail = curr;
    this.size--;

    steps.push({
      ...this.snapshotNodes({ [this.tail.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 3,
      log: `Cập nhật tail = curr, tail.next = NULL. Đã xóa Node cuối!`
    });

    return steps;
  }

  // 6. Xóa theo Giá trị (deleteValue)
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
        log: `Kiểm tra curr.next.value (${curr.next.value}) != target (${val}). Duyệt tiếp curr.`
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
      log: `Trỏ curr.next = temp.next. Đã xóa Node(${val}) khỏi danh sách!`
    });

    return steps;
  }

  // 7. Tìm kiếm (Search)
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
          ? `TÌM THẤY! Node(${curr.value}) trùng khớp tại chỉ số index = ${idx}.`
          : `So sánh Node(${curr.value}) với ${val} -> Không trùng khớp. Chuyển sang node tiếp theo.`
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
}
