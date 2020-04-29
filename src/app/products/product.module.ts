import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayerListComponent } from './player-list.component';
import { PlayerDetailComponent } from './player-detail.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'players', component: PlayerListComponent },
      {
        path: 'players/:id',
        component: PlayerListComponent
      }
    ]),
    CommonModule,
    FormsModule
  ],
  declarations: [
    PlayerListComponent,
    PlayerDetailComponent
  ]
})
export class ProductModule { }
