import React, { useState, useEffect } from 'react';
import PatchCable from '../devices/PatchCable';
import { getJackById, JACK_TYPES } from '../../utils/jack';
import { patchCableColors } from '../../constants/colors';

export const EurorackContext = React.createContext();

const colorSet = patchCableColors['intellijel'];

const getRandomPatchCableColor = () => {
  const index = Math.floor(Math.random() * colorSet.length);
  return colorSet[index];
};

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

export default ({ children }) => {
  const [isPatching, setIsPatching] = useState(false);
  const [ghostPatchCable, setGhostPatchCable] = useState({
    color: 'black',
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });
  const [cables, setCables] = useState([]);
  const [modifier, setModfier] = useState(null);

  // Hotkey modifier listener
  useEffect(() => {
    window.addEventListener('keydown', ({ keyCode }) => {
      switch (keyCode) {
        case 18:
          setModfier('move');
          break;
        default:
          setModfier(null);
      }
    });

    window.addEventListener('keyup', () => {
      setModfier(null);
    });
  }, []);

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
      startJackId: jackId,
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
      endJackId: jackId,
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
    <EurorackContext.Provider value={{
      ghostPatchCable,
      cables,
      jacks,
      startCable,
      dropCable,
      endCable,
      moveCableAround,
      isPatching,
      modifier,
    }}>
      <svg
        onMouseMove={(event) => moveCableAround(event)}
        onMouseUp={(event) => dropCable(event)}
        className="eurorack-case"
        width="500"
        height="500">
        {children}
        {cables.map((cable, index) => (
          <PatchCable key={index} parameters={cable} startCable={startCable} endCable={endCable} isConnected />
        ))}
        {isPatching ? (
          <PatchCable parameters={ghostPatchCable} />
        ) : (
          <></>
        )}
      </svg>
    </EurorackContext.Provider>
  );
}
