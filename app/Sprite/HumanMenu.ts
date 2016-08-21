import { Human } from '../Model/Human/Human'
import * as tsEvents from 'ts-events';
import { SyncEvent } from 'ts-events';

export class HumanMenuSprite extends Phaser.Sprite {
  private human: Human;
  private menu: Phaser.Group;
  private fuckSprite: Phaser.Text;
  private eatSprite: Phaser.Text;

  public wantToFuck: SyncEvent<Human> = new SyncEvent<Human>();
  public wantToEat: SyncEvent<Human> = new SyncEvent<Human>();

  constructor(game: Phaser.Game, human: Human) {
    super(game, 0, 0);
    let height = 400;

    this.human = human;

    var blocker: Phaser.Sprite = this.game.make.sprite(0, 0, 'white');
    blocker.tint = 0x000000;
    blocker.height = this.game.height;
    blocker.width  = this.game.width;
    blocker.alpha = 0.5;
    this.addChild(blocker);

    this.menu = this.game.make.group();
    this.menu.position.set(0, this.game.height - height + this.game.camera.y);
    this.addChild(this.menu);

    var background: Phaser.Sprite = this.game.make.sprite(0, 0, 'white');
    background.height = height;
    background.width  = this.game.width;

    this.menu.add(background);

    // Fuck item
    this.fuckSprite = game.make.text(0, 0, '-- Fuck --', {
      font: '30px Press Start 2P',
      fill: '#000000',
      align: 'center'
    });
    this.fuckSprite.inputEnabled = true;
    this.fuckSprite.anchor.set(0.5, 0);
    this.fuckSprite.position.set(this.game.width / 2, 20);
    this.fuckSprite.events.onInputDown.add(function () {
      this.wantToFuck.post(this.human);
    }.bind(this));
    this.menu.add(this.fuckSprite);

    // Eat item
    this.eatSprite = game.make.text(0, 0, '-- Eat --', {
      font: '30px Press Start 2P',
      fill: '#000000',
      align: 'center'
    });
    this.eatSprite.inputEnabled = true;
    this.eatSprite.anchor.set(0.5, 0);
    this.eatSprite.position.set(this.game.width / 2, 100);
    this.eatSprite.events.onInputDown.add(function () {
      this.wantToEat.post(this.human);
    }.bind(this));
    this.menu.add(this.eatSprite);
  }
}
