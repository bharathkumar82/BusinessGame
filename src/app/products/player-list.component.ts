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
  renameField: string;
  isHouse: boolean;
  netValue: number = 0;
  players: IPlayer[] = [];
  currentPlayer: IPlayer;
  assetNameDlt: string;
  selectedPayPlayer: string = '1';
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router, private playerService: PlayerService) {
  }

  ngOnInit() {
    this.players = this.playerService.getPlayers();

    const param = this.route.snapshot.paramMap.get('id');
    if(param) {
      this.currentPlayer = this.players[param];
    }
    else {
      this.currentPlayer = this.players[0];
    }
    this.renameField = this.currentPlayer.playerName;
    this.updateNetValue();

    
  }

  updateNetValue() {
    //this.netValue = this.currentPlayer.assets.map((a) => a.value).reduce(((a,b)=> (a+b)),0);
    this.netValue = 0;
    this.currentPlayer.assets.forEach(ast => {
      console.log(ast.value + "  " + isNaN(ast.value));

      this.netValue = this.netValue + Number(ast.value);
    });

    console.log(this.netValue);
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
    payList = payList.filter(obj => (obj.playerId !== this.currentPlayer.playerId));
    return payList;
  }


  updateName() {
    const playerId = this.currentPlayer.playerId;
    this.currentPlayer.playerName = this.renameField;
    this.playerService.storePlayersOnLocalStorage(this.players);
  }

  resetGame() {
    this.playerService.resetStorage();

  }

  buyAsset() {

    const cashAstCurrent = this.currentPlayer.assets.find(ast => ast.assetName==="Cash");
    if(Number(cashAstCurrent.value)>=Number(this.buyPrice)) {
      cashAstCurrent.value = Number(cashAstCurrent.value) - Number(this.buyPrice);
    }
    else
    {
      this. errorMessage ="Amount not available";
      return;
    }
        

    const assets = this.currentPlayer.assets;
    assets.push({assetName: this.assetName, value: this.buyPrice });
    this.updateNetValue();
    this.playerService.storePlayersOnLocalStorage(this.players);
    this.assetName ="";
  }

  deleteAsset() {

    const assets = this.currentPlayer.assets;
    this.currentPlayer.assets = assets.filter(at => (at.assetName!=this.assetNameDlt));
    this.updateNetValue();
    this.playerService.storePlayersOnLocalStorage(this.players);
    this.assetNameDlt ="";
  }

  payPlayer() {
    console.log(this.selectedPayPlayer);
    const cashAstCurrent = this.currentPlayer.assets.find(ast => ast.assetName==="Cash");
    if(Number(cashAstCurrent.value)>=Number(this.payPrice)) {
      cashAstCurrent.value = Number(cashAstCurrent.value) - Number(this.payPrice);
    }
    else
    {
      this. errorMessage ="Amount not available";
      return;
    }
        

    const tplayer = this.players.find(player => player.playerId===Number(this.selectedPayPlayer));
    const cashAst = tplayer.assets.find(ast => ast.assetName==="Cash");
    cashAst.value = Number(cashAst.value) + Number(this.payPrice);
    this.playerService.storePlayersOnLocalStorage(this.players);
    this.payPrice = null;
    this.updateNetValue();
  }


}
