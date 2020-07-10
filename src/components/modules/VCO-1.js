import React, { useContext } from 'react';
import PJ301 from '../devices/PJ301';
import { EurorackContext } from '../managers/Eurorack';
import { JACK_TYPES } from '../../utils/jack';
import Panel from '../Panel';
import {
  HORIZONTAL_PITCH_TO_PIXEL_RATIO,
} from '../../constants/units';

const PANEL_COLOR = '#dbdbdb';
const HP = 12;
const U = 3;

const jacks = [
  {
    id: 0,
    type: JACK_TYPES.OUTPUT,
    x: 50,
    y: 50,
  },
  {
    id: 1,
    type: JACK_TYPES.INPUT,
    x: 100,
    y: 50,
  },
  {
    id: 2,
    type: JACK_TYPES.INPUT,
    x: 150,
    y: 50,
  },
  {
    id: 3,
    type: JACK_TYPES.INPUT,
    x: 50,
    y: 100,
  },
  {
    id: 4,
    type: JACK_TYPES.OUTPUT,
    x: 100,
    y: 100,
  },
  {
    id: 5,
    type: JACK_TYPES.OUTPUT,
    x: 150,
    y: 100,
  },
];

export default ({
  offset,
}) => {
  const {
    startCable,
    endCable,
  } = useContext(EurorackContext);

  return (
    <g transform={`translate(${offset * HORIZONTAL_PITCH_TO_PIXEL_RATIO} 0)`} className="eurorack-module-panel">
      <Panel fill={PANEL_COLOR} hp={HP} moduleHeight={U} />
      {jacks.map((jack) => {
        const { id, x, y } = jack;
        return (
          <PJ301 key={id} jack={jack} startCable={startCable} endCable={endCable} x={x} y={y} offset={offset} />
        );
      })}
    </g>
  );
}
