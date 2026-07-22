import React, { useEffect, useRef } from 'react';
import { Terminal, Info } from 'lucide-react';

export default function LogPanel({ logs = [], currentStep = 0 }) {
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, currentStep]);

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-4 shadow-lg flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-dark-border pb-2 mb-3">
        <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
          <Terminal className="w-4 h-4" />
          <span>Nhật Ký Giải Thích Logic (Pointer Log)</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">VIETNAMESE LOGS</span>
      </div>

      <div className="flex-1 font-mono text-xs overflow-y-auto space-y-2 pr-1 max-h-[180px]">
        {logs.length === 0 ? (
          <div className="text-slate-500 italic py-6 text-center">
            Sẵn sàng thực thi các thuật toán con trỏ...
          </div>
        ) : (
          logs.slice(0, currentStep + 1).map((logText, idx) => {
            const isCurrent = idx === currentStep;
            return (
              <div
                key={`log_${idx}`}
                className={`p-2.5 rounded-lg border text-xs transition-all duration-200 ${
                  isCurrent
                    ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200 font-medium glow-emerald'
                    : 'bg-dark-bg/60 border-dark-border text-slate-400 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <Info className="w-3 h-3 text-emerald-400" />
                    Bước #{idx + 1}
                  </span>
                  {isCurrent && (
                    <span className="px-1.5 py-0.2 bg-emerald-500 text-slate-950 text-[9px] font-bold rounded animate-pulse">
                      ĐANG CHẠY
                    </span>
                  )}
                </div>
                <p className="leading-relaxed">{logText}</p>
              </div>
            );
          })
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
}
