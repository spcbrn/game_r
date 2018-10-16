import React, { Component } from 'react';

import utils from './../scripts/utils.js';
import GameClasses from './../GameClasses.js';
import Pathfinder from '../scripts/Pathfinding.js';

const TWEEN = require('@tweenjs/tween.js');

const gsPath = require('./../art/spritesheet.png');
const gridSprites = new Image();
gridSprites.src = gsPath;

const csPath = require('./../art/theDude.png');
const heroSprites = new Image();
heroSprites.src = csPath;

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
      // if raytrace mode, instantiate shooter
      // this.shooter = this._initShooter();

      // handle user input/interactions
      if (this.mode === 'pathfind') {
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
      }
      if (this.mode === 'raycast') {
         this.mPosition = { x: 0, y: 0 };
         this.canvas.addEventListener('mousemove', e => {
            this.mPosition.x = e.clientX;
            this.mPosition.y = e.clientY;
         })

         this.raySource = utils._getRandomGridBox(this.gridHash);

         let heroDestination = utils._getRandomGridBox(this.gridHash);
         heroDestination._setDestination();
         this.PF._findPath();
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

      this._drawRay({ x: this.hero.x + 25, y: this.hero.y + 25 })
   }

   _drawRay = () => {
      this.ctx.fillStyle = '#FF0000';
      this.ctx.beginPath();
      this.ctx.moveTo(this.raySource.x + 25, this.raySource.y + 25);
      this.ctx.lineTo(this.mPosition.x, this.mPosition.y);
      this.ctx.stroke();
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

      let startAssigned = false;
      for (let i = 0; i <= rows - 1; i++) {
         for (let j = 0; j <= cols - 1; j++) {
            let key = `${j}-${i}`,
               gX = j, gY = i,
               x = (j * width),
               y = (i * height),
               gridTypeConfig = utils.config.grid.gridTypes[utils.config.grid._getRandomTypeConstant()];

            let gridBox = new this.Classes.GridBox({ key, gX, gY, x, y, width, height, ...gridTypeConfig });

            if (!startAssigned && (utils._randInt(1, 20) > 15) && gridBox.type === 'walkable') {
               this.heroPosition = gridBox;
               gridBox._setSource();
               startAssigned = true;
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