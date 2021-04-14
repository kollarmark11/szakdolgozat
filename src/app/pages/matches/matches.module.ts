import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchesPageRoutingModule } from './matches-routing.module';

import { MatchesPage } from './matches.page';
import { AddMatchComponent } from './add-match/add-match.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MatchesPage, AddMatchComponent, MatchDetailComponent]
})
export class MatchesPageModule {}
