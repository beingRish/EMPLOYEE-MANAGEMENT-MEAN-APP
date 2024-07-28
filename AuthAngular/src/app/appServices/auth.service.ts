import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config';
import { AuthResponse } from '../appInterface/auth-response.interface';
import { ErrorService } from './error.service';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { User } from '../appModels/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User | null>(null)
  profileInfo = new BehaviorSubject({
    displayName: '',
    email: '',
    photoUrl: '',
  })

  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private _errService: ErrorService,
    private router: Router
  ) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return this._errService.handleError(err)
      }),
      tap(res => {
        this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
      })
    )
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return this._errService.handleError(err)
      }),
      tap(res => {
        this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
      })
    )
  }

  autoSignIn() {
    const userDataString = localStorage.getItem('UserData');
    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);
      if (!userData) {
        return;
      }
    
      const loggedInUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
      if(loggedInUser.token){
        this.user.next(loggedInUser);

        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoSignOut(expirationDuration);
        this.gerUserData(loggedInUser.token);
      }
    }
  }

  signOut(){
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('UserData');

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoSignOut(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }

  private authenticatedUser(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate)
    this.user.next(user)  // Storing Data in User Subject
    this.autoSignOut(expiresIn*1000);
    localStorage.setItem('UserData', JSON.stringify(user)); // Soring Data in LocalStorage
    this.gerUserData(token);
  }

  updateProfile(data: any){
    
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${config.API_KEY}`,
    {
      idToken: data.token,
      displayName: data.name,
      photoUrl: data.picture,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return this._errService.handleError(err)
      })
    )
  }

  gerUserData(token: any){
    this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${config.API_KEY}`,
    {
      idToken: token
    }
    ).subscribe(res => {
      this.profileInfo.next({
        displayName: res.users[0].displayName,
        email: res.users[0].email,
        photoUrl: res.users[0].photoUrl,
      })
    })
  }

  changePassword(data: any){
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${config.API_KEY}`, {
      idToken: data.idToken,
      password: data.password,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return this._errService.handleError(err);
      })
    )
  }

  forgetPassword(data: any){
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${config.API_KEY}`, {
      requestType	: 'PASSWORD_RESET',
      email: data.email,
    }).pipe(
      catchError(err => {
        return this._errService.handleError(err)
      })
    )
  }

  googleSignIn(idToken: string){
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${config.API_KEY}`, {
      postBody : `id_token=${idToken}&providerId=google.com`,
      requestUri: 'http://localhost:4200',
      returnIdpCredential : true,
      returnSecureToken : true
    }).pipe(
      catchError(err => {
        return this._errService.handleError(err)
      })
    )
  }

}
