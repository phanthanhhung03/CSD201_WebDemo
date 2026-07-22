/**
 * Circular Linked List (Danh sách liên kết vòng)
 * Node cuối (tail) trỏ ngược về Node đầu (head)
 */

export class CLLNode {
  constructor(value, id = null) {
    this.id = id || `cll_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.value = value;
    this.next = null;
  }
}

export class CircularLinkedListEngine {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  snapshotNodes(statusMap = {}, newNode = null) {
    const list = [];
    if (!this.head) {
      return {
        nodes: [],
        headId: null,
        tailId: null,
        size: 0,
        newNode: newNode ? { id: newNode.id, value: newNode.value, status: 'new' } : null
      };
    }

    let curr = this.head;
    let count = 0;
    do {
      list.push({
        id: curr.id,
        value: curr.value,
        nextId: curr.next ? curr.next.id : null,
        status: statusMap[curr.id] || 'default'
      });
      curr = curr.next;
      count++;
    } while (curr && curr !== this.head && count < this.size + 1);

    return {
      nodes: list,
      headId: this.head.id,
      tailId: this.tail ? this.tail.id : null,
      size: this.size,
      newNode: newNode ? { id: newNode.id, value: newNode.value, status: 'new' } : null
    };
  }

  setInitialData(values) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    for (const val of values) {
      const node = new CLLNode(val);
      if (!this.head) {
        this.head = node;
        this.tail = node;
        node.next = this.head;
      } else {
        this.tail.next = node;
        node.next = this.head;
        this.tail = node;
      }
      this.size++;
    }
    return this.snapshotNodes();
  }

  insert(value) {
    const steps = [];
    const newNode = new CLLNode(value);

    steps.push({
      ...this.snapshotNodes({}, newNode),
      pointers: { head: this.head?.id, tail: this.tail?.id, newNode: newNode.id },
      pseudocodeLine: 0,
      log: `Tạo newNode = Node(${value}).`
    });

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = this.head;
      this.size++;

      steps.push({
        ...this.snapshotNodes({ [newNode.id]: 'found' }),
        pointers: { head: this.head.id, tail: this.tail.id },
        pseudocodeLine: 1,
        log: `CLL rỗng: Gán head = tail = newNode(${value}) và trỏ newNode.next -> head. (Size = ${this.size})`
      });
      return steps;
    }

    this.tail.next = newNode;
    newNode.next = this.head;
    const oldTailId = this.tail.id;
    this.tail = newNode;
    this.size++;

    steps.push({
      ...this.snapshotNodes({ [oldTailId]: 'active', [newNode.id]: 'found' }),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 2,
      log: `Trỏ tail.next = newNode, newNode.next = head, cập nhật tail = newNode. Vòng lặp duy trì! (Size = ${this.size})`
    });

    return steps;
  }

  delete(val) {
    const steps = [];
    if (!this.head) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: {},
        pseudocodeLine: 0,
        log: `Danh sách vòng rỗng!`
      });
      return steps;
    }

    if (this.head.value === val) {
      const tempId = this.head.id;
      steps.push({
        ...this.snapshotNodes({ [tempId]: 'deleting' }),
        pointers: { head: tempId, tail: this.tail.id },
        pseudocodeLine: 1,
        log: `Xóa Node đầu tiên: Node(${val}).`
      });

      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
        this.size = 0;
      } else {
        this.head = this.head.next;
        this.tail.next = this.head;
        this.size--;
      }

      steps.push({
        ...this.snapshotNodes(),
        pointers: { head: this.head?.id, tail: this.tail?.id },
        pseudocodeLine: 3,
        log: `Đã xóa Node đầu, cập nhật tail.next trỏ về head mới! (Size = ${this.size})`
      });
      return steps;
    }

    let curr = this.head;
    while (curr.next !== this.head && curr.next.value !== val) {
      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'active' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: 4,
        log: `Duyệt tìm Node(${val}): curr đang ở Node(${curr.value}).`
      });
      curr = curr.next;
    }

    if (curr.next.value === val) {
      const targetNode = curr.next;
      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'active', [targetNode.id]: 'deleting' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id, temp: targetNode.id },
        pseudocodeLine: 4,
        log: `Tìm thấy Node(${val})! Tiến hành bỏ qua liên kết.`
      });

      if (targetNode === this.tail) {
        this.tail = curr;
      }
      curr.next = targetNode.next;
      this.size--;

      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'found' }),
        pointers: { head: this.head.id, tail: this.tail.id },
        pseudocodeLine: 4,
        log: `Cập nhật curr.next = temp.next (tail.next luôn giữ trỏ về head). (Size = ${this.size})`
      });
    } else {
      steps.push({
        ...this.snapshotNodes(),
        pointers: { head: this.head.id, tail: this.tail.id },
        pseudocodeLine: 4,
        log: `Đã quay trở lại đầu vòng mà không tìm thấy giá trị ${val}.`
      });
    }

    return steps;
  }

  // Tìm Kiếm (Search)
  search(val) {
    const steps = [];
    if (!this.head) return steps;

    let curr = this.head;
    let idx = 0;
    do {
      const isFound = curr.value === val;
      steps.push({
        ...this.snapshotNodes({ [curr.id]: isFound ? 'found' : 'active' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: isFound ? 2 : 3,
        log: isFound
          ? `TÌM THẤY! Node(${curr.value}) trùng khớp tại vị trí index = ${idx}.`
          : `So sánh Node(${curr.value}) với ${val} -> Không trùng khớp. Chuyển sang next.`
      });

      if (isFound) return steps;
      curr = curr.next;
      idx++;
    } while (curr !== this.head);

    steps.push({
      ...this.snapshotNodes(),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 4,
      log: `Đã duyệt hết 1 vòng khép kín trở lại HEAD. Không tìm thấy giá trị ${val}.`
    });

    return steps;
  }

  // Duyệt Vòng Khép Kín (1 Vòng)
  traverse() {
    const steps = [];
    if (!this.head) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: {},
        pseudocodeLine: 0,
        log: `Danh sách rỗng.`
      });
      return steps;
    }

    let curr = this.head;
    let count = 0;
    do {
      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'visited' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: 2,
        log: `Duyệt Node(${curr.value}) -> trỏ tiếp curr.next (${curr.next.value}).`
      });
      curr = curr.next;
      count++;
    } while (curr !== this.head && count < this.size);

    steps.push({
      ...this.snapshotNodes(),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 3,
      log: `ĐIỀU KIỆN DỪNG: Con trỏ đã quay trở lại HEAD (${this.head.value}). Hoàn tất duyệt 1 vòng CLL!`
    });

    return steps;
  }

  // Duyệt Nhiều Vòng (Ví dụ 2 Vòng) minh họa tính chất Circular
  traverseMultipleLoops(loopCount = 2) {
    const steps = [];
    if (!this.head) return steps;

    let curr = this.head;
    let totalNodesToVisit = this.size * loopCount;
    let visitedCount = 0;

    while (visitedCount < totalNodesToVisit) {
      const currentLoop = Math.floor(visitedCount / this.size) + 1;
      const stepInLoop = (visitedCount % this.size) + 1;

      steps.push({
        ...this.snapshotNodes({ [curr.id]: 'visited' }),
        pointers: { head: this.head.id, tail: this.tail.id, current: curr.id },
        pseudocodeLine: 3,
        log: `[VÒNG ${currentLoop}/${loopCount} - Node ${stepInLoop}/${this.size}] Duyệt Node(${curr.value}). Con trỏ liên tục nối vòng!`
      });

      curr = curr.next;
      visitedCount++;
    }

    steps.push({
      ...this.snapshotNodes(),
      pointers: { head: this.head.id, tail: this.tail.id },
      pseudocodeLine: 4,
      log: `Đã hoàn tất duyệt đúng ${loopCount} vòng liên tục! Điều kiện dừng: Dừng khi con trỏ quay lại HEAD ở vòng cuối.`
    });

    return steps;
  }
}
