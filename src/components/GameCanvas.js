import React, { Component } from 'react';

const ssUrl = require('./../art/spritesheet.png');
const spriteSheet = new Image();
spriteSheet.src = ssUrl;

class GameCanvas extends Component {
   constructor() {
      super();

   }

   componentDidMount = () => {
      this.canvas = this.refs.g_canvas;
      this.ctx = this.canvas.getContext('2d');

      this.gridHash = this._initGrid({ rows: 12, cols: 16, t_width: 800, t_height: 600 });

      this.canvas.addEventListener('click', e => {
         let gCoords = { x: (Math.ceil((e.clientX - 240) / 50) - 1), y: (Math.ceil((e.clientY - 212) / 50) - 1) };
         let gridKey = `${gCoords.x}-${gCoords.y}`;
         let boxClicked = this.gridHash[gridKey];
         
         if (boxClicked.type === 'walkable') boxClicked._setDestination();
      })

      this._renderLoop();
   }

   _renderLoop = () => {
      this._drawRender();
      window.requestAnimationFrame(this._renderLoop);
   }

   _drawRender = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this._drawGrid();
   }

   _drawBox = (type, box) => {
      if (!box) return;

      if (type === 'grid') {
         this.ctx.fillRect(box.x, box.y, box.width, box.height);
         this.ctx.drawImage(spriteSheet, box.sprite.x, box.sprite.y, box.sprite.width, box.sprite.height, box.x, box.y, box.width, box.height);
      } else {
         this.ctx.fillStyle = box.color;
         this.ctx.fillRect(box.x, box.y, box.width, box.height);
      }
   }

   _drawGrid = () => { for (let coords in this.gridHash) this._drawBox('grid', this.gridHash[coords]) }

   _initGrid = ({ rows, cols, t_width, t_height }) => {
      let width = t_width / cols;
      let height = t_height / rows;
      let gridHash = {};

      let startAssigned = false;
      for (let i = 0; i <= rows; i++) {
         for (let j = 0; j <= cols; j++) {
            let key = `${j}-${i}`,
               gX = j, gY = i,
               x = (j * width),
               y = (i * height),
               gridTypeConfig = grid.gridTypes[grid._getRandomConstant()];

            let gridBox = new this.GameClasses.GridBox({ key, gX, gY, x, y, width, height, ...gridTypeConfig })

            if (!startAssigned && (randInt(20) > 15) && gridBox.type === 'walkable') {
               this.heroPosition = gridBox;
               gridBox._setSource();
               startAssigned = true;
            }

            gridHash[key] = gridBox;
         }
      }
      console.log(gridHash)
      return gridHash;
   }

   _highlightPath = box => null

   _iteratePath = () => {
      let lowestScore = -1;

      this.opened.forEach(box => {
         if (lowestScore === -1 || box.fScore < lowestScore) {
            lowestScore = box.fScore;
            this._nextNearest = box;
         }
      })

      if (this._nextNearest.isDestination) this._highlightPath(this._nextNearest);
      else {
         let inOpened = this.opened.find(box => box.key === this._nextNearest.key)
         if (inOpened) this.opened = this.opened.filter(box => box.key !== this._nextNearest.key);
         this.closed.push(inOpened);

         // this._nextNearest.setNearestState();
         let neighbors = this._nextNearest._getNeighbors();
         neighbors.forEach((box, i) => {
            if (box.type !== 'blocked' && !box.isSource && !this.closed.find(c => c.key === box.key)) {
               if (!this.opened.find(c => c.key === box.key)) {
                  this.opened.push(box);
                  box._setParent(this._nextNearest);

                  box.gScore = box.parentZone.gScore + calcGScore(box.direction);
                  box.hScore = calcHScore(box);
                  box.fScore = calcFScore(box);
               } else {
                  if (this._nextNearest.gScore + calcGScore(box.direction) < box.gScore) {
                     box.parentZone = this._nextNearest;
                     box.gScore = this._nextNearest.gScore + calcGScore(box.direction);
                     box.fScore = calcFScore(box);
                  }
               }
            }
         })
         if (!this.opened.length || this._iterations > 800) {
            this.allDone = true;
         }
         this._iterations++;
         if (!this.allDone) this._iteratePath();
      }
   }

   _findPath = (srcBox, destBox) => {
      this._iterations = 0;
      this._allDone = false;
      this._nextNearest = null;

      this.opened = [];
      this.closed = [];
      this.path = [];

      this.opened.push(srcBox);

      this._iteratePath();
   }

   GameClasses = (() => {
      const that = this;
      return {
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

            this.gScore = 0;
            this.hScore = 0;
            this.fScore = 0;

            this.parentZone = null;
            this._setParent = box => this.parentZone = box;
            this._clearParent = () => this.parentZone = null;

            this.isSelected = false;
            this._select = () => this.isSelected = true;
            this._deselect = () => this.isSelected = false;

            this.isSource = false;
            this._setSource = () => {
               this.isSource = true;
               this.sprite = { x: 0, y: 50, width: 50, height: 50, type: 0 };
            }
            this._clearSource = () => {
               this.isSource = false;
               this.sprite = this.origSprite;
               delete this.heroPosition;
            }

            this.isDestination = false;
            this._setDestination = () => {
               this.isDestination = true;
               this.sprite = { x: 0, y: 100, width: 50, height: 50, type: 0 };
            }
            this._clearDestination = () => {
               this.isDestination = false;
               this.sprite = this.origSprite;
               delete this.heroDestination;
            }

            this._getScore = () => {

            }
            this._getNeighbors = () => {
               let { gX, gY, x, y } = this;
               let neighbors = [];
               console.log(`${gX}-${gY}`)
               
               let nPosition = 0;
               for (let i = gX - 1; i <= gX + 1; i++) {
                  for (let j = gY - 1; j <= gY + 1; j++) {
                     if ((i < 0 || j < 0 || i > 15 || j > 11) || (i === this.gX && j === this.gY)) { nPosition++; continue; }
                     else { neighbors.push(Object.assign({}, { direction: nDirections[nPosition] }, that.gridHash[`${i}-${j}`])); nPosition++; }
                  }
               }
               console.log(neighbors)
               return neighbors
            }
         },
         CharBox: function CharBox({ x, y, width, height, type, color, sprite }) {
            this.x = x || 0;
            this.y = y || 0;
            this.width = width || 0;
            this.height = height || 0;

            this.type = type;
            this.color = color;
            this.sprit = sprite;
         }
      }
   })()

   render() {
      return (<>
         <canvas
            id="g_canvas"
            ref="g_canvas"
            width="800"
            height="600"
         />
      </>);
   }
}

