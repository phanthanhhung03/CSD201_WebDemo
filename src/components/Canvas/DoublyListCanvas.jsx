import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SVGArrow from './SVGArrow';

export default function DoublyListCanvas({ snapshot }) {
  const { nodes = [], pointers = {}, headId, tailId } = snapshot || {};

  const nodeWidth = 100;
  const nodeGap = 60;
  const startX = 70;
  const startY = 160;

  const getNodeCoords = (index) => ({
    x: startX + index * (nodeWidth + nodeGap),
    y: startY
  });

  return (
    <div className="relative w-full h-[380px] bg-dark-bg/60 rounded-xl overflow-hidden border border-dark-border shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      {/* SVG Arrows Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {nodes.map((node, i) => {
          if (i === nodes.length - 1) return null;
          const from = getNodeCoords(i);
          const to = getNodeCoords(i + 1);

          return (
            <React.Fragment key={`dll_arrows_${node.id}`}>
              {/* Next arrow (Top) */}
              <SVGArrow
                startX={from.x + nodeWidth - 5}
                startY={from.y + 15}
                endX={to.x + 5}
                endY={to.y + 15}
                color="#06b6d4"
                label="next"
              />
              {/* Prev arrow (Bottom) */}
              <SVGArrow
                startX={to.x + 5}
                startY={to.y + 35}
                endX={from.x + nodeWidth - 5}
                endY={from.y + 35}
                color="#8b5cf6"
                label="prev"
              />
            </React.Fragment>
          );
        })}

        {/* Head NULL prev arrow */}
        {nodes.length > 0 && (
          <SVGArrow
            startX={getNodeCoords(0).x + 5}
            startY={startY + 35}
            endX={getNodeCoords(0).x - 35}
            endY={startY + 35}
            color="#64748b"
            label="prev"
          />
        )}

        {/* Tail NULL next arrow */}
        {nodes.length > 0 && (
          <SVGArrow
            startX={getNodeCoords(nodes.length - 1).x + nodeWidth - 5}
            startY={startY + 15}
            endX={getNodeCoords(nodes.length - 1).x + nodeWidth + 35}
            endY={startY + 15}
            color="#64748b"
            label="next"
          />
        )}

        {/* Pointers: head, tail, current */}
        {Object.entries(pointers).map(([ptrName, targetId]) => {
          if (!targetId) return null;
          const idx = nodes.findIndex((n) => n.id === targetId);
          if (idx === -1) return null;

          const coords = getNodeCoords(idx);
          const isTop = ptrName === 'head' || ptrName === 'current';
          const py = isTop ? coords.y - 45 : coords.y + 95;
          const ey = isTop ? coords.y - 5 : coords.y + 55;

          const colorMap = {
            head: '#10b981',
            tail: '#f59e0b',
            current: '#06b6d4',
            temp: '#f43f5e'
          };

          return (
            <SVGArrow
              key={`ptr_${ptrName}_${targetId}`}
              startX={coords.x + nodeWidth / 2}
              startY={py}
              endX={coords.x + nodeWidth / 2}
              endY={ey}
              color={colorMap[ptrName] || '#06b6d4'}
              label={ptrName.toUpperCase()}
            />
          );
        })}
      </svg>

      {/* Nodes Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {nodes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-slate-500 text-sm font-mono"
            >
              [ Doubly Linked List Rỗng: head = tail = NULL ]
            </motion.div>
          ) : (
            nodes.map((node, index) => {
              const coords = getNodeCoords(index);
              const isHead = node.id === headId;
              const isTail = node.id === tailId;

              const statusStyles = {
                default: 'border-cyan-500/50 bg-dark-card text-cyan-200',
                new: 'border-purple-400 bg-purple-950 text-purple-200 glow-purple',
                active: 'border-amber-400 bg-amber-950 text-amber-200 glow-amber scale-105',
                found: 'border-emerald-400 bg-emerald-950 text-emerald-200 glow-emerald scale-105',
                deleting: 'border-rose-500 bg-rose-950 text-rose-200 glow-rose opacity-60 scale-90'
              };

              return (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  style={{
                    position: 'absolute',
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                    width: `${nodeWidth}px`,
                    height: '52px'
                  }}
                  className={`pointer-events-auto flex items-center justify-between border-2 rounded-xl px-3 shadow-xl transition-colors ${
                    statusStyles[node.status] || statusStyles.default
                  }`}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1">
                    {isHead && (
                      <span className="px-1.5 py-0.2 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded shadow">
                        HEAD
                      </span>
                    )}
                    {isTail && (
                      <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 text-[10px] font-bold rounded shadow">
                        TAIL
                      </span>
                    )}
                  </div>

                  <div className="w-full flex items-center justify-between text-xs font-mono">
                    <span className="text-[10px] text-purple-400">&lt;prev</span>
                    <span className="text-base font-bold text-slate-100">{node.value}</span>
                    <span className="text-[10px] text-cyan-400">next&gt;</span>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
