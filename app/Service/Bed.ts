import { Female } from '../Model/Human/Female'
import { Gender } from '../Model/Human/Human'
import { Male } from '../Model/Human/Male'
import { FuckerInterface } from '../Model/FuckerInterface'
import { FuckableInterface } from '../Model/FuckableInterface'
import { Human } from '../Model/Human/Human'
import { humanFactory } from './HumanFactory'
import { philippe } from './Action/Philippe'

class Bed {
  fuck(fucker: FuckerInterface, fucked: FuckableInterface) {
    fucker.fuck(fucked);
    fucked.isFucked(fucker);

    const sick = Math.random() < 0.5;
    if (fucked instanceof Human && fucker instanceof Human) {
      if (fucked.isSick() && !fucker.isSick() && sick) {
        fucker.setSick(true);
        philippe.say('Hum, ' + fucked.getName() + ' vient de refiler ses saloperies à ' + fucker.getName() + '. Pas très malin...');
      }
      if (fucker.isSick() && !fucked.isSick() && sick) {
        fucked.setSick(true);
        philippe.say('Hum, ' + fucker.getName() + ' vient de refiler ses saloperies à ' + fucked.getName() + '. Pas très malin...');
      }
    }

    if (
      fucked instanceof Female &&
      fucked.canGiveBirth() &&
      !fucked.isPregnant() &&
      fucker instanceof Male &&
      (fucker.getFertility() * fucked.getFertility()) > 0.5
    ) {
      var human: Human = humanFactory.create(fucked, fucker);
      fucked.setEmbryo(human);
    } else {
      if (fucker instanceof Human && fucked instanceof Human) {
        philippe.say('Arf, ' + fucker.getName() + ' vient de tripoter ' + (fucked.getGender() === Gender.Female ? 'la petite' : 'le petit') + ' ' + fucked.getName() + '. Pas très efficace tout ça, mais je ne pourrai réprimer.')
      }
    }
  }
}

export var bed = new Bed();
