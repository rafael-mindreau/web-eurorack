import React from 'react';

const JACK_TYPES = {
  INPUT: 'INPUT',
  OUTPUT: 'OUTPUT'
};

const jacks = [
  {
    id: 0,
    type: JACK_TYPES.OUTPUT,
  },
  {
    id: 1,
    type: JACK_TYPES.OUTPUT,
  }
]

function App() {
  const startCable = (event) => {
    event.preventDefault();
    console.log('%cSTART FROM JACK', 'background-color: #c36230; padding: 5px; border-radius: 3px; font-weight: bold; color: white');
  };

  const dropCable = ({ target: { className } }) => {
    if (className.baseVal === 'eurorack-container') {
      console.log('%cDRAGGED CABLE TO NOWHERE', 'background-color: #1962dd; padding: 5px; border-radius: 3px; font-weight: bold; color: white');
    }
  };

  const endCable = (event) => {
    console.log('%cPLUGGED IT INTO JACK', 'background-color: #f0b430; padding: 5px; border-radius: 3px; font-weight: bold; color: black')
  };

  return (
    <div className="App">
      <svg onMouseUp={(event) => dropCable(event)} className="eurorack-container" width="500" height="500">
        <circle onMouseUp={(event) => endCable(event)} onMouseDown={(event) => startCable(event)} cx="50" cy="50" r="20" stroke="gray" strokeWidth="4" fill="black" />
        <circle onMouseUp={(event) => endCable(event)} onMouseDown={(event) => startCable(event)} cx="250" cy="50" r="20" stroke="gray" strokeWidth="4" fill="black" />
      </svg>
    </div>
  );
}

export default App;
