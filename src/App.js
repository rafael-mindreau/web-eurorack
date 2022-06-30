import React from 'react';
import Eurorack from './components/managers/Eurorack';
import VCO from './components/modules/VCO-1';
import Output from './components/modules/Output';
import Blank from './components/modules/Blank';

export default () => {
  return (
    <div className="App">
      <Eurorack hp={84}>
        <VCO offset={0} />
        <Output offset={10} />
        <Blank hp={4} u={3} offset={40} />
      </Eurorack>
    </div>
  );
}
