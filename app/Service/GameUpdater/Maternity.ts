import { Female } from '../../Model/Human/Female'
import { Gender } from '../../Model/Human/Human'
import { GameUpdaterInterface } from './GameUpdaterInterface'
import { philippe } from '../Action/Philippe'

class Maternity implements GameUpdaterInterface {
  update(gameState) {
    for (var human of gameState.humans) {
      if (human instanceof Female) {
          if (human.isPregnant()) {
            human.getEmbryo().ages(1);
          }

          if (human.shouldGiveBirth()) {
            if (gameState.humans.length === gameState.spots) {
              human.giveBirth();
              philippe.say('Tiens, la petite ' + human.getName() + ' vient de pondre. Problème: plus de place dans la Xantia. La DDAS est sur le coup, pas de problème.');
              return;
            }

            const newBorn = human.giveBirth();
            philippe.say('Tiens, ' + (newBorn.getGender() === Gender.Female ? 'la petite' : 'le petit') + ' ' + newBorn.getName() + ' vient de rejoindre cette magnifique famille');
            gameState.humans.push(newBorn);
          }
      }
    }
  }
}

export var maternity = new Maternity();
