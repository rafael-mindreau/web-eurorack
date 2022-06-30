import React, { useState, useEffect, useContext } from 'react';
import Panel from '../Panel';
import PJ301 from '../devices/PJ301';
import { EurorackContext } from '../managers/Eurorack';
import { JACK_TYPES } from '../../utils/jack';
import { HORIZONTAL_PITCH_TO_PIXEL_RATIO } from '../../constants/units';
import './generic.scss';

const PANEL_COLOR = '#dbdbdb';
const HP = 8;
const U = 3;

export default ({
  offset,
}) => {
  const {
    audioContext,
    startCable,
    endCable,
  } = useContext(EurorackContext);
  const [jacks, updateJacks] = useState([
    {
      id: 0,
      type: JACK_TYPES.INPUT,
      x: 30,
      y: 430,
    },
    {
      id: 1,
      type: JACK_TYPES.INPUT,
      x: 30,
      y: 480,
    }
  ]);
  const [offsetInPixels] = useState(offset * HORIZONTAL_PITCH_TO_PIXEL_RATIO);

  useEffect(() => {
    // Register this device's worklet to the context from the main manager
    if (audioContext) {
      const createAudioNode = async () => {
        const updatedJacks = [...jacks];
        updatedJacks[0] = { ...updatedJacks[0], node: audioContext.destination };
        updateJacks(updatedJacks);
        console.log('%cDEBUG', 'background-color: #1962dd; padding: 5px; border-radius: 3px; font-weight: bold; color: white', updatedJacks);
      }
      createAudioNode();
    }
  }, [audioContext]);

  return (
    <g transform={`translate(${offsetInPixels} 0)`} className="eurorack-module-panel output">
      <Panel fill={PANEL_COLOR} hp={HP} moduleHeight={U} />
      <text textAnchor="middle" className="panel-header-text" x="78" y="30">OUTPUT</text>
      {jacks.map((jack) => {
        const { id, x, y } = jack;
        return (
          <PJ301 key={id} jack={jack} startCable={startCable} endCable={endCable} x={x} y={y} offset={offset} />
        );
      })}
    </g>
  );
}
