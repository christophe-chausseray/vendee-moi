import * as tsEvents from 'ts-events';
import { SyncEvent } from 'ts-events';

import _ = require("lodash");

import { View } from './View'

export class Shop extends View {
  private money: number;
  public template = _.template(`
    <ul>
      <li>The dog</li>
      <li>Pipou</li>
    </ul>
  `);
  public selected: SyncEvent<any> = new SyncEvent<any>();
  public className: string = 'shop animated bounceIn';

  constructor(money) {
    super();

    this.money = money;
  }

  render() {
    this.el = this.createElement(this.template({
      money: this.money
    }));
    this.bindEvents();

    return this;
  }

  triggerAction(event) {
    this.selected.post({
      item: event.currentTarget.dataset.item
    });
  }

  bindEvents() {
    var items = this.el.querySelectorAll('li');

    for (let item of items) {
      item.addEventListener('click', this.triggerAction.bind(this));
    }
  }
}