const randomHex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
const randInt = n => (Math.floor(Math.random() * n) + 1);
const calcFScore = box => box.gScore + box.hScore;
const calcHScore = box => ((Math.abs(box.x - this.heroDestination.x) + Math.abs(box.y - this.heroDestination.y)) * 10)
const calcGScore = dir => {
   switch (dir) {
			case 'NORTH':
			case 'SOUTH':
			case 'WEST':
			case 'EAST':
				return 10;
			case 'NORTH_EAST':
			case 'NORTH_WEST':
			case 'SOUTH_EAST':
			case 'SOUTH_WEST':
				return 14;
			default:
				return 0;
		}
};

const grid = {
   _getRandomConstant: () => ([0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 0, 0][(Math.floor(Math.random() * (20 - 1)) + 1)]),
   gridTypes: {
      0: {
         type: 'walkable',
         const: 0,
         passable: true,
         friction: 0,
         damage: 0,
         color: '#d2d2d2',
         sprite: [{ x: 0, y: 0, width: 50, height: 50, type: 0 }][0]
      },
      1: {
         type: 'walkableSlow',
         const: 1,
         passable: true,
         friction: Number((Math.random() * (.8 - .3) + .3).toFixed(2)),
         damage: 0,
         color: '#80cccc',
         sprite: [{ x: 100, y: 0, width: 50, height: 50, type: 1 }, { x: 100, y: 50, width: 50, height: 50, type: 1 }, { x: 100, y: 100, width: 50, height: 50, type: 1 }][randInt(3) - 1]
      },
      2: {
         type: 'blocked',
         const: 2,
         passable: false,
         friction: 0,
         damage: 0,
         color: '#7a7a7a',
         sprite: [{ x: 50, y: 0, width: 50, height: 50, type: 2 }, { x: 50, y: 50, width: 50, height: 50, type: 2 }, { x: 50, y: 100, width: 50, height: 50, type: 2 }][randInt(3) - 1]
      },
      3: {
         type: 'damage',
         passable: true,
         const: 3,
         friction: Number((Math.random() * (.8 - .3) + .3).toFixed(2)),
         damage: Number((Math.random() * (.75 - .25) + .25).toFixed(2)),
         color: '#c4341b',
         sprite: [{ x: 150, y: 0, width: 50, height: 50, type: 3 }, { x: 150, y: 50, width: 50, height: 50, type: 3 }, { x: 150, y: 100, width: 50, height: 50, type: 3 }][randInt(3) - 1]
      }
   }
}

const nDirections = { 0: 'NORTH_WEST', 1: 'NORTH', 2: 'NORTH_EAST', 3: 'WEST', 5: 'EAST', 6: 'SOUTH_WEST', 7: 'SOUTH', 8: 'SOUTH_EAST' };

export default GameCanvas;

let levelSprites = {
   walkable: { zones: [{ x: 0, y: 0, width: 50, height: 50, type: 0 }, { x: 0, y: 50, width: 50, height: 50, type: 0 }, { x: 0, y: 100, width: 50, height: 50, type: 0 }] },
   walkableSlow: { zones: [{ x: 100, y: 0, width: 50, height: 50, type: 2, slow: 0.25 }, { x: 100, y: 50, width: 50, height: 50, type: 2, slow: 0.50 }, { x: 100, y: 100, width: 50, height: 50, type: 2, slow: 0.75 }] },
   blocked: { zones: [{ x: 50, y: 0, width: 50, height: 50, type: 1 }, { x: 50, y: 50, width: 50, height: 50, type: 1 }, { x: 50, y: 100, width: 50, height: 50, type: 1 }] },
   damage: { zones: [{ x: 200, y: 0, width: 50, height: 50, type: 4, slow: 0.75, damage: 0.25 }, { x: 200, y: 50, width: 50, height: 50, slow: 0.35, damage: 0.50, type: 4 }, { x: 200, y: 100, width: 50, height: 50, slow: 0.55, damage: 0.75, type: 4 }] }
}

let hero = { down: { x: 0, y: 0, width: 56, height: 72 }, up: { x: 0, y: 74, width: 53, height: 72 }, left: { x: 0, y: 146, width: 53, height: 72 }, right: { x: 0, y: 219, width: 53, height: 72 } }