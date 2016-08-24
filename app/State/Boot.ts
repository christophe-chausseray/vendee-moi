export class Boot extends Phaser.State {
  preload() {
    this.load.image('vendee', 'assets/images/coeur-vendeen.png');
  }

  create() {
    this.game.stage.backgroundColor = 0xFFFFFF;
    // Assign global settings here
    this.game.state.start('preload');
  }
}
