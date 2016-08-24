import { ActivityInterface } from './Activity/ActivityInterface'

export interface WorkerInterface {
  work(activity: ActivityInterface): void;
  isWorking(): boolean;
  getActivity(): ActivityInterface;
}
