import React from 'react';

export default ({
  id,
  x,
  y,
  endCable,
  startCable,
}) => {
  return (
    <circle className="PJ301-jack" onMouseUp={(event) => endCable(event, id)} onMouseDown={(event) => startCable(event, id)} cx={x} cy={y} r="22" stroke="gray" strokeWidth="4" fill="black" />
  );
}
