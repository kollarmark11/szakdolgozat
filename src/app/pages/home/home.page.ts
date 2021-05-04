import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Match } from 'src/app/shared/interfaces/match.model';
import { FirestoreService } from '../../shared/firestore/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  actualTeam = { name: '' };
  actualId: string;
  everyMatch: any;
  allGoal: number;
  loading: any;

  ourGoals = 0;
  opponentGoals = 0;
  wins = 0;
  lose = 0;
  draw = 0;

  constructor(
    private route: ActivatedRoute,
    private dataBase: FirestoreService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  async ngOnInit() {
    this.actualId = this.route.snapshot.paramMap.get('id');
    this.getEveryMatchData();
    await this.getActualDoc();
    this.getData();
  }

  doRefresh(event){
    this.getEveryMatchData();
    this.getData();
    event.target.complete();
  }

  async getData() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this.countOurGoals();
    this.countOpponentGoals();
    this.countWinsAndLose();
    this.loading.dismiss();
  }

  async getActualDoc() {
    await this.dataBase
      .getOneDocData(this.actualId)
      .then(() => {
        this.actualTeam = this.dataBase.docData; // beledobjuk az aktualis objectbe then azért kell, hogy utána fusson le, miután már lefutott az alapfüggvény, ki kell majd próbálni async nélkül
      })
      .catch(() => {
        this.router.navigateByUrl('/select-team');
      });
  }

  async getEveryMatchData() {
    await this.dataBase.getEveryMatch(this.actualId);
    this.everyMatch = this.dataBase.matches;
  }

  deleteTeam(){
    this.firestore.collection('teams').doc(this.actualId).delete();
    this.router.navigateByUrl('/select-team')
  }

  countOurGoals() {
    this.ourGoals = 0;
    for (let i = 0; i < this.everyMatch.length; i++) {
      this.ourGoals = this.everyMatch[i].data.yourGoals + this.ourGoals;
    }
  }

  countOpponentGoals() {
    this.opponentGoals = 0;
    for (let i = 0; i < this.everyMatch.length; i++) {
      this.opponentGoals =
        this.everyMatch[i].data.opponentGoals + this.opponentGoals;
    }
  }

  countWinsAndLose() {
    this.wins = 0;
    this.lose = 0;
    this.draw = 0;

    for (let i = 0; i < this.everyMatch.length; i++) {
      if (
        this.everyMatch[i].data.yourGoals >
        this.everyMatch[i].data.opponentGoals
      ) {
        this.wins++;
      } else if (
        this.everyMatch[i].data.yourGoals <
        this.everyMatch[i].data.opponentGoals
      ) {
        this.lose++;
      } else if (
        this.everyMatch[i].data.yourGoals ===
        this.everyMatch[i].data.opponentGoals
      ) {
        this.draw++;
      }
    }
  }

  logout(){
    localStorage.removeItem('uid');
  }
}
