import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Team } from '../team.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  teams: Team[] = [];

  constructor(private firestore: AngularFirestore) {
    this.getEveryData();
   }


  getEveryData(){
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

  pushNewData(itemObject){
    this.firestore.collection("teams").add(itemObject)
  }
}
