import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/shared/firestore/firestore.service';
import { Player } from 'src/app/shared/interfaces/player.model';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
})
export class PlayerDetailComponent implements OnInit {
  @Input() playerId;
  @Input() actualId;

  playerData: Player;

  constructor(private modalCtrl: ModalController, private firestore: AngularFirestore, private store: FirestoreService) { }

  ngOnInit() {
    this.getData();
  }

  onCancel(){
    this.modalCtrl.dismiss(null)
  }

  async getData(){
    await this.firestore.collection('teams').doc(this.actualId).collection('players').doc(this.playerId).ref.get()
     .then(doc => {
       this.playerData = new Player();
       this.playerData.id = doc.id;
       this.playerData.data = doc.data();
     })
  }

  deletePlayer(){
    this.store.deleteSubDoc(this.actualId, 'players', this.playerId);
    this.modalCtrl.dismiss('delete')
  }

}
