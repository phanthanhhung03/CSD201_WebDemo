/**
 * Tập hợp mã giả (Pseudocode) và dòng highlight cho từng thao tác của 6 Cấu trúc Dữ liệu
 */

export const PSEUDOCODES = {
  SLL: {
    insertHead: [
      '1. create newNode = Node(value)',
      '2. newNode.next = head',
      '3. head = newNode',
      '4. if (tail == null) tail = newNode',
      '5. size++'
    ],
    insertTail: [
      '1. create newNode = Node(value)',
      '2. if (head == null) { head = tail = newNode }',
      '3. else { tail.next = newNode; tail = newNode }',
      '4. size++'
    ],
    insertAtIndex: [
      '1. create newNode = Node(value)',
      '2. if (index == 0) return insertHead(value)',
      '3. curr = head',
      '4. for i = 0 to index - 2: curr = curr.next',
      '5. newNode.next = curr.next',
      '6. curr.next = newNode',
      '7. if (newNode.next == null) tail = newNode',
      '8. size++'
    ],
    deleteHead: [
      '1. if (head == null) return null',
      '2. temp = head',
      '3. head = head.next',
      '4. if (head == null) tail = null',
      '5. delete temp',
      '6. size--'
    ],
    deleteTail: [
      '1. if (head == null) return null',
      '2. if (head == tail) { head = tail = null }',
      '3. curr = head; while (curr.next != tail) curr = curr.next',
      '4. delete tail; tail = curr; tail.next = null',
      '5. size--'
    ],
    deleteValue: [
      '1. if (head == null) return false',
      '2. if (head.value == value) return deleteHead()',
      '3. curr = head',
      '4. while (curr.next != null && curr.next.value != value)',
      '5.     curr = curr.next',
      '6. if (curr.next != null) { temp = curr.next; curr.next = temp.next; if (temp == tail) tail = curr; size-- }'
    ],
    search: [
      '1. curr = head, index = 0',
      '2. while (curr != null):',
      '3.     if (curr.value == target) return index',
      '4.     curr = curr.next, index++',
      '5. return -1 (Not Found)'
    ]
  },

  DLL: {
    insertHead: [
      '1. create newNode = Node(value)',
      '2. newNode.next = head',
      '3. if (head != null) head.prev = newNode',
      '4. head = newNode',
      '5. if (tail == null) tail = newNode',
      '6. size++'
    ],
    insertTail: [
      '1. create newNode = Node(value)',
      '2. if (tail == null) { head = tail = newNode }',
      '3. else { newNode.prev = tail; tail.next = newNode; tail = newNode }',
      '4. size++'
    ],
    deleteHead: [
      '1. if (head == null) return null',
      '2. temp = head; head = head.next',
      '3. if (head != null) head.prev = null',
      '4. else tail = null',
      '5. delete temp; size--'
    ],
    deleteTail: [
      '1. if (tail == null) return null',
      '2. temp = tail; tail = tail.prev',
      '3. if (tail != null) tail.next = null',
      '4. else head = null',
      '5. delete temp; size--'
    ],
    search: [
      '1. curr = head, index = 0',
      '2. while (curr != null):',
      '3.     if (curr.value == target) return index',
      '4.     curr = curr.next, index++',
      '5. return -1 (Not Found)'
    ]
  },

  CLL: {
    insert: [
      '1. create newNode = Node(value)',
      '2. if (head == null) { head = tail = newNode; newNode.next = head }',
      '3. else { tail.next = newNode; newNode.next = head; tail = newNode }',
      '4. size++'
    ],
    delete: [
      '1. if (head == null) return null',
      '2. if (head.value == target) {',
      '3.     if (head == tail) head = tail = null',
      '4.     else { head = head.next; tail.next = head }',
      '5. } else { search target with curr & delete; tail.next = head if tail changed }'
    ],
    traverse: [
      '1. if (head == null) return',
      '2. curr = head',
      '3. do { process(curr); curr = curr.next }',
      '4. while (curr != head)'
    ]
  },

  STACK: {
    push: [
      '1. create newNode = Node(value)',
      '2. newNode.next = top',
      '3. top = newNode',
      '4. size++'
    ],
    pop: [
      '1. if (top == null) return StackUnderflow',
      '2. temp = top',
      '3. top = top.next',
      '4. delete temp; size--',
      '5. return temp.value'
    ],
    peek: [
      '1. if (top == null) return null',
      '2. return top.value'
    ]
  },

  QUEUE: {
    enqueue: [
      '1. create newNode = Node(value)',
      '2. if (rear == null) { front = rear = newNode }',
      '3. else { rear.next = newNode; rear = newNode }',
      '4. size++'
    ],
    dequeue: [
      '1. if (front == null) return QueueUnderflow',
      '2. temp = front',
      '3. front = front.next',
      '4. if (front == null) rear = null',
      '5. delete temp; size--',
      '6. return temp.value'
    ],
    peek: [
      '1. if (front == null) return null',
      '2. return front.value'
    ]
  },

  BST: {
    insert: [
      '1. create newNode = Node(value)',
      '2. if (root == null) { root = newNode; return }',
      '3. curr = root',
      '4. while (true):',
      '5.   if (val < curr.val): go left (if null: curr.left = newNode)',
      '6.   else if (val > curr.val): go right (if null: curr.right = newNode)'
    ],
    remove: [
      '1. root = deleteNode(root, value)',
      '2. if (node == null) return null',
      '3. if (val < node.val) node.left = deleteNode(node.left, val)',
      '4. else if (val > node.val) node.right = deleteNode(node.right, val)',
      '5. else: Node found -> handle 0/1/2 children'
    ],
    search: [
      '1. curr = root',
      '2. while (curr != null):',
      '3.     if (target == curr.val) return curr',
      '4.     else if (target < curr.val) curr = curr.left',
      '5.     else curr = curr.right',
      '6. return null (Not Found)'
    ],
    traverse: [
      'In-Order: Left -> Root -> Right',
      'Pre-Order: Root -> Left -> Right',
      'Post-Order: Left -> Right -> Root',
      'BFS: Level-by-level using Queue'
    ]
  }
};
