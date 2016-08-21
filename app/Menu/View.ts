
export class View {
  public tagName = 'div';
  public el: any;
  public className: string = '';

  render() {
    return this;
  }

  createElement(html: string) {
    var domElement = document.createElement(this.tagName);
    domElement.innerHTML = html;
    domElement.className = this.className;
    return domElement;
  }

  destroy() {
    if(this.el) {
      this.el.parentNode.removeChild(this.el);
    }
  }
}
