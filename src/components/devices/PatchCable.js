import React from 'react';

const CABLE_SLACK_AMOUNT = 50;

export default ({
  parameters,
  isConnected,
}) => {
  const opacity = isConnected ? 1 : 0.9
  return (
    <path
      opacity={opacity}
      strokeWidth="10"
      stroke={parameters.color}
      fill="transparent"
      d={`
        M ${parameters.startX} ${parameters.startY}
        C ${parameters.startX} ${parameters.startY + CABLE_SLACK_AMOUNT}
        ${parameters.endX} ${parameters.endY + CABLE_SLACK_AMOUNT}
        ${parameters.endX} ${parameters.endY}
      `}
      strokeLinecap="round" />
  );
}
