import { Female } from '../../Model/Human/Female'
import { GameUpdaterInterface } from './GameUpdaterInterface'
import { ProstituteActivity } from '../../Model/Activity/Prostitute'
import { philippe } from '../Action/Philippe'

class Sexuality implements GameUpdaterInterface {
  update(gameState) {
    for (var human of gameState.humans) {
      if (human.isWorking() && human.getActivity() instanceof ProstituteActivity && !human.isSick()) {
        const sick = Math.random() < 0.1;

        if (sick) {
          philippe.say('Diantre, je crois que ' + human.getName() + ' a attrapé la chtouille en se frottant trop sur le trotoire!');
          human.setSick(true);
        }
      }
    }
  }
}

export var sexuality = new Sexuality();
