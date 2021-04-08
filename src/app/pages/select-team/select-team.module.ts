import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectTeamPageRoutingModule } from './select-team-routing.module';

import { SelectTeamPage } from './select-team.page';
import { AddTeamComponent } from './add-team/add-team.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectTeamPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SelectTeamPage, AddTeamComponent]
})
export class SelectTeamPageModule {}
