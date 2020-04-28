import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IPlayer } from './player';
import { PlayerService } from './player.service';

@Component({
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  pageTitle = 'Player Detail';
  errorMessage = '';
  product: IPlayer | undefined;
  playerName: string;
  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('name');
    this.playerName = param;
  }
}
