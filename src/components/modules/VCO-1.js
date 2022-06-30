import React, { useContext, useEffect, useState } from 'react';
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

export default ({
  offset,
}) => {
  const {
    audioContext,
    startCable,
    endCable,
  } = useContext(EurorackContext);
  const offsetInPixels = offset * HORIZONTAL_PITCH_TO_PIXEL_RATIO;
  const [toneNode, setToneNode] = useState(null);
  const [jacks, updateJacks] = useState([
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
      type: JACK_TYPES.INPUT,
      x: 100,
      y: 480,
    },
    {
      id: 5,
      type: JACK_TYPES.OUTPUT,
      x: 150,
      y: 480,
    },
  ]);

  const changeFrequency = (value) => {
    if (toneNode) {
      toneNode.parameters.get('frequency').value = value;
    }
  };

  useEffect(() => {
    // Register this device's worklet to the context from the main manager
    if (audioContext && !toneNode) {
      const createAudioNode = async () => {
        await audioContext.audioWorklet.addModule('worklet/VCO-1.js');
        const toneNode = new AudioWorkletNode(audioContext, 'VCO-1');
        toneNode.parameters.get('sampleRate').value = audioContext.sampleRate;
        setToneNode(toneNode);

        const updatedJacks = [...jacks];
        updatedJacks[5] = { ...updatedJacks[5], node: toneNode };
        updateJacks(updatedJacks);
      }
      createAudioNode();
    }
  }, [audioContext]);

  return (
    <g transform={`translate(${offsetInPixels} 0)`} className="eurorack-module-panel VCO-1">
      <Panel fill={PANEL_COLOR} hp={HP} moduleHeight={U} />
      <DaviesKnob
        scale={0.7}
        x={40}
        y={40}
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
