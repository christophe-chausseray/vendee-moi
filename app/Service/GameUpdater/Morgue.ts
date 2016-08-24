import { Female } from '../../Model/Human/Female'
import { GameUpdaterInterface } from './GameUpdaterInterface'

class Morgue implements GameUpdaterInterface {
  update(gameState) {
    for (var human of gameState.humans) {
      if (0 >= human.getHealth()) {
        gameState.humans.splice(gameState.humans.indexOf(human), 1);
      }
    }
  }
}

export var morgue = new Morgue();
