export default ({ game, utils }) => {
   class PathFinder {
      _findPath = () => {
         if (this.allDone) game.Scripts.Grid._resetGrid();
         console.log('starting path')

         game.findingPath = true;

         this.allDone = false;
         this._iterations = 0;
         this._nextNearest = null;

         this.openList = {};
         this.closedList = {};
         this.path = {};

         this.openList[game.heroPosition.key] = game.heroPosition;

         this._iteratePath();
      }

      _finishPath = () => {
         game.heroDestination._setNextSource();
         game.findingPath = false;

         this.allDone = true;

         console.log('completed path')
      }

      _iteratePath = async () => {
         if (this.allDone) return;

         let lowestScore = -1;
         let neighbors;

         // wait 300ms between each iteration
         await utils._prt(300)

         for (let key in this.openList) {
            if (lowestScore === -1 || this.openList[key].fScore < lowestScore) {
               lowestScore = this.openList[key].fScore;
               this._nextNearest = this.openList[key];
            }
         }

         if (game.tweenHeroWithAlgorithm) game.Scripts.Hero._tween(game.hero, this._nextNearest);

         if (this._nextNearest.isDestination) {
            this._finishPath();
            return;
         } else {
            let nextInOpened = this.openList[this._nextNearest.key] || false;
            
            if (nextInOpened) {
               let nextKey = this._nextNearest.key;
               delete this.openList[nextKey];
               this.closedList[nextKey] = nextInOpened;
            }

            neighbors = this._nextNearest._getNeighbors();
            neighbors.forEach(box => {
               if (box.type !== 'blocked' && !box.isSource && !this.closedList[box.key]) {
                  if (!this.openList[box.key]) {
                     this.openList[box.key] = box;

                     if (game.showPath) {
                        box._setNeighborState();
                        this._nextNearest._setNearestState();
                     }

                     box.parentZone = this._nextNearest;

                     box.gScore = (box.parentZone.gScore || 0) + this._calcGScore(box);
                     box.hScore = this._calcHScore(box);
                     box.fScore = this._calcFScore(box);
                  } else {
                     if (this._nextNearest.gScore + this._calcGScore(box) < box.gScore) {
                        box.parentZone = this._nextNearest;
                        box.gScore = this._nextNearest.gScore + this._calcGScore(box);
                        box.fScore = this._calcFScore(box);
                     }
                  }
               }
               game.gridHash[box.key].gScore = box.gScore;
            })
            if (!Object.keys(this.openList).length || this._iterations > 800) {
               this.allDone = true;
            }
            this._iterations++;
            if (!this.allDone) this._iteratePath();
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

         if (type === 'walkableSlow') score += 20;
         if (type === 'damage') score += 40;

         return score;
      };
   }
   return new PathFinder();
}
