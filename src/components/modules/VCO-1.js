import React, { useContext } from 'react';
import PJ301 from '../devices/PJ301';
import { EurorackContext } from '../managers/Eurorack';
import { JACK_TYPES } from '../../utils/jack';
import Panel from '../Panel';
import {
  HORIZONTAL_PITCH_TO_PIXEL_RATIO,
} from '../../constants/units';

import './VCO-1.scss';

const PANEL_COLOR = '#dbdbdb';
const HP = 10;
const U = 3;

const jacks = [
  {
    id: 0,
    type: JACK_TYPES.OUTPUT,
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

  return (
    <g transform={`translate(${offset * HORIZONTAL_PITCH_TO_PIXEL_RATIO} 0)`} className="eurorack-module-panel VCO-1">
      <Panel fill={PANEL_COLOR} hp={HP} moduleHeight={U} />
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
