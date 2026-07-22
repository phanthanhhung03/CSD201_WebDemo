import React from 'react';
import { DSA_TYPES, DSA_LABELS } from '../types/dsaTypes';
import { Network, Layers, Repeat, Server, ArrowRightLeft, GitFork, RefreshCw, Trash2, Sparkles } from 'lucide-react';

const iconsMap = {
  [DSA_TYPES.SLL]: Network,
  [DSA_TYPES.DLL]: ArrowRightLeft,
  [DSA_TYPES.CLL]: Repeat,
  [DSA_TYPES.STACK]: Layers,
  [DSA_TYPES.QUEUE]: Server,
  [DSA_TYPES.BST]: GitFork,
};

export default function Header({ activeType, onSelectType, onPreset, onRandom, onClear }) {
  return (
    <header className="bg-dark-card border-b border-dark-border px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg glow-cyan">
            <Network className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
              PointerVision DSA
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Mô Phỏng Trực Quan Con Trỏ & Cấu Trúc Dữ Liệu
            </p>
          </div>
        </div>

        {/* DSA Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 bg-dark-bg/80 p-1.5 rounded-xl border border-dark-border">
          {Object.values(DSA_TYPES).map((type) => {
            const Icon = iconsMap[type];
            const isActive = activeType === type;
            return (
              <button
                key={type}
                onClick={() => onSelectType(type)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md scale-105'
                    : 'text-slate-300 hover:bg-dark-panel hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{type}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Action Presets */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onPreset}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-cyan-950/60 border border-cyan-800/60 hover:bg-cyan-900/80 text-cyan-300 rounded-lg text-xs font-medium transition-all"
            title="Nạp dữ liệu mẫu"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mẫu</span>
          </button>

          <button
            onClick={onRandom}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-all"
            title="Tạo giá trị ngẫu nhiên"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ngẫu nhiên</span>
          </button>

          <button
            onClick={onClear}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-950/60 border border-rose-800/60 hover:bg-rose-900/80 text-rose-300 rounded-lg text-xs font-medium transition-all"
            title="Xóa toàn bộ Node"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Xóa hết</span>
          </button>
        </div>

      </div>
    </header>
  );
}
