import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../appServices/auth.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate  {

  constructor(
    private _authService: AuthService,
    private router: Router
    ){}

  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
      return this._authService.user.pipe(
        take(1),
        map(user => {
          if(user){
            return true
          }
          return this.router.createUrlTree([''])
        })
      )
    
  }

};
