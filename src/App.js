import React from 'react';
import Eurorack from './components/managers/Eurorack';
import VCO from './components/modules/VCO-1';

export default () => {
  return (
    <div className="App">
      <Eurorack>
        <VCO />
      </Eurorack>
    </div>
  );
}
