import React from 'react';
import Panel from '../Panel';

export default ({
  hp,
  u,
  offset,
  fill = '#d5d5d5',
}) => {
  return (
    <g className="eurorack-module-panel">
      <Panel fill={fill} offset={offset} hp={hp} moduleHeight={u} />
    </g>
  );
}
