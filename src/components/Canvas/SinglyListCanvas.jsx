import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SVGArrow from './SVGArrow';

export default function SinglyListCanvas({ snapshot }) {
  const { nodes = [], pointers = {}, headId, tailId } = snapshot || {};

  const nodeWidth = 115;
  const nodeGap = 80;
  const startX = 70;
  const startY = 160;

  const getNodeCoords = (index) => ({
    x: startX + index * (nodeWidth + nodeGap),
    y: startY
  });

  return (
    <div className="relative w-full h-[380px] bg-dark-bg/60 rounded-xl overflow-hidden border border-dark-border shadow-inner">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      {/* SVG Layer for Pointer Arrows & Auxiliary Pointer Variables */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {/* Next pointers between nodes (Handles both forward -> and reversed <- arrows in real time) */}
        {nodes.map((node) => {
          if (!node.nextId) return null;
          const fromIdx = nodes.findIndex((n) => n.id === node.id);
          const toIdx = nodes.findIndex((n) => n.id === node.nextId);
          if (fromIdx === -1 || toIdx === -1) return null;

          const from = getNodeCoords(fromIdx);
          const to = getNodeCoords(toIdx);
          const isReversed = toIdx < fromIdx; // Mũi tên đang trỏ quay ngược (quay trái <-)

          return (
            <SVGArrow
              key={`next_${node.id}_${node.nextId}`}
              startX={isReversed ? from.x + 5 : from.x + nodeWidth - 5}
              startY={from.y + 28}
              endX={isReversed ? to.x + nodeWidth - 5 : to.x + 5}
              endY={to.y + 28}
              color={isReversed ? '#f43f5e' : '#06b6d4'}
              label={isReversed ? 'next (reversed)' : 'next'}
            />
          );
        })}

        {/* Arrow to NULL for node with nextId == null */}
        {nodes.map((node) => {
          if (node.nextId !== null) return null;
          const idx = nodes.findIndex((n) => n.id === node.id);
          if (idx === -1) return null;
          const coords = getNodeCoords(idx);

          return (
            <SVGArrow
              key={`null_next_${node.id}`}
              startX={coords.x + nodeWidth - 5}
              startY={startY + 28}
              endX={coords.x + nodeWidth + 40}
              endY={startY + 28}
              color="#64748b"
              label="next"
            />
          );
        })}

        {/* Pointers: head, tail, current, next, prev, temp, newNode */}
        {Object.entries(pointers).map(([ptrName, targetId]) => {
          if (!targetId) return null;
          const idx = nodes.findIndex((n) => n.id === targetId);
          if (idx === -1) return null;

          const coords = getNodeCoords(idx);
          const isTop = ptrName === 'head' || ptrName === 'current' || ptrName === 'next' || ptrName === 'newNode';
          
          const topOffsets = {
            head: -42,
            current: -65,
            next: -88,
            newNode: -42
          };
          const bottomOffsets = {
            tail: 102,
            prev: 125,
            temp: 148
          };

          const py = isTop ? coords.y + (topOffsets[ptrName] || -42) : coords.y + (bottomOffsets[ptrName] || 102);
          const ey = isTop ? coords.y - 5 : coords.y + 61;

          const colorMap = {
            head: '#10b981',
            tail: '#f59e0b',
            current: '#06b6d4',
            next: '#8b5cf6',
            prev: '#e11d48',
            temp: '#f43f5e',
            newNode: '#8b5cf6'
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
              [ Singly Linked List Rỗng: head = tail = NULL ]
            </motion.div>
          ) : (
            nodes.map((node, index) => {
              const coords = getNodeCoords(index);
              const isHead = node.id === headId;
              const isTail = node.id === tailId;

              const statusStyles = {
                default: 'border-cyan-500/60 bg-dark-card text-cyan-200',
                new: 'border-purple-400 bg-purple-950 text-purple-200 glow-purple ring-2 ring-purple-400',
                active: 'border-amber-400 bg-amber-950 text-amber-200 glow-amber scale-105 ring-2 ring-amber-400',
                found: 'border-emerald-400 bg-emerald-950 text-emerald-200 glow-emerald scale-105 ring-2 ring-emerald-400',
                deleting: 'border-rose-500 bg-rose-950 text-rose-200 glow-rose opacity-60 scale-90',
                visited: 'border-rose-400 bg-rose-950/80 text-rose-200 ring-2 ring-rose-400'
              };

              return (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
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
                  {/* Head/Tail Badges */}
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

                  {/* Value & pointer icon */}
                  <span className="text-lg font-bold font-mono text-slate-100">{node.value}</span>
                  <div className="w-6 h-6 rounded-full bg-dark-bg border border-cyan-500/60 flex items-center justify-center text-xs text-cyan-400 font-bold">
                    &rarr;
                  </div>
                </motion.div>
              );
            })
          )}

          {/* NULL Box for end of list */}
          {nodes.length > 0 && (
            <motion.div
              style={{
                position: 'absolute',
                left: `${getNodeCoords(nodes.length - 1).x + nodeWidth + 45}px`,
                top: `${startY + 12}px`
              }}
              className="px-3.5 py-1.5 bg-slate-900 border border-slate-700 text-slate-400 font-mono text-sm rounded-lg shadow-lg font-bold"
            >
              NULL
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
