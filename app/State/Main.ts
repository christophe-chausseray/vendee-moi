import { Human } from '../Model/Human';

export class Main extends Phaser.State {
  create() {
    this.stage.backgroundColor = 0x000000;
    var man = new Human('Julien');
    console.log(man.name);
    console.log(man.health);
    console.log(man.consanguinity);
    // Create game objects here
  }
}
