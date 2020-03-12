import React from 'react';

export default ({
  parameters,
  isConnected,
}) => {
  const opacity = isConnected ? 1 : 0.6
  return (
    <path
      opacity={opacity}
      strokeWidth="10"
      stroke={parameters.color}
      fill="transparent"
      d={`
        M ${parameters.startX} ${parameters.startY}
        C ${parameters.startBezierX} ${parameters.startBezierY}
        ${parameters.endBezierX} ${parameters.endBezierY}
        ${parameters.endX} ${parameters.endY}
      `}
      strokeLinecap="round" />
  );
}
