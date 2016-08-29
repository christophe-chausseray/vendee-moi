export class Good {
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
}
