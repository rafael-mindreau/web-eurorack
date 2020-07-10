import React from 'react';
import Eurorack from './components/managers/Eurorack';
import VCO from './components/modules/VCO-1';

export default () => {
  return (
    <div className="App">
      <Eurorack hp={84}>
        <VCO offset={20} />
      </Eurorack>
    </div>
  );
}
