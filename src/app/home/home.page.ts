import { Component } from '@angular/core';
import { FirestoreService } from '../shared/firestore/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  allTeam: any;

  constructor(private fireservice: FirestoreService) {
    fireservice.getEveryData();
    this.allTeam = fireservice.teams
    console.log(this.allTeam)
  }

}
