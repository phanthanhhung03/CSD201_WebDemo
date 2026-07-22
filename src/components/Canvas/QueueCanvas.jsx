import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SVGArrow from './SVGArrow';

export default function QueueCanvas({ snapshot }) {
  const { nodes = [], frontId, rearId } = snapshot || {};

  const nodeWidth = 115;
  const nodeGap = 70;
  const startX = 80;
  const startY = 160;

  const getNodeCoords = (index) => ({
    x: startX + index * (nodeWidth + nodeGap),
    y: startY
  });

  return (
    <div className="relative w-full h-[380px] bg-dark-bg/60 rounded-xl overflow-hidden border border-dark-border shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      {/* Queue Lane Markers */}
      <div className="absolute left-4 top-10 flex items-center gap-2 text-rose-400 font-bold text-xs bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800/60 z-20">
        &larr; DEQUEUE (FRONT)
      </div>

      <div className="absolute right-4 top-10 flex items-center gap-2 text-emerald-400 font-bold text-xs bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800/60 z-20">
        ENQUEUE (REAR) &rarr;
      </div>

      {/* SVG Layer for Pointers */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {/* Next arrows */}
        {nodes.map((node, i) => {
          if (i === nodes.length - 1) return null;
          const from = getNodeCoords(i);
          const to = getNodeCoords(i + 1);
          return (
            <SVGArrow
              key={`queue_next_${node.id}`}
              startX={from.x + nodeWidth - 5}
              startY={from.y + 28}
              endX={to.x + 5}
              endY={to.y + 28}
              color="#06b6d4"
              label="next"
            />
          );
        })}

        {/* FRONT Pointer */}
        {frontId && nodes.length > 0 && (
          <SVGArrow
            startX={getNodeCoords(0).x + nodeWidth / 2}
            startY={startY - 45}
            endX={getNodeCoords(0).x + nodeWidth / 2}
            endY={startY - 5}
            color="#f43f5e"
            label="FRONT"
          />
        )}

        {/* REAR Pointer */}
        {rearId && nodes.length > 0 && (
          <SVGArrow
            startX={getNodeCoords(nodes.length - 1).x + nodeWidth / 2}
            startY={startY + 105}
            endX={getNodeCoords(nodes.length - 1).x + nodeWidth / 2}
            endY={startY + 61}
            color="#10b981"
            label="REAR"
          />
        )}
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
              [ Queue Rỗng: front = rear = NULL ]
            </motion.div>
          ) : (
            nodes.map((node, index) => {
              const coords = getNodeCoords(index);
              const isFront = node.id === frontId;
              const isRear = node.id === rearId;

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
                  initial={{ opacity: 0, x: 40, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -60, scale: 0.5 }}
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
                  <span className="text-lg font-bold font-mono text-slate-100">{node.value}</span>
                  <div className="flex flex-col gap-0.5 text-[10px] font-bold">
                    {isFront && <span className="text-rose-400">FRONT</span>}
                    {isRear && <span className="text-emerald-400">REAR</span>}
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
