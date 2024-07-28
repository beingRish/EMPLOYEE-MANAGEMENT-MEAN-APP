import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../appServices/auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from '../appInterface/auth-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode: boolean = true
  error: any;

  Form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this._authService.user.subscribe(res => {
      if(res){
        this.router.navigate(['/dashboard']);
      }
    })

    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onModeSwitch() {
    this.loginMode = !this.loginMode;
  }

  onSubmit() {
    if (this.Form.valid) {
      console.log(this.Form.value);

      const email = this.Form.value.email;
      const password = this.Form.value.password;

      let authObservable: Observable<AuthResponse>

      if (this.loginMode) {
        authObservable = this._authService.signIn(email, password)
      } else {
        authObservable = this._authService.signUp(email, password)
      }

      authObservable.subscribe(
        res => {
          console.log(res);
          this.router.navigate(['dashboard'])
        },
        err => {
          this.error = err;
        })
    }
  }
  
}
