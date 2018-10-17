export default ({ game, utils }) => {
   class Grid {
      _initNewGrid = ({ rows, cols, t_width, t_height }) => {
         if (t_width % cols || t_height % rows) throw new Error('Error creating game grid: Please ensure that the desired column and row counts divide evenly into the total width and height of the level!');

         let width = t_width / cols;
         let height = t_height / rows;
         let gridHash = {};
   
         for (let Y = 0; Y <= rows - 1; Y++) {
            for (let X = 0; X <= cols - 1; X++) {
               let key = `${X}-${Y}`,
                  gX = X, gY = Y,
                  x = (X * width),
                  y = (Y * height),
                  gridTypeConfig = utils.config.grid.gridTypes[utils.config.grid._getRandomTypeConstant()];
   
               let gridBox = new game.Classes.GridBox({ key, gX, gY, x, y, width, height, ...gridTypeConfig });
   
               if (!game.heroPosition && (utils._randInt(1, 20) > 15) && gridBox.type === 'walkable') game.heroPosition = gridBox;
   
               gridHash[key] = gridBox;
            }
         }
   
         return gridHash;
      }

      _resetGrid = () => {
         let nextSrc, nextDest;
         console.log('resetting')
   
         for (let coords in game.gridHash) {
            let gridBox = game.gridHash[coords];
   
            if (gridBox.isNextSource) nextSrc = gridBox;
            if (gridBox.isNextDestination) nextDest = gridBox;
   
            gridBox.sprite = gridBox.origSprite;
            gridBox.gScore = 0;
            gridBox.hScore = 0;
            gridBox.fScore = 0;
            gridBox._deselect();
            gridBox._clearParent();
            gridBox._clearDestination();
            gridBox._clearSource();
         }
   
         delete game.heroPosition;
         delete game.heroDestination
   
         nextSrc._setSource()
         nextDest._setDestination();
      }


   }
   return new Grid();
}