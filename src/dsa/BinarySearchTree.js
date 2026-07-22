/**
 * Binary Search Tree (Cây tìm kiếm nhị phân)
 * Triển khai chuẩn Node con trỏ root, left, right.
 * Tính toán tọa độ x, y linh hoạt để Visualizer hiển thị nhánh cây phân nhánh đẹp mắt.
 */

export class BSTNode {
  constructor(value, id = null) {
    this.id = id || `bst_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
  }
}

export class BinarySearchTreeEngine {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  // Tái tính toán vị trí x, y cho từng Node cây (Layout calculation)
  // Shift depth offset down to 90px so ROOT badge and top branches never get clipped!
  calculatePositions(width = 800, height = 440) {
    if (!this.root) return;

    const assignPos = (node, depth = 0, minX = 60, maxX = width - 60) => {
      if (!node) return;
      node.x = (minX + maxX) / 2;
      node.y = 85 + depth * 75; // Shifting y down to 85px for ample top headroom

      const mid = node.x;
      assignPos(node.left, depth + 1, minX, mid);
      assignPos(node.right, depth + 1, mid, maxX);
    };

    assignPos(this.root);
  }

  snapshotNodes(statusMap = {}, newNode = null) {
    this.calculatePositions();

    const list = [];
    const traverse = (node) => {
      if (!node) return;
      list.push({
        id: node.id,
        value: node.value,
        leftId: node.left ? node.left.id : null,
        rightId: node.right ? node.right.id : null,
        x: node.x,
        y: node.y,
        status: statusMap[node.id] || 'default'
      });
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);

    return {
      nodes: list,
      rootId: this.root ? this.root.id : null,
      size: this.size,
      newNode: newNode ? {
        id: newNode.id,
        value: newNode.value,
        x: width => width / 2,
        y: 35,
        status: 'new'
      } : null
    };
  }

  setInitialData(values) {
    this.root = null;
    this.size = 0;
    for (const val of values) {
      this.insertDirect(val);
    }
    return this.snapshotNodes();
  }

  insertDirect(val) {
    const newNode = new BSTNode(val);
    if (!this.root) {
      this.root = newNode;
      this.size++;
      return;
    }
    let curr = this.root;
    while (curr) {
      if (val < curr.value) {
        if (!curr.left) {
          curr.left = newNode;
          this.size++;
          break;
        }
        curr = curr.left;
      } else if (val > curr.value) {
        if (!curr.right) {
          curr.right = newNode;
          this.size++;
          break;
        }
        curr = curr.right;
      } else {
        break; // Duplicate ignored
      }
    }
  }

  // 1. Thêm (Insert với visual steps)
  insert(value) {
    const steps = [];
    const newNode = new BSTNode(value);

    steps.push({
      ...this.snapshotNodes({}, newNode),
      pointers: { root: this.root?.id, newNode: newNode.id },
      pseudocodeLine: 0,
      log: `Tạo Node mới = BSTNode(${value}).`
    });

    if (!this.root) {
      this.root = newNode;
      this.size++;
      steps.push({
        ...this.snapshotNodes({ [newNode.id]: 'found' }),
        pointers: { root: this.root.id },
        pseudocodeLine: 1,
        log: `Cây BST rỗng: Đặt root = Node(${value}).`
      });
      return steps;
    }

    let curr = this.root;
    while (curr) {
      if (value < curr.value) {
        steps.push({
          ...this.snapshotNodes({ [curr.id]: 'active' }),
          pointers: { root: this.root.id, current: curr.id },
          pseudocodeLine: 4,
          log: `So sánh ${value} < Node(${curr.value}) -> Đi sang bên TRÁI (left).`
        });
        if (!curr.left) {
          curr.left = newNode;
          this.size++;
          steps.push({
            ...this.snapshotNodes({ [curr.id]: 'active', [newNode.id]: 'found' }),
            pointers: { root: this.root.id, current: curr.id },
            pseudocodeLine: 4,
            log: `curr.left rỗng: Chèn Node(${value}) làm con trái của Node(${curr.value})!`
          });
          break;
        }
        curr = curr.left;
      } else if (value > curr.value) {
        steps.push({
          ...this.snapshotNodes({ [curr.id]: 'active' }),
          pointers: { root: this.root.id, current: curr.id },
          pseudocodeLine: 5,
          log: `So sánh ${value} > Node(${curr.value}) -> Đi sang bên PHẢI (right).`
        });
        if (!curr.right) {
          curr.right = newNode;
          this.size++;
          steps.push({
            ...this.snapshotNodes({ [curr.id]: 'active', [newNode.id]: 'found' }),
            pointers: { root: this.root.id, current: curr.id },
            pseudocodeLine: 5,
            log: `curr.right rỗng: Chèn Node(${value}) làm con phải của Node(${curr.value})!`
          });
          break;
        }
        curr = curr.right;
      } else {
        steps.push({
          ...this.snapshotNodes({ [curr.id]: 'found' }),
          pointers: { root: this.root.id, current: curr.id },
          pseudocodeLine: 3,
          log: `Giá trị ${value} đã tồn tại trong BST. Không chèn phần tử trùng lặp.`
        });
        break;
      }
    }

    return steps;
  }

  // 2. Tìm kiếm (Search)
  search(value) {
    const steps = [];
    let curr = this.root;

    while (curr) {
      if (curr.value === value) {
        steps.push({
          ...this.snapshotNodes({ [curr.id]: 'found' }),
          pointers: { root: this.root.id, current: curr.id },
          pseudocodeLine: 2,
          log: `TÌM THẤY! Node(${value}) có mặt trong cây BST.`
        });
        return steps;
      }

      if (value < curr.value) {
        steps.push({
          ...this.snapshotNodes({ [curr.id]: 'active' }),
          pointers: { root: this.root.id, current: curr.id },
          pseudocodeLine: 3,
          log: `${value} < ${curr.value} -> Rẽ sang con TRÁI.`
        });
        curr = curr.left;
      } else {
        steps.push({
          ...this.snapshotNodes({ [curr.id]: 'active' }),
          pointers: { root: this.root.id, current: curr.id },
          pseudocodeLine: 4,
          log: `${value} > ${curr.value} -> Rẽ sang con PHẢI.`
        });
        curr = curr.right;
      }
    }

    steps.push({
      ...this.snapshotNodes(),
      pointers: { root: this.root?.id },
      pseudocodeLine: 5,
      log: `Đến con trỏ NULL. Không tìm thấy giá trị ${value} trong BST.`
    });

    return steps;
  }

  // 3. Xóa Node (Remove)
  remove(value) {
    const steps = [];
    if (!this.root) {
      steps.push({
        ...this.snapshotNodes(),
        pointers: {},
        pseudocodeLine: 0,
        log: `Cây BST rỗng!`
      });
      return steps;
    }

    const removeNode = (node, val) => {
      if (!node) return null;

      steps.push({
        ...this.snapshotNodes({ [node.id]: 'active' }),
        pointers: { root: this.root.id, current: node.id },
        pseudocodeLine: 1,
        log: `Đang kiểm tra Node(${node.value}) với giá trị cần xóa ${val}.`
      });

      if (val < node.value) {
        node.left = removeNode(node.left, val);
        return node;
      } else if (val > node.value) {
        node.right = removeNode(node.right, val);
        return node;
      } else {
        steps.push({
          ...this.snapshotNodes({ [node.id]: 'deleting' }),
          pointers: { root: this.root.id, current: node.id },
          pseudocodeLine: 4,
          log: `Tìm thấy Node(${node.value}) cần xóa! Tiến hành xử lý con trỏ...`
        });

        if (!node.left && !node.right) {
          this.size--;
          return null;
        }

        if (!node.left) {
          this.size--;
          return node.right;
        }
        if (!node.right) {
          this.size--;
          return node.left;
        }

        let successor = node.right;
        while (successor.left) {
          successor = successor.left;
        }

        steps.push({
          ...this.snapshotNodes({ [node.id]: 'deleting', [successor.id]: 'found' }),
          pointers: { root: this.root.id, current: node.id, temp: successor.id },
          pseudocodeLine: 4,
          log: `Node(${node.value}) có 2 con. Thay bằng In-order Successor: Node(${successor.value}).`
        });

        node.value = successor.value;
        node.right = removeNode(node.right, successor.value);
        return node;
      }
    };

    this.root = removeNode(this.root, value);

    steps.push({
      ...this.snapshotNodes(),
      pointers: { root: this.root?.id },
      pseudocodeLine: 0,
      log: `Hoàn tất thao tác xóa Node trong BST!`
    });

    return steps;
  }

  // 4. Duyệt Cây
  traverse(type = 'inorder') {
    const steps = [];
    const visitedNodes = [];
    const statusMap = {};

    if (type === 'inorder') {
      const inorder = (node) => {
        if (!node) return;
        inorder(node.left);
        statusMap[node.id] = 'visited';
        visitedNodes.push(node.value);
        steps.push({
          ...this.snapshotNodes({ ...statusMap, [node.id]: 'found' }),
          pointers: { root: this.root.id, current: node.id },
          pseudocodeLine: 0,
          log: `[In-Order] Thăm Node(${node.value}). Danh sách đã duyệt: [${visitedNodes.join(', ')}].`
        });
        inorder(node.right);
      };
      inorder(this.root);
    } else if (type === 'preorder') {
      const preorder = (node) => {
        if (!node) return;
        statusMap[node.id] = 'visited';
        visitedNodes.push(node.value);
        steps.push({
          ...this.snapshotNodes({ ...statusMap, [node.id]: 'found' }),
          pointers: { root: this.root.id, current: node.id },
          pseudocodeLine: 1,
          log: `[Pre-Order] Thăm Node(${node.value}). Danh sách đã duyệt: [${visitedNodes.join(', ')}].`
        });
        preorder(node.left);
        preorder(node.right);
      };
      preorder(this.root);
    } else if (type === 'postorder') {
      const postorder = (node) => {
        if (!node) return;
        postorder(node.left);
        postorder(node.right);
        statusMap[node.id] = 'visited';
        visitedNodes.push(node.value);
        steps.push({
          ...this.snapshotNodes({ ...statusMap, [node.id]: 'found' }),
          pointers: { root: this.root.id, current: node.id },
          pseudocodeLine: 2,
          log: `[Post-Order] Thăm Node(${node.value}). Danh sách đã duyệt: [${visitedNodes.join(', ')}].`
        });
      };
      postorder(this.root);
    } else if (type === 'bfs') {
      if (!this.root) return steps;
      const q = [this.root];
      while (q.length > 0) {
        const curr = q.shift();
        statusMap[curr.id] = 'visited';
        visitedNodes.push(curr.value);
        steps.push({
          ...this.snapshotNodes({ ...statusMap, [curr.id]: 'found' }),
          pointers: { root: this.root.id, current: curr.id },
          pseudocodeLine: 3,
          log: `[BFS - Theo Tầng] Thăm Node(${curr.value}). Danh sách đã duyệt: [${visitedNodes.join(', ')}].`
        });
        if (curr.left) q.push(curr.left);
        if (curr.right) q.push(curr.right);
      }
    }

    return steps;
  }
}
