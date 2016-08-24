export class Menu extends Phaser.State {
  background: Phaser.Sprite;

  create() {
    this.background = this.add.sprite(this.game.width / 2, this.game.height / 2, 'vendee');
    this.background.anchor.set(0.5);

    this.input.onDown.addOnce(() => {
      this.game.state.start('main');
    });
  }
}
