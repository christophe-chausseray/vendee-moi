/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

import { Boot } from './State/Boot';
import { Preload } from './State/Preload';
import { Menu } from './State/Menu';
import { Main } from './State/Main';

class Game extends Phaser.Game {
  constructor() {
    super(640, 480, Phaser.AUTO, 'game-div');

    this.state.add('boot', Boot);
    this.state.add('preload', Preload);
    this.state.add('menu', Menu);
    this.state.add('main', Main);

    this.state.start('boot');
  }
}

var game = new Game();
