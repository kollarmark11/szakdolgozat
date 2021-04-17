import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/shared/firestore/firestore.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent implements OnInit {
  @Input() id: string;

  addPlayerForm: FormGroup;
  players = [];
  imageUpload: AngularFireUploadTask;
  pictureUrl = '';

  constructor(
    private firestore: FirestoreService,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.addPlayerForm = this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      age: new FormControl(0, Validators.required),
      height: new FormControl(0),
      weight: new FormControl(0),
      mainPosition: new FormControl('Unknown'),
      subPosition: new FormControl('Unknown'),
      isInjured: new FormControl(false),
      speed: new FormControl(0),
      stamina: new FormControl(0),
      creativity: new FormControl(0),
      note: new FormControl('', Validators.maxLength(200)),
      profilePicture: new FormControl('')
    });
  }

  async uploadImg(event){
    const file = event.target.files;
    console.log(file)
    var fileName = file[0]
    console.log(fileName)

    if(fileName.type.split('/')[0] !== "image"){
      console.error("ERROR")
      return;
    }

    const path = `${new Date().getTime()}_${fileName.name}`;

    let fileRef = this.storage.ref(path);

    this.imageUpload = this.storage.upload(path, fileName);

    this.imageUpload.then(res => {
      let imgFile  = res.task.snapshot.ref.getDownloadURL();
      imgFile.then(downloadUrl => {
        console.log(downloadUrl)
        this.pictureUrl = downloadUrl;
      })
    })
  }

  addPlayer() {
    this.addPlayerForm.value.profilePicture = this.pictureUrl;
    console.log(this.addPlayerForm.value);
    this.firestore.pushDocData(this.id, 'players', this.addPlayerForm.value);
    this.modalCtrl.dismiss('success');
  }

  onCancel() {
    this.modalCtrl.dismiss(null);
  }
}
