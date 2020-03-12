import React, { useState } from 'react';
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
    x: 150,
    y: 50,
  }
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
    <EurorackContext.Provider value={{
      ghostPatchCable,
      cables,
      jacks,
      startCable,
      dropCable,
      endCable,
      moveCableAround,
      isPatching
    }}>
      <svg onMouseMove={(event) => moveCableAround(event)} onMouseUp={(event) => dropCable(event)} className="eurorack-case" width="500" height="500">
        {children}
      </svg>
    </EurorackContext.Provider>
  );
}
