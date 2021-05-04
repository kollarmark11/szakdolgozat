import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { FirestoreService } from 'src/app/shared/firestore/firestore.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit {

  addTeamForm: FormGroup;
  uid: any;


  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private firestore: FirestoreService, private auth: AuthService) { }

  async ngOnInit() {
    await this.auth.currentUid();
    console.log(this.auth.uid)

    this.addTeamForm = this.fb.group({
      name: new FormControl('', Validators.required),
      uid: ''
    })

    console.log(this.addTeamForm)

  }

  ionViewDidEnter(){

  }

  onCancel(){
    this.modalCtrl.dismiss(null);
  }

  onSave(){
    this.addTeamForm.value.uid = localStorage.getItem('uid');
    if(this.addTeamForm.invalid) {

    } else {
      this.firestore.pushNewData(this.addTeamForm.value); // firestore hozzáadás
      this.modalCtrl.dismiss(this.addTeamForm.value) // ezt az adatot visszük ki a modal-ból
    }
  }
}
