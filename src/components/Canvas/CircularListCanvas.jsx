import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SVGArrow from './SVGArrow';
import { Repeat } from 'lucide-react';

export default function CircularListCanvas({ snapshot }) {
  const { nodes = [], pointers = {}, headId, tailId } = snapshot || {};

  const nodeWidth = 115;
  const nodeGap = 80;
  const startX = 70;
  const startY = 140;

  const getNodeCoords = (index) => ({
    x: startX + index * (nodeWidth + nodeGap),
    y: startY
  });

  return (
    <div className="relative w-full h-[380px] bg-dark-bg/60 rounded-xl overflow-hidden border border-dark-border shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      {/* SVG Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {/* Next arrows */}
        {nodes.map((node, i) => {
          if (i === nodes.length - 1) return null;
          const from = getNodeCoords(i);
          const to = getNodeCoords(i + 1);
          return (
            <SVGArrow
              key={`cll_next_${node.id}`}
              startX={from.x + nodeWidth - 5}
              startY={from.y + 28}
              endX={to.x + 5}
              endY={to.y + 28}
              color="#06b6d4"
              label="next"
            />
          );
        })}

        {/* Circular Arrow: From tail back to head */}
        {nodes.length > 0 && (
          <SVGArrow
            startX={getNodeCoords(nodes.length - 1).x + nodeWidth / 2}
            startY={startY + 60}
            endX={getNodeCoords(0).x + nodeWidth / 2}
            endY={startY + 60}
            color="#f59e0b"
            label="tail.next -> head (CIRCULAR)"
            isCurved={true}
            curveDirection="down"
          />
        )}

        {/* Pointer Badges */}
        {Object.entries(pointers).map(([ptrName, targetId]) => {
          if (!targetId) return null;
          const idx = nodes.findIndex((n) => n.id === targetId);
          if (idx === -1) return null;

          const coords = getNodeCoords(idx);
          const isTop = ptrName === 'head' || ptrName === 'current';
          const py = isTop ? coords.y - 45 : coords.y + 105;
          const ey = isTop ? coords.y - 5 : coords.y + 61;

          const colorMap = {
            head: '#10b981',
            tail: '#f59e0b',
            current: '#06b6d4'
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
              [ Circular Linked List Rỗng ]
            </motion.div>
          ) : (
            nodes.map((node, index) => {
              const coords = getNodeCoords(index);
              const isHead = node.id === headId;
              const isTail = node.id === tailId;

              const statusStyles = {
                default: 'border-cyan-500/60 bg-dark-card text-cyan-200',
                new: 'border-purple-400 bg-purple-950 text-purple-200 glow-purple',
                active: 'border-amber-400 bg-amber-950 text-amber-200 glow-amber scale-105',
                found: 'border-emerald-400 bg-emerald-950 text-emerald-200 glow-emerald scale-105',
                deleting: 'border-rose-500 bg-rose-950 text-rose-200 glow-rose opacity-60 scale-90',
                visited: 'border-purple-400 bg-purple-950 text-purple-200 scale-105'
              };

              return (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  style={{
                    position: 'absolute',
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                    width: `${nodeWidth}px`,
                    height: '56px'
                  }}
                  className={`pointer-events-auto flex items-center justify-between border-2 rounded-xl px-4 shadow-2xl transition-colors ${
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

                  <span className="text-lg font-bold font-mono text-slate-100">{node.value}</span>
                  <Repeat className="w-4 h-4 text-amber-400 animate-spin-slow" />
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
