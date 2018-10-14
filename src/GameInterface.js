import React, { Component } from 'react';

import GameCanvas from './components/GameCanvas';

class GameInterface extends Component {
   render() {
      return (
         <div style={{ width: '1280px', height: '1024px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <GameCanvas />
         </div>
      );
   }
}

export default GameInterface;
