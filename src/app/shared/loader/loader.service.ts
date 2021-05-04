import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private loadingController: LoadingController) { }

  showLoader(message?: string) {
    this.loadingController.create({
      spinner: 'bubbles',
      message,
      translucent: true,
      cssClass: 'basic-loader',
    }).then(loading => loading.present());
  }

  hideLoader(): void {
    this.loadingController.dismiss();
  }
}
