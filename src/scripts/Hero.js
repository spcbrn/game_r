export default ({ game, utils, TWEEN }) => {
   class Hero {
      _initNewHero = grid_position => {
         grid_position._setSource();

         let { x, y } = grid_position;
         let heroConfig = utils.config.char.charTypes[0];
         return new game.Classes.CharBox({ x, y, sprite: heroConfig.spriteSet.down, ...heroConfig })
      }

      _tween = (hero, destination_box, path) => {
         let tween;
         if (destination_box) {
            tween = new TWEEN.Tween(hero).to({ x: destination_box.x, y: destination_box.y }, 360);
            hero._setDirection(destination_box.direction);
            return tween.start();
         }
      }
   }
   return new Hero();
}