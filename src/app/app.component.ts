import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth/auth.service';
;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  email: any;


  constructor(private auth: AuthService) {
  }

  ngOnInit(){
    this.getEmail();

  }

  getEmail(){
    this.auth.currentEmail().then((user) => {
        this.email = user;
    })
    .catch(() => {
      this.email = ''
    });
  }

}
