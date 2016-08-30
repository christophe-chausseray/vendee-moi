import { Female } from '../../Model/Human/Female'
import { Gender } from '../../Model/Human/Human'
import { GameUpdaterInterface } from './GameUpdaterInterface'

class Capitalism implements GameUpdaterInterface {
  update(gameState) {
    for (var human of gameState.humans) {
      if (human.isWorking()) {
        human.getActivity().work();

        if (human.getActivity().getWorked() === human.getActivity().getDuration()) {
          let profitability = (30 - (human.getAge() / 12)) / 30;
          profitability = (profitability >= 0.2 ? profitability : 0.2);
          profitability /= Gender.Female === human.getGender() ? 1 : 2;
          gameState.money += Math.round(human.getActivity().getRevenue() * profitability);
          human.work(undefined);
        }
      }
    }
  }
}

export var capitalism = new Capitalism();
