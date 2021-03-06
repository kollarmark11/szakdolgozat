import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/shared/firestore/firestore.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { AddPlayerComponent } from './add-player/add-player.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  actualId: string;
  addPlayerModal: any;
  everyPlayer: any;

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private firestore: FirestoreService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.actualId = params.id;
    });

    this.firestore.getCollectionEveryData(this.actualId, 'players');
    this.everyPlayer = this.firestore.players;
  }

  async presentAddModal() {
    this.addPlayerModal = await this.modalCtrl.create({
      component: AddPlayerComponent,
      cssClass: 'add-modal',
      componentProps: {
        id: this.actualId,
      },
    });
    this.addPlayerModal
      .onDidDismiss() // HA bezárul a modal, az adatot megkapjuk és hozzáadjuk a teams tömbhöz
      .then((data) => {
        if (data.data != null) {
          this.firestore.getCollectionEveryData(this.actualId, 'players');
          this.everyPlayer = this.firestore.players;
        } else {
        }
      });
    return await this.addPlayerModal.present();
  }

  async presentDetailModal(id) {
    const modal = await this.modalCtrl.create({
      component: PlayerDetailComponent,
      cssClass: 'player-detail-modal',
      componentProps: {
        playerId: id,
        actualId: this.actualId,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data === 'delete' || data.data === 'success') {
        this.firestore.getCollectionEveryData(this.actualId, 'players');
        this.everyPlayer = this.firestore.players;
      }
    });
    return await modal.present();
  }

  async deletePlayer(playerId) {
    await this.firestore.deleteSubDoc(this.actualId, 'players', playerId);
    this.everyPlayer = [];
    this.firestore.players = [];
    this.firestore.getCollectionEveryData(this.actualId, 'players');
    this.everyPlayer = this.firestore.players;

    //KELL EGY POPUP vagymi, hogy sikeres elmentes
  }
}
