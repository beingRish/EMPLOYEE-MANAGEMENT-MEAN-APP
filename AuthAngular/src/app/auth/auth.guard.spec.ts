import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation (return true)', () => {
    spyOn(router, 'navigateByUrl'); // Spy on navigateByUrl method of Router
    const canActivateResult = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(canActivateResult).toBeTrue();
    expect(router.navigateByUrl).not.toHaveBeenCalled(); // Ensure navigateByUrl was not called
  });

  it('should block navigation and redirect to login (return false)', () => {
    spyOn(router, 'navigateByUrl'); // Spy on navigateByUrl method of Router
    const canActivateResult = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(canActivateResult).toBeFalse();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login'); // Ensure navigateByUrl was called with '/login'
  });
});
