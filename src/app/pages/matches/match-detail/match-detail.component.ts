import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/shared/firestore/firestore.service';
import { Match } from 'src/app/shared/interfaces/match.model';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss'],
})
export class MatchDetailComponent implements OnInit {
  @Input() matchId;
  @Input() actualId;

  goalkeepersArray = [];
  rightBacksArray = [];
  leftBacksArray = [];
  centreBacksArray = [];
  midfieldersArray = [];
  leftWingersArray = [];
  rightWingersArray = [];
  strikersArray = [];

  matchData: Match;
  edit = false;
  addMatchForm: FormGroup;
  everyPlayer: any;

  constructor(
    private firestore: AngularFirestore,
    private modalCtrl: ModalController,
    private database: FirestoreService,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private fireService: FirestoreService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.fireService.getCollectionEveryData(this.actualId, 'players');
    this.everyPlayer = this.fireService.players;
    this.getData();
  }

  async ionViewDidEnter() {
    await this.getPositions();
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
      });

    await this.createForm();
  }

  createForm() {
    this.addMatchForm = this.fb.group({
      name: new FormControl(this.matchData.data.name, Validators.required),
      opponent: new FormControl(
        this.matchData.data.opponent,
        Validators.required
      ),
      yourGoals: new FormControl(this.matchData.data.yourGoals),
      opponentGoals: new FormControl(this.matchData.data.opponentGoals),
      date: new FormControl(this.matchData.data.date, Validators.required),
      note: new FormControl(this.matchData.data.note),
      goalkeeper: new FormControl(this.matchData.data.goalkeeper),
      rightBacks: new FormControl(this.matchData.data.rightBacks),
      leftBacks: new FormControl(this.matchData.data.leftBacks),
      centreBacks: new FormControl(this.matchData.data.centreBacks),
      midfielders: new FormControl(this.matchData.data.midfielders),
      rightWingers: new FormControl(this.matchData.data.rightWingers),
      leftWingers: new FormControl(this.matchData.data.leftWingers),
      strikers: new FormControl(this.matchData.data.strikers),
    });
  }

  onCancel() {
    this.modalCtrl.dismiss('cancel');
  }

  deleteMatch() {
    this.database.deleteSubDoc(this.actualId, 'matches', this.matchId);
    this.modalCtrl.dismiss('delete');
  }

  editData() {
    let number =
      this.addMatchForm.value.centreBacks.length +
      this.addMatchForm.value.leftBacks.length +
      this.addMatchForm.value.rightBacks.length +
      this.addMatchForm.value.centreBacks.length +
      this.addMatchForm.value.midfielders.length +
      this.addMatchForm.value.rightWingers.length +
      this.addMatchForm.value.leftWingers.length +
      this.addMatchForm.value.strikers.length;

    if (number === 11 && this.addMatchForm.valid) {
      this.firestore
        .collection('teams')
        .doc(this.actualId)
        .collection('matches')
        .doc(this.matchId)
        .update(this.addMatchForm.value);
      this.modalCtrl.dismiss('success');
      this.toast.presentToast('Successfully match adding!', 'success');
    } else if (this.addMatchForm.invalid) {
      this.toast.presentToast('Please fill every field!', 'danger');
    } else if (number != 11) {
      this.toast.presentToast('Please pick exactly 11 player!', 'danger');
    }
  }

  onEdit() {
    this.edit = !this.edit;
  }

  getPositions() {
    for (let i = 0; i < this.everyPlayer.length; i++) {
      if (this.everyPlayer[i].data.mainPosition === 'gk')
        this.goalkeepersArray.push(this.everyPlayer[i]);
    }

    for (let i = 0; i < this.everyPlayer.length; i++) {
      if (
        this.everyPlayer[i].data.mainPosition === 'rb' ||
        this.everyPlayer[i].data.mainPosition === 'rwb'
      )
        this.rightBacksArray.push(this.everyPlayer[i]);
    }

    for (let i = 0; i < this.everyPlayer.length; i++) {
      if (
        this.everyPlayer[i].data.mainPosition === 'lb' ||
        this.everyPlayer[i].data.mainPosition === 'lwb'
      )
        this.leftBacksArray.push(this.everyPlayer[i]);
    }

    for (let i = 0; i < this.everyPlayer.length; i++) {
      if (this.everyPlayer[i].data.mainPosition === 'cb')
        this.centreBacksArray.push(this.everyPlayer[i]);
    }

    for (let i = 0; i < this.everyPlayer.length; i++) {
      if (
        this.everyPlayer[i].data.mainPosition === 'cm' ||
        this.everyPlayer[i].data.mainPosition === 'cam' ||
        this.everyPlayer[i].data.mainPosition === 'cdm'
      )
        this.midfieldersArray.push(this.everyPlayer[i]);
    }

    for (let i = 0; i < this.everyPlayer.length; i++) {
      if (
        this.everyPlayer[i].data.mainPosition === 'lm' ||
        this.everyPlayer[i].data.mainPosition === 'lw'
      )
        this.leftWingersArray.push(this.everyPlayer[i]);
    }

    for (let i = 0; i < this.everyPlayer.length; i++) {
      if (
        this.everyPlayer[i].data.mainPosition === 'rm' ||
        this.everyPlayer[i].data.mainPosition === 'rw'
      )
        this.rightWingersArray.push(this.everyPlayer[i]);
    }

    for (let i = 0; i < this.everyPlayer.length; i++) {
      if (
        this.everyPlayer[i].data.mainPosition === 'st' ||
        this.everyPlayer[i].data.mainPosition === 'cf'
      )
        this.strikersArray.push(this.everyPlayer[i]);
    }
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-alert-class',
      header: 'Törlés',
      message: 'Biztosan törli a mérkőzést?',
      buttons: [
        {
          text: 'Mégse',
          role: 'cancel',
        },
        {
          text: 'Törlés',
          role: 'Okay',
          cssClass: 'delete-button',
          handler: () => {
            this.deleteMatch();
            this.toast.presentToast('Sikeres Törlés!', 'danger');
          },
        },
      ],
    });
    await alert.present();
  }
}
