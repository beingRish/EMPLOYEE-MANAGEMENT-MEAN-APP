import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  error: any;

  constructor() { }
  
  handleError(err: HttpErrorResponse) {
    if (!err.error || !err.error.error) {
      return throwError(this.errorsMsgs['UNKNOWN'])
    }
    else {
      const errorMessageKey = err.error.error.message as keyof typeof this.errorsMsgs;
      this.error = errorMessageKey && this.errorsMsgs[errorMessageKey] ? this.errorsMsgs[errorMessageKey] : 'An unknown error occurred.';
      return throwError(this.error)
    }
  }

  errorsMsgs = {
    UNKNOWN: 'An Unknown Error is Occurred',
    EMAIL_EXISTS: 'This Email is Already Exist. Please try with another email',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'We have blocked all requests ',
    EMAIL_NOT_FOUND: 'There is no user record corresponding to this identifier. The user may have been deleted',
    INVALID_PASSWORD: 'The password is invalid or the user does not have a permission',
    USER_DISABLED: 'The user account has beed disabled by an administrator.',
    INVALID_LOGIN_CREDENTIALS: 'The Email or Password must have Invalid, Kindly check and try!'
  }
}
