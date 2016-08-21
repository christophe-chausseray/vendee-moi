import { Human } from '../Model/Human/Human';
import { Female } from '../Model/Human/Female';
import { Gender } from '../Model/Human/Human';
import { Male } from '../Model/Human/Male';

import { HumanSprite } from '../Sprite/Human';
import { HumanMenuSprite } from '../Sprite/HumanMenu';
import { FuckMenuSprite } from '../Sprite/FuckMenu';

import { HumanMenu } from '../Menu/Human';
import { FuckMenu } from '../Menu/Fuck';

import { BirthGiverInterface } from '../Model/BirthGiverInterface';

import { bed } from '../Service/Bed';
import { humanFactory } from '../Service/HumanFactory'

import { GameState } from './Game';

var origDragPoint = null;
declare var floor  ;
export class Main extends Phaser.State {
  gameState: GameState;
  monthElapsedTimer;
  humanSprites = [];

  create() {
    this.stage.backgroundColor = 0x000000;
    this.game.world.resize(this.game.world.width, 2000);

    var floor: Phaser.TileSprite = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'floor')

    floor.scale.setTo(2, 2);
    this.monthElapsedTimer = this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 3000000, this.monthElapsed, this);

    this.gameState = new GameState();
    this.gameState.creatures.push(humanFactory.create(null, null, Gender.Female, 17 * 12))
    this.gameState.creatures.push(humanFactory.create(null, null, Gender.Male, 21 * 12))
    this.gameState.creatures.push(humanFactory.create(null, null, Gender.Female, 14 * 12))

    this.game.time.events.repeat(Phaser.Timer.SECOND * 100, 1000, this.randomEat, this);
  }

  update() {
    this.displayHumans(this.gameState.creatures);

    if (this.game.input.activePointer.isDown && !this.game.paused) {
      if (origDragPoint) {
        this.game.camera.y += origDragPoint.y - this.game.input.activePointer.position.y;
      }

      origDragPoint = this.game.input.activePointer.position.clone();
    } else {
      origDragPoint = null;
    }
  }

  monthElapsed(): void {
    for (var human of this.gameState.creatures) {
      human.ages(1);
      human.setHealth(human.getHealth() - human.getAge() / (100 * 12));

      if (human instanceof Female && human.shouldGiveBirth()) {
        this.gameState.creatures.push(human.giveBirth());
      }
    }
  }

  destroyHuman(human: Human): void {
    var index = this.gameState.creatures.indexOf(human, 0);
    if (index > -1) {
      this.gameState.creatures.splice(index, 1);
    }
  }

  displayHumans(humans: Human[]) {
    var count = 0;
    var humansGroup = this.game.make.group();

    for (let human of humans) {
      if (undefined === this.humanSprites[count]) {

        var humanSprite = new HumanSprite(this.game, 0, 0, human, count + 1);
        humanSprite.position.set(0, count * (humanSprite.height * 4 + 10) + 40);
        humanSprite.events.onInputDown.add(function (humanSprite) {
           this.openHumanDetails(humanSprite.getHuman());
        }.bind(this));
        humansGroup.add(humanSprite);
        this.humanSprites[count] = humanSprite;
      }

      this.humanSprites[count].update();

      count++;
    }

    this.game.add.existing(humansGroup);
  }

  openHumanDetails(human) {
    let humanMenu = new HumanMenu(human);
    this.openMenu(humanMenu);

    humanMenu.wantToEat.attach(function (human: Human) {
      this.openEatMenu(human);
      this.closeMenu(humanMenu);
    }.bind(this));
    humanMenu.wantToFuck.attach(function (human: Human) {
      this.closeMenu(humanMenu);
      this.openFuckMenu(human);
    }.bind(this));
  }

  openEatMenu(human: Human) {

  }

  openFuckMenu(human: Human) {
    let fuckMenu = new FuckMenu(human, this.gameState.creatures);
    this.openMenu(fuckMenu);

    fuckMenu.wantToFuck.attach(function (event) {
      bed.fuck(event.fucker, event.fucked);
      this.closeMenu(fuckMenu);
    }.bind(this));
  }

  openMenu(menu) {
    this.game.paused = true;
    let menuDropZone = window.document.getElementById('menu');
    menuDropZone.appendChild(menu.render().el);
    menuDropZone.style.display = 'block';
  }

  closeMenu(menu) {
    this.game.paused = false;
    let menuDropZone = window.document.getElementById('menu');
    menuDropZone.style.display = 'none';
    menu.destroy();
  }
}
