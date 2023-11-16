import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from './reduiser/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user!: any;
  constructor(private store: Store<AuthState>) {}

  ngOnInit() {
    this.store.pipe(select((state) => state.user)).subscribe((user) => {
      this.user = user;
    });
  }

  isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }
}
