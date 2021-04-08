import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/shared/firestore/firestore.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit {

  addTeamForm: FormGroup;


  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private firestore: FirestoreService) { }

  ngOnInit() {
    this.addTeamForm = this.fb.group({
      name: new FormControl('', Validators.required)
    })
  }

  onCancel(){
    this.modalCtrl.dismiss(null);
  }

  onSave(){
    if(this.addTeamForm.invalid) {

    } else {
      this.firestore.pushNewData(this.addTeamForm.value); // firestore hozzáadás
      this.modalCtrl.dismiss(this.addTeamForm.value) // ezt az adatot visszük ki a modal-ból
    }

  }

}
