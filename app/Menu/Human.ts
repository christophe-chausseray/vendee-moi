import * as tsEvents from 'ts-events';
import { SyncEvent } from 'ts-events';

import _ = require('lodash');

import { Human } from '../Model/Human/Human'
import { View } from './View'

export class HumanMenu extends View {
  private human: Human;
  public template = _.template(`
    <ul>
      <li data-action="fuck">Fuck</li>
      <li data-action="eat">Eat</li>
      <li data-action="prostitute">Prostitute</li>
    </ul>
  `);

  constructor(human: Human) {
    super();

    this.human = human;
  }

  public wantToFuck: SyncEvent<Human> = new SyncEvent<Human>();
  public wantToEat: SyncEvent<Human> = new SyncEvent<Human>();
  public wantToProstitute: SyncEvent<Human> = new SyncEvent<Human>();
  public className: string = 'human-menu';

  render() {
    this.el = this.createElement(this.template({}));
    this.bindEvents();

    return this;
  }

  triggerAction(event) {
    switch (event.currentTarget.dataset.action) {
      case 'eat':
        this.wantToEat.post(this.human);
        break;
      case 'fuck':
        this.wantToFuck.post(this.human);
        break;
      case 'prostitute':
        this.wantToProstitute.post(this.human);
        break;
    }
  }

  bindEvents() {
    var items = this.el.querySelectorAll('li');

    for (let item of items) {
      item.addEventListener('click', this.triggerAction.bind(this));
    }
  }
}
