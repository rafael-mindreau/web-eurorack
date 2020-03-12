import React, { useState, useMemo } from 'react';
import PatchCable from './components/devices/PatchCable';
import PJ301 from './components/devices/PJ301';

const JACK_TYPES = {
  INPUT: 'INPUT',
  OUTPUT: 'OUTPUT'
};

const polarToCartesian = (direction, distance) => {
  const offsetX = Math.cos(direction) * distance;
  const offsetY = Math.sin(direction) * distance;

  return { offsetX, offsetY };
};

const getRandomOffset = (originX, originY) => {
  const direction = Math.random() * (Math.PI * 2);
  const { offsetX, offsetY } = polarToCartesian(direction, 50);

  return { x: offsetX + originX, y: offsetY + originY };
};

const colors = [
  '#34D4DD',
  '#ec557d',
  '#3b3140',
  '#f1e176',
  '#0666CC',
  '#f4f4f4',
  '#dd3545',
];

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
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

const getJackById = (jackIdToLookFor) => {
  let foundJack = null;
  jacks.some((jack) => {
    const { id: currentJackId } = jack;
    if (currentJackId === jackIdToLookFor) {
      foundJack = jack;
      return true;
    }

    return false;
  });

  return foundJack;
};

function App() {
  const [isPatching, setIsPatching] = useState(false);
  const [ghostPatchCable, setGhostPatchCable] = useState({
    color: 'black',
    startX: 0,
    startBezierX: 0,
    startY: 0,
    startBezierY: 0,
    endX: 0,
    endBezierX: 0,
    endY: 0,
    endBezierY: 0,
  });
  const [cables, setCables] = useState([]);

  const createNewPatchCable = (cable) => {
    console.log('%cDEBUG', 'background-color: #1962dd; padding: 5px; border-radius: 3px; font-weight: bold; color: white', cable, cables);
    setCables([
      ...cables,
      cable,
    ]);
  };

  const startCable = (event, jackId) => {
    event.preventDefault();
    event.stopPropagation();
    const { x: startX, y: startY } = getJackById(jackId);
    const { x: startRandomOffsetX, y: startRandomOffsetY } = getRandomOffset(startX, startY);
    setIsPatching(true);

    setGhostPatchCable({
      ...ghostPatchCable,
      color: getRandomPatchCableColor(),
      startX,
      startY,
      startBezierX: startRandomOffsetX,
      startBezierY: startRandomOffsetY,
    });
    console.log('%cSTART FROM JACK', 'background-color: #c36230; padding: 5px; border-radius: 3px; font-weight: bold; color: white', getJackById(jackId));
  };

  const dropCable = ({ target: { className } }) => {
    setIsPatching(false);
    if (className.baseVal === 'eurorack-container') {
      console.log('%cDRAGGED CABLE TO NOWHERE', 'background-color: #1962dd; padding: 5px; border-radius: 3px; font-weight: bold; color: white');
    }
  };

  const endCable = (event, jackId) => {
    event.preventDefault();
    event.stopPropagation();
    const { x: endX, y: endY } = getJackById(jackId);
    const { x: endRandomOffsetX, y: endRandomOffsetY } = getRandomOffset(endX, endY);
    setIsPatching(false);

    createNewPatchCable({
      ...ghostPatchCable,
      endX,
      endY,
      endBezierX: endRandomOffsetX,
      endBezierY: endRandomOffsetY,
    });
    console.log('%cPLUGGED IT INTO PORT', 'background-color: #f0b430; padding: 5px; border-radius: 3px; font-weight: bold; color: black', ghostPatchCable);
  };

  const moveCableAround = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { target, clientX, clientY } = event;


    if (!target.classList.contains('PJ301-jack')) {
      setGhostPatchCable({
        ...ghostPatchCable,
        endX: clientX,
        endY: clientY,
      });
    }
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
