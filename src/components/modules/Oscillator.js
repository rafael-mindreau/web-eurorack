import React, { useContext } from 'react';
import PatchCable from '../devices/PatchCable';
import PJ301 from '../devices/PJ301';
import { EurorackContext } from '../managers/Eurorack';

export default () => {
  const context = useContext(EurorackContext);

  const {
    isPatching,
    cables,
    jacks,
    ghostPatchCable,
    startCable,
    endCable,
  } = context;

  return (
    <g className="eurorack-module-panel">
      {jacks.map(({ id, x, y }) => (
        <PJ301 key={id} id={id} startCable={startCable} endCable={endCable} x={x} y={y} />
      ))}
      {cables.map((cable, index) => (
        <PatchCable key={index} parameters={cable} isConnected />
      ))}
      {isPatching ? (
        <PatchCable parameters={ghostPatchCable} />
      ) : (
        <></>
      )}
    </g>
  );
}
