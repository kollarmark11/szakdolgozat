import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  constructor(private firestore: FirestoreService, private fb: FormBuilder, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.addPlayerForm = this.fb.group({
      name: new FormControl(''),
      age: new FormControl('')
    })


  }

  addPlayer(){
    this.firestore.pushDocData(this.id, this.addPlayerForm.value)
    this.modalCtrl.dismiss('success')
  }

  onCancel(){
    this.modalCtrl.dismiss(null)
  }

}
