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
export class AuthGuard implements CanActivate {
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
        if (user.isLoggedIn) {
          const isServiceRoute = next.url[0].path === 'service';
          const isAdminRoute = next.url[0].path === 'admin';

          console.log(isServiceRoute);
          const isUserTypeP = user.user.type === 'U';
          if (isServiceRoute && isUserTypeP) {
            // Allow access to the service route for users with type 'P'
            return this.router.createUrlTree(['/accueil']);
          } else if (isAdminRoute && !(user.user.type === 'A')) {
            return this.router.createUrlTree(['/accueil']);
          } else {
            // Redirect to the login page or any other page you want
            true;
          }
          return true;
        } else {
          // Redirect to the login page or any other page you want
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
