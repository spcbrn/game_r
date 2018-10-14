import React, { Component } from 'react';

class GameCanvas extends Component {
    constructor() {
        super();
    }

    componentDidMount = () => {
        this.canvas = this.refs.g_canvas;
        this.ctx = this.canvas.getContext('2d');

        this.gridHash = this._initGrid({ rows: 12, cols: 16, t_width: 800, t_height: 600 });

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

    _drawBox = box => {
        // box.color = randomHex();
        this.ctx.fillStyle = box.color;
        this.ctx.fillRect(box.x, box.y, box.width, box.height)
    }

    _drawGrid = () => { for (let coords in this.gridHash)  this._drawBox(this.gridHash[coords]) }

    _initGrid = ({ rows, cols, t_width, t_height }) => {
        let width = t_width / cols;
        let height = t_height / rows;        
        let gridHash = {};

        for (let i = 0; i <= rows; i++) {
            for (let j = 0; j <= cols; j++) {
                let gX = i, gY = j,
                    x = (j * width),
                    y = (i * height),
                    typeConfig = gridTypes[ randomGridConst[ (Math.floor(Math.random() * 20) + 1) ] ];

                gridHash[`${i}-${j}`] = new this.GameClasses.GridBox({ gX, gY, x, y, width, height, ...typeConfig })

            }
        }
        console.log(gridHash)
        return gridHash;
    }

    GameClasses = (() => ({
        GridBox: function GridBox({ gX, gY, x, y, width, height, type, passable, friction, damage, color, sprite }) {
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
    }))()

  render() {
    return (
      <canvas
        id="g_canvas"
        ref="g_canvas"
        width="800"
        height="600"
      />
    );
  }
}

const randomGridConst = [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
const gridTypes = {
    0: { type: 0, passable: true, friction: 0, damage: 0, color: '#f2f2f2', sprite: '...' },
    1: { type: 1, passable: false, friction: 0, damage: 0, color: '#8f9191', sprite: '...' },
    2: { type: 2, passable: true, friction: 1, damage: 0, color: '#6ce4fc', sprite: '...' }
}

const randomHex = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;

export default GameCanvas;