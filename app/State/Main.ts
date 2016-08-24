import { Human } from '../Model/Human/Human';
import { Female } from '../Model/Human/Female';
import { Gender } from '../Model/Human/Human';
import { Male } from '../Model/Human/Male';

import { HumanSprite } from '../Sprite/Human';

import { HumanMenu } from '../Menu/Human';
import { HumanSelectorMenu } from '../Menu/Select';
import { Shop } from '../Menu/Shop';

import { BirthGiverInterface } from '../Model/BirthGiverInterface';

import { bed } from '../Service/Bed';
import { humanFactory } from '../Service/HumanFactory'
import { maternity } from '../Service/GameUpdater/Maternity'
import { life } from '../Service/GameUpdater/Life'
import { capitalism } from '../Service/GameUpdater/Capitalism'
import { morgue } from '../Service/GameUpdater/Morgue'

import { ProstituteActivity } from '../Model/Activity/Prostitute';

import { GameState } from './Game';

var origDragPoint = null;

export class Main extends Phaser.State {
  gameState: GameState;
  monthElapsedTimer;
  humanSprites = [];
  moneySprite: Phaser.Image;
  moneySound: Phaser.Sound;
  amountSprite: Phaser.Text;
  shopSprite: Phaser.Image;
  humansGroup: Phaser.Group;
  moneyEmitter;

  create() {
    this.stage.backgroundColor = 0x000000;

    var floor: Phaser.TileSprite = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'floor');
    this.amountSprite = this.game.add.text(this.game.world.centerX, 70, '', {
      font: '30px Press Start 2P',
      fill: '#ffffff',
      align: 'right'
    });
    this.shopSprite = this.game.add.image(this.game.width - 160, 30, 'money');
    this.shopSprite.animations.add('fly');
    this.shopSprite.scale.set(0.3);
    this.shopSprite.animations.play('fly', 8, true);
    this.shopSprite.inputEnabled = true;
    this.shopSprite.events.onInputDown.add(function () {
       this.openShop();
    }.bind(this));

    this.moneyEmitter = this.game.add.emitter(this.game.world.centerX, 70, 5);
    this.moneyEmitter.makeParticles('beer');
    this.moneyEmitter.gravity = -200;
    this.moneyEmitter.angle = Math.random();
    this.moneyEmitter.minParticleScale = 0.5;
    this.moneyEmitter.maxParticleScale = 1.2;
    this.moneySound = this.game.add.audio('money');

    this.moneySprite = this.game.add.image(this.game.world.centerX + 20, 22, 'beer');
    this.moneySprite.scale.set(0.7);
    this.moneySprite.alignTo(this.amountSprite, Phaser.LEFT_CENTER, 0, -5);

    floor.scale['setTo'](4, 4);

    this.monthElapsedTimer = this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 3000000, this.monthElapsed, this);

    this.humansGroup = this.game.add.group();

    this.gameState = new GameState();
    this.gameState.humans.push(humanFactory.create(null, null, Gender.Female, 17 * 12));
    this.gameState.humans.push(humanFactory.create(null, null, Gender.Male, 21 * 12));
    this.gameState.humans.push(humanFactory.create(null, null, Gender.Female, 14 * 12));
  }

  update() {
    this.displayHumans(this.gameState.humans);
    this.amountSprite.text = String(this.gameState.money);

    if (this.game.input.activePointer.isDown && !this.game.paused) {
      if (origDragPoint) {
        this.game.camera.y += origDragPoint.y - this.game.input.activePointer.position.y;
      }

      origDragPoint = this.game.input.activePointer.position.clone();
    } else {
      origDragPoint = null;
    }

    var count = 0;
    this.humansGroup.forEach(function (sprite) {
      if (-1 === this.gameState.humans.indexOf(sprite.human)) {
        this.humansGroup.remove(sprite);
        this.humanSprites.splice(sprite.human, 1);
      }

      sprite.position.set(10, count * (sprite.height * 4) + 140);
      count++;
    }, this);

    if (this.humansGroup.height + this.humansGroup.position.x + 400 > this.game.height) {
      this.game.world.resize(this.game.width, this.humansGroup.height + this.humansGroup.position.x + 400);
    }
  }

  monthElapsed(): void {
    const money = this.gameState.money;
    life.update(this.gameState);
    maternity.update(this.gameState);
    capitalism.update(this.gameState);
    morgue.update(this.gameState);

    if (money !== this.gameState.money) {
      this.moneyEmitter.start(false, 2000, 10, 5);
      this.moneySound.play();
    }

    this.moneySprite.alignTo(this.amountSprite, Phaser.LEFT_CENTER, 0, -5);
  }

  displayHumans(humans: Human[]) {
    for (let human of humans) {
      if (undefined === this.humanSprites[human.getId()]) {
        var humanSprite = new HumanSprite(this.game, 0, 0, human);
        humanSprite.scale.set(1.3);
        humanSprite.events.onInputDown.add(function (humanSprite) {
           this.openHumanDetails(humanSprite.getHuman());
        }.bind(this));
        this.humanSprites[human.getId()] = humanSprite;
        this.humansGroup.add(humanSprite);
      }

      this.humanSprites[human.getId()].update();
    }
  }

  openHumanDetails(human) {
    let humanMenu = new HumanMenu(human);
    this.openMenu(humanMenu);

    humanMenu.wantToEat.attach(function (human: Human) {
      this.closeMenu(humanMenu);
      this.openEatMenu(human);
    }.bind(this));
    humanMenu.wantToFuck.attach(function (human: Human) {
      this.closeMenu(humanMenu);
      this.openFuckMenu(human);
    }.bind(this));
    humanMenu.wantToProstitute.attach(function (human: Human) {
      human.work(new ProstituteActivity());
      this.closeMenu(humanMenu);
    }.bind(this));
    humanMenu.wantToCancel.attach(function (human: Human) {
      this.closeMenu(humanMenu);
    }.bind(this));
  }

  openEatMenu(human: Human) {
    let humanSelectorMenu = new HumanSelectorMenu(human, this.gameState.humans);
    this.openMenu(humanSelectorMenu);

    humanSelectorMenu.selected.attach(function (event) {
      event.human.eat(event.selected);
      event.selected.setHealth(0);

      this.closeMenu(humanSelectorMenu);
    }.bind(this));
  }

  openFuckMenu(human: Human) {
    let humanSelectorMenu = new HumanSelectorMenu(human, this.gameState.humans);
    this.openMenu(humanSelectorMenu);

    humanSelectorMenu.selected.attach(function (event) {
      bed.fuck(event.human, event.selected);
      this.closeMenu(humanSelectorMenu);
    }.bind(this));
  }

  openShop() {
    let shop = new Shop(this.gameState.money);
    this.openMenu(shop);

    shop.selected.attach(function (event) {

      this.closeMenu(shop);
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
