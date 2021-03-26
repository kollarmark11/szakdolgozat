import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  errorMessage = false;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordAgain: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  async onRegister(){
    if(this.registerForm.value.password === this.registerForm.value.passwordAgain){
      await this.authService.register(this.registerForm.value.email, this.registerForm.value.password)
    }else {
      this.errorMessage = true;
    }

  }

}
