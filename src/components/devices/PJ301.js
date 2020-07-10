import React from 'react';
import { translateCoordinatesForJack } from '../../utils/conversions';

export default ({
  id,
  jack,
  x,
  y,
  offset,
  endCable,
  startCable,
}) => {
  return (
    <g
      className="PJ301-jack"
      id={`jack-${id}`}
      onMouseUp={(event) => endCable(event, translateCoordinatesForJack(jack, offset))}
      onMouseDown={(event) => startCable(event, translateCoordinatesForJack(jack, offset))}>
      <circle
        cx={x}
        cy={y}
        r="24"
        fill="transparent" />
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
