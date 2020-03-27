import React from 'react';
import Eurorack from './components/managers/Eurorack';
import Blank from './components/modules/Blank';

export default () => {
  return (
    <div className="App">
      <Eurorack>
        <Blank offset={0} hp={32} />
        <Blank offset={32} hp={16} />
        <Blank offset={48} hp={8} />
      </Eurorack>
    </div>
  );
}
