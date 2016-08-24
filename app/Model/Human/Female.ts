import { Human } from './Human'
import { Gender } from './Human'
import { BirthGiverInterface } from '../BirthGiverInterface'

export class Female extends Human implements BirthGiverInterface {
  private embryo: Human;

  constructor(
    mother: Human,
    father: Human,
    name: string,
    health: number = 100,
    age: number = -9
  ) {
    super(mother, father, Gender.Female, name, health, age);
  }

  isPregnant(): boolean {
    return !!this.embryo;
  }

  shouldGiveBirth(): boolean {
    return this.isPregnant() && this.embryo.getAge() >= 0;
  }

  ages(month: number) {
    super.ages(month);
  }

  canGiveBirth(): boolean {
    return !this.isWorking();
  }

  giveBirth(): Human {
    var human = this.embryo;
    this.embryo = undefined;

    return human;
  }

  setEmbryo(human: Human) {
    this.embryo = human;
  }

  getEmbryo(): Human {
    return this.embryo;
  }
}
