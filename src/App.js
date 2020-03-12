import React from 'react';
import Eurorack from './components/managers/Eurorack';
import Oscillator from './components/modules/Oscillator';

export default () => {
  return (
    <div className="App">
      <Eurorack>
        <Oscillator />
      </Eurorack>
    </div>
  );
}
