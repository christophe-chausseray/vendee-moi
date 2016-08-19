export class Human {
  name: string;
  health: number;
  consanguinity: number;

  constructor(name: string, health: number = 100, consanguinity: number = 0) {
    this.name          = name;
    this.health        = health;
    this.consanguinity = consanguinity;
  }

  getFertility(): number {
    return this.consanguinity;
  }

  getConsanguinity(): number {
    return this.consanguinity;
  }

  setConsanguinity(consanguinity: number) {
    this.consanguinity = consanguinity;
  }

  getHealth(): number {
    return this.health;
  }

  setHealth(health: number) {
    this.health = health;
  }
}
