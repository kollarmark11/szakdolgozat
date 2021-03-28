import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ToastService } from '../shared/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorMessage: string;
  email: string;

  constructor(private auth: AngularFireAuth, private router: Router, private toast: ToastService) { }

  standardLogin(email, password){  // BELÉPÉS FIREBASE AUTHON KERESZTÜL
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {  // SIKERES
        this.toast.presentToast('Successfull Login!', 'success');
        this.router.navigateByUrl('select-team')
      })
      .catch((error) => { //ERROR
        this.toast.presentToast(error.message, 'danger');
      })
  }

  register(email, password){ //REGISZTRACIO
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {  //SIKERES
        this.toast.presentToast('Successfull Register!', 'success');
        this.router.navigateByUrl('login')
      })
      .catch((error) => { // ERROR
        this.toast.presentToast(error.message, 'danger');
      })
  }

  logout(){  // KILÉPÉS
    this.auth.signOut()
      .then(() => {
        this.router.navigateByUrl('login') // LOGIN PAGERE NAVIGALAS
      })
  }

  currentEmail(){  // PROMISE KELL!!! resolve
      return new Promise((resolve, reject) => {
        this.auth.user.subscribe(user => {
          resolve(user.email)
        }, reject)
      })
  }


}
