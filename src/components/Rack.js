import React from 'react';
import Rail from './Rail';
import {
  RACK_UNIT_TO_HORIWONTAL_PITCH_RATIO,
  HORIZONTAL_PITCH_TO_PIXEL_RATIO,
} from '../constants/units';

export default ({ children, hp, rackHeightUnits }) => {
  return (
    <g>
      <rect
        width={hp * HORIZONTAL_PITCH_TO_PIXEL_RATIO}
        height={rackHeightUnits * (RACK_UNIT_TO_HORIWONTAL_PITCH_RATIO * HORIZONTAL_PITCH_TO_PIXEL_RATIO)}
        fill="#7d7d7d" />
      <Rail hp={hp} top rackHeightUnits={rackHeightUnits} />
      <Rail hp={hp} bottom rackHeightUnits={rackHeightUnits} />
      {children}
    </g>
  );
}
