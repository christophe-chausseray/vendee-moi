import * as tsEvents from 'ts-events';
import { SyncEvent } from 'ts-events';

import _ = require("lodash");

import { Human } from '../Model/Human/Human'
import { View } from './View'

import { imageProvider } from '../Service/Provider/ImageProvider'

export class SelectorMenu extends View {
  private item: any;
  private items: any[];
  public template = _.template(`
    <ul>
      <% _.each(items, function (item) { %>
        <li data-id="<%- item.getId() %>" style="background-image: url('<%- imageProvider.getImageUrl(item) %>')">
          <span><%- item.getLabel() %></span>
        </li>
      <% }) %>
    </ul>
  `);
  public selected: SyncEvent<any> = new SyncEvent<any>();
  public className: string = 'select-menu animated bounceIn';

  constructor(item: any, items: any[]) {
    super();

    this.item  = item;
    this.items = items;
  }


  render() {
    this.el = this.createElement(this.template({
      items: this.items.filter(function (item: any) {
        return item !== this.item;
      }.bind(this)),
      imageProvider: imageProvider
    }));
    this.bindEvents();

    return this;
  }

  triggerAction(event) {
    this.selected.post({
      item: this.item,
      selected: _.find(this.items, function (item: any) {
        return item.getId() == event.currentTarget.dataset.id;
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
