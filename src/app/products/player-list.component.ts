import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlayer } from './player';
import { IAsset } from './Asset';
import { PlayerService } from './player.service';


@Component({
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
  providers: [PlayerService]
})
export class PlayerListComponent {
  pageTitle = 'Players';
  playerName: string = 'Player1';
  buyPrice: number;
  payPrice: number;
  assetName: string;
  isHouse: boolean;
  netValue: number = 0;
  players: IPlayer[] = [];
  currentPlayer: IPlayer;
  assets: IAsset[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private playerService: PlayerService) {
  }

  ngOnInit() {
    this.players = PlayerService.getPlayers();

    const param = this.route.snapshot.paramMap.get('id');
    if(param) {
      this.currentPlayer = this.players[param];
    }
    else {
      this.currentPlayer = this.players[0];
    }
  }

  isBuyDisabled() : boolean {

    if(this.currentPlayer.playerId===0 || (isNaN(this.buyPrice) || !this.assetName)) {
      return true;
    }
    return false;

  }

  isPayDisabled() : boolean {

    if(isNaN(this.payPrice)) {
      return true;
    }
    return false;

  }

  getPlayerPayList(): IPlayer[] {
    let payList:IPlayer[] = Array.from(this.players);
    payList = payList.filter(obj => (obj.playerId===0 || obj.playerId !== this.currentPlayer.playerId));
    return payList;
  }

  updateName() {
    const playerId = this.currentPlayer.playerId;
    PlayerService.getPlayers()[playerId].playerName = this.currentPlayer.playerName;
    const tempPlayers = PlayerService.getPlayers();
  }


}
