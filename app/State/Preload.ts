declare var WebFont;

export class Preload extends Phaser.State {
  private preloadBar: Phaser.Sprite;

  preload() {
    this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
    this.load.setPreloadSprite(this.preloadBar);
    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    this.load.image('menu-background', 'assets/images/coeur-vendeen.png');
    this.load.image('white', 'assets/images/white.png');
    this.load.image('heart', 'assets/images/heart.png');
    this.load.image('teat', 'assets/images/teat.png');
    this.load.image('floor', 'assets/images/floor.png');
    this.load.image('baby', 'assets/images/baby.png');

    for (var i = 1; i < 25; i++) {
      this.load.image('male_' + i, 'assets/images/male/' + i + '.png');
      this.load.image('female_' + i, 'assets/images/female/' + i + '.png');
    }

    WebFont.load({
      google: {
        families: ['Press Start 2P']
      }
    });
  }

  create() {
    this.game.state.start('menu');
  }
}
