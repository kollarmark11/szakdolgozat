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

  constructor(private auth: AngularFireAuth, private router: Router, private toast: ToastService) { }

  async standardLogin(email, password){
    await this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.toast.presentToast('Successfull Login!', 'success');
        this.router.navigateByUrl('home')
      })
      .catch((error) => {
        this.toast.presentToast(error.message, 'danger');
      })
  }


}
