import { Component } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ull-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authentication: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  loginForm:FormGroup = this.formBuilder.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  validation_messages = {
    email: [
      {type: 'required', message: 'Veuillez entrer votre adresse e-mail'}
    ],
    password: [
      {type: 'required', message: 'Veuillez entrer votre mot de passe'}
    ]
  }

  invalidInput(name: string, type: string) {
    const control: AbstractControl | null = this.loginForm.get(name);
    if (control){
      return control.hasError(type) && (control.dirty || control.touched)
    } else {
      return true;
    }
  }

  invalidCredentialsFlag = false;
  login() {
    const values = this.loginForm.value;
    this.authentication.login({
      email: values['email'],
      password: values['password'],
    }).subscribe({
      error: err => {
        if (err.status === 400) {
          this.invalidCredentialsFlag = true;
          this.loginForm.get('password')?.reset();
          setTimeout(() => {
            this.invalidCredentialsFlag = false
          }, 3000)
        }
      }
    })
  }
}