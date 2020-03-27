import React, { useMemo } from 'react';
import {
  RACK_UNIT_TO_HORIWONTAL_PITCH_RATIO,
  HORIZONTAL_PITCH_TO_PIXEL_RATIO,
} from '../constants/units';

export default ({
  hp,
  rackHeightUnits = 0,
  top,
  bottom,
}) => {
  const yPosition = useMemo(() => {
    if (bottom) {
      return rackHeightUnits * (RACK_UNIT_TO_HORIWONTAL_PITCH_RATIO * HORIZONTAL_PITCH_TO_PIXEL_RATIO) - HORIZONTAL_PITCH_TO_PIXEL_RATIO;
    }

    return 0;
  }, [rackHeightUnits, top, bottom]);

  const threadedHoles = useMemo(() => {
    let holes = [];

    for (let i = 1; i <= hp; i++) {
      holes.push((
        <circle
          key={`hole-at-${i + 1}-hp`}
          cx={(i * HORIZONTAL_PITCH_TO_PIXEL_RATIO) - (HORIZONTAL_PITCH_TO_PIXEL_RATIO / 2)}
          cy={yPosition + (HORIZONTAL_PITCH_TO_PIXEL_RATIO / 2)}
          r={HORIZONTAL_PITCH_TO_PIXEL_RATIO / 4}
          fill="#3d3d3d" />
      ));
    }

    return holes;
  }, [hp, rackHeightUnits, yPosition]);

  return (
    <g className="eurorack-rail">
      <rect
        x={0}
        y={yPosition}
        width={hp * HORIZONTAL_PITCH_TO_PIXEL_RATIO}
        height={HORIZONTAL_PITCH_TO_PIXEL_RATIO}
        fill="#d5d5d5" />
      {threadedHoles}
    </g>
  );
}
