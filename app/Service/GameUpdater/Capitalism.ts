import { Female } from '../../Model/Human/Female'
import { GameUpdaterInterface } from './GameUpdaterInterface'

class Capitalism implements GameUpdaterInterface {
  update(gameState) {
    for (var human of gameState.humans) {
      if (human.isWorking()) {
        human.getActivity().work();

        if (human.getActivity().getWorked() === human.getActivity().getDuration()) {
          gameState.money += human.getActivity().getRevenue();
          human.work(undefined);
        }
      }
    }
  }
}

export var capitalism = new Capitalism();
