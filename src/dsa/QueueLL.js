/**
 * Queue (Hàng đợi triển khai bằng Linked List - FIFO)
 * Quản lý 2 con trỏ: FRONT (vào trước) và REAR (vào sau)
 */

export class QueueNode {
  constructor(value, id = null) {
    this.id = id || `queue_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.value = value;
    this.next = null;
  }
}

export class QueueLLEngine {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  snapshotNodes(statusMap = {}, newNode = null) {
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
      newNode: newNode ? { id: newNode.id, value: newNode.value, status: 'new' } : null
    };
  }

  setInitialData(values) {
    this.front = null;
    this.rear = null;
    this.size = 0;
    for (const val of values) {
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
    const newNode = new QueueNode(value);

    steps.push({
      ...this.snapshotNodes({}, newNode),
      pointers: { front: this.front?.id, rear: this.rear?.id, newNode: newNode.id },
      pseudocodeLine: 0,
      log: `Tạo newNode = Node(${value}) chuẩn bị ENQUEUE vào hàng đợi.`
    });

    if (!this.rear) {
      this.front = newNode;
      this.rear = newNode;
      this.size++;

      steps.push({
        ...this.snapshotNodes({ [newNode.id]: 'found' }),
        pointers: { front: this.front.id, rear: this.rear.id },
        pseudocodeLine: 1,
        log: `Queue rỗng: Gán front = rear = newNode(${value}).`
      });
      return steps;
    }

    const oldRearId = this.rear.id;
    this.rear.next = newNode;

    steps.push({
      ...this.snapshotNodes({ [oldRearId]: 'active', [newNode.id]: 'new' }),
      pointers: { front: this.front.id, rear: oldRearId, newNode: newNode.id },
      pseudocodeLine: 2,
      log: `Trỏ rear.next -> newNode(${value}).`
    });

    this.rear = newNode;
    this.size++;

    steps.push({
      ...this.snapshotNodes({ [newNode.id]: 'found' }),
      pointers: { front: this.front.id, rear: this.rear.id },
      pseudocodeLine: 2,
      log: `Cập nhật con trỏ rear = newNode. Đã ENQUEUE thành công!`
    });

    return steps;
  }

  dequeue() {
    const steps = [];
    if (!this.front) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: {},
        pseudocodeLine: 0,
        log: `QueueUnderflow: Hàng đợi rỗng!`
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
      log: `Di chuyển front = front.next. Đã DEQUEUE thành công giá trị ${temp.value}!`
    });

    return steps;
  }

  peek() {
    const steps = [];
    if (!this.front) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: {},
        pseudocodeLine: 0,
        log: `Queue rỗng! Peek trả về NULL.`
      });
      return steps;
    }

    steps.push({
      ...this.snapshotNodes({ [this.front.id]: 'found' }),
      pointers: { front: this.front.id, rear: this.rear.id },
      pseudocodeLine: 1,
      log: `PEEK: Node ở đầu hàng đợi front = Node(${this.front.value}).`
    });

    return steps;
  }
}
