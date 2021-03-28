import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
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


  constructor(private route : ActivatedRoute, private dataBase: FirestoreService) {
  }

  ngOnInit(){
    this.actualId = this.route.snapshot.paramMap.get('id');
    this.getActualDoc();
  }

  async getActualDoc(){
    await this.dataBase.getOneDocData(this.actualId).then(() => {
      this.actualTeam = this.dataBase.docData  // beledobjuk az aktualis objectbe then azért kell, hogy utána fusson le, miután már lefutott az alapfüggvény, ki kell majd próbálni async nélkül
    })

  }

}
