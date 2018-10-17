export default ({ game, utils }) => ({
   GridBox: function GridBox({ key, gX, gY, x, y, width, height, type, passable, friction, damage, color, sprite }) {
      this.key = key;
      this.gX = gX;
      this.gY = gY;
      this.x = x || 0;
      this.y = y || 0;
      this.width = width || 0;
      this.height = height || 0;

      this.type = type;
      this.passable = passable;
      this.friction = friction;
      this.damage = damage;
      this.color = color;
      this.sprite = sprite;
      this.origSprite = Object.assign({}, sprite);
      this._resetSprite = () => this.sprite = this.origSprite;

      this.gScore = 0;
      this.hScore = 0;
      this.fScore = 0;

      this.parentZone = {};
      this._setParent = box => this.parentZone = box;
      this._clearParent = () => this.parentZone = null;

      this.isSelected = false;
      this._select = () => this.isSelected = true;
      this._deselect = () => this.isSelected = false;

      this.isSource = false;
      this.isNextSource = false;
      this._setNextSource = () => this.isNextSource = true;
      this._setSource = () => {
         this.isSource = true;
         this.sprite = { x: 0, y: 50, width: 50, height: 50, type: 0 };
         game.heroPosition = this;
         if (this.isNextSource) this.isNextSource = false;
      }
      this._clearSource = () => {
         this.isSource = false;
         this.sprite = this.origSprite;
         delete game.heroPosition;
      }

      this.isRaySource = false;
      this._setRaySource = () => this.isRaySource = true;

      this.isDestination = false;
      this.isNextDestination = false;
      this._setNextDestination = () => this.isNextDestination = true;
      this._setDestination = () => {
         this.isDestination = true;
         this.sprite = { x: 0, y: 100, width: 50, height: 50, type: 0 };
         game.heroDestination = this;
         if (this.isNextDestination) this.isNextDestination = false;
      }
      this._clearDestination = () => {
         this.isDestination = false;
         this.sprite = this.origSprite;
         delete game.heroDestination;
      }

      this._setNearestState = () => !this.isDestination ? this.sprite = { x: 0, y: 150, width: 50, height: 50, type: 0 } : null;
      this._setNeighborState = () => !this.isDestination ? this.sprite = { x: 0, y: 200, width: 50, height: 50, type: 0 } : null;
      this._getNeighbors = () => {
         let { gX, gY } = this;
         let neighbors = [];
         let nPosition = 0;
         
         for (let x_coord = gX - 1; x_coord <= gX + 1; x_coord++) {
            for (let y_coord = gY - 1; y_coord <= gY + 1; y_coord++) {
               if ((x_coord < 0 || y_coord < 0 || x_coord > 15 || y_coord > 11) || (x_coord === this.gX && y_coord === this.gY)) { nPosition++; continue; }
               else {
                  let neighbor = game.gridHash[`${x_coord}-${y_coord}`];

                  // this line will exclude diagonal neighbors
                  if (game.excludeDiagonals && (nPosition === 0 || nPosition === 2 || nPosition === 6 || nPosition === 8)) { nPosition++; continue; };

                  neighbor.direction = utils.nDirections[nPosition]
                  neighbors.push(neighbor);
                  nPosition++;
               }
            }
         }
         return neighbors
      }
   },
   CharBox: function CharBox({ x, y, width, height, type, color, sprite, spriteSet }) {
      this.x = x || 0;
      this.y = y || 0;
      this.width = width || 0;
      this.height = height || 0;

      this.type = type;
      this.color = color || 'rgba(255,255,255,0)';
      this.sprite = sprite;
      this.spriteSet = spriteSet;

      this._setSpriteDirection = dir => {
         let transDir = {
            NORTH: 'up',
            NORTH_WEST: 'up',
            NORTH_EAST: 'up',
            SOUTH: 'down',
            SOUTH_WEST: 'down',
            SOUTH_EAST: 'down',
            EAST: 'right',
            WEST: 'left'
         };
         this.sprite = this.spriteSet[transDir[dir || 'SOUTH']];
      }
   }
})