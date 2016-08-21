export interface BirthGiverInterface {
  isPregnant(): boolean;
  shouldGiveBirth(): boolean;
  canGiveBirth(): boolean;
  giveBirth();
  setEmbryo(embryo);
}
