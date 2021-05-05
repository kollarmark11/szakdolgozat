import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/shared/firestore/firestore.service';
import { Player } from 'src/app/shared/interfaces/player.model';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
})
export class PlayerDetailComponent implements OnInit {
  @Input() playerId;
  @Input() actualId;

  playerData: Player;
  edit = false;
  addPlayerForm: FormGroup;
  imageUpload: AngularFireUploadTask;
  pictureUrl = '';
  path: any;
  filename: any;
  isUploadImage = false;

  constructor(
    private modalCtrl: ModalController,
    private firestore: AngularFirestore,
    private store: FirestoreService,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getData();
  }

  createForm(){
      this.addPlayerForm = this.fb.group({
        firstname: new FormControl(this.playerData.data.firstname, Validators.required),
        lastname: new FormControl(this.playerData.data.lastname, Validators.required),
        age: new FormControl(this.playerData.data.age, Validators.required),
        height: new FormControl(this.playerData.data.height),
        weight: new FormControl(this.playerData.data.weight),
        mainPosition: new FormControl(this.playerData.data.mainPosition),
        subPosition: new FormControl(this.playerData.data.subPosition),
        isInjured: new FormControl(this.playerData.data.isInjured),
        speed: new FormControl(this.playerData.data.speed),
        stamina: new FormControl(this.playerData.data.stamina),
        creativity: new FormControl(this.playerData.data.creativity),
        note: new FormControl(this.playerData.data.note, Validators.maxLength(200)),
        profilePicture: new FormControl(this.playerData.data.profilePicture)
      });
  }

  onCancel() {
    this.modalCtrl.dismiss(null);
  }

  async getData() {
    await this.firestore
      .collection('teams')
      .doc(this.actualId)
      .collection('players')
      .doc(this.playerId)
      .ref.get()
      .then((doc) => {
        this.playerData = new Player();
        this.playerData.id = doc.id;
        this.playerData.data = doc.data();
      });

      this.createForm();
  }

  deletePlayer() {
    this.store.deleteSubDoc(this.actualId, 'players', this.playerId);
    this.modalCtrl.dismiss('delete');
  }

  editData(){
    this.edit = !this.edit;
  }

  async uploadImg(event){
    const file = event.target.files;
    this.filename = file[0]

    if(this.filename.type.split('/')[0] !== "image"){
      console.error("ERROR")
      return;
    }

     this.path = `${new Date().getTime()}_${this.filename.name}`;

    let fileRef = this.storage.ref(this.path);
    this.isUploadImage = true;
  }

  async updateData(){

    if(this.isUploadImage){
      this.imageUpload = this.storage.upload(this.path, this.filename);
      await this.imageUpload.then(res => {
        let imgFile  = res.task.snapshot.ref.getDownloadURL();
        imgFile.then(downloadUrl => {
          this.addPlayerForm.value.profilePicture = downloadUrl;
          this.firestore.collection('teams').doc(this.actualId).collection('players').doc(this.playerId).update(this.addPlayerForm.value)
        })
      })
    } else {
      this.firestore.collection('teams').doc(this.actualId).collection('players').doc(this.playerId).update(this.addPlayerForm.value)
    }
    this.modalCtrl.dismiss('success');
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-alert-class',
      header: 'Játékos törlése',
      message: 'Biztosan törlöd a játékost?',
      buttons: [
        {
          text: 'Mégse',
          role: 'cancel'
        },
        {
          text: 'Törlés',
          role: 'Okay',
          cssClass: 'delete-button',
          handler: () => {
            this.deletePlayer();
            this.toast.presentToast('Sikeres Törlés!', 'danger')
          },

        }
      ],
    });
    await alert.present();
  }
}
