import * as tsEvents from 'ts-events';
import { SyncEvent } from 'ts-events';
import { View } from '../Menu/View';

export class AlertView extends View {
  private message: string;
  private image: string;
  public template = _.template(`
    <img src="/assets/images/<%- image %>.jpg"/>
    <span><%- message %></span>
  `);

  public dismiss: SyncEvent<any> = new SyncEvent<any>();

  constructor(message: string, image: string) {
    super();

    this.message = message;
    this.image   = image;
  }

  public className: string = 'message animated bounceIn';

  render() {
    this.el = this.createElement(this.template({
      message: this.message,
      image: this.image
    }));
    this.bindEvents();

    return this;
  }

  bindEvents() {
    this.el.addEventListener('click', function () {
      this.dismiss.post();
    }.bind(this));
  }
}
