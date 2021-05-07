import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastService } from '../shared/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorMessage: string;
  email: string;
  uid: any;

  constructor(private auth: AngularFireAuth, private router: Router, private toast: ToastService) { }

  async standardLogin(email, password){
    await this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.toast.presentToast('Sikeres bejelentkezés!', 'success');
        this.router.navigateByUrl('select-team')
      })
      .catch((error) => {
        this.toast.presentToast(error.message, 'danger');
      })
      await this.currentUid();


  }

  register(email, password){
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {  //SIKERES
        this.toast.presentToast('Sikeres bejelentkezés!', 'success');
        this.router.navigateByUrl('login')
      })
      .catch((error) => { // ERROR
        this.toast.presentToast(error.message, 'danger');
      })
  }

  logout(){
    localStorage.removeItem('uid');
    this.auth.signOut()
      .then(() => {
        this.router.navigateByUrl('login')
      })
  }

  currentEmail(){
      return new Promise((resolve, reject) => {
        this.auth.user.subscribe(user => {
          if(user){
            resolve(user.email)
          } else {
            reject
          }
        }, reject)
      })
  }

  async currentUid(){
    await this.auth.user.subscribe(user => {
      this.uid = user.uid;
      localStorage.setItem('uid', (user.uid))
    })
  }

  resetPassword(event){
    this.auth.sendPasswordResetEmail(event);
  }
}
