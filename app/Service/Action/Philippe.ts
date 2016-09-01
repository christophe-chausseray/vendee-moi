import { AlertView } from '../../View/AlertView';

class Philippe {
  alertCount: number = 0;
  say(sentence: string, image: string = 'philippe') {
    this.alertCount++;
    let alertDropZone = window.document.getElementById('alert');
    alertDropZone.style.display = 'block';
    const alertView = new AlertView(sentence, image);
    alertDropZone.appendChild(alertView.render().el);

    var timeout = setTimeout(function () {
      this.alertCount--;
      alertView.destroy();
      if (0 === this.alertCount) {
        alertDropZone.style.display = 'none';
      }
    }.bind(this), 8000);

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
