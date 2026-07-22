import React from 'react';

export default function SVGArrow({
  startX,
  startY,
  endX,
  endY,
  color = '#06b6d4',
  label = '',
  isCurved = false,
  curveDirection = 'down'
}) {
  const markerId = `arrowhead_${color.replace('#', '')}`;

  let pathD = '';
  let midX = (startX + endX) / 2;
  let midY = (startY + endY) / 2;

  if (isCurved) {
    const offset = curveDirection === 'down' ? 70 : -70;
    const controlY = startY + offset;
    pathD = `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`;
    midY = startY + offset / 2;
  } else {
    pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
  }

  // Calculate box width dynamically to prevent text clipping
  const labelWidth = Math.max(36, label ? label.length * 7.5 + 12 : 36);

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
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray={isCurved ? '6,4' : 'none'}
        markerEnd={`url(#${markerId})`}
        className="transition-all duration-300"
      />

      {label && (
        <g transform={`translate(${midX}, ${midY + (isCurved ? (curveDirection === 'down' ? 25 : -25) : -8)})`}>
          <rect
            x={-labelWidth / 2}
            y="-9"
            width={labelWidth}
            height="18"
            rx="4"
            fill="#0f172a"
            stroke={color}
            strokeWidth="1.2"
            opacity="0.95"
          />
          <text
            x="0"
            y="3"
            fill={color}
            fontSize="10"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
}
