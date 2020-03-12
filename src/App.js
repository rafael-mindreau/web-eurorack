import React, { useState } from 'react';
import PatchCable from './components/devices/PatchCable';
import PJ301 from './components/devices/PJ301';

import { getJackById, JACK_TYPES } from './utils/jack';
import { patchCableColors } from './constants/colors';

const colorSet = patchCableColors['intellijel'];

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
    x: 150,
    y: 50,
  }
];

const getRandomPatchCableColor = () => {
  const index = Math.floor(Math.random() * colorSet.length);
  return colorSet[index];
};

function App() {
  const [isPatching, setIsPatching] = useState(false);
  const [ghostPatchCable, setGhostPatchCable] = useState({
    color: 'black',
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });
  const [cables, setCables] = useState([]);

  const createNewPatchCable = (cable) => {
    setCables([
      ...cables,
      cable,
    ]);
  };

  const startCable = (event, jackId) => {
    const { x: startX, y: startY } = getJackById(jackId, jacks);
    setIsPatching(true);

    setGhostPatchCable({
      ...ghostPatchCable,
      color: getRandomPatchCableColor(),
      startX,
      startY,
    });
  };

  const dropCable = () => {
    setIsPatching(false);
  };

  const endCable = (event, jackId) => {
    event.preventDefault();
    event.stopPropagation();
    const { x: endX, y: endY } = getJackById(jackId, jacks);
    setIsPatching(false);

    createNewPatchCable({
      ...ghostPatchCable,
      endX,
      endY,
    });
  };

  const moveCableAround = ({ clientX, clientY }) => {
    updateGhostPosition({ x: clientX, y: clientY });
  };

  const updateGhostPosition = ({ x, y }) => {
    setGhostPatchCable({
      ...ghostPatchCable,
      endX: x,
      endY: y,
    });
  };

  return (
    <div className="App">
      <svg onMouseMove={(event) => moveCableAround(event)} onMouseUp={(event) => dropCable(event)} className="eurorack-container" width="500" height="500">
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
      </svg>
    </div>
  );
}

export default App;
