import React, { useState } from 'react';
import Panel from '../Panel';
import { HORIZONTAL_PITCH_TO_PIXEL_RATIO } from '../../constants/units';

export default ({
  hp,
  u,
  offset,
  fill = '#d5d5d5',
}) => {
  const [offsetInPixels] = useState(offset * HORIZONTAL_PITCH_TO_PIXEL_RATIO);

  return (
    <g transform={`translate(${offsetInPixels} 0)`} className="eurorack-module-panel">
      <Panel fill={fill} hp={hp} moduleHeight={u} />
    </g>
  );
}
