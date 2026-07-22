import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SVGArrow from './SVGArrow';

export default function BSTCanvas({ snapshot }) {
  const { nodes = [], rootId } = snapshot || {};

  // Build a node map for quick lookup
  const nodeMap = new Map();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  const nodeRadius = 28;

  return (
    <div className="relative w-full h-[420px] bg-dark-bg/60 rounded-xl overflow-hidden border border-dark-border shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      {/* SVG Layer for Tree Branches (Edges) & Root Badge */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {nodes.map((node) => {
          const lines = [];
          if (node.leftId && nodeMap.has(node.leftId)) {
            const leftNode = nodeMap.get(node.leftId);
            lines.push(
              <line
                key={`line_left_${node.id}_${leftNode.id}`}
                x1={node.x}
                y1={node.y}
                x2={leftNode.x}
                y2={leftNode.y}
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
            );
          }
          if (node.rightId && nodeMap.has(node.rightId)) {
            const rightNode = nodeMap.get(node.rightId);
            lines.push(
              <line
                key={`line_right_${node.id}_${rightNode.id}`}
                x1={node.x}
                y1={node.y}
                x2={rightNode.x}
                y2={rightNode.y}
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
            );
          }
          return lines;
        })}

        {/* ROOT Pointer Badge */}
        {rootId && nodeMap.has(rootId) && (
          <SVGArrow
            startX={nodeMap.get(rootId).x}
            startY={nodeMap.get(rootId).y - 50}
            endX={nodeMap.get(rootId).x}
            endY={nodeMap.get(rootId).y - 30}
            color="#8b5cf6"
            label="ROOT"
          />
        )}
      </svg>

      {/* BST Nodes Render */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {nodes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-slate-500 text-sm font-mono"
            >
              [ BST Rỗng: root = NULL ]
            </motion.div>
          ) : (
            nodes.map((node) => {
              const statusStyles = {
                default: 'border-cyan-500 bg-dark-card text-cyan-200',
                new: 'border-purple-400 bg-purple-950 text-purple-200 glow-purple',
                active: 'border-amber-400 bg-amber-950 text-amber-200 glow-amber scale-115',
                found: 'border-emerald-400 bg-emerald-950 text-emerald-200 glow-emerald scale-115',
                deleting: 'border-rose-500 bg-rose-950 text-rose-200 glow-rose opacity-60 scale-90',
                visited: 'border-blue-400 bg-blue-950 text-blue-200 scale-105'
              };

              return (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  style={{
                    position: 'absolute',
                    left: `${node.x - nodeRadius}px`,
                    top: `${node.y - nodeRadius}px`,
                    width: `${nodeRadius * 2}px`,
                    height: `${nodeRadius * 2}px`
                  }}
                  className={`pointer-events-auto flex items-center justify-center rounded-full border-2 shadow-2xl font-bold font-mono text-base transition-all ${
                    statusStyles[node.status] || statusStyles.default
                  }`}
                >
                  {node.value}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
