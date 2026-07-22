import React from 'react';
import { Code2 } from 'lucide-react';

export default function CodePanel({ pseudocode = [], activeLine = 0, title = 'Pseudocode' }) {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-4 shadow-lg flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-dark-border pb-2 mb-3">
        <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
          <Code2 className="w-4 h-4" />
          <span>{title}</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">STEP HIGHLIGHTER</span>
      </div>

      <div className="flex-1 font-mono text-xs overflow-y-auto space-y-1 pr-1">
        {pseudocode.length === 0 ? (
          <div className="text-slate-500 italic py-6 text-center">
            Chọn một thao tác để xem mã giả pseudocode tương ứng...
          </div>
        ) : (
          pseudocode.map((line, idx) => {
            const isActive = idx === activeLine;
            return (
              <div
                key={`line_${idx}`}
                className={`px-3 py-1.5 rounded transition-all duration-200 flex items-center space-x-3 ${
                  isActive
                    ? 'bg-cyan-950/80 border-l-4 border-cyan-400 text-cyan-200 font-bold glow-cyan'
                    : 'text-slate-400 hover:bg-dark-panel'
                }`}
              >
                <span className={`text-[10px] select-none ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
                  {idx + 1}
                </span>
                <span className="flex-1">{line}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
