import { SelectableInterface } from './SelectableInterface'
import { FoodInterface } from '../FoodInterface'

export class Good implements SelectableInterface, FoodInterface {
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

  nutritionalValue(): number {
    return this.price;
  }
}
