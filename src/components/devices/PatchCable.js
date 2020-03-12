import React from 'react';

const CABLE_SLACK_AMOUNT = 50;

export default ({
  parameters: {
    color,
    startX,
    startY,
    endX,
    endY,
    startJackId,
    endJackId,
  },
  startCable,
  endCable,
  isConnected,
}) => {
  const opacity = isConnected ? 1 : 0.9
  return (
    <g className="patch-cable">
      <path
        opacity={opacity}
        strokeWidth="14"
        stroke={color}
        fill="transparent"
        d={`
          M ${startX} ${startY}
          C ${startX} ${startY + CABLE_SLACK_AMOUNT}
          ${endX} ${endY + CABLE_SLACK_AMOUNT}
          ${endX} ${endY}
        `}
        strokeLinecap="round" />

      {isConnected ? (
        <>
          // These nodes are purely meant for stacking cables
          // Or for allowing user to get hard to reach spots
          <circle
            onMouseUp={(event) => endCable(event, startJackId)}
            onMouseDown={(event) => startCable(event, startJackId)}
            cx={startX}
            cy={startY}
            fill="transparent"
            r="12" />
          <circle
            onMouseUp={(event) => endCable(event, endJackId)}
            onMouseDown={(event) => startCable(event, endJackId)}
            cx={endX}
            cy={endY}
            fill="transparent"
            r="12" />
        </>
      ) : <></> }

    </g>
  );
}
