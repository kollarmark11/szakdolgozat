import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { Match } from '../interfaces/match.model';
import { Player } from '../interfaces/player.model';
import { Team } from '../interfaces/team.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  teams: Team[] = [];
  players: Player[] = [];
  docData: any;
  matches: Match[] = [];

  constructor(private firestore: AngularFirestore, private auth: AuthService) {
   }


  async getEveryData(){
    this.auth.uid = '';
    await this.auth.currentUid();
    await this.firestore.collection("teams").get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = new Team();
        data.id = doc.id;
        data.data = doc.data()
        if(data.data.uid === this.auth.uid){
          this.teams.push(data);
        }
      });
  });
  }

  async getOneDocData(id){
    await this.firestore.collection('teams').doc(id).ref.get()
      .then(doc => {
        this.docData = doc.data();
      })
  }

  pushNewData(itemObject){
    this.firestore.collection("teams").add(itemObject)
  }

  deleteSubDoc(id, secondCollection, docId){
    this.firestore.collection("teams").doc(id).collection(secondCollection).doc(docId).delete()
  }

  pushDocData(id, secondCollection ,obj){
    this.firestore.collection("teams").doc(id).collection(secondCollection).add(obj)

  }

  getCollectionEveryData(id, collection){ // COLLECTIONON BELÜLI COLLECTION(mint az array). kiszedjük belőle a dolgokat. az elején reseteljük a tömböt
    this.players = [];
    this.firestore.collection("teams").doc(id).collection(collection).get().toPromise()
    .then(query => {
      query.forEach(doc => {
        let data = new Player();
        data.id = doc.id,
        data.data = doc.data()
        this.players.push(data)

      })
    })
  }

  getEveryMatch(id){ // COLLECTIONON BELÜLI COLLECTION(mint az array). kiszedjük belőle a dolgokat. az elején reseteljük a tömböt
    this.matches = [];
    this.firestore.collection("teams").doc(id).collection('matches').get().toPromise()
    .then(query => {
      query.forEach(doc => {
        let data = new Player();
        data.id = doc.id,
        data.data = doc.data()
        this.matches.push(data)

      })
    })
  }
}
