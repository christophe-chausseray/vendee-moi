import { FoodInterface } from '../FoodInterface'
import { AgeInterface } from '../AgeInterface'
import { FuckerInterface } from '../FuckerInterface'
import { FuckableInterface } from '../FuckableInterface'
import { WorkerInterface } from '../WorkerInterface'
import { ActivityInterface } from '../Activity/ActivityInterface'
import { SelectableInterface } from '../Item/SelectableInterface'

export enum Gender {
  Male,
  Female
}

export abstract class Human implements
  FoodInterface,
  AgeInterface,
  FuckerInterface,
  FuckableInterface,
  WorkerInterface,
  SelectableInterface
{
  static count : number = 0;

  protected id: number;
  protected mother: Human;
  protected father: Human;
  protected name: string;
  protected health: number;
  protected consanguinity: number;
  protected age: number;
  protected gender: Gender;
  protected sick: boolean = true;
  protected equipment: any;

  protected activity: ActivityInterface;

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
    this.id     = Human.count++;
    this.mother = mother;
    this.father = father;
    this.gender = gender;
    this.name   = name;
    this.age    = age;
    this.consanguinity = this.getAncestors().length - this.getAncestors().filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).length;
    this.health = this.consanguinity <= 5 ? health : 0;
    this.sick   = (this.mother && this.mother.isSick()) || (this.mother && this.father.isSick());
  }

  getId(): number {
    return this.id;
  }

  getLabel(): string {
    return this.getName();
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

  isSick(): boolean {
    return this.sick;
  }

  setSick(sick: boolean) {
    this.sick = sick;
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
    return 60 + (this.health / 2) - this.age / 12;
  }

  eat(food: FoodInterface) {
    this.setHealth(this.getHealth() + food.nutritionalValue());
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

  work(activity: ActivityInterface) {
    this.activity = activity;
  }

  isWorking() {
    return undefined !== this.activity;
  }

  getActivity(): ActivityInterface {
    return this.activity;
  }

  setEquipment(equipment) {
    this.equipment = equipment;
  }

  getEquipment() {
    return this.equipment;
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
