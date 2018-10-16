export default ({ game, utils }) => {
   class PathFinder {
      _findPath = () => {
         if (game.allDone) game._resetGrid();
         console.log('starting path')
         game.findingPath = true;
   
         game.allDone = false;
         game._iterations = 0;
         game._nextNearest = null;
   
         game.opened = [];
         game.closed = [];
         game.path = {};
   
         game.opened.push(game.heroPosition);
   
         this._iteratePath();
      }

      _finishPath = () => {
         console.log('completed path')
         // this._tweenHero(null, Object.keys(this.path));
         game.heroPosition = game.gridHash[game.heroDestination.key];
         delete game.heroDestination;
         game.findingPath = false;
         game.allDone = true;
      }

      _iteratePath = async () => {
         let lowestScore = -99;
         let neighbors;
         if (game.allDone) return;
   
         // wait 300ms between each iteratino
         await utils._prt(300)
   
         game.opened.forEach(box => {
            if (lowestScore === -99 || box.fScore < lowestScore) {
               lowestScore = box.fScore;
               game._nextNearest = box;
            }
         })
   
         if (game.heroTweenA) game._tweenHero(game._nextNearest);
         if (game._nextNearest.isDestination) {
            this._finishPath();
            return;
         } else {
            let inOpened = game.opened.find(box => box.key === game._nextNearest.key)
            if (inOpened) {
               game.opened = game.opened.filter(box => box.key !== game._nextNearest.key);
               game.closed.push(inOpened);
               game.path[inOpened.key] = inOpened;
            }
            
            neighbors = game._nextNearest._getNeighbors();
            neighbors.forEach(box => {
               if (box.type !== 'blocked'  && box.type !== 'ff' && !box.isSource && !game.closed.find(c => c.key === box.key)) {
                  if (!game.opened.find(c => c.key === box.key)) {
                     game.opened.push(box);
   
                     if (game.showPath) {
                           box._setNeighborState();
                           game._nextNearest._setNearestState();
                     }
                     
                     box.parentZone = game._nextNearest;
                     
                     box.gScore = (box.parentZone.gScore || 0) + this._calcGScore(box);
                     box.hScore = this._calcHScore(box);
                     box.fScore = this._calcFScore(box);
                  } else {
                     if (game._nextNearest.gScore + this._calcGScore(box) < box.gScore) {
                        box.parentZone = game._nextNearest;
                        box.gScore = game._nextNearest.gScore + this._calcGScore(box);
                        box.fScore = this._calcFScore(box);
                     }
                  }
               }
               game.gridHash[box.key].gScore = box.gScore;
            })
            if (!game.opened.length || game._iterations > 800) {
               game.allDone = true;
            }
            game._iterations++;
            if (!game.allDone) this._iteratePath();
         }
      }

      _calcFScore = box => box.gScore + box.hScore;
      _calcHScore = box => ((Math.abs(box.x - game.heroDestination.x) + Math.abs(box.y - game.heroDestination.y)) * 10)
      _calcGScore = box => {
         let { direction, type } = box;
         let score = 0;
         
         switch (direction) {
            case 'NORTH':
            case 'SOUTH':
            case 'WEST':
            case 'EAST':
               score += 10;
               break;
            case 'NORTH_EAST':
            case 'NORTH_WEST':
            case 'SOUTH_EAST':
            case 'SOUTH_WEST':
               score += 20;
               break;
            default:
               break;
         }

         if (type === 'walkableSlow') score += 15;
         if (type === 'damage') score += 25;
         // console.log(box.key, box.direction, type, score)
         return score;
      };
   }
   return new PathFinder;
}
