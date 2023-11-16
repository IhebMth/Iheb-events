import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AuthState } from './reduiser/auth.reducer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthinGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(
      select((state) => state.user),
      map((user) => {
        console.log(user);

        if (user.isLoggedIn) {
          return this.router.createUrlTree(['/accueil']);
        } else {
          // Redirect to the login page or any other page you want
          return true;
        }
      })
    );
  }
}
