import type { LineInterface } from "../line/LineInterface";
import type { TrainInterface } from "./TrainInterface";

export interface TrainTravelInterface {
  travel: TravelInterface;
  trainId: number;
  userId: string;
  train: TrainInterface;
  lineId: number;
  
}

export interface TravelInterface {
  id: number;
  line: LineInterface;

  
}