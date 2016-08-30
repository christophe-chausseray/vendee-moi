import * as tsEvents from 'ts-events';
import { SyncEvent } from 'ts-events';

import _ = require("lodash");

import { View } from './View'
import { Good } from '../Model/Item/Good'

import { imageProvider } from '../Service/Provider/ImageProvider'

export class Fridge extends View {
  private items = [];
  public template = _.template(`
    <h1>Frigo <span>x</span></h1>
    <ul>
      <% _.each(items, function (item) { %>
        <li data-item="<%- item.getId() %>" style="background-image: url('<%- imageProvider.getImageUrl(item) %>')">
          <span class="label"><%- item.label %></span>
        </li>
      <% }) %>
    </ul>
  `);
  public selected: SyncEvent<any> = new SyncEvent<any>();
  public dismiss: SyncEvent<any> = new SyncEvent<any>();
  public className: string = 'inventory animated bounceIn';

  constructor(items) {
    super();

    this.items = items;
  }

  render() {
    this.el = this.createElement(this.template({
      items: this.items,
      imageProvider: imageProvider
    }));
    this.bindEvents();

    return this;
  }

  triggerAction(event) {
    this.selected.post({
      selected: _.find(this.items, function (item: any) {
        return item.getId() == event.currentTarget.dataset.item;
      })
    });
  }

  bindEvents() {
    var items = this.el.querySelectorAll('li');

    for (let item of items) {
      item.addEventListener('click', this.triggerAction.bind(this));
    }

    var close = this.el.querySelector('h1 span').addEventListener('click', function () {
      this.dismiss.post();
    }.bind(this));
  }
}
