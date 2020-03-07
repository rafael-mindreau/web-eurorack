import React, { useState } from 'react';

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
    setCables([
      ...cables,
      cable,
    ]);
  };

  const startCable = (event, jackId) => {
    const { x: startX, y: startY } = getJackById(jackId);
    const { x: startRandomOffsetX, y: startRandomOffsetY } = getRandomOffset(startX, startY);
    event.preventDefault();
    setIsPatching(true);

    setGhostPatchCable({
      ...ghostPatchCable,
      startX,
      startY,
      startBezierX: startRandomOffsetX,
      startBezierY: startRandomOffsetY,
    });
    console.log('%cSTART FROM JACK', 'background-color: #c36230; padding: 5px; border-radius: 3px; font-weight: bold; color: white');
  };

  const dropCable = ({ target: { className } }) => {
    setIsPatching(false);
    if (className.baseVal === 'eurorack-container') {
      console.log('%cDRAGGED CABLE TO NOWHERE', 'background-color: #1962dd; padding: 5px; border-radius: 3px; font-weight: bold; color: white');
    }
  };

  const endCable = (event, jackId) => {
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
    console.log('%cPLUGGED IT INTO PORT', 'background-color: #f0b430; padding: 5px; border-radius: 3px; font-weight: bold; color: black', cables);
  };

  const moveCableAround = ({ clientX, clientY }) => {
    if (isPatching) {
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
          <circle key={id} onMouseUp={(event) => endCable(event, id)} onMouseDown={(event) => startCable(event, id)} cx={x} cy={y} r="20" stroke="gray" strokeWidth="4" fill="black" />
        ))}
        {cables.map((cable, index) => (
          <path
            key={index}
            strokeWidth="10"
            stroke="#fac12d"
            fill="transparent"
            d={`
              M ${cable.startX} ${cable.startY}
              C ${cable.startBezierX} ${cable.startBezierY}
              ${cable.endBezierX} ${cable.endBezierY}
              ${cable.endX} ${cable.endY}
            `}
            strokeLinecap="round" />
        ))}
        {isPatching ? (
          <path
            opacity="0.6"
            strokeWidth="10"
            stroke="#fac12d"
            fill="transparent"
            d={`
              M ${ghostPatchCable.startX} ${ghostPatchCable.startY}
              C ${ghostPatchCable.startBezierX} ${ghostPatchCable.startBezierY}
              ${ghostPatchCable.endX} ${ghostPatchCable.endY}
              ${ghostPatchCable.endX} ${ghostPatchCable.endY}
            `}
            strokeLinecap="round" />
        ) : (
          <></>
        )}
      </svg>
    </div>
  );
}

export default App;
