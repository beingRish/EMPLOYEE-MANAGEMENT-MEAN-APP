import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  Form!: FormGroup
  token: any;
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService
  ) {
    const tokenString = localStorage.getItem('UserData');
    if (tokenString !== null) {
      this.token = JSON.parse(tokenString)._token;
    }
  }

  ngOnInit(): void {
    this.Form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

  }

  onSubmit() {
    if (this.Form.valid) {
      const data = { idToken: this.token, ...this.Form.value }
      this._authService.changePassword(data).subscribe(res => {
        console.log(res);
        this.success = true
      })
    } else {
      let key = Object.keys(this.Form.controls);

      key.filter(data => {
        let control = this.Form.controls[data];
        if (control.errors != null) {
          control.markAllAsTouched();
        }
      })
    }
  }
}
