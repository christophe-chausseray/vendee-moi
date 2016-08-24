import { Female } from '../../Model/Human/Female'
import { GameUpdaterInterface } from './GameUpdaterInterface'

class Life implements GameUpdaterInterface {
  update(gameState) {
    for (var human of gameState.humans) {
      human.ages(1);
      human.setHealth(human.getHealth() - human.getAge() / (100 * 12));
    }
  }
}

export var life = new Life();
