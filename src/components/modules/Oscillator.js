import React, { useContext } from 'react';
import PJ301 from '../devices/PJ301';
import { EurorackContext } from '../managers/Eurorack';

export default () => {
  const {
    jacks,
    startCable,
    endCable,
  } = useContext(EurorackContext);

  return (
    <g className="eurorack-module-panel">
      {jacks.map(({ id, x, y }) => (
        <PJ301 key={id} id={id} startCable={startCable} endCable={endCable} x={x} y={y} />
      ))}
    </g>
  );
}
