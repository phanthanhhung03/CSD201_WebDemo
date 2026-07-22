import React, { useState } from 'react';
import { DSA_TYPES } from '../types/dsaTypes';
import {
  PlusCircle, Trash2, Search, ArrowRight, ArrowLeft, Play, Eye, RotateCw,
  TrendingDown, TrendingUp, Layers, HelpCircle, CornerDownRight, Maximize2, Leaf
} from 'lucide-react';

export default function ControlPanel({ activeType, onExecute }) {
  const [valInput, setValInput] = useState('42');
  const [indexInput, setIndexInput] = useState('1');
  const [bstTraverseType, setBstTraverseType] = useState('inorder');

  const handleRun = (operation, payload = {}) => {
    const val = parseInt(valInput, 10);
    const idx = parseInt(indexInput, 10);
    onExecute(operation, {
      value: isNaN(val) ? 10 : val,
      index: isNaN(idx) ? 0 : idx,
      traverseType: bstTraverseType,
      ...payload
    });
  };

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-4 shadow-lg flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-dark-border pb-2">
        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <span>Bảng Thao Tác Thuật Toán</span>
        </h2>
        <span className="text-xs px-2.5 py-0.5 rounded bg-dark-panel border border-dark-border font-mono text-cyan-300">
          Mode: {activeType}
        </span>
      </div>

      {/* Inputs Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1 font-medium">Giá trị (Value)</label>
          <input
            type="number"
            value={valInput}
            onChange={(e) => setValInput(e.target.value)}
            className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            placeholder="Nhập giá trị..."
          />
        </div>

        {(activeType === DSA_TYPES.SLL || activeType === DSA_TYPES.DLL) && (
          <div>
            <label className="block text-xs text-slate-400 mb-1 font-medium">Vị trí (Index)</label>
            <input
              type="number"
              value={indexInput}
              onChange={(e) => setIndexInput(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              placeholder="Chỉ số index..."
            />
          </div>
        )}

        {activeType === DSA_TYPES.BST && (
          <div>
            <label className="block text-xs text-slate-400 mb-1 font-medium">Thuật toán Duyệt</label>
            <select
              value={bstTraverseType}
              onChange={(e) => setBstTraverseType(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="inorder">In-Order (Trái -&gt; Gốc -&gt; Phải)</option>
              <option value="preorder">Pre-Order (Gốc -&gt; Trái -&gt; Phải)</option>
              <option value="postorder">Post-Order (Trái -&gt; Phải -&gt; Gốc)</option>
              <option value="bfs">BFS (Duyệt theo Tầng)</option>
            </select>
          </div>
        )}
      </div>

      {/* Buttons Group per DSA */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-dark-border/60">

        {/* 1. Singly Linked List (SLL) */}
        {activeType === DSA_TYPES.SLL && (
          <>
            <button onClick={() => handleRun('insertHead')} className="px-2.5 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <PlusCircle className="w-3.5 h-3.5" /> Thêm Đầu
            </button>
            <button onClick={() => handleRun('insertTail')} className="px-2.5 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <PlusCircle className="w-3.5 h-3.5" /> Thêm Cuối
            </button>
            <button onClick={() => handleRun('insertAtIndex')} className="px-2.5 py-1.5 bg-teal-600/80 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <PlusCircle className="w-3.5 h-3.5" /> Thêm Index
            </button>
            <button onClick={() => handleRun('deleteHead')} className="px-2.5 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Trash2 className="w-3.5 h-3.5" /> Xóa Đầu
            </button>
            <button onClick={() => handleRun('deleteTail')} className="px-2.5 py-1.5 bg-rose-700/80 hover:bg-rose-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Trash2 className="w-3.5 h-3.5" /> Xóa Cuối
            </button>
            <button onClick={() => handleRun('deleteAtIndex')} className="px-2.5 py-1.5 bg-pink-700/80 hover:bg-pink-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Trash2 className="w-3.5 h-3.5" /> Xóa Index
            </button>
            <button onClick={() => handleRun('deleteValue')} className="px-2.5 py-1.5 bg-pink-800/80 hover:bg-pink-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Trash2 className="w-3.5 h-3.5" /> Xóa Giá Trị
            </button>
            <button onClick={() => handleRun('search')} className="px-2.5 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Search className="w-3.5 h-3.5" /> Tìm Kiếm
            </button>
            <button onClick={() => handleRun('traverse')} className="px-2.5 py-1.5 bg-purple-600/80 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <ArrowRight className="w-3.5 h-3.5" /> Traverse
            </button>
            <button onClick={() => handleRun('getFirst')} className="px-2.5 py-1.5 bg-cyan-700/80 hover:bg-cyan-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Eye className="w-3.5 h-3.5" /> Get First
            </button>
            <button onClick={() => handleRun('getLast')} className="px-2.5 py-1.5 bg-cyan-800/80 hover:bg-cyan-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Eye className="w-3.5 h-3.5" /> Get Last
            </button>
            <button onClick={() => handleRun('getByIndex')} className="px-2.5 py-1.5 bg-blue-700/80 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Eye className="w-3.5 h-3.5" /> Get by Index
            </button>
            <button onClick={() => handleRun('reverse')} className="px-2.5 py-1.5 bg-indigo-600/80 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <RotateCw className="w-3.5 h-3.5" /> Reverse List
            </button>
          </>
        )}

        {/* 2. Doubly Linked List (DLL) */}
        {activeType === DSA_TYPES.DLL && (
          <>
            <button onClick={() => handleRun('insertHead')} className="px-2.5 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <PlusCircle className="w-3.5 h-3.5" /> Thêm Đầu
            </button>
            <button onClick={() => handleRun('insertTail')} className="px-2.5 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <PlusCircle className="w-3.5 h-3.5" /> Thêm Cuối
            </button>
            <button onClick={() => handleRun('insertAtIndex')} className="px-2.5 py-1.5 bg-teal-600/80 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <PlusCircle className="w-3.5 h-3.5" /> Thêm Index
            </button>
            <button onClick={() => handleRun('deleteHead')} className="px-2.5 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Trash2 className="w-3.5 h-3.5" /> Xóa Đầu
            </button>
            <button onClick={() => handleRun('deleteTail')} className="px-2.5 py-1.5 bg-rose-700/80 hover:bg-rose-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Trash2 className="w-3.5 h-3.5" /> Xóa Cuối
            </button>
            <button onClick={() => handleRun('deleteAtIndex')} className="px-2.5 py-1.5 bg-pink-700/80 hover:bg-pink-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Trash2 className="w-3.5 h-3.5" /> Xóa Index
            </button>
            <button onClick={() => handleRun('search')} className="px-2.5 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Search className="w-3.5 h-3.5" /> Tìm Kiếm
            </button>
            <button onClick={() => handleRun('traverseForward')} className="px-2.5 py-1.5 bg-purple-600/80 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <ArrowRight className="w-3.5 h-3.5" /> Traverse Forward (&rarr;)
            </button>
            <button onClick={() => handleRun('traverseBackward')} className="px-2.5 py-1.5 bg-indigo-600/80 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <ArrowLeft className="w-3.5 h-3.5" /> Traverse Backward (&larr;)
            </button>
            <button onClick={() => handleRun('reverse')} className="px-2.5 py-1.5 bg-cyan-700/80 hover:bg-cyan-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <RotateCw className="w-3.5 h-3.5" /> Reverse List
            </button>
          </>
        )}

        {/* 3. Circular Linked List (CLL) */}
        {activeType === DSA_TYPES.CLL && (
          <>
            <button onClick={() => handleRun('insert')} className="px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <PlusCircle className="w-3.5 h-3.5" /> Thêm (Insert)
            </button>
            <button onClick={() => handleRun('delete')} className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Trash2 className="w-3.5 h-3.5" /> Xóa (Delete)
            </button>
            <button onClick={() => handleRun('search')} className="px-3 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Search className="w-3.5 h-3.5" /> Tìm Kiếm Node
            </button>
            <button onClick={() => handleRun('traverse')} className="px-3 py-1.5 bg-purple-600/80 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <ArrowRight className="w-3.5 h-3.5" /> Duyệt 1 Vòng
            </button>
            <button onClick={() => handleRun('traverse2Loops')} className="px-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <RotateCw className="w-3.5 h-3.5" /> Duyệt 2 Vòng Vòng Tròn
            </button>
          </>
        )}

        {/* 4. Stack */}
        {activeType === DSA_TYPES.STACK && (
          <>
            <button onClick={() => handleRun('push')} className="px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <PlusCircle className="w-3.5 h-3.5" /> PUSH (Thêm Đỉnh)
            </button>
            <button onClick={() => handleRun('pop')} className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Trash2 className="w-3.5 h-3.5" /> POP (Rút Đỉnh)
            </button>
            <button onClick={() => handleRun('peek')} className="px-3 py-1.5 bg-cyan-600/80 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Eye className="w-3.5 h-3.5" /> PEEK Đỉnh
            </button>
            <button onClick={() => handleRun('isEmpty')} className="px-3 py-1.5 bg-purple-600/80 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <HelpCircle className="w-3.5 h-3.5" /> isEmpty()
            </button>
            <button onClick={() => handleRun('clear')} className="px-3 py-1.5 bg-pink-700/80 hover:bg-pink-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Trash2 className="w-3.5 h-3.5" /> Clear Stack
            </button>
          </>
        )}

        {/* 5. Queue */}
        {activeType === DSA_TYPES.QUEUE && (
          <>
            <button onClick={() => handleRun('enqueue')} className="px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <PlusCircle className="w-3.5 h-3.5" /> ENQUEUE (Vào Hàng)
            </button>
            <button onClick={() => handleRun('dequeue')} className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Trash2 className="w-3.5 h-3.5" /> DEQUEUE (Ra Hàng)
            </button>
            <button onClick={() => handleRun('peek')} className="px-3 py-1.5 bg-cyan-600/80 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Eye className="w-3.5 h-3.5" /> Peek FRONT
            </button>
            <button onClick={() => handleRun('peekRear')} className="px-3 py-1.5 bg-teal-600/80 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Eye className="w-3.5 h-3.5" /> Peek REAR
            </button>
            <button onClick={() => handleRun('isEmpty')} className="px-3 py-1.5 bg-purple-600/80 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <HelpCircle className="w-3.5 h-3.5" /> isEmpty()
            </button>
            <button onClick={() => handleRun('clear')} className="px-3 py-1.5 bg-pink-700/80 hover:bg-pink-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Trash2 className="w-3.5 h-3.5" /> Clear Queue
            </button>
          </>
        )}

        {/* 6. Binary Search Tree (BST) */}
        {activeType === DSA_TYPES.BST && (
          <>
            <button onClick={() => handleRun('insert')} className="px-2.5 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <PlusCircle className="w-3.5 h-3.5" /> Thêm vào BST
            </button>
            <button onClick={() => handleRun('remove')} className="px-2.5 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Trash2 className="w-3.5 h-3.5" /> Xóa Node
            </button>
            <button onClick={() => handleRun('search')} className="px-2.5 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <CornerDownRight className="w-3.5 h-3.5" /> Search Path (Root&rarr;Node)
            </button>
            <button onClick={() => handleRun('findMin')} className="px-2.5 py-1.5 bg-teal-600/80 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <TrendingDown className="w-3.5 h-3.5" /> Find Min
            </button>
            <button onClick={() => handleRun('findMax')} className="px-2.5 py-1.5 bg-cyan-600/80 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <TrendingUp className="w-3.5 h-3.5" /> Find Max
            </button>
            <button onClick={() => handleRun('getHeight')} className="px-2.5 py-1.5 bg-blue-600/80 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Maximize2 className="w-3.5 h-3.5" /> Get Height
            </button>
            <button onClick={() => handleRun('countLeaves')} className="px-2.5 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Leaf className="w-3.5 h-3.5" /> Count Leaves
            </button>
            <button onClick={() => handleRun('traverse')} className="px-2.5 py-1.5 bg-purple-600/80 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
              <Play className="w-3.5 h-3.5" /> Duyệt Cây
            </button>
          </>
        )}

      </div>
    </div>
  );
}
