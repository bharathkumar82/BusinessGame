import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { IPlayer } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  STORAGE_KEY = 'businessgame_players';
  players: IPlayer[] = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { 
    console.log('Invoking Player Service Constructor');
  }

   getPlayers(): IPlayer[] {
    if (this.players.length!=0) {
      return this.players;
    }
    else {
      const tempPlayList = this.storage.get(this.STORAGE_KEY) || [];
      
      if (tempPlayList.length!=0) {
        const tList = JSON.parse(tempPlayList);
        this.players = tList;
        return this.players;
      }
  
      this.resetStorage();
      return this.players;  
    }
  }



  private initializePlayers() {
    this.players[0] = { playerId: 0, playerName: 'Bank', assets: [{ assetName: 'Cash', value: 1000000 }] };
    this.players[1] = { playerId: 1, playerName: 'Player1', assets: [{ assetName: 'Cash', value: 0 }] };
    this.players[2] = { playerId: 2, playerName: 'Player2', assets: [{ assetName: 'Cash', value: 0 }] };
    this.players[3] = { playerId: 3, playerName: 'Player3', assets: [{ assetName: 'Cash', value: 0 }] };
  }

  public storePlayersOnLocalStorage(players: IPlayer[]): void {
          
    // get array of tasks from local storage
    //const playerList = this.storage.get(this.STORAGE_KEY) || [];          // push new task to array
    //playerList.push(players);          // insert updated array to local storage
    this.storage.set(this.STORAGE_KEY, JSON.stringify(players));          
    console.log(this.storage.get(this.STORAGE_KEY) || 'LocaL storage is empty');     
  }


  public resetStorage(): void {
    const playerList = [];      
    this.initializePlayers();
    //playerList.push(this.players); 
    this.storage.set(this.STORAGE_KEY, JSON.stringify(this.players));          
    console.log(this.storage.get(this.STORAGE_KEY) || 'LocaL storage is empty');     
  }
}
