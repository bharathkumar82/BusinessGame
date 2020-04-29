import { IAsset } from './Asset';

export interface IPlayer {
  playerId: number;
  playerName: string;
  assets: IAsset[];  
}


