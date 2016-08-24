import { Female } from '../../Model/Human/Female'
import { GameUpdaterInterface } from './GameUpdaterInterface'

class Maternity implements GameUpdaterInterface {
  update(gameState, creatures: any[]) {
    for (var human of creatures) {
      if (human instanceof Female) {
          if (human.isPregnant()) {
            human.getEmbryo().ages(1);
          }

          if (human.shouldGiveBirth()) {
            creatures.push(human.giveBirth());
          }
      }
    }
  }
}

export var maternity = new Maternity();
