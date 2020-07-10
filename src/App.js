import React from 'react';
import Eurorack from './components/managers/Eurorack';
import VCO from './components/modules/VCO-1';

export default () => {
  return (
    <div className="App">
      <Eurorack hp={84}>
        <VCO offset={2} />
        <VCO offset={15} />
      </Eurorack>
    </div>
  );
}
