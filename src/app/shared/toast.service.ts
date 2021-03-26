import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async presentToast(content, color) {
    const toast = await this.toastCtrl.create({
      message: content,
      duration: 1800,
      color: color
    });
    toast.present();
  }
}
