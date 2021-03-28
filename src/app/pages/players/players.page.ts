import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/shared/firestore/firestore.service';
import { AddPlayerComponent } from './add-player/add-player.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  actualId: string;
  addPlayerModal: any;
  everyPlayer: any;

  constructor(private route: ActivatedRoute, private modalCtrl: ModalController, private firestore: FirestoreService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.actualId = params.id;
    })

    this.firestore.getCollectionEveryData(this.actualId, 'players');
    this.everyPlayer = this.firestore.players;
    console.log(this.everyPlayer)
  }

  async presentAddModal(){
    this.addPlayerModal = await this.modalCtrl.create({
      component: AddPlayerComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        id: this.actualId
      }
    });
    this.addPlayerModal.onDidDismiss()  // HA bezárul a modal, az adatot megkapjuk és hozzáadjuk a teams tömbhöz
      .then((data) => {
        if(data.data != null) {
          this.firestore.getCollectionEveryData(this.actualId, 'players');
          this.everyPlayer = this.firestore.players;
        } else {
        }
      })
    return await this.addPlayerModal.present();
  }

}
