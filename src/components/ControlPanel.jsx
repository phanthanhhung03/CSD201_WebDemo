import React, { useState } from 'react';
import { DSA_TYPES } from '../types/dsaTypes';
import { PlusCircle, Trash2, Search, ArrowRight, Play, Eye, Layers, Server } from 'lucide-react';

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
          <span>Bảng Điều Khiển</span>
        </h2>
        <span className="text-xs px-2 py-0.5 rounded bg-dark-panel border border-dark-border text-slate-400">
          Mode: {activeType}
        </span>
      </div>

      {/* Inputs Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Giá trị (Value)</label>
          <input
            type="number"
            value={valInput}
            onChange={(e) => setValInput(e.target.value)}
            className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            placeholder="Nhập số..."
          />
        </div>

        {activeType === DSA_TYPES.SLL && (
          <div>
            <label className="block text-xs text-slate-400 mb-1">Vị trí (Index)</label>
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
            <label className="block text-xs text-slate-400 mb-1">Thuật toán Duyệt</label>
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
      <div className="flex flex-wrap gap-2 pt-1 border-t border-dark-border/50">

        {/* 1. Singly Linked List Buttons */}
        {activeType === DSA_TYPES.SLL && (
          <>
            <button
              onClick={() => handleRun('insertHead')}
              className="px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Thêm Đầu
            </button>
            <button
              onClick={() => handleRun('insertTail')}
              className="px-3 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Thêm Cuối
            </button>
            <button
              onClick={() => handleRun('insertAtIndex')}
              className="px-3 py-1.5 bg-teal-600/80 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Thêm Index
            </button>
            <button
              onClick={() => handleRun('deleteHead')}
              className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa Đầu
            </button>
            <button
              onClick={() => handleRun('deleteTail')}
              className="px-3 py-1.5 bg-rose-700/80 hover:bg-rose-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa Cuối
            </button>
            <button
              onClick={() => handleRun('deleteValue')}
              className="px-3 py-1.5 bg-pink-700/80 hover:bg-pink-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa Giá Trị
            </button>
            <button
              onClick={() => handleRun('search')}
              className="px-3 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Search className="w-3.5 h-3.5" /> Tìm Kiếm
            </button>
          </>
        )}

        {/* 2. Doubly Linked List Buttons */}
        {activeType === DSA_TYPES.DLL && (
          <>
            <button
              onClick={() => handleRun('insertHead')}
              className="px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Thêm Đầu
            </button>
            <button
              onClick={() => handleRun('insertTail')}
              className="px-3 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Thêm Cuối
            </button>
            <button
              onClick={() => handleRun('deleteHead')}
              className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa Đầu
            </button>
            <button
              onClick={() => handleRun('deleteTail')}
              className="px-3 py-1.5 bg-rose-700/80 hover:bg-rose-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa Cuối
            </button>
            <button
              onClick={() => handleRun('search')}
              className="px-3 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Search className="w-3.5 h-3.5" /> Tìm Kiếm
            </button>
          </>
        )}

        {/* 3. Circular Linked List Buttons */}
        {activeType === DSA_TYPES.CLL && (
          <>
            <button
              onClick={() => handleRun('insert')}
              className="px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Thêm (Insert)
            </button>
            <button
              onClick={() => handleRun('delete')}
              className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa (Delete)
            </button>
            <button
              onClick={() => handleRun('traverse')}
              className="px-3 py-1.5 bg-purple-600/80 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <ArrowRight className="w-3.5 h-3.5" /> Duyệt Vòng (Traverse)
            </button>
          </>
        )}

        {/* 4. Stack Buttons */}
        {activeType === DSA_TYPES.STACK && (
          <>
            <button
              onClick={() => handleRun('push')}
              className="px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" /> PUSH (Thêm Đỉnh)
            </button>
            <button
              onClick={() => handleRun('pop')}
              className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> POP (Rút Đỉnh)
            </button>
            <button
              onClick={() => handleRun('peek')}
              className="px-3 py-1.5 bg-cyan-600/80 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Eye className="w-3.5 h-3.5" /> PEEK (Xem Đỉnh)
            </button>
          </>
        )}

        {/* 5. Queue Buttons */}
        {activeType === DSA_TYPES.QUEUE && (
          <>
            <button
              onClick={() => handleRun('enqueue')}
              className="px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" /> ENQUEUE (Vào Hàng)
            </button>
            <button
              onClick={() => handleRun('dequeue')}
              className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> DEQUEUE (Ra Hàng)
            </button>
            <button
              onClick={() => handleRun('peek')}
              className="px-3 py-1.5 bg-cyan-600/80 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Eye className="w-3.5 h-3.5" /> PEEK (Xem Đầu)
            </button>
          </>
        )}

        {/* 6. BST Buttons */}
        {activeType === DSA_TYPES.BST && (
          <>
            <button
              onClick={() => handleRun('insert')}
              className="px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Thêm vào BST
            </button>
            <button
              onClick={() => handleRun('remove')}
              className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa Node
            </button>
            <button
              onClick={() => handleRun('search')}
              className="px-3 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Search className="w-3.5 h-3.5" /> Tìm Node
            </button>
            <button
              onClick={() => handleRun('traverse')}
              className="px-3 py-1.5 bg-purple-600/80 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Play className="w-3.5 h-3.5" /> Thực Hiện Duyệt Cây
            </button>
          </>
        )}

      </div>
    </div>
  );
}
