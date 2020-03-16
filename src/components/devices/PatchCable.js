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

  const startPosition = getPositionFromJackOrMouse(jackA);
  const endPosition = getPositionFromJackOrMouse(jackB);

  return (
    <g className="patch-cable">
      <path
        opacity={opacity}
        strokeWidth="14"
        stroke={color}
        fill="transparent"
        d={`
          M ${startPosition.x} ${startPosition.y}
          C ${startPosition.x} ${startPosition.y + CABLE_SLACK_AMOUNT}
          ${endPosition.x} ${endPosition.y + CABLE_SLACK_AMOUNT}
          ${endPosition.x} ${endPosition.y}
        `}
        strokeLinecap="round" />

      {isConnected ? (
        <>
          // These nodes are purely meant for stacking cables
          // Or for allowing user to get hard to reach spots
          <circle
            onMouseUp={(event) => endCable(event, jackA)}
            onMouseDown={(event) => startCable(event, jackA, cableId)}
            cx={startPosition.x}
            cy={startPosition.y}
            fill="transparent"
            r="15" />
          <circle
            onMouseUp={(event) => endCable(event, jackB)}
            onMouseDown={(event) => startCable(event, jackB, cableId)}
            cx={endPosition.x}
            cy={endPosition.y}
            fill="transparent"
            r="15" />
        </>
      ) : <></> }

    </g>
  );
}
