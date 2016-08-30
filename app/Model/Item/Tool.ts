import { SelectableInterface } from './SelectableInterface'
import { ToolInterface } from '../ToolInterface'

export class Tool implements SelectableInterface, ToolInterface {
  public code: string;
  public price: number;
  public label: string;

  constructor(
    code: string,
    price: number,
    label: string
  ) {
    this.code  = code;
    this.price = price;
    this.label = label;
  }

  getId() {
    return this.code;
  }

  getLabel() {
    return this.label;
  }
}
