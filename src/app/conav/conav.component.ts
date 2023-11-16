import { Component } from '@angular/core';

import { AuthState } from '../reduiser/auth.reducer';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-conav',
  templateUrl: './conav.component.html',
  styleUrls: ['./conav.component.css'],
})
export class ConavComponent {
  user?: any;
  constructor(
    private store: Store<AuthState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.store.pipe(select((state) => state.user)).subscribe((user) => {
      console.log(user);

      this.user = user;
    });
  }
  logOut() {
    this.authService.SignOut();
  }
}
