import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  Form!: FormGroup
  token: any;
  success: boolean = false;
  error: any = null;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })

  }

  onForgetSubmit() {
    if (this.Form.valid) {
      console.log(this.Form.value);
      
      this._authService.forgetPassword(this.Form.value).subscribe(
      (res) => {
        console.log(res);
        this.success = true
        this.error = null;
      },
       
      (err) => {
        console.log(err);
        this.success = false;
        this.error = err.error?.message || 'An unexpected error occurred'; 
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
