import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { FirestoreService } from 'src/app/shared/firestore/firestore.service';
import { Team } from 'src/app/shared/interfaces/team.model';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { AddTeamComponent } from './add-team/add-team.component';

@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.page.html',
  styleUrls: ['./select-team.page.scss'],
})
export class SelectTeamPage implements OnInit {
  teams: Team[];
  addTeamModal: any;

  constructor(
    private modalCtrl: ModalController,
    private firestore: FirestoreService,
    private auth: AuthService,
    private loader: LoaderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.teams = this.firestore.teams;
    this.loader.showLoader('Loading');
    this.firestore.getEveryData()
    .then(() => {
      console.log(this.firestore.teams)
      this.teams = this.firestore.teams;
      this.loader.hideLoader();
    });


  }

  ionViewDidEnter(){
    if(!localStorage.getItem('uid')){
      this.router.navigateByUrl('/login')
    }
  }

  doRefresh(){
    this.teams = [];
    this.firestore.teams = [];
    this.loader.showLoader('Refresh');
    this.getEveryTeamData().then(() => {
      this.teams = this.firestore.teams
      this.loader.hideLoader();
    })
  }

  async presentAddTeamModal() {
    // MODAL PRESENT
    this.addTeamModal = await this.modalCtrl.create({
      component: AddTeamComponent,
      cssClass: 'team-modal',
    });
    this.addTeamModal
      .onDidDismiss() // HA bezárul a modal, az adatot megkapjuk és hozzáadjuk a teams tömbhöz
      .then((data) => {
        if (data.data != null) {
          // kihozott adatot vizsgáljuk, ha null az érték, akkor marad minden
          this.getEveryTeamData()
          this.teams = this.firestore.teams;
        }
      });
    return await this.addTeamModal.present();
  }

  async getEveryTeamData() {
    // MINDEN adatot kikérünk, hogy felsoroljuk a csapatokat
    await this.firestore.getEveryData();
  }

  onLogout() {
    this.auth.logout();
  }
}
