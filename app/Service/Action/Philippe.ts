import * as tsEvents from 'ts-events';
import { SyncEvent } from 'ts-events';
import { View } from '../../Menu/View';

class AlertView extends View {
  private message: string;
  public template = _.template(`
    <img src="/assets/images/philippe.jpg"/>
    <span><%- message %></span>
  `);

  public dismiss: SyncEvent<any> = new SyncEvent<any>();

  constructor(message: string) {
    super();

    this.message = message;
  }

  public className: string = 'message animated bounceIn';

  render() {
    this.el = this.createElement(this.template({
      message: this.message
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

class Philippe {
  alertCount: number = 0;
  say(sentence: string) {
    this.alertCount++;
    let alertDropZone = window.document.getElementById('alert');
    alertDropZone.style.display = 'block';
    const alertView = new AlertView(sentence);
    alertDropZone.appendChild(alertView.render().el);

    var timeout = setTimeout(function () {
      this.alertCount--;
      alertView.destroy();
      if (0 === this.alertCount) {
        alertDropZone.style.display = 'none';
      }
    }.bind(this), 5000);

    alertView.dismiss.attach(function () {
      clearTimeout(timeout);
      this.alertCount--;
      alertView.destroy();
      if (0 === this.alertCount) {
        alertDropZone.style.display = 'none';
      }
    }.bind(this));
  }
}

export var philippe = new Philippe();
