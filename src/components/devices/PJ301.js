import React from 'react';

export default ({
  id,
  jack,
  x,
  y,
  endCable,
  startCable,
}) => {
  return (
    <g
      className="PJ301-jack"
      id={`jack-${id}`}
      onMouseUp={(event) => endCable(event, jack)}
      onMouseDown={(event) => startCable(event, jack)}>
      <circle
        cx={x}
        cy={y}
        r="18"
        stroke="darkgray"
        strokeWidth="1"
        fill="white" />
      <circle
        cx={x}
        cy={y}
        r="12"
        stroke="gray"
        strokeWidth="4"
        fill="black" />
    </g>
  );
}
