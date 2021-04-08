import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayersPageRoutingModule } from './players-routing.module';

import { PlayersPage } from './players.page';
import { AddPlayerComponent } from './add-player/add-player.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PositionPipe } from 'src/app/pipes/position.pipe';
import { InjuredPipe } from 'src/app/pipes/injured.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayersPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PlayersPage, PlayerDetailComponent, PositionPipe, InjuredPipe],
  entryComponents: [AddPlayerComponent]
})
export class PlayersPageModule {}
