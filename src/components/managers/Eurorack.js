import React, { useState, useEffect } from 'react';
import PatchCable from '../devices/PatchCable';
import { JACK_TYPES } from '../../utils/jack';
import { patchCableColors } from '../../constants/colors';
import { v4 as uuid } from 'uuid';

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
    jackA: null,
    jackB: null,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });
  const [cables, setCables] = useState({});
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
    const id = uuid();

    // Get the old ones first
    const updatedCables = { ...cables };

    // Set the new cable on the set
    updatedCables[id] = cable;

    setCables({
      ...updatedCables
    });
  };

  const startCable = (event, jack) => {
    setIsPatching(true);

    setGhostPatchCable({
      ...ghostPatchCable,
      color: getRandomPatchCableColor(),
      jackA: jack,
    });
  };

  const dropCable = () => {
    setIsPatching(false);
  };

  const endCable = (event, jack) => {
    event.preventDefault();
    event.stopPropagation();
    setIsPatching(false);

    createNewPatchCable({
      ...ghostPatchCable,
      jackB: jack,
    });
  };

  const modifyCable = (event, jack, cableId) => {
    const { jackA, jackB } = cables[cableId];

    if (jackA.id === jack.idea) {
      const updatedCables = cables[cableId] = {
        ...cables[cableId],
        jackA: null,
      };

      setCables({
        ...updatedCables,
      });
    }
  }

  const moveCableAround = ({ clientX, clientY }) => {
    updateGhostPosition({ x: clientX, y: clientY });
  };

  const updateGhostPosition = ({ x, y }) => {
    setGhostPatchCable({
      ...ghostPatchCable,
      dragPosX: x,
      dragPosY: y,
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
        {Object.keys(cables).map((cableId) => (
          <PatchCable
            key={cableId}
            id={cableId}
            parameters={cables[cableId]}
            startCable={startCable}
            endCable={endCable}
            modifyCable={modifyCable}
            isConnected />
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
