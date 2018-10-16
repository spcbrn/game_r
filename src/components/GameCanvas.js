import React, { Component } from 'react';

import utils from './../scripts/utils.js';
import GameClasses from './../GameClasses.js';
import Pathfinder from '../scripts/Pathfinding.js';

const TWEEN = require('@tweenjs/tween.js');

const gridSprites = new Image();
gridSprites.src = require('./../art/spritesheet.png');

const heroSprites = new Image();
heroSprites.src = require('./../art/theDude.png');

const turretSprites = new Image();
turretSprites.src = require('./../art/TurretR.png');

class GameCanvas extends Component {
   constructor() {
      super()

      this.PF = Pathfinder({ game: this, utils });
      this.Classes = GameClasses({ game: this, utils })
      
      this.isPaused = false;
      this.mode = null;
   }

   componentWillMount = () => {
      this.mode = this.props.mode || 'pathfind'
   }

   componentDidMount = () => {
      if (this.mode === 'pathfind') {
         this.showPath = true;
         this.showScore = true;
         this.heroTweenA = true;
      }
      if (this.mode === 'raycast') {
         this.showPath = false;
         this.showScore = false;
         this.heroTweenA = true;
      }

      this._initializeGameCanvas();
   }


   _initializeGameCanvas = () => {
      this.canvas = this.refs.g_canvas;
      this.ctx = this.canvas.getContext('2d');

      // instantiate level grid objects to be draw into canvas
      this.gridHash = this._initGrid({ rows: 12, cols: 16, t_width: 800, t_height: 600 });
      // instantiate hero object
      this.hero = this._initHero();
      
      // handle user input/interactions
      // if (this.mode === 'pathfind') {
         this.canvas.addEventListener('click', e => {
            let gCoords = { x: (Math.ceil(e.clientX / 50) - 1), y: (Math.ceil(e.clientY / 50) - 1) };
            let gridKey = `${gCoords.x}-${gCoords.y}`;
            let boxClicked = this.gridHash[gridKey];
            
            if (boxClicked.type !== 'walkable') return;
            if (!this.findingPath) {
               if (this.heroDestination && (this.heroDestination.key !== boxClicked.key)) boxClicked._setNextDestination();
               else boxClicked._setDestination();
               
               this.PF._findPath();
            }
         })
      // }
      if (this.mode === 'raycast') {
         this.mPosition = { x: 0, y: 0 };
         this.canvas.addEventListener('mousemove', e => {
            this.mPosition.x = e.clientX;
            this.mPosition.y = e.clientY;
         })

         // let raySource = utils._getRandomGridBox(this.gridHash);
         
         // setTimeout(() => {
         //    let heroDestination = utils._getRandomGridBox(this.gridHash);
         //    heroDestination._setDestination();
         //    this.PF._findPath()
         // }, 2000);
      }
      
      window.addEventListener('keypress', e => {
         if (e.key === 'p') {
            if (this.isPaused) {
               this.isPaused = false;
               this._renderLoop();
            }
            else {
               this.isPaused = true;
               cancelAnimationFrame(this.frameId);
            }
         }
      })

      // commence render loop
      this._renderLoop();
   }

   // recursively redraw canvas using requestAnimationFrame
   _renderLoop = _ts => {
      this._drawRender();
      TWEEN.update(_ts);
      this.frameId = requestAnimationFrame(this._renderLoop);
   }

   // clear canvas and redraw all objects according to new state
   _drawRender = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this._drawGrid();
      this._drawBox('hero', this.hero);

