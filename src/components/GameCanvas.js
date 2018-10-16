import React, { Component } from 'react';
import utils from './../scripts/utils.js';
const TWEEN = require('@tweenjs/tween.js');

const gsPath = require('./../art/spritesheet.png');
const gridSprites = new Image();
gridSprites.src = gsPath;

const csPath = require('./../art/theDude.png');
const heroSprites = new Image();
heroSprites.src = csPath;

class GameCanvas extends Component {
   constructor() {
      super();

   }

   componentDidMount = () => {
      this.target = { alpha: 0 };
      this._initializeGameCanvas();
      console.log('utils: ', utils)
   }

   _initializeGameCanvas = () => {
      this.canvas = this.refs.g_canvas;
      this.ctx = this.canvas.getContext('2d');

      this.gridHash = this._initGrid({ rows: 12, cols: 16, t_width: 800, t_height: 600 });
      this.hero = this._initHero();

      this.canvas.addEventListener('click', e => {
         let gCoords = { x: (Math.ceil(e.clientX / 50) - 1), y: (Math.ceil(e.clientY / 50) - 1) };
         let gridKey = `${gCoords.x}-${gCoords.y}`;
         let boxClicked = this.gridHash[gridKey];
         
         console.log('click grid hash: ', this.gridHash)
         if (boxClicked.type !== 'walkable') return;
         if (!this.findingPath) {
            boxClicked._setDestination();
            this.heroDestination = boxClicked;
            console.log('clicked ', this.heroDestination)
            this._findPath();
         } else {
            
         }
      })

      console.log('init grid hash: ', this.gridHash)

      this._renderLoop();
   }

   _renderLoop = _ts => {
      this._drawRender();
      requestAnimationFrame(this._renderLoop);
      TWEEN.update(_ts);
   }

