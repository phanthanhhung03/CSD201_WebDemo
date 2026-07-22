/**
 * Stack (Ngăn xếp triển khai bằng Linked List - LIFO)
 * Quản lý con trỏ TOP, dung lượng Capacity và kiểm tra Overflow/Underflow
 */

export class StackNode {
  constructor(value, id = null) {
    this.id = id || `stack_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.value = value;
    this.next = null;
  }
}

export class StackLLEngine {
  constructor(capacity = 6) {
    this.top = null;
    this.size = 0;
    this.capacity = capacity;
  }

  snapshotNodes(statusMap = {}, newNode = null, alertMessage = null) {
    const list = [];
    let curr = this.top;
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
      topId: this.top ? this.top.id : null,
      size: this.size,
      capacity: this.capacity,
      alertMessage,
      newNode: newNode ? { id: newNode.id, value: newNode.value, status: 'new' } : null
    };
  }

  setInitialData(values) {
    this.top = null;
    this.size = 0;
    for (const val of values.slice(0, this.capacity)) {
      const node = new StackNode(val);
      node.next = this.top;
      this.top = node;
      this.size++;
    }
    return this.snapshotNodes();
  }

  push(value) {
    const steps = [];

    // Check STACK OVERFLOW
    if (this.size >= this.capacity) {
      steps.push({
        ...this.snapshotNodes({}, null, 'STACK OVERFLOW!'),
        pointers: { top: this.top?.id },
        pseudocodeLine: 0,
        log: `⚠️ STACK OVERFLOW! Ngăn xếp đã đầy dung lượng tối đa (Size = ${this.size} / Capacity = ${this.capacity}). Không thể PUSH!`
      });
      return steps;
    }

    const newNode = new StackNode(value);

    steps.push({
      ...this.snapshotNodes({}, newNode),
      pointers: { top: this.top?.id, newNode: newNode.id },
      pseudocodeLine: 1,
      log: `Tạo newNode = Node(${value}) chuẩn bị PUSH vào Stack.`
    });

    newNode.next = this.top;
    steps.push({
      nodes: [
        { id: newNode.id, value: newNode.value, nextId: this.top ? this.top.id : null, status: 'new' },
        ...this.snapshotNodes().nodes
      ],
      topId: this.top?.id,
      size: this.size,
      capacity: this.capacity,
      pointers: { top: this.top?.id, newNode: newNode.id },
      pseudocodeLine: 2,
      log: `Trỏ newNode.next -> top hiện tại (${this.top ? 'Node(' + this.top.value + ')' : 'NULL'}).`
    });

    this.top = newNode;
    this.size++;

    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'found' }),
      pointers: { top: this.top.id },
      pseudocodeLine: 3,
      log: `Cập nhật con trỏ top = newNode(${value}). Đã PUSH lên đỉnh Stack! (Size = ${this.size} / ${this.capacity})`
    });

    return steps;
  }

  pop() {
    const steps = [];

    // Check STACK UNDERFLOW
    if (!this.top || this.size === 0) {
      steps.push({
        ...this.snapshotNodes({}, null, 'STACK UNDERFLOW!'),
        pointers: {},
        pseudocodeLine: 0,
        log: `⚠️ STACK UNDERFLOW! Ngăn xếp rỗng (Size = 0), không thể POP!`
      });
      return steps;
    }

    const temp = this.top;
    steps.push({
      ...this.snapshotNodes({ [temp.id]: 'deleting' }),
      pointers: { top: this.top.id, temp: temp.id },
      pseudocodeLine: 1,
      log: `Đánh dấu Node ở đỉnh Stack temp = Node(${temp.value}) để POP.`
    });

    this.top = this.top.next;
    this.size--;

    steps.push({
      ...this.snapshotNodes(),
      pointers: { top: this.top?.id },
      pseudocodeLine: 2,
      log: `Di chuyển con trỏ top = top.next. Đã POP thành công phần tử ${temp.value}! (Size = ${this.size} / ${this.capacity})`
    });

    return steps;
  }

  peek() {
    const steps = [];
    if (!this.top) {
      steps.push({
        ...this.snapshotNodes({}, null, 'STACK EMPTY'),
        pointers: {},
        pseudocodeLine: 0,
        log: `Stack rỗng! Peek trả về NULL.`
      });
      return steps;
    }

    steps.push({
      ...this.snapshotNodes({ [this.top.id]: 'found' }),
      pointers: { top: this.top.id },
      pseudocodeLine: 1,
      log: `PEEK: Phần tử ở đỉnh Stack có giá trị = ${this.top.value}.`
    });

    return steps;
  }

  isEmpty() {
    const steps = [];
    const empty = this.size === 0;
    steps.push({
      ...this.snapshotNodes(),
      pointers: { top: this.top?.id },
      pseudocodeLine: 0,
      log: `Kiểm tra isEmpty(): Stack hiện tại đang ${empty ? 'RỖNG (Size = 0, top = NULL)' : 'KHÔNG RỖNG (Size = ' + this.size + ')'}.`
    });
    return steps;
  }

  clear() {
    const steps = [];
    steps.push({
      ...this.snapshotNodes(),
      pointers: { top: this.top?.id },
      pseudocodeLine: 0,
      log: `Tiến hành giải phóng toàn bộ phần tử trong Stack...`
    });

    this.top = null;
    this.size = 0;

    steps.push({
      ...this.snapshotNodes(),
      pointers: {},
      pseudocodeLine: 0,
      log: `Đã làm rỗng Stack! (Size = 0, top = NULL).`
    });

    return steps;
  }
}
