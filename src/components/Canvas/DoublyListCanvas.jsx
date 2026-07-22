import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SVGArrow from './SVGArrow';
import { Info } from 'lucide-react';

export default function DoublyListCanvas({ snapshot }) {
  const { nodes = [], pointers = {}, headId, tailId } = snapshot || {};
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const nodeWidth = 125;
  const nodeGap = 90;
  const startX = 60;
  const startY = 160;

  const getNodeCoords = (index) => ({
    x: startX + index * (nodeWidth + nodeGap),
    y: startY
  });

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="relative w-full h-[380px] bg-dark-bg/60 rounded-xl overflow-hidden border border-dark-border shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      {/* Interactive Selection Info Box (Hiển thị Prev / Current / Next khi click chọn 1 Node) */}
      {selectedNode && (
        <div className="absolute top-3 left-4 z-30 flex items-center space-x-3 bg-dark-panel/90 border border-cyan-500/60 px-3.5 py-1.5 rounded-lg shadow-xl backdrop-blur text-xs font-mono">
          <Info className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400">Node Đang Chọn:</span>
          <span className="text-purple-400 font-bold">PREV = {selectedNode.prevVal ?? 'NULL'}</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-300 font-bold">CURRENT = {selectedNode.value}</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-400 font-bold">NEXT = {selectedNode.nextVal ?? 'NULL'}</span>
          <button
            onClick={() => setSelectedNodeId(null)}
            className="text-slate-500 hover:text-slate-300 ml-2 text-[10px] uppercase font-bold"
          >
            [X]
          </button>
        </div>
      )}

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
                startY={from.y + 18}
                endX={to.x + 5}
                endY={to.y + 18}
                color="#06b6d4"
                label="next"
              />
              {/* Prev arrow (Bottom) */}
              <SVGArrow
                startX={to.x + 5}
                startY={to.y + 42}
                endX={from.x + nodeWidth - 5}
                endY={from.y + 42}
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
            startY={startY + 42}
            endX={getNodeCoords(0).x - 40}
            endY={startY + 42}
            color="#64748b"
            label="prev"
          />
        )}

        {/* Tail NULL next arrow */}
        {nodes.length > 0 && (
          <SVGArrow
            startX={getNodeCoords(nodes.length - 1).x + nodeWidth - 5}
            startY={startY + 18}
            endX={getNodeCoords(nodes.length - 1).x + nodeWidth + 40}
            endY={startY + 18}
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
          const py = isTop ? coords.y - 45 : coords.y + 105;
          const ey = isTop ? coords.y - 5 : coords.y + 65;

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
              const isSelected = node.id === selectedNodeId;

              const statusStyles = {
                default: 'border-cyan-500/60 bg-dark-card text-cyan-200',
                new: 'border-purple-400 bg-purple-950 text-purple-200 glow-purple',
                active: 'border-amber-400 bg-amber-950 text-amber-200 glow-amber scale-105',
                found: 'border-emerald-400 bg-emerald-950 text-emerald-200 glow-emerald scale-105',
                deleting: 'border-rose-500 bg-rose-950 text-rose-200 glow-rose opacity-60 scale-90'
              };

              return (
                <motion.div
                  key={node.id}
                  layout
                  onClick={() => setSelectedNodeId(node.id)}
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  style={{
                    position: 'absolute',
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                    width: `${nodeWidth}px`,
                    height: '60px'
                  }}
                  className={`pointer-events-auto cursor-pointer flex items-center justify-between border-2 rounded-xl px-3 shadow-2xl transition-all hover:scale-105 ${
                    isSelected
                      ? 'border-yellow-400 bg-yellow-950/80 text-yellow-200 glow-amber ring-2 ring-yellow-400'
                      : statusStyles[node.status] || statusStyles.default
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
                    <span className="text-[11px] font-semibold text-purple-400 border border-purple-800/60 bg-purple-950/60 px-1 py-0.5 rounded">&lt;prev</span>
                    <span className="text-lg font-bold text-slate-100 px-1">{node.value}</span>
                    <span className="text-[11px] font-semibold text-cyan-400 border border-cyan-800/60 bg-cyan-950/60 px-1 py-0.5 rounded">next&gt;</span>
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
