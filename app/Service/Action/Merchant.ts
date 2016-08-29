import { Good } from '../../Model/Item/Good'
import { GameState } from '../../State/Game'

class Merchant {
  cash(gameState: GameState, good: Good) {
    if (good.price <= gameState.money) {
      gameState.money -= good.price;
      gameState.items.push(good);
    }
  }
}

export var merchant = new Merchant();
