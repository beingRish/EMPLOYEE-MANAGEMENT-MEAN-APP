import { Component, OnInit } from '@angular/core';
import { AuthService } from './appServices/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'AuthAngular';

  constructor(private _authService: AuthService){}

  ngOnInit(): void {
    this._authService.autoSignIn();
  }
}
