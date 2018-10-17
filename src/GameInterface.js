import React, { Component } from 'react';

import GameCanvas from './components/GameCanvas';

class GameInterface extends Component {
   render() {
      
      let canvasProps = {
         width: 800,
         height: 600,
         mode: 'pathfind'
      }

      return (
         <div style={{ width: '800px', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <GameCanvas {...canvasProps} />
         </div>
      );
   }
}

export default GameInterface;
