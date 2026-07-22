import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SVGArrow from './SVGArrow';
import { AlertTriangle } from 'lucide-react';

export default function StackCanvas({ snapshot }) {
  const { nodes = [], topId, size = 0, capacity = 6, alertMessage } = snapshot || {};

  const itemHeight = 50;
  const itemWidth = 170;
  const startX = 250;
  const startY = 60;

  return (
    <div className="relative w-full h-[380px] bg-dark-bg/60 rounded-xl overflow-hidden border border-dark-border shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      {/* Overflow / Underflow Banner */}
      {alertMessage && (
        <div className="absolute top-3 left-4 z-30 flex items-center space-x-2 bg-rose-950/90 border border-rose-500/80 px-3.5 py-1.5 rounded-lg shadow-xl text-xs font-mono text-rose-200 glow-rose animate-bounce">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span className="font-bold">{alertMessage}</span>
        </div>
      )}

      {/* Stack Capacity Indicator */}
      <div className="absolute top-3 right-4 z-30 bg-dark-panel border border-cyan-500/40 px-3 py-1 rounded-lg text-xs font-mono text-cyan-300 shadow">
        Capacity: <span className="font-bold">{size} / {capacity}</span>
      </div>

      {/* Stack Container Frame */}
      <div
        className="absolute border-b-4 border-l-4 border-r-4 border-cyan-500/50 rounded-b-xl bg-dark-card/30 pointer-events-none z-10"
        style={{
          left: `${startX - 15}px`,
          top: `${startY - 10}px`,
          width: `${itemWidth + 30}px`,
          height: '295px'
        }}
      >
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-cyan-400 tracking-widest uppercase bg-dark-bg px-2 py-0.5 rounded border border-dark-border">
          STACK CONTAINER (LIFO)
        </span>
      </div>

      {/* SVG Layer for TOP Pointer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-15">
        {topId && nodes.length > 0 && (
          <SVGArrow
            startX={startX - 80}
            startY={startY + 25}
            endX={startX - 10}
            endY={startY + 25}
            color="#10b981"
            label="TOP"
          />
        )}
      </svg>

      {/* Stack Nodes */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {nodes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-slate-500 text-sm font-mono"
            >
              [ Stack Rỗng: top = NULL ]
            </motion.div>
          ) : (
            nodes.map((node, index) => {
              const y = startY + index * (itemHeight + 8);
              const isTop = node.id === topId;

              const statusStyles = {
                default: 'border-cyan-500/60 bg-dark-card text-cyan-200',
                new: 'border-purple-400 bg-purple-950 text-purple-200 glow-purple',
                found: 'border-emerald-400 bg-emerald-950 text-emerald-200 glow-emerald scale-105',
                deleting: 'border-rose-500 bg-rose-950 text-rose-200 glow-rose opacity-60 scale-90'
              };

              return (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, y: -40, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  style={{
                    position: 'absolute',
                    left: `${startX}px`,
                    top: `${y}px`,
                    width: `${itemWidth}px`,
                    height: `${itemHeight}px`
                  }}
                  className={`pointer-events-auto flex items-center justify-between border-2 rounded-xl px-4 shadow-2xl transition-colors ${
                    statusStyles[node.status] || statusStyles.default
                  }`}
                >
                  <span className="text-xs text-slate-400 font-mono">[{nodes.length - 1 - index}]</span>
                  <span className="text-lg font-bold font-mono text-slate-100">{node.value}</span>
                  {isTop && (
                    <span className="px-1.5 py-0.5 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded">
                      TOP
                    </span>
                  )}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
