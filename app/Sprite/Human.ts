import { Human } from '../Model/Human/Human'
import { Female } from '../Model/Human/Female'
import { Gender } from '../Model/Human/Human'

import { ProstituteActivity } from '../Model/Activity/Prostitute'
import { imageProvider } from '../Service/Provider/ImageProvider'

export class HumanSprite extends Phaser.Sprite {
  private humanSprite: Phaser.Image;
  private nameSprite: Phaser.Text;
  private healthSprite: Phaser.TileSprite;
  private heartSprite: Phaser.Image;
  private teatSprite: Phaser.Image;
  private fertilitySprite: Phaser.TileSprite;
  private babySprite: Phaser.Image;
  private pregnancySprite: Phaser.TileSprite;
  private ageSprite: Phaser.Text;
  private consanguinitySprite: Phaser.Text;
  private whoreSprite: Phaser.Image;
  private workSprite: Phaser.TileSprite;
  private human: Human;

  constructor(game: Phaser.Game, x: number, y: number, human: Human) {
    super(game, x, y);
    this.human = human;
    this.inputEnabled = true;

    const columnWidth = 150;

    var gender = Gender.Female === human.getGender() ? 'female' : 'male';
    console.log(imageProvider.getImageIdentifier(human));
    const isTeen: boolean = this.human.getAge() <= 12 * 13;
    this.humanSprite = game.make.image(isTeen ? 0 : -10, isTeen ? 30 : 0, imageProvider.getImageIdentifier(human));
    this.humanSprite.scale.set(isTeen ? 0.4 : 0.5);

    this.nameSprite = game.make.text(
      columnWidth - 20,
      20,
      '',
      {
        font: '20px Press Start 2P',
        fill: '#ffffff',
        align: 'center'
      }
    );

    this.heartSprite = game.make.image(columnWidth - 26, 50, 'heart');
    this.heartSprite.scale.set(2);
    this.healthSprite = game.make.tileSprite(columnWidth - 24, 55, 100, 6, 'white', null);

    this.teatSprite = game.make.image(columnWidth - 26, 70, 'teat');
    this.teatSprite.scale.set(2);
    this.fertilitySprite = game.make.tileSprite(columnWidth - 24, 77, 100, 6, 'white', null);

    const subTextStyle = {
      font: '14px Press Start 2P',
      fill: '#ffffff',
      align: 'right'
    }
    this.consanguinitySprite = game.make.text(
      columnWidth + 190,
      26,
      '',
      subTextStyle
    );
    this.ageSprite = game.make.text(
      columnWidth + 240,
      26,
      '',
      subTextStyle
    );

    this.addChild(this.humanSprite);
    this.addChild(this.nameSprite);
    this.addChild(this.healthSprite);
    this.addChild(this.heartSprite);
    this.addChild(this.fertilitySprite);
    this.addChild(this.teatSprite);
    this.addChild(this.ageSprite);
    this.addChild(this.consanguinitySprite);

    if (this.human instanceof Female) {
      this.babySprite = game.make.image(columnWidth - 32, 95, 'baby');
      this.babySprite.scale.set(1.3);
      this.pregnancySprite = game.make.tileSprite(columnWidth - 24, 97, 100, 6, 'white', null);
      this.addChild(this.pregnancySprite);
      this.addChild(this.babySprite);
    }

    this.whoreSprite = game.make.image(columnWidth - 25, 91, 'whore');
    this.whoreSprite.scale.set(0.7);
    this.workSprite = game.make.tileSprite(columnWidth - 24, 97, 100, 6, 'white', null);
    this.addChild(this.workSprite);
    this.addChild(this.whoreSprite);
  }

  getHuman(): Human {
    return this.human;
  }

  update() {
    const barLength = 3;
    this.nameSprite.text = this.human.getName();

    const health = Math.round(this.human.getHealth());
    this.healthSprite.width = health * barLength;

    if (health >= 50) {
      this.healthSprite.tint = 0x00cda2;
    } else if (health >= 20) {
      this.healthSprite.tint = 0xb58600;
    } else if (health >= 0) {
      this.healthSprite.tint = 0xee0000;
    }

    const fertility = Math.round(this.human.getFertility() * 100);
    this.fertilitySprite.width = fertility * barLength;

    if (this.human instanceof Female) {
      let female = this.human as Female;
      if (female.isPregnant()) {
        this.pregnancySprite.width = (female.getEmbryo().getAge() + 9) / 9 * 100 * barLength;
        this.pregnancySprite.alpha = 1;
        this.babySprite.alpha = 1
      } else {
        this.pregnancySprite.width = 0;
        this.pregnancySprite.alpha = 0;
        this.babySprite.alpha = 0;
      }
    }

    this.ageSprite.text = Math.round(this.human.getAge() / 12) + 'yo';
    this.consanguinitySprite.text = this.human.getConsanguinity() + '/5';
    if (this.human.getActivity()) {
      if (this.human.getActivity() instanceof ProstituteActivity) {
        this.workSprite.width  = this.human.getActivity().getWorked() / this.human.getActivity().getDuration() * 100 * barLength
        this.workSprite.alpha  = 1;
        this.workSprite.tint  = 0xf8005f;
        this.whoreSprite.alpha = 1;
      } else {
        this.whoreSprite.alpha = 0;
      }
    } else {
      this.whoreSprite.alpha = 0;
      this.workSprite.alpha  = 0;
    }
  }
}
