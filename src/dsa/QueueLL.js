/**
 * Queue (Hàng đợi triển khai bằng Linked List - FIFO)
 * Quản lý 2 con trỏ: FRONT và REAR, Capacity dung lượng, Overflow/Underflow
 */

export class QueueNode {
  constructor(value, id = null) {
    this.id = id || `queue_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.value = value;
    this.next = null;
  }
}

export class QueueLLEngine {
  constructor(capacity = 6) {
    this.front = null;
    this.rear = null;
    this.size = 0;
    this.capacity = capacity;
  }

  snapshotNodes(statusMap = {}, newNode = null, alertMessage = null) {
    const list = [];
    let curr = this.front;
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
      frontId: this.front ? this.front.id : null,
      rearId: this.rear ? this.rear.id : null,
      size: this.size,
      capacity: this.capacity,
      alertMessage,
      newNode: newNode ? { id: newNode.id, value: newNode.value, status: 'new' } : null
    };
  }

  setInitialData(values) {
    this.front = null;
    this.rear = null;
    this.size = 0;
    for (const val of values.slice(0, this.capacity)) {
      const node = new QueueNode(val);
      if (!this.front) {
        this.front = node;
        this.rear = node;
      } else {
        this.rear.next = node;
        this.rear = node;
      }
      this.size++;
    }
    return this.snapshotNodes();
  }

  enqueue(value) {
    const steps = [];

    // Check QUEUE OVERFLOW
    if (this.size >= this.capacity) {
      steps.push({
        ...this.snapshotNodes({}, null, 'QUEUE OVERFLOW!'),
        pointers: { front: this.front?.id, rear: this.rear?.id },
        pseudocodeLine: 0,
        log: `⚠️ QUEUE OVERFLOW! Hàng đợi đã đầy dung lượng tối đa (Size = ${this.size} / Capacity = ${this.capacity}). Không thể ENQUEUE!`
      });
      return steps;
    }

    const newNode = new QueueNode(value);

    steps.push({
      ...this.snapshotNodes({}, newNode),
      pointers: { front: this.front?.id, rear: this.rear?.id, newNode: newNode.id },
      pseudocodeLine: 1,
      log: `Tạo newNode = Node(${value}) chuẩn bị ENQUEUE vào Queue.`
    });

    if (!this.rear) {
      this.front = newNode;
      this.rear = newNode;
      this.size++;

      steps.push({
        ...this.snapshotNodes({ [newNode.id]: 'found' }),
        pointers: { front: this.front.id, rear: this.rear.id },
        pseudocodeLine: 2,
        log: `Queue rỗng: Gán front = rear = newNode(${value}). (Size = ${this.size} / ${this.capacity})`
      });
      return steps;
    }

    const oldRearId = this.rear.id;
    this.rear.next = newNode;

    steps.push({
      ...this.snapshotNodes({ [oldRearId]: 'active', [newNode.id]: 'new' }),
      pointers: { front: this.front.id, rear: oldRearId, newNode: newNode.id },
      pseudocodeLine: 3,
      log: `Trỏ rear.next -> newNode(${value}).`
    });

    this.rear = newNode;
    this.size++;

    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'found' }),
      pointers: { front: this.front.id, rear: this.rear.id },
      pseudocodeLine: 4,
      log: `Cập nhật con trỏ rear = newNode(${value}). Đã ENQUEUE vào hàng thành công! (Size = ${this.size} / ${this.capacity})`
    });

    return steps;
  }

  dequeue() {
    const steps = [];

    // Check QUEUE UNDERFLOW
    if (!this.front || this.size === 0) {
      steps.push({
        ...this.snapshotNodes({}, null, 'QUEUE UNDERFLOW!'),
        pointers: {},
        pseudocodeLine: 0,
        log: `⚠️ QUEUE UNDERFLOW! Hàng đợi rỗng (Size = 0), không thể DEQUEUE!`
      });
      return steps;
    }

    const temp = this.front;
    steps.push({
      ...this.snapshotNodes({ [temp.id]: 'deleting' }),
      pointers: { front: this.front.id, rear: this.rear.id, temp: temp.id },
      pseudocodeLine: 1,
      log: `Đánh dấu Node ở đầu hàng temp = Node(${temp.value}) để DEQUEUE.`
    });

    this.front = this.front.next;
    if (!this.front) {
      this.rear = null;
    }
    this.size--;

    steps.push({
      ...this.snapshotNodes(),
      pointers: { front: this.front?.id, rear: this.rear?.id },
      pseudocodeLine: 2,
      log: `Di chuyển front = front.next. Đã DEQUEUE giá trị ${temp.value} ra khỏi hàng! (Size = ${this.size} / ${this.capacity})`
    });

    return steps;
  }

  peek() {
    const steps = [];
    if (!this.front) {
      steps.push({
        ...this.snapshotNodes({}, null, 'QUEUE EMPTY'),
        pointers: {},
        pseudocodeLine: 0,
        log: `Queue rỗng! Peek FRONT trả về NULL.`
      });
      return steps;
    }

    steps.push({
      ...this.snapshotNodes({ [this.front.id]: 'found' }),
      pointers: { front: this.front.id, rear: this.rear.id },
      pseudocodeLine: 1,
      log: `PEEK FRONT: Phần tử đầu hàng đợi (FRONT) có giá trị = ${this.front.value}.`
    });

    return steps;
  }

  peekRear() {
    const steps = [];
    if (!this.rear) {
      steps.push({
        ...this.snapshotNodes({}, null, 'QUEUE EMPTY'),
        pointers: {},
        pseudocodeLine: 0,
        log: `Queue rỗng! Peek REAR trả về NULL.`
      });
      return steps;
    }

    steps.push({
      ...this.snapshotNodes({ [this.rear.id]: 'found' }),
      pointers: { front: this.front?.id, rear: this.rear.id },
      pseudocodeLine: 1,
      log: `PEEK REAR: Phần tử cuối hàng đợi (REAR) có giá trị = ${this.rear.value}.`
    });

    return steps;
  }

  isEmpty() {
    const steps = [];
    const empty = this.size === 0;
    steps.push({
      ...this.snapshotNodes(),
      pointers: { front: this.front?.id, rear: this.rear?.id },
      pseudocodeLine: 0,
      log: `Kiểm tra isEmpty(): Queue hiện tại đang ${empty ? 'RỖNG (Size = 0)' : 'KHÔNG RỖNG (Size = ' + this.size + ')'}.`
    });
    return steps;
  }

  clear() {
    const steps = [];
    steps.push({
      ...this.snapshotNodes(),
      pointers: { front: this.front?.id, rear: this.rear?.id },
      pseudocodeLine: 0,
      log: `Tiến hành làm rỗng Hàng đợi Queue...`
    });

    this.front = null;
    this.rear = null;
    this.size = 0;

    steps.push({
      ...this.snapshotNodes(),
      pointers: {},
      pseudocodeLine: 0,
      log: `Đã làm rỗng Queue! (Size = 0, front = rear = NULL).`
    });

    return steps;
  }
}
