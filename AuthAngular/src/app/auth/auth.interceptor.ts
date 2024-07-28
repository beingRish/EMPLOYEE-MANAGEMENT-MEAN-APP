import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "../appServices/auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private _authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this._authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (user && user?.token) {
                    const modifiedReq = req.clone({
                        params: new HttpParams().set('auth', user?.token)
                    })
                    return next.handle(modifiedReq);
                }else {
                    return next.handle(req);
                }
            })
        )
    }
}