import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/shared/firestore/firestore.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.scss'],
})
export class AddMatchComponent implements OnInit {
  everyPlayer: any;
  id: any;
  defense: any;
  currentDate = new Date();

  addMatchForm: FormGroup;

  goalkeepersArray = [];
  rightBacksArray = [];
  leftBacksArray = [];
  centreBacksArray = [];
  midfieldersArray = [];
  leftWingersArray = [];
  rightWingersArray = [];
  strikersArray = [];

  constructor(private modalCtrl: ModalController, private firestore: FirestoreService, private fb: FormBuilder, private toast: ToastService) { }

  ngOnInit() {

    this.defense = Array(6);
    this.firestore.getCollectionEveryData(this.id, 'players');
    this.everyPlayer = this.firestore.players;



    this.addMatchForm = this.fb.group({
      name: new FormControl('', Validators.required),
      opponent: new FormControl('', Validators.required),
      yourGoals: new FormControl('', ),
      opponentGoals: new FormControl('',),
      date: new FormControl('', Validators.required),
      note: new FormControl(''),
      goalkeeper: new FormControl(''),
      rightBacks: new FormControl(''),
      leftBacks: new FormControl(''),
      centreBacks: new FormControl(''),
      midfielders: new FormControl(''),
      rightWingers: new FormControl(''),
      leftWingers: new FormControl(''),
      strikers: new FormControl('')
    })
  }

  ionViewDidEnter(){
    this.getPositions();
  }

  onCancel(){
    this.modalCtrl.dismiss();
  }

  addMatch(){

     let number = (
      this.addMatchForm.value.centreBacks.length +
      this.addMatchForm.value.leftBacks.length +
      this.addMatchForm.value.rightBacks.length +
      this.addMatchForm.value.centreBacks.length +
      this.addMatchForm.value.midfielders.length +
      this.addMatchForm.value.rightWingers.length +
      this.addMatchForm.value.leftWingers.length +
      this.addMatchForm.value.strikers.length +
      1)
      console.log(number)

      if((number === 12 || number === 0) && this.addMatchForm.valid){
        this.firestore.pushDocData(this.id, 'matches', this.addMatchForm.value)
        this.modalCtrl.dismiss('success')
        this.toast.presentToast('Sikeres mérkőzés hozzáadás!', 'success')
      }else if(this.addMatchForm.invalid){
        this.toast.presentToast('Minden mező kitöltése kötelező!', 'danger')
      }else if(number != 11) {
        this.toast.presentToast('Pontosan 11 kiválasztott játékosnak kell lennie!', 'danger')
      }

  }

  getPositions(){
    for(let i = 0; i<this.everyPlayer.length; i++){
      if(this.everyPlayer[i].data.mainPosition === 'gk')
      this.goalkeepersArray.push(this.everyPlayer[i])
    }

    for(let i = 0; i<this.everyPlayer.length; i++){
      if(this.everyPlayer[i].data.mainPosition === 'rb' || this.everyPlayer[i].data.mainPosition === 'rwb')
      this.rightBacksArray.push(this.everyPlayer[i])
    }

    for(let i = 0; i<this.everyPlayer.length; i++){
      if(this.everyPlayer[i].data.mainPosition === 'lb' || this.everyPlayer[i].data.mainPosition === 'lwb')
      this.leftBacksArray.push(this.everyPlayer[i])
    }

    for(let i = 0; i<this.everyPlayer.length; i++){
      if(this.everyPlayer[i].data.mainPosition === 'cb')
      this.centreBacksArray.push(this.everyPlayer[i])
    }

    for(let i = 0; i<this.everyPlayer.length; i++){
      if(this.everyPlayer[i].data.mainPosition === 'cm' || this.everyPlayer[i].data.mainPosition === 'cam' || this.everyPlayer[i].data.mainPosition === 'cdm')
      this.midfieldersArray.push(this.everyPlayer[i])
    }

    for(let i = 0; i<this.everyPlayer.length; i++){
      if(this.everyPlayer[i].data.mainPosition === 'lm' || this.everyPlayer[i].data.mainPosition === 'lw')
      this.leftWingersArray.push(this.everyPlayer[i])
    }

    for(let i = 0; i<this.everyPlayer.length; i++){
      if(this.everyPlayer[i].data.mainPosition === 'rm' || this.everyPlayer[i].data.mainPosition === 'rw')
      this.rightWingersArray.push(this.everyPlayer[i])
    }

    for(let i = 0; i<this.everyPlayer.length; i++){
      if(this.everyPlayer[i].data.mainPosition === 'st' || this.everyPlayer[i].data.mainPosition === 'cf')
      this.strikersArray.push(this.everyPlayer[i])
    }
  }
}
