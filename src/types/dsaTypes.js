/**
 * Định nghĩa danh mục Cấu trúc Dữ liệu
 */
export const DSA_TYPES = {
  SLL: 'SLL',       // Singly Linked List
  DLL: 'DLL',       // Doubly Linked List
  CLL: 'CLL',       // Circular Linked List
  STACK: 'STACK',   // Stack (Linked List)
  QUEUE: 'QUEUE',   // Queue (Linked List)
  BST: 'BST',       // Binary Search Tree
};

export const DSA_LABELS = {
  [DSA_TYPES.SLL]: 'Singly Linked List',
  [DSA_TYPES.DLL]: 'Doubly Linked List',
  [DSA_TYPES.CLL]: 'Circular Linked List',
  [DSA_TYPES.STACK]: 'Stack (Linked List)',
  [DSA_TYPES.QUEUE]: 'Queue (Linked List)',
  [DSA_TYPES.BST]: 'Binary Search Tree',
};

/**
 * Trạng thái Node trong quá trình Visualizer
 */
export const NODE_STATUS = {
  DEFAULT: 'default',
  NEW: 'new',
  ACTIVE: 'active',
  FOUND: 'found',
  DELETING: 'deleting',
  VISITED: 'visited',
};

/**
 * Tốc độ phát Animation (ms mỗi step)
 */
export const SPEED_PRESETS = {
  SLOW: 1500,
  NORMAL: 800,
  FAST: 350,
};
