import { FoodInterface } from '../FoodInterface'
import { AgeInterface } from '../AgeInterface'
import { FuckerInterface } from '../FuckerInterface'
import { FuckableInterface } from '../FuckableInterface'

export enum Gender {
  Male,
  Female
}

export abstract class Human implements FoodInterface, AgeInterface, FuckerInterface, FuckableInterface {
  protected mother: Human;
  protected father: Human;
  protected name: string;
  protected health: number;
  protected consanguinity: number;
  protected age: number;
  protected gender: Gender;

  private pubertyAge: number = 12 * 12;
  private menopauseAge: number = 60 * 12;

  constructor(
    mother: Human,
    father: Human,
    gender: Gender,
    name: string,
    health: number = 100,
    age: number = -9
  ) {
    this.mother        = mother;
    this.father        = father;
    this.gender        = gender;
    this.name          = name;
    this.age           = age;
    this.consanguinity = this.getAncestors().length - this.getAncestors().filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).length;
    this.health        = this.consanguinity <= 5 ? health : 0;
  }

  getFertility(): number {
    if (this.age < this.pubertyAge || this.age > this.menopauseAge || this.getConsanguinity() >= 5) {
      return 0;
    }

    return 1 - 0.2 * (1 - this.getHealth() / 100) - 0.2 * this.getConsanguinity();
  }

  getConsanguinity(): number {
    return this.consanguinity;
  }

  setHealth(health: number) {
    health = health >= 100 ? 100 : health;
    health = health <= 0 ? 0 : health;

    this.health = health;
  }

  getHealth(): number {
    return this.health;
  }

  getName(): string {
    return this.name;
  }

  getMother(): Human {
    return this.mother;
  }

  getFather(): Human {
    return this.father;
  }

  getAge(): number {
    return this.age;
  }

  getGender(): number {
    return this.gender;
  }

  nutritionalValue(): number {
    return 60 + (this.health / 2) - this.age;
  }

  eat(food: FoodInterface) {
    this.setHealth(food.nutritionalValue());
  }

  ages(month: number) {
    this.age += month;
  }

  fuck(fucked: FuckableInterface) {
    this.health -= 0.5;
  }

  isFucked(fucker: FuckerInterface) {
    this.health -= 0.5;
  }

  protected getAncestors(): Human[] {
    var motherAncestors = null !== this.mother ? this.mother.getAncestors().concat([this.mother]) : [];
    var fatherAncestors = null !== this.father ? this.father.getAncestors().concat([this.father]) : [];

    return motherAncestors.concat(fatherAncestors);
  }

  canGiveBirth() {
    return false;
  }
}
