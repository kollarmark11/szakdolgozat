import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Team } from '../team.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  teams: Team[] = [];
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
}
