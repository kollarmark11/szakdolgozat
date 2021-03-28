import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Team } from 'src/app/shared/team.model';
import { FirestoreService } from '../../shared/firestore/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  actualTeam = {name: ''} ;
  actualId:string;


  constructor(private route : ActivatedRoute, private dataBase: FirestoreService, private navCtrl: NavController, private router: Router) {
  }

  ngOnInit(){
    this.actualId = this.route.snapshot.paramMap.get('id');
    this.getActualDoc();
  }

  async getActualDoc(){
    await this.dataBase.getOneDocData(this.actualId).then(() => {
      this.actualTeam = this.dataBase.docData  // beledobjuk az aktualis objectbe then azért kell, hogy utána fusson le, miután már lefutott az alapfüggvény, ki kell majd próbálni async nélkül
    })
    .catch(() => {
      this.router.navigateByUrl('/select-team')
    })

  }

}
