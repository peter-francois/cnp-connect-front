import type { TrainInterface } from "./TrainInterface";

export interface LineInterface {
  id: number;
  name: string;
  trains?: TrainInterface[];
}
