/**
 * Tập hợp mã giả (Pseudocode) và dòng highlight cho tất cả các thao tác mới của 6 Cấu trúc Dữ liệu
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
    deleteAtIndex: [
      '1. if (index < 0 || index >= size) return false',
      '2. if (index == 0) return deleteHead()',
      '3. curr = head',
      '4. for i = 0 to index - 2: curr = curr.next',
      '5. temp = curr.next; curr.next = temp.next',
      '6. if (temp == tail) tail = curr',
      '7. delete temp; size--'
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
    ],
    traverse: [
      '1. if (head == null) return',
      '2. curr = head',
      '3. while (curr != null):',
      '4.     visit(curr)',
      '5.     curr = curr.next'
    ],
    getFirst: [
      '1. if (head == null) return null',
      '2. return head.value'
    ],
    getLast: [
      '1. if (tail == null) return null',
      '2. return tail.value'
    ],
    getByIndex: [
      '1. if (index < 0 || index >= size) return null',
      '2. curr = head',
      '3. for i = 0 to index - 1: curr = curr.next',
      '4. return curr.value'
    ],
    reverse: [
      '1. prev = null, curr = head, next = null',
      '2. tail = head',
      '3. while (curr != null):',
      '4.     next = curr.next',
      '5.     curr.next = prev',
      '6.     prev = curr; curr = next',
      '7. head = prev'
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
    insertAtIndex: [
      '1. create newNode = Node(value)',
      '2. if (index == 0) return insertHead(value)',
      '3. if (index == size) return insertTail(value)',
      '4. curr = head; for i = 0 to index - 2: curr = curr.next',
      '5. newNode.next = curr.next; newNode.prev = curr',
      '6. curr.next.prev = newNode; curr.next = newNode',
      '7. size++'
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
    deleteAtIndex: [
      '1. if (index < 0 || index >= size) return false',
      '2. if (index == 0) return deleteHead()',
      '3. if (index == size - 1) return deleteTail()',
      '4. curr = head; for i = 0 to index - 1: curr = curr.next',
      '5. curr.prev.next = curr.next; curr.next.prev = curr.prev',
      '6. delete curr; size--'
    ],
    search: [
      '1. curr = head, index = 0',
      '2. while (curr != null):',
      '3.     if (curr.value == target) return index',
      '4.     curr = curr.next, index++',
      '5. return -1 (Not Found)'
    ],
    traverseForward: [
      '1. curr = head',
      '2. while (curr != null):',
      '3.     visit(curr)',
      '4.     curr = curr.next (FORWARD ->)'
    ],
    traverseBackward: [
      '1. curr = tail',
      '2. while (curr != null):',
      '3.     visit(curr)',
      '4.     curr = curr.prev (BACKWARD <-)'
    ],
    reverse: [
      '1. curr = head, temp = null',
      '2. while (curr != null):',
      '3.     temp = curr.prev; curr.prev = curr.next; curr.next = temp',
      '4.     curr = curr.prev',
      '5. if (temp != null) { head = temp.prev }'
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
    search: [
      '1. if (head == null) return -1',
      '2. curr = head, index = 0',
      '3. do { if (curr.val == target) return index; curr = curr.next; index++ }',
      '4. while (curr != head)',
      '5. return -1 (Not Found)'
    ],
    traverse: [
      '1. if (head == null) return',
      '2. curr = head',
      '3. do { process(curr); curr = curr.next }',
      '4. while (curr != head) // Stops when returning to HEAD'
    ],
    traverse2Loops: [
      '1. if (head == null) return',
      '2. curr = head, loops = 0',
      '3. while (loops < 2):',
      '4.     process(curr); curr = curr.next',
      '5.     if (curr == head) loops++'
    ]
  },

  STACK: {
    push: [
      '1. if (size >= capacity) return StackOverflow!',
      '2. create newNode = Node(value)',
      '3. newNode.next = top',
      '4. top = newNode; size++'
    ],
    pop: [
      '1. if (top == null) return StackUnderflow!',
      '2. temp = top; top = top.next',
      '3. delete temp; size--',
      '4. return temp.value'
    ],
    peek: [
      '1. if (top == null) return null',
      '2. return top.value'
    ],
    isEmpty: [
      '1. return size == 0 (top == null)'
    ],
    clear: [
      '1. top = null; size = 0'
    ]
  },

  QUEUE: {
    enqueue: [
      '1. if (size >= capacity) return QueueOverflow!',
      '2. create newNode = Node(value)',
      '3. if (rear == null) { front = rear = newNode }',
      '4. else { rear.next = newNode; rear = newNode }',
      '5. size++'
    ],
    dequeue: [
      '1. if (front == null) return QueueUnderflow!',
      '2. temp = front; front = front.next',
      '3. if (front == null) rear = null',
      '4. delete temp; size--',
      '5. return temp.value'
    ],
    peek: [
      '1. if (front == null) return null',
      '2. return front.value (PEEK FRONT)'
    ],
    peekRear: [
      '1. if (rear == null) return null',
      '2. return rear.value (PEEK REAR)'
    ],
    isEmpty: [
      '1. return size == 0 (front == null)'
    ],
    clear: [
      '1. front = rear = null; size = 0'
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
      '1. curr = root, path = []',
      '2. while (curr != null):',
      '3.     path.push(curr)',
      '4.     if (target == curr.val) return FOUND path',
      '5.     else if (target < curr.val) curr = curr.left',
      '6.     else curr = curr.right',
      '7. return NOT FOUND'
    ],
    findMin: [
      '1. if (root == null) return null',
      '2. curr = root',
      '3. while (curr.left != null) curr = curr.left',
      '4. return curr.value (MIN Node)'
    ],
    findMax: [
      '1. if (root == null) return null',
      '2. curr = root',
      '3. while (curr.right != null) curr = curr.right',
      '4. return curr.value (MAX Node)'
    ],
    getHeight: [
      '1. height(node): if (node == null) return 0',
      '2. return 1 + max(height(node.left), height(node.right))'
    ],
    countLeaves: [
      '1. countLeaves(node): if (node == null) return 0',
      '2. if (node.left == null && node.right == null) return 1',
      '3. return countLeaves(node.left) + countLeaves(node.right)'
    ],
    traverse: [
      'In-Order: Left -> Root -> Right',
      'Pre-Order: Root -> Left -> Right',
      'Post-Order: Left -> Right -> Root',
      'BFS: Level-by-level using Queue'
    ]
  }
};
