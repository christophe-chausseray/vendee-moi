import { View } from '../../Menu/View';

class AlertView extends View {
  private message: string;
  public template = _.template(`
    <img src="/assets/images/philippe.jpg"/>
    <span><%- message %></span>
  `);

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
      window.document.getElementById('alert').style.display = 'none';
      this.destroy();
    }.bind(this));
  }
}

class Philippe {
  say(sentence: string) {
    let alertDropZone = window.document.getElementById('alert');
    alertDropZone.style.display = 'block';
    const alertView = new AlertView(sentence);
    alertDropZone.appendChild(alertView.render().el);

    setTimeout(function () {
      alertView.destroy();
      alertDropZone.style.display = 'none';
    }, 5000);
  }
}

export var philippe = new Philippe();
