import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from '../player.model';
import { Team } from '../team.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  teams: Team[] = [];
  players: Player[] = [];
  docData: any;

  constructor(private firestore: AngularFirestore) {
    this.getEveryData();
   }


  getEveryData(){
    this.teams = []
    this.firestore.collection("teams").get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = new Team();
        data.id = doc.id;
        data.data = doc.data()
        this.teams.push(data)
          // doc.data() is never undefined for query doc snapshots

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

  pushDocData(id, obj){
    this.firestore.collection("teams").doc(id).collection('players').add(obj)

   /*  this.getOneDocData(id).then(() => {
      console.log(this.docData.players)
      if(!this.docData.players){
        this.firestore.collection('teams').doc(id).update({
          'players': JSON.stringify(obj)
        })
      } else {
        this.players.push(obj)
        this.docData = JSON.parse(this.docData.players)
        this.players.push(this.docData.players)
        console.log(this.players)
        this.docData.players = JSON.stringify(this.players);
        this.firestore.collection('teams').doc(id).update({
          'players': this.docData.players
        })
        console.log(JSON.parse(this.docData.players))
      }
    }); */
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
      console.log(this.players)
    })
  }
}
