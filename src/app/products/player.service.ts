import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IPlayer } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  static players: IPlayer[] = [];

  constructor(private http: HttpClient) { 
    console.log('Invoking Player Service Constructor');
  }

  static getPlayers(): IPlayer[] {
    if (PlayerService.players.length!=0) {
      return PlayerService.players;
    }
    else {
      PlayerService.players[0] = { playerId : 0 ,playerName: 'Bank' };
      PlayerService.players[1] = { playerId : 1 ,playerName: 'Player1' };
      PlayerService.players[2] = { playerId : 2 ,playerName: 'Player2' };
      PlayerService.players[3] = { playerId : 3 ,playerName: 'Player3' };
      return PlayerService.players;  
    }
  }

}
