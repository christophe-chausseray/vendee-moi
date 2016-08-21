import * as tsEvents from 'ts-events';
import { SyncEvent } from 'ts-events';

import _ = require("lodash");

import { Human } from '../Model/Human/Human'
import { FuckableInterface } from '../Model/FuckableInterface'
import { View } from './View'

export class FuckMenu extends View {
  private fucker: Human;
  private fuckables: FuckableInterface[];
  public template = _.template(`
    <ul>
      <% _.each(fuckables, function (fuckable) { %>
        <li data-name="<%- fuckable.getName() %>"><%- fuckable.getName() %></li>
      <% }) %>
      <li>The dog</li>
      <li>Pipou</li>
    </ul>
  `);

  constructor(fucker: Human, fuckables: FuckableInterface[]) {
    super();

    this.fucker    = fucker;
    this.fuckables = fuckables;
  }

  public wantToFuck: SyncEvent<any> = new SyncEvent<any>();
  public className: string = 'fuck-menu';

  render() {
    this.el = this.createElement(this.template({
      fuckables: this.fuckables.filter(function (fuckable: FuckableInterface) {
        return fuckable !== this.fucker;
      }.bind(this))
    }));
    this.bindEvents();

    return this;
  }

  triggerAction(event) {
    this.wantToFuck.post({
      fucker: this.fucker,
      fucked: _.find(this.fuckables, function (fuckable: Human) {
        return fuckable.getName() === event.currentTarget.dataset.name;
      })
    });
  }

  bindEvents() {
    var items = this.el.querySelectorAll('li');

    for (let item of items) {
      item.addEventListener('click', this.triggerAction.bind(this));
    }
  }
}
