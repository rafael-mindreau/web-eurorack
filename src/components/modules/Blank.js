import React from 'react';
import {
  RACK_UNIT_TO_HORIWONTAL_PITCH_RATIO,
  HORIZONTAL_PITCH_TO_PIXEL_RATIO,
} from '../../constants/units';
import {
  isDarkColor as isDarkPanel,
} from '../../utils/color';

const moduleHeight = 3;

export default ({
  hp,
  offset,
  fill = '#d5d5d5',
}) => {
  return (
    <g className="eurorack-module-panel">
      <rect
        x={offset * HORIZONTAL_PITCH_TO_PIXEL_RATIO}
        y={0}
        width={hp * HORIZONTAL_PITCH_TO_PIXEL_RATIO}
        height={moduleHeight * RACK_UNIT_TO_HORIWONTAL_PITCH_RATIO * HORIZONTAL_PITCH_TO_PIXEL_RATIO}
        stroke={isDarkPanel(fill) ? 'white': 'black'}
        strokeOpacity={0.2}
        fill={fill} />
    </g>
  );
}
