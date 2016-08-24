import * as tsEvents from 'ts-events';
import { SyncEvent } from 'ts-events';

import _ = require("lodash");

import { Human } from '../Model/Human/Human'
import { View } from './View'

export class HumanSelectorMenu extends View {
  private human: Human;
  private humans: Human[];
  public template = _.template(`
    <ul>
      <% _.each(humans, function (human) { %>
        <li data-id="<%- human.getId() %>"><%- human.getName() %></li>
      <% }) %>
      <li>The dog</li>
      <li>Pipou</li>
    </ul>
  `);
  public selected: SyncEvent<any> = new SyncEvent<any>();
  public className: string = 'fuck-menu animated bounceIn';

  constructor(human: Human, humans: Human[]) {
    super();

    this.human = human;
    this.humans  = humans;
  }


  render() {
    this.el = this.createElement(this.template({
      humans: this.humans.filter(function (human: Human) {
        return human !== this.human;
      }.bind(this))
    }));
    this.bindEvents();

    return this;
  }

  triggerAction(event) {
    this.selected.post({
      human: this.human,
      selected: _.find(this.humans, function (human: Human) {
        return human.getId() === parseInt(event.currentTarget.dataset.id);
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
