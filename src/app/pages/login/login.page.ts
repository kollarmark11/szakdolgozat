import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  loginForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ionViewWillEnter(){
    this.loginForm.reset()
  }

  async onLogin(){
    if(this.loginForm.valid){
      await this.authService.standardLogin(this.loginForm.value.email, this.loginForm.value.password);
    }
    this.errorMessage = this.authService.errorMessage;
  }

  async presentForgottenPasswordModal(){
    const modal = await this.modalCtrl.create({
      component: ForgottenPasswordComponent,
      cssClass: 'forgotten-password'
    });
    return await modal.present();
  }

}

