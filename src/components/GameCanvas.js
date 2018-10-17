import React, { Component } from 'react';

import utils from '../utils.js';

import GameClasses from './../GameClasses.js';
import Grid from './../scripts/Grid.js';
import Hero from './../scripts/Hero.js';
import Pathfinder from '../scripts/Pathfinding.js';

const TWEEN = require('@tweenjs/tween.js');

const gridSprites = new Image();
gridSprites.src = require('./../art/spritesheet.png');

const heroSprites = new Image();
heroSprites.src = require('./../art/theDude.png');



class GameCanvas extends Component {
   constructor() {
      super()

      this.Classes = GameClasses({ game: this, utils })
      this.Scripts = {
         Grid: Grid({ game: this, utils }),
         Hero: Hero({ game: this, utils, TWEEN }),
         PF: Pathfinder({ game: this, utils })
      }
      
      this.isPaused = false;
   }


   /* ------------- REACT LIFECYCLE ------------- */
   
   componentWillMount = () => {
      this.mode = this.props.mode || 'pathfind';
      this.cWidth = this.props.width || 800;
      this.cHeight = this.props.height || 600;
   }
   
   componentDidMount = () => {
      if (this.mode === 'pathfind') {
         this.showPath = true;
         this.showScore = true;
         this.excludeDiagonals = true;
         this.tweenHeroWithAlgorithm = true;
      } else if (this.mode === 'raycast') {
         this.showPath = false;
         this.showScore = false;
         this.excludeDiagonals = true;
         this.tweenHeroWithAlgorithm = true;
         this.clickToMoveHero = false;
      }
      
      this._initializeGameCanvas();
   }
   

   /* ----------------- CANVAS ------------------ */

   _initializeGameCanvas = () => {
      this.canvas = this.refs.g_canvas;
      this.ctx = this.canvas.getContext('2d');

      /* instantiate level grid objects to be draw into canvas */
      this.gridHash = this.Scripts.Grid._initNewGrid({
         rows: 12,
         cols: 16,
         t_width: this.cWidth,
         t_height: this.cHeight
      
      });
      /* instantiate hero object */
      this.hero = this.Scripts.Hero._initNewHero(this.heroPosition);
      
      if (this.mode === 'pathfind' || this.clickToMoveHero) {
         /* handle user input/interactions */
         this.canvas.addEventListener('click', e => {
            let gCoords = { x: (Math.ceil(e.clientX / 50) - 1), y: (Math.ceil(e.clientY / 50) - 1) };
            let gridKey = `${gCoords.x}-${gCoords.y}`;
            let boxClicked = this.gridHash[gridKey];
            
            if (boxClicked.type !== 'walkable') return;
            if (!this.findingPath) {
               if (this.heroDestination && (this.heroDestination.key !== boxClicked.key)) boxClicked._setNextDestination();
               else boxClicked._setDestination();
               
               this.Scripts.PF._findPath();
            }
         })
      }

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
         //    this.Scripts.PF._findPath()
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

      /* commence render loop */
      this._renderLoop();
   }

   /* recursively redraw canvas using requestAnimationFrame, and pass each render timestamp into our TWEEN engine */
   _renderLoop = _ts => {
      this._drawRender();
      TWEEN.update(_ts || 0);
      this.frameId = requestAnimationFrame(this._renderLoop);
   }

   /* clear canvas and redraw all objects according to new state */
   _drawRender = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this._drawGrid();
      this._drawBox('hero', this.hero);

      if (this.mode === 'raycast') this._drawRayStroke({ x: this.hero.x + 25, y: this.hero.y + 25 })
   }

   /* recursively draw each grid object */
   _drawGrid = () => { for (let coord in this.gridHash) this._drawBox('grid', this.gridHash[coord]) }

   /* function to draw individual game objects to the canvas */
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

   _drawRayStroke = coords => {
      let radians = Math.atan2(this.mPosition.y - coords.y, this.mPosition.x - coords.x);
      // let r = 1100;

      this.ctx.strokeStyle = '#FF0000';
      this.ctx.beginPath();
      this.ctx.moveTo(coords.x, coords.y);
      this.ctx.lineTo(this.mPosition.x, this.mPosition.y);
      // this.ctx.lineTo(((this.mPosition.x + r) * Math.cos(radians)), ((this.mPosition.y + r) * Math.sin(radians)));
      this.ctx.stroke();

      this._detectBroadPhaseCollisions(radians);
   }

   _detectBroadPhaseCollisions = radians => {
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
   

   render() {
      return (<>
         <canvas
            id="g_canvas"
            ref="g_canvas"
            width={this.cWidth}
            height={this.cHeight}
         />
      </>);
   }
}

export default GameCanvas;