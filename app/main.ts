/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts" />
/// <reference path="../typings/modules/lodash/index.d.ts"/>

import { Boot } from './State/Boot';
import { Preload } from './State/Preload';
import { Menu } from './State/Menu';
import { Main } from './State/Main';

class Game extends Phaser.Game {
  constructor() {
    super(640, 1136, Phaser.AUTO, 'game-div', null, false, false);

    this.state.add('boot', Boot);
    this.state.add('preload', Preload);
    this.state.add('menu', Menu);
    this.state.add('main', Main);

    this.state.start('boot');
  }
}

var game = new Game();

Phaser.Canvas.setImageRenderingCrisp(game.canvas);  //for Canvas, modern approach
Phaser.Canvas.setSmoothingEnabled(game.context, false);  //also for Canvas, legacy approach
