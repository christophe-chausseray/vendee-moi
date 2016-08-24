import { ActivityInterface } from './ActivityInterface'

export class Activity implements ActivityInterface {
  protected duration:number;
  protected worked: number = 0;
  protected revenue: number;

  constructor(duration: number, revenue: number) {
    this.duration = duration;
    this.revenue  = revenue;
  }

  getDuration(): number {
    return this.duration;
  }

  getWorked(): number {
    return this.worked;
  }

  work() {
    this.worked++;
  }

  finished(): boolean {
    return this.duration === this.worked;
  }

  getRevenue(): number {
    return this.revenue;
  }
}
