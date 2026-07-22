/**
 * Doubly Linked List (Danh sách liên kết đôi)
 * Triển khai đầy đủ con trỏ hai chiều: prev và next
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
    while (curr) {
      list.push({
        id: curr.id,
        value: curr.value,
        nextId: curr.next ? curr.next.id : null,
        prevId: curr.prev ? curr.prev.id : null,
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
      log: `Nối newNode.next -> head và head.prev -> newNode.`
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
      log: `Cập nhật head = newNode. Thêm đầu DLL thành công!`
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
      log: `Cập nhật con trỏ tail = newNode. Thêm cuối DLL hoàn tất!`
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
      log: `Cập nhật head = head.next và gán head.prev = NULL. Đã xóa Node đầu!`
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
      log: `Cập nhật tail = tail.prev và ngắt kết nối tail.next = NULL.`
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
      pointers: { head: this.head?.id, tail: this.tail?.id },
      pseudocodeLine: 4,
      log: `Không tìm thấy giá trị ${val} trong DLL.`
    });

    return steps;
  }
}
