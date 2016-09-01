import * as tsEvents from 'ts-events';
import { SyncEvent } from 'ts-events';

import _ = require("lodash");

import { View } from './View'
import { Good } from '../Model/Item/Good'
import { Tool } from '../Model/Item/Tool'

import { imageProvider } from '../Service/Provider/ImageProvider'

export class Shop extends View {
  private money: number;
  private items = [
    new Good('bread', 2, 'Brioche'),
    new Good('broccoli', 20, 'Broccoli'),
    new Good('choux', 1, 'Choux'),
    new Good('coca', 1, 'Coca'),
    new Good('coffee', 2, 'Café'),
    new Good('kechup', 2, 'Kéchup'),
    new Good('spam', 2, 'Viande'),
    new Tool('condom', 5, 'Capote'),
    new Tool('renault', 100, 'R19')
  ];
  public template = _.template(`
    <h1>Superette <span>x</span></h1>
    <ul>
      <% _.each(items, function (item) { %>
        <li data-item="<%- item.code %>" style="background-image: url('<%- imageProvider.getImageUrl(item) %>')">
          <span class="price"><%- item.price %></span>
          <span class="label"><%- item.label %></span>
        </li>
      <% }) %>
    </ul>
  `);
  public selected: SyncEvent<any> = new SyncEvent<any>();
  public dismiss: SyncEvent<any> = new SyncEvent<any>();
  public className: string = 'shop animated bounceIn';

  constructor(money) {
    super();

    this.money = money;
  }

  render() {
    this.el = this.createElement(this.template({
      money: this.money,
      items: this.items,
      imageProvider: imageProvider
    }));
    this.bindEvents();

    return this;
  }

  triggerAction(event) {
    this.selected.post({
      item: _.find(this.items, {code: event.currentTarget.dataset.item})
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
