import { philippe } from '../Service/Action/Philippe'

export class Menu extends Phaser.State {
  background: Phaser.Sprite;

  create() {
    this.background = this.add.sprite(this.game.width / 2, this.game.height / 2, 'vendee');
    this.background.anchor.set(0.5);

    this.input.onDown.addOnce(() => {
      this.game.state.start('main');
      philippe.say('Hey! Bienvenue dans Vendée Moi, le meilleur jeu du monde (après les animations du Puy du fou bien sur)');
      setTimeout(function () {
          philippe.say('Tu vas devoir gerer une belle famille vendéenne dans le respect des traditions de ce beau département.');
      }, 6000);

      setTimeout(function () {
          philippe.say('Bon, faut éviter qu\'ils se tripotent trop entre eux, mais je serais mal placé pour les réprimander');
      }, 12000);

      setTimeout(function () {
          philippe.say('Pour commencer, tu peux tapoter sur l\'un des membres de ta famille');
      }, 18000);
    });
  }
}
