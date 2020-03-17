import React from 'react';

const CABLE_SLACK_AMOUNT = 50;

export default ({
  id: cableId,
  parameters: {
    color,
    jackA,
    jackB,
    dragPosX,
    dragPosY,
  },
  startCable,
  endCable,
  modifyCable,
  isConnected,
}) => {
  const opacity = isConnected ? 1 : 0.9

  const getPositionFromJackOrMouse = (jack) => {
    // Try to get the position from the jack first
    if (jack && jack.x && jack.y) {
      const { x, y } = jack;
      return { x, y };
    }

    // Otherwise the jack isn't connected, and we refer back to the mouse position
    return { x: dragPosX, y: dragPosY };
  };

  const positionA = getPositionFromJackOrMouse(jackA);
  const positionB = getPositionFromJackOrMouse(jackB);

  return (
    <g className="patch-cable">
      <path
        opacity={opacity}
        strokeWidth="14"
        stroke={color}
        fill="transparent"
        d={`
          M ${positionA.x} ${positionA.y}
          C ${positionA.x} ${positionA.y + CABLE_SLACK_AMOUNT}
          ${positionB.x} ${positionB.y + CABLE_SLACK_AMOUNT}
          ${positionB.x} ${positionB.y}
        `}
        strokeLinecap="round" />

      {isConnected ? (
        <>
          // These nodes are purely clickable regions that allow stacking/modifying cables
          <circle
            onMouseUp={(event) => endCable(event, jackA)}
            onMouseDown={(event) => startCable(event, jackA, cableId)}
            cx={positionA.x}
            cy={positionA.y}
            fill="transparent"
            r="15" />
          <circle
            onMouseUp={(event) => endCable(event, jackB)}
            onMouseDown={(event) => startCable(event, jackB, cableId)}
            cx={positionB.x}
            cy={positionB.y}
            fill="transparent"
            r="15" />
        </>
      ) : <></> }

    </g>
  );
}
