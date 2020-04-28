import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayerListComponent } from './player-list.component';
import { PlayerDetailComponent } from './player-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'players', component: PlayerListComponent },
      {
        path: 'players/:id',
        component: PlayerListComponent
      }
    ]),
    SharedModule
  ],
  declarations: [
    PlayerListComponent,
    PlayerDetailComponent
  ]
})
export class ProductModule { }