   _drawRender = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this._drawGrid();
      this._drawBox('hero', this.hero);
   }

   _drawBox = (type, box) => {
      if (!box) return;

      switch (type) {
         case 'grid':
            this.ctx.fillRect(box.x, box.y, box.width, box.height);
            this.ctx.drawImage(gridSprites, box.sprite.x, box.sprite.y, box.sprite.width, box.sprite.height, box.x, box.y, box.width, box.height);
            // console.log(box.key, box.gScore)
            if (box.gScore || false) {
               this.ctx.font = '20px Arial';
               this.ctx.fillStyle = box.type === 'walkableSlow' ? '#603F39' : box.type === 'damage' ? '#F07E2D' : '#FFF';
               this.ctx.fillText(box.gScore, box.x + 5, box.y + 20);
            }
            return;
         case 'hero':
         this.ctx.fillStyle = box.color;
            this.ctx.fillRect(box.x, box.y, box.width, box.height);
            this.ctx.drawImage(heroSprites, box.sprite.x, box.sprite.y, box.sprite.width, box.sprite.height, box.x, box.y, box.width, box.height);
            return;
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

      return gridHash;
   }

   _initHero = () => {
      let { x, y } = this.heroPosition;
      let heroConfig = char.charTypes[0];
      return new this.GameClasses.CharBox({ x, y, sprite: heroConfig.spriteSet.down, ...heroConfig })
   }

   _tweenHero = (destBox, path) => {
         let tween;

         if (destBox) {
            tween = new TWEEN.Tween(this.hero).to({ x: destBox.x, y: destBox.y }, 500);
            this.hero._setDirection(destBox.direction);
            return tween.start();
         } else {
               console.log('tweening')
            let coords = path.map(key => key.split('-'));
            coords.forEach(coord => {

               tween = (new TWEEN.Tween(this.hero).to({ x: coord[0], y: coord[1] }, 320)).start()
            });
         }
      // this.hero.x = destBox.x;
      // this.hero.y = destBox.y;
   }

   _highlightPath = box => null

   _iteratePath = async () => {
      let lowestScore = -99;
      let neighbors;
      if (this.allDone) return;
      // function timeout(ms) {
      //    return new Promise(resolve => setTimeout(resolve, ms));
      // }
      // async function sleep(fn, ...args) {
      //       await timeout(300);
      //       return fn(...args);
      // }
      // await sleep(() => null)

      await utils._prt(300)

      this.opened.forEach(box => {
         if (lowestScore === -99 || box.fScore < lowestScore) {
            lowestScore = box.fScore;
            this._nextNearest = box;
         }
      })

      if (this._nextNearest.isDestination) {
         this._tweenHero(this._nextNearest);
         this._finishPath();
         return;
      } else {
         let inOpened = this.opened.find(box => box.key === this._nextNearest.key)
         if (inOpened) {
            this.opened = this.opened.filter(box => box.key !== this._nextNearest.key);
            this.closed.push(inOpened);
            this.path[inOpened.key] = inOpened;
            this._tweenHero(inOpened);
         }
         
         neighbors = this._nextNearest._getNeighbors();
         neighbors.forEach(box => {
            if (box.type !== 'blocked'  && box.type !== 'ff' && !box.isSource && !this.closed.find(c => c.key === box.key)) {
               if (!this.opened.find(c => c.key === box.key)) {
                  this.opened.push(box);

                  box._setNeighborState();
                  this._nextNearest._setNearestState();
                  
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
            this.gridHash[box.key].gScore = box.gScore;
         })
         if (!this.opened.length || this._iterations > 800) {
            this.allDone = true;
         }
         this._iterations++;
         if (!this.allDone) this._iteratePath();
      }
   }

   _findPath = () => {
      if (this.allDone) this._resetGrid();
      console.log('starting path')
      this.findingPath = true;

      this.allDone = false;
      this._iterations = 0;
      this._nextNearest = null;

      this.opened = [];
      this.closed = [];
      this.path = {};

      this.opened.push(this.heroPosition);

      this._iteratePath();
   }

   _finishPath = () => {
      console.log('finished')
      console.log('path: ', this.path)
      // this._tweenHero(null, Object.keys(this.path));
      this.heroPosition = this.gridHash[this.heroDestination.key];
      delete this.heroDestination;
      this.findingPath = false;
      this.allDone = true;
   }

   _resetGrid = () => {
      let src = this.heroPosition.key;
      let dest = this.heroDestination.key;
      for (let coords in this.gridHash) {
         let box = this.gridHash[coords];

         box.sprite = box.origSprite;
         box.gScore = 0;
         box.hScore = 0;
         box.fScore = 0;
         box._deselect();
         box._clearParent();
         box._clearDestination();
         box._clearSource();

         if (coords === src) box._setSource();
         if (coords === dest) box._setDestination();
      }
   }

   _calcFScore = box => box.gScore + box.hScore;
   _calcHScore = box => ((Math.abs(box.x - this.heroDestination.x) + Math.abs(box.y - this.heroDestination.y)) * 10)
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


   GameClasses = (() => {
      const game = this;
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

            this.parentZone = {};
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
                  console.log('wtf mayte')
               this.isDestination = true;
               this.sprite = { x: 0, y: 100, width: 50, height: 50, type: 0 };
               console.log(this)
            }
            this._clearDestination = () => {
               this.isDestination = false;
               this.sprite = this.origSprite;
               delete this.heroDestination;
            }

            this._setNearestState = () => !this.isDestination ? this.sprite = { x: 0, y: 150, width: 50, height: 50, type: 0 } : null;
            this._setNeighborState = () => !this.isDestination ? this.sprite = { x: 0, y: 200, width: 50, height: 50, type: 0 } : null;
            this._getNeighbors = () => {
               let { gX, gY } = this;
               let neighbors = [];
               let nPosition = 0;
               
               for (let i = gX - 1; i <= gX + 1; i++) {
                  for (let j = gY - 1; j <= gY + 1; j++) {
                     if ((i < 0 || j < 0 || i > 15 || j > 11) || (i === this.gX && j === this.gY)) { nPosition++; continue; }
                     else {
                        if (nPosition === 0 || nPosition === 2 || nPosition === 6 || nPosition === 8) { nPosition++; continue; };
                        let neighbor = game.gridHash[`${i}-${j}`];
                        neighbor.direction = nDirections[nPosition]
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

            this._setDirection = dir => {
               let transDir = { NORTH: 'up', SOUTH: 'down', EAST: 'right', WEST: 'left' };
               this.sprite = this.spriteSet[transDir[dir || 'SOUTH']];
            }
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

// const randomHex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
const randInt = n => (Math.floor(Math.random() * n) + 1);

const nDirections = { 0: 'NORTH_WEST', 1: 'WEST', 2: 'SOUTH_WEST', 3: 'NORTH', 5: 'SOUTH', 6: 'NORTH_EAST', 7: 'EAST', 8: 'SOUTH_EAST' };
const char = {
   charTypes: {
      0: {
         type: 'ninja',
         const: 0,
         width: 50,
         height: 50,
         spriteSet: { down: { x: 0, y: 0, width: 56, height: 72 }, up: { x: 0, y: 74, width: 53, height: 72 }, left: { x: 0, y: 146, width: 53, height: 72 }, right: { x: 0, y: 219, width: 53, height: 72 } }
      }
   }
}

const grid = {
   _getRandomConstant: () => ([0, 0, 2, 0, 2, 2, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 2, 0, 0][(Math.floor(Math.random() * (20 - 1)) + 1)]),
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


export default GameCanvas;

// let levelSprites = {
//    walkable: { zones: [{ x: 0, y: 0, width: 50, height: 50, type: 0 }, { x: 0, y: 50, width: 50, height: 50, type: 0 }, { x: 0, y: 100, width: 50, height: 50, type: 0 }] },
//    walkableSlow: { zones: [{ x: 100, y: 0, width: 50, height: 50, type: 2, slow: 0.25 }, { x: 100, y: 50, width: 50, height: 50, type: 2, slow: 0.50 }, { x: 100, y: 100, width: 50, height: 50, type: 2, slow: 0.75 }] },
//    blocked: { zones: [{ x: 50, y: 0, width: 50, height: 50, type: 1 }, { x: 50, y: 50, width: 50, height: 50, type: 1 }, { x: 50, y: 100, width: 50, height: 50, type: 1 }] },
//    damage: { zones: [{ x: 200, y: 0, width: 50, height: 50, type: 4, slow: 0.75, damage: 0.25 }, { x: 200, y: 50, width: 50, height: 50, slow: 0.35, damage: 0.50, type: 4 }, { x: 200, y: 100, width: 50, height: 50, slow: 0.55, damage: 0.75, type: 4 }] }
// }

// let hero = { down: { x: 0, y: 0, width: 56, height: 72 }, up: { x: 0, y: 74, width: 53, height: 72 }, left: { x: 0, y: 146, width: 53, height: 72 }, right: { x: 0, y: 219, width: 53, height: 72 } }
