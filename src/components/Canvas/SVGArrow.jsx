import React from 'react';

/**
 * Component vẽ mũi tên SVG nối giữa 2 điểm hoặc uốn cong
 */
export default function SVGArrow({
  startX,
  startY,
  endX,
  endY,
  color = '#06b6d4',
  label = '',
  isCurved = false,
  isDouble = false,
  dashed = false,
  curveDirection = 'down'
}) {
  const markerId = `arrowhead_${color.replace('#', '')}_${dashed ? 'd' : 's'}`;

  // Tọa độ trung điểm cho nhãn
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  let pathD = `M ${startX} ${startY} L ${endX} ${endY}`;

  if (isCurved) {
    const curveOffset = curveDirection === 'down' ? 70 : -70;
    const controlY = midY + curveOffset;
    pathD = `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`;
  }

  return (
    <g className="transition-all duration-300">
      <defs>
        <marker
          id={markerId}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M 0 0 L 8 4 L 0 8 z" fill={color} />
        </marker>
      </defs>

      <path
        d={pathD}
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray={dashed ? '5,5' : 'none'}
        fill="none"
        markerEnd={`url(#${markerId})`}
      />

      {label && (
        <g transform={`translate(${midX}, ${isCurved ? midY + (curveDirection === 'down' ? 40 : -40) : midY - 12})`}>
          <rect
            x="-25"
            y="-10"
            width="50"
            height="18"
            rx="4"
            fill="#0b0f19"
            stroke={color}
            strokeWidth="1"
          />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fill={color}
            fontSize="10"
            fontWeight="bold"
            className="font-mono select-none"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
}
