import { Human } from '../../Model/Human/Human'
import { FoodInterface } from '../../Model/FoodInterface'
import { GameState } from '../../State/Game'
import { philippe } from './Philippe'

class Cantina {
  eat(human: Human, food: FoodInterface, gameState: GameState) {
    human.setHealth(human.getHealth() + food.nutritionalValue());
    if (-1 !== gameState.items.indexOf(food)) {
      gameState.items.splice(gameState.items.indexOf(food), 1);

    }
    if (-1 !== gameState.humans.indexOf(food)) {
      gameState.humans.splice(gameState.humans.indexOf(food), 1);
      philippe.say('Super, tu viens de bouffer un membre de ta famille. Ca sera toujours moins pire que d\'avorter!')
    }
  }
}

export var cantina = new Cantina();