      if (this.mode === 'raycast') this._drawRay({ x: this.hero.x + 25, y: this.hero.y + 25 })
   }

   _drawRay = coords => {
      let radians = Math.atan2(this.mPosition.y - coords.y, this.mPosition.x - coords.x);
      let r = 1100;

      this.ctx.strokeStyle = '#FF0000';
      this.ctx.beginPath();
      this.ctx.moveTo(coords.x, coords.y);
      this.ctx.lineTo(this.mPosition.x, this.mPosition.y);
      // this.ctx.lineTo(((this.mPosition.x + r) * Math.cos(radians)), ((this.mPosition.y + r) * Math.sin(radians)));
      this.ctx.stroke();

      this._detectCollisions(radians);
   }

   _detectCollisions = radians => {
      this.hitBoxes = [];
      
      for (let i = 1; i < 1111; i += 15) {
         let currX = ((this.hero.x + i) * Math.cos(radians));
         let currY = ((this.hero.y + i) * Math.sin(radians))
         let gCoords = { x: (Math.ceil(currX / 50) - 1) + this.heroPosition.gX, y: (Math.ceil(currY / 50) - 1) + this.heroPosition.gY };

         if (gCoords.x < this.heroPosition.gX) {
            this.hitBoxes.push(`${gCoords.x + 1}-${gCoords.y}`);
            this.hitBoxes.push(`${gCoords.x + 2}-${gCoords.y}`);
         } else if (gCoords.x > this.heroPosition.gX) {
            this.hitBoxes.push(`${gCoords.x - 1}-${gCoords.y}`)
            this.hitBoxes.push(`${gCoords.x - 2}-${gCoords.y}`);
         } else {
            this.hitBoxes.push(`${gCoords.x}-${gCoords.y}`)
         }

         if (gCoords.x > 15 || gCoords.y > 11) break;
      }

      this.hitBoxes = this.hitBoxes.filter((c, i, a) => a.indexOf(c) === i);
      for (let key in this.gridHash) this.gridHash[key]._resetSprite();
      this.hitBoxes.forEach(key => this.gridHash[key] ? this.gridHash[key]._setNeighborState() : null);
      console.log(this.hitBoxes)
      
   }

   // function to draw individual game objects to the canvas
   _drawBox = (type, box) => {
      if (!box) return;

      switch (type) {
         case 'grid':
            this.ctx.fillRect(box.x, box.y, box.width, box.height);
            this.ctx.drawImage(gridSprites, box.sprite.x, box.sprite.y, box.sprite.width, box.sprite.height, box.x, box.y, box.width, box.height);

            if (box.gScore && this.showScore) {
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
         default:
            return;
      }
   }

   // recursively draw each grid object
   _drawGrid = () => Object.values(this.gridHash).forEach(box => this._drawBox('grid', box))

   // instantiate set of grid objects, randomly assigning a type
   _initGrid = ({ rows, cols, t_width, t_height }) => {
      let width = t_width / cols;
      let height = t_height / rows;
      let gridHash = {};

      for (let i = 0; i <= rows - 1; i++) {
         for (let j = 0; j <= cols - 1; j++) {
            let key = `${j}-${i}`,
               gX = j, gY = i,
               x = (j * width),
               y = (i * height),
               gridTypeConfig = utils.config.grid.gridTypes[utils.config.grid._getRandomTypeConstant()];

            let gridBox = new this.Classes.GridBox({ key, gX, gY, x, y, width, height, ...gridTypeConfig });

            if (!this.heroPosition && (utils._randInt(1, 20) > 15) && gridBox.type === 'walkable') {
               gridBox._setSource();
               this.heroPosition = gridBox;
            }

            gridHash[key] = gridBox;
         }
      }

      return gridHash;
   }

   // reset all grid objects to their default sprite, score and state values, then re-assign the source and destination objects respectively
   _resetGrid = () => {
      let nextSrc, nextDest;
      console.log('resetting')

      for (let coords in this.gridHash) {
         let box = this.gridHash[coords];

         if (box.isNextSource) nextSrc = box;
         if (box.isNextDestination) nextDest = box;

         box.sprite = box.origSprite;
         box.gScore = 0;
         box.hScore = 0;
         box.fScore = 0;
         box._deselect();
         box._clearParent();
         box._clearDestination();
         box._clearSource();
      }

      delete this.heroPosition;
      delete this.heroDestination

      nextSrc._setSource()
      nextDest._setDestination();
   }

   // instantiate hero object
   _initHero = () => {
      let { x, y } = this.heroPosition;
      let heroConfig = utils.config.char.charTypes[0];
      return new this.Classes.CharBox({ x, y, sprite: heroConfig.spriteSet.down, ...heroConfig })
   }

   // use tween function to draw hero's movement
   _tweenHero = (destBox, path) => {
      let tween;

      if (destBox) {
         tween = new TWEEN.Tween(this.hero).to({ x: destBox.x, y: destBox.y }, 360);
         this.hero._setDirection(destBox.direction);
         return tween.start();
      } else {
         let coords = path.map(key => key.split('-'));
         coords.forEach(coord => {

         tween = (new TWEEN.Tween(this.hero).to({ x: coord[0], y: coord[1] }, 320)).start()
         });
      }
   }

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

export default GameCanvas;