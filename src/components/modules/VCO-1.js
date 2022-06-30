import React, { useContext, useState } from 'react';
import PJ301 from '../devices/PJ301';
import { EurorackContext } from '../managers/Eurorack';
import { JACK_TYPES } from '../../utils/jack';
import { HORIZONTAL_PITCH_TO_PIXEL_RATIO } from '../../constants/units';

import Panel from '../Panel';
import DaviesKnob from '../devices/DaviesKnob';

import './generic.scss';

const PANEL_COLOR = '#dbdbdb';
const HP = 10;
const U = 3;

const jacks = [
  {
    id: 0,
    type: JACK_TYPES.INPUT,
    x: 50,
    y: 430,
  },
  {
    id: 1,
    type: JACK_TYPES.INPUT,
    x: 100,
    y: 430,
  },
  {
    id: 2,
    type: JACK_TYPES.INPUT,
    x: 150,
    y: 430,
  },
  {
    id: 3,
    type: JACK_TYPES.INPUT,
    x: 50,
    y: 480,
  },
  {
    id: 4,
    type: JACK_TYPES.OUTPUT,
    x: 100,
    y: 480,
  },
  {
    id: 5,
    type: JACK_TYPES.OUTPUT,
    x: 150,
    y: 480,
  },
];

export default ({
  offset,
}) => {
  const {
    startCable,
    endCable,
  } = useContext(EurorackContext);
  const offsetInPixels = offset * HORIZONTAL_PITCH_TO_PIXEL_RATIO;
  const [context, setContext] = useState(null);
  const [toneNode, setToneNode] = useState(null);

  const changeFrequency = (value) => {
    toneNode.parameters.get('frequency').value = value;
  };

  const play = async () => {
    if (!context && !toneNode) {
      console.log('%cPLAY', 'background-color: #4eb8d6; padding: 5px; border-radius: 3px; font-weight: bold; color: white');
      const ctx = new AudioContext();
      await ctx.audioWorklet.addModule('worklet/processor.js');
      setContext(ctx);

      const toneNode = new AudioWorkletNode(ctx, 'tone-processor');
      console.log('%cDEBUG', 'background-color: #1962dd; padding: 5px; border-radius: 3px; font-weight: bold; color: white', toneNode.parameters.get('sampleRate'));
      toneNode.parameters.get('sampleRate').value = ctx.sampleRate;
      setToneNode(toneNode);

      toneNode.connect(ctx.destination);
    }
  }

  return (
    <g onClick={play} transform={`translate(${offsetInPixels} 0)`} className="eurorack-module-panel VCO-1">
      <Panel fill={PANEL_COLOR} hp={HP} moduleHeight={U} />
      <DaviesKnob
        scale={0.7}
        x={40}
        y={40}
        onClick={play}
        onChange={changeFrequency}
        offset={offsetInPixels}
        minValue={0}
        maxValue={100}
        initValue={50}
        minDegrees={0}
        maxDegrees={359}
      />
      <text textAnchor="middle" className="panel-header-text" x="100" y="30">VCO-1</text>
      {jacks.map((jack) => {
        const { id, x, y } = jack;
        return (
          <PJ301 key={id} jack={jack} startCable={startCable} endCable={endCable} x={x} y={y} offset={offset} />
        );
      })}
    </g>
  );
}
