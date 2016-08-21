import { Human } from './Human'
import { Gender } from './Human'

export class Male extends Human {
  private embryo: Human;

  constructor(
    mother: Human,
    father: Human,
    name: string,
    health: number = 100,
    age: number = -9
  ) {
    super(mother, father, Gender.Male, name, health, age);
  }
}
