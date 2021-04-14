import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/shared/firestore/firestore.service';
import { Match } from 'src/app/shared/interfaces/match.model';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss'],
})
export class MatchDetailComponent implements OnInit {
  @Input() matchId;
  @Input() actualId;

  matchData: Match;

  constructor(
    private firestore: AngularFirestore,
    private modalCtrl: ModalController,
    private database: FirestoreService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.getData();
    console.log(this.matchData);
  }

  async getData() {
    await this.firestore
      .collection('teams')
      .doc(this.actualId)
      .collection('matches')
      .doc(this.matchId)
      .ref.get()
      .then((doc) => {
        this.matchData = new Match();
        this.matchData.data = doc.data();
        console.log(this.matchData.data);
      });
  }

  onCancel() {
    this.modalCtrl.dismiss('cancel');
  }

  deleteMatch() {
    this.database.deleteSubDoc(this.actualId, 'matches', this.matchId);
    this.modalCtrl.dismiss('delete');

    //KELL EGY POPUP vagymi, hogy sikeres elmentes
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: [
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deleteMatch();
          },
        },
      ],
    });
    await alert.present();
  }
}
