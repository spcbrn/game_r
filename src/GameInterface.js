import React, { Component } from 'react';

import GameCanvas from './components/GameCanvas';

class GameInterface extends Component {
   render() {
      return (
         <div style={{ width: '800px', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <GameCanvas />
         </div>
      );
   }
}

export default GameInterface;
