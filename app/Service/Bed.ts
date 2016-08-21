import { Female } from '../Model/Human/Female'
import { Male } from '../Model/Human/Male'
import { FuckerInterface } from '../Model/FuckerInterface'
import { FuckableInterface } from '../Model/FuckableInterface'
import { Human } from '../Model/Human/Human'
import { humanFactory } from './HumanFactory'

class Bed {
  fuck(fucker: FuckerInterface, fucked: FuckableInterface) {
    fucker.fuck(fucked);
    fucked.isFucked(fucker);

    if (
      fucked instanceof Female &&
      fucked.canGiveBirth() &&
      !fucked.isPregnant() &&
      fucker instanceof Male &&
      (fucker.getFertility() * fucked.getFertility()) > 0.5
    ) {
      var human: Human = humanFactory.create(fucked, fucker);
      fucked.setEmbryo(human);
    }
  }
}

export var bed = new Bed();
