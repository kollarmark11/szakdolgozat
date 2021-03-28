import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { FirestoreService } from 'src/app/shared/firestore/firestore.service';
import { Team } from 'src/app/shared/team.model';
import { AddTeamComponent } from './add-team/add-team.component';

@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.page.html',
  styleUrls: ['./select-team.page.scss'],
})
export class SelectTeamPage implements OnInit {

  teams: Team[];
  addTeamModal: any;

  constructor(private modalCtrl: ModalController, private firestore: FirestoreService, private auth: AuthService) { }

  ngOnInit() {
    this.teams = this.firestore.teams;
  }

  async presentAddTeamModal(){  // MODAL PRESENT
    this.addTeamModal = await this.modalCtrl.create({
      component: AddTeamComponent,
      cssClass: 'my-custom-class'
    });
    this.addTeamModal.onDidDismiss()  // HA bezárul a modal, az adatot megkapjuk és hozzáadjuk a teams tömbhöz
      .then((data) => {
        if(data.data != null) { // kihozott adatot vizsgáljuk, ha null az érték, akkor marad minden
          this.getEveryTeamData()
          console.log(this.teams)
          this.teams = this.firestore.teams;
        } else {
        }
      })
    return await this.addTeamModal.present();
  }

  async getEveryTeamData(){ // MINDEN adatot kikérünk, hogy felsoroljuk a csapatokat
    await this.firestore.getEveryData();

  }

  onLogout(){
    this.auth.logout();
  }

  selectTeam(item){
    console.log(item.id)
  }



}
