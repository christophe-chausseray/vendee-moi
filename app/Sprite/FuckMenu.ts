import { Human } from '../Model/Human/Human'
import { FuckableInterface } from '../Model/FuckableInterface'
import * as tsEvents from 'ts-events';
import { SyncEvent } from 'ts-events';

export class FuckMenuSprite extends Phaser.Sprite {
  private fucker: Human;
  private menu: Phaser.Group;

  public wantToFuck: SyncEvent<any> = new SyncEvent<any>();

  constructor(game: Phaser.Game, fuckables: FuckableInterface[], fucker: Human) {
    super(game, 0, 0);

    this.fucker = fucker;

    var blocker: Phaser.Sprite = this.game.make.sprite(0, 0, 'white');
    blocker.tint = 0x000000;
    blocker.height = this.game.height;
    blocker.width  = this.game.width;
    blocker.alpha = 0.5;
    this.addChild(blocker);

    this.menu = this.game.make.group();
    this.addChild(this.menu);

    var background: Phaser.Sprite = this.game.make.sprite(0, 0, 'white');
    background.height = this.game.height;
    background.width  = this.game.width;
    background.anchor.set(0.5);
    background.position.set(this.game.width / 2, this.game.height / 2 + this.game.camera.y);
    this.menu.add(background);

    var addedCount = 0;
    for (var fuckable of fuckables) {
      if (fuckable instanceof Human && fuckable !== fucker) {
        let fucked = fuckable;
        var fuckableSprite: Phaser.Text = this.game.make.text(0, 0, fuckable.getName(), {
          font: '30px Press Start 2P',
          fill: '#000000',
          align: 'center'
        });

        fuckableSprite.inputEnabled = true;
        fuckableSprite.anchor.set(0.5, 0);
        fuckableSprite.position.set(this.game.width / 2, addedCount * 50 + 50 + this.game.camera.y);
        fuckableSprite.events.onInputDown.add(function (fuckableSprite) {
          this.wantToFuck.post({fucker: fucker, fucked: fucked});
        }.bind(this));

        this.menu.add(fuckableSprite);
        addedCount++;
      }
    }
  }
}
