import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/shared/firestore/firestore.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { AddMatchComponent } from './add-match/add-match.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {
  actualId: string;
  everyMatch: any;
  addMatchModal: any;

  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService,
    private modalCtrl: ModalController,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.actualId = params.id;
    });
    this.firestore.getCollectionEveryData(this.actualId, 'matches');
    this.everyMatch = this.firestore.matches;
  }

  ionViewDidEnter() {
    this.getdata();
  }

  async getdata() {
    await this.firestore.getEveryMatch(this.actualId);
    this.everyMatch = this.firestore.matches;
  }

  async presentAddModal() {
    this.addMatchModal = await this.modalCtrl.create({
      component: AddMatchComponent,
      cssClass: 'add-player-modal',
      componentProps: {
        id: this.actualId,
      },
    });
    this.addMatchModal
      .onDidDismiss()
      .then((data) => {
        if (data.data != null) {
          this.firestore.getEveryMatch(this.actualId);
          this.everyMatch = this.firestore.matches;
        }
      });
    return await this.addMatchModal.present();
  }

  async presentDetailModal(id) {

    const modal = await this.modalCtrl.create({
      component: MatchDetailComponent,
      cssClass: 'player-detail-modal',
      componentProps: {
        matchId: id,
        actualId: this.actualId,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data === 'delete' || data.data === 'success') {
        this.everyMatch = [];
        this.firestore.getEveryMatch(this.actualId);
        this.everyMatch = this.firestore.matches;
      }
    });
    return await modal.present();
  }
}
