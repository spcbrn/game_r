class Utils {
   _prt = async to => await ((ms => new Promise(r => setTimeout(r, ms)))(to));
   _randInt = (a, b) => Math.floor(Math.random() * (b - a) + a);
   _getRandomGridBox = grid => {
      let destBox = null;

      for (let key in grid) {
         if (this._randInt(0, 100) > 95) destBox = grid[key];
      }

      if (!destBox) return this._getRandomGridBox();
      
      return destBox
   }
   nDirections = { 0: 'NORTH_WEST', 1: 'WEST', 2: 'SOUTH_WEST', 3: 'NORTH', 5: 'SOUTH', 6: 'NORTH_EAST', 7: 'EAST', 8: 'SOUTH_EAST' };
   config = {
      grid: {
         _getRandomTypeConstant: () => ([0, 0, 2, 0, 2, 2, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 2, 0, 0][(Math.floor(Math.random() * (20 - 1)) + 1)]),
         gridTypes: {
            0: {
               type: 'walkable',
               const: 0,
               passable: true,
               friction: 0,
               damage: 0,
               color: '#d2d2d2',
               sprite: { x: 0, y: 0, width: 50, height: 50, type: 0 }
            },
            1: {
               type: 'walkableSlow',
               const: 1,
               passable: true,
               friction: Number((Math.random() * (.8 - .3) + .3).toFixed(2)),
               damage: 0,
               color: '#80cccc',
               sprite: [
                  { x: 100, y: 0, width: 50, height: 50, type: 1 },
                  { x: 100, y: 50, width: 50, height: 50, type: 1 },
                  { x: 100, y: 100, width: 50, height: 50, type: 1 }
               ][this._randInt(1, 3) - 1]
            },
            2: {
               type: 'blocked',
               const: 2,
               passable: false,
               friction: 0,
               damage: 0,
               color: '#7a7a7a',
               sprite: [
                  { x: 50, y: 0, width: 50, height: 50, type: 2 },
                  { x: 50, y: 50, width: 50, height: 50, type: 2 },
                  { x: 50, y: 100, width: 50, height: 50, type: 2 }
               ][this._randInt(1, 3) - 1]
            },
            3: {
               type: 'damage',
               passable: true,
               const: 3,
               friction: Number((Math.random() * (.8 - .3) + .3).toFixed(2)),
               damage: Number((Math.random() * (.75 - .25) + .25).toFixed(2)),
               color: '#c4341b',
               sprite: [
                  { x: 150, y: 0, width: 50, height: 50, type: 3 },
                  { x: 150, y: 50, width: 50, height: 50, type: 3 },
                  { x: 150, y: 100, width: 50, height: 50, type: 3 }
               ][this._randInt(1, 3) - 1]
            }
         }
      },
      char: {
         charTypes: {
            0: {
               type: 'ninja',
               const: 0,
               width: 50,
               height: 50,
               spriteSet: {
                  down: { x: 0, y: 0, width: 56, height: 72 },
                  up: { x: 0, y: 74, width: 53, height: 72 },
                  left: { x: 0, y: 146, width: 53, height: 72 },
                  right: { x: 0, y: 219, width: 53, height: 72 }
               }
            }
         }
      }
   }
}

export default new Utils