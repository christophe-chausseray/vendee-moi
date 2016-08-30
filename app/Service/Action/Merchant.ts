import { Good } from '../../Model/Item/Good'
import { GameState } from '../../State/Game'
import { philippe } from './Philippe'

class Merchant {
  cash(gameState: GameState, good: Good) {
    if (good.price <= gameState.money) {
      gameState.money -= good.price;
      gameState.items.push(good);
    } else {
        philippe.say('Mince, pas assez de canettes! Je te conseille de retourner bosser, au Puy du fou par exemple!');
    }
  }
}

export var merchant = new Merchant();
