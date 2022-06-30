import React, { useState, useEffect } from 'react';
import PatchCable from '../devices/PatchCable';
import Rack from '../Rack.js';
import { alreadyExists, isSelfPatched } from '../../utils/cable';
import { patchCableColors } from '../../constants/colors';
import { v4 as uuid } from 'uuid';

export const EurorackContext = React.createContext();

const colorSet = patchCableColors['intellijel'];

const getRandomPatchCableColor = () => {
  const index = Math.floor(Math.random() * colorSet.length);
  return colorSet[index];
};

export default ({ hp, children }) => {
  const [isPatching, setIsPatching] = useState(false);
  const [ghostPatchCable, setGhostPatchCable] = useState({
    color: 'black',
    jackA: null,
    jackB: null,
  });
  const [cables, setCables] = useState({});
  const [modifier, setModfier] = useState(null);
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    // Hotkey modifier listener
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

    console.log('%cCABLE', 'background-color: #7044b5; padding: 5px; border-radius: 3px; font-weight: bold; color: white', cable);
    // So this part is what the entire app is about, connecting audio nodes together
    // You were probably looking for this magical part, which actually does it very
    // predictably and boringly elegant:
    if (cable.jackA.node && cable.jackB.node) {
      // A cable just simply connects two audio nodes :)
      cable.jackA.node.connect(cable.jackB.node);
    }
  };

  const startCable = (event, jack) => {
    // Set up Audio Context
    // We do this in a user-interaction because Chrome otherwise prevents it
    // This is described here: https://goo.gl/7K7WLu
    // Don't allow patching until we have the context set up
    if (!audioContext) {
      const context = new AudioContext();
      setAudioContext(context);
    } else {
      setIsPatching(true);

      setGhostPatchCable({
        ...ghostPatchCable,
        color: getRandomPatchCableColor(),
        jackA: jack,
      });
    }
  };

  const dropCable = () => {
    setIsPatching(false);
  };

  const endCable = (event, jack) => {
    event.preventDefault();
    event.stopPropagation();
    setIsPatching(false);

    const newCable = {
      ...ghostPatchCable,
      jackA: ghostPatchCable.jackA ? ghostPatchCable.jackA : jack,
      jackB: ghostPatchCable.jackB ? ghostPatchCable.jackB : jack,
    };

    // Check if the new destination is the same as the other jack (disables self-patching)
    if (!isSelfPatched(newCable) && !alreadyExists(newCable, cables)) {
      createNewPatchCable(newCable);
    }
  };

  const modifyCable = (event, jack, cableId) => {
    const { jackA, jackB } = cables[cableId];
    setIsPatching(true);

    const updatedCables = { ...cables };
    delete updatedCables[cableId];

    setCables({
      ...updatedCables
    });

    if (jackA.id === jack.id) {
      setGhostPatchCable({
        ...ghostPatchCable,
        jackA: null,
        jackB,
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
      audioContext,
      ghostPatchCable,
      cables,
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
        width="100%"
        height="600">
        <Rack hp={hp} rackHeightUnits={3}>
          {children}
        </Rack>
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
