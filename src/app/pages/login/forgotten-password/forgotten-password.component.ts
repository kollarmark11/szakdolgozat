import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss'],
})
export class ForgottenPasswordComponent implements OnInit {
  @ViewChild('forgottenPasswordValue', { read: ElementRef }) forgottenPasswordValue: ElementRef;

  constructor(private authService: AuthService, private modalCtrl: ModalController, private toast: ToastService) { }

  ngOnInit() {}

  passwordReset(){
    if(this.forgottenPasswordValue.nativeElement.value != 0){
      this.authService.resetPassword(this.forgottenPasswordValue.nativeElement.value);
      this.toast.presentToast('Sikeresen új jelszó kérelem!', 'success');
      this.modalCtrl.dismiss();
    } else {
      this.toast.presentToast('Kötelező az email címet megadni!', 'danger');
    }

  }

  onCancel(){
    this.modalCtrl.dismiss();
  }

}
