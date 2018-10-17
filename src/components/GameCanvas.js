import React, { Component } from 'react';

import utils from './../scripts/utils.js';
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
      this.mode = this.props.mode || 'pathfind'
   }
   
   componentDidMount = () => {
      if (this.mode === 'pathfind') {
         this.showPath = true;
         this.showScore = true;
         this.heroTweenA = true;
      }
      
      this._initializeGameCanvas();
   }
   

   /* ----------------- CANVAS ------------------ */

   _initializeGameCanvas = () => {
      this.canvas = this.refs.g_canvas;
      this.ctx = this.canvas.getContext('2d');

      // instantiate level grid objects to be draw into canvas
      this.gridHash = this.Scripts.Grid._initNewGrid({
         rows: 12,
         cols: 16,
         t_width: 800,
         t_height: 600
      
      });
      // instantiate hero object
      this.hero = this.Scripts.Hero._initNewHero(this.heroPosition);
      
      // handle user input/interactions
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

   // recursively redraw canvas using requestAnimationFrame, and pass each render timestamp into our TWEEN engine
   _renderLoop = _ts => {
      this._drawRender();
      TWEEN.update(_ts || 0);
      this.frameId = requestAnimationFrame(this._renderLoop);
   }

   // clear canvas and redraw all objects according to new state
   _drawRender = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this._drawGrid();
      this._drawBox('hero', this.hero);
   }

   // recursively draw each grid object
   _drawGrid = () => Object.values(this.gridHash).forEach(box => this._drawBox('grid', box))

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
   

   render() {
      return (<>
         <canvas
            id="g_canvas"
            ref="g_canvas"
            width={this.props.width}
            height={this.props.height}
         />
      </>);
   }
}

export default GameCanvas;