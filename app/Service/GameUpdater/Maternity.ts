import { Female } from '../../Model/Human/Female'
import { GameUpdaterInterface } from './GameUpdaterInterface'

class Maternity implements GameUpdaterInterface {
  update(gameState) {
    for (var human of gameState.humans) {
      if (human instanceof Female) {
          if (human.isPregnant()) {
            human.getEmbryo().ages(1);
          }

          if (human.shouldGiveBirth()) {
            gameState.humans.push(human.giveBirth());
          }
      }
    }
  }
}

export var maternity = new Maternity();
