import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AuthState } from '../reduiser/auth.reducer';
import { Router } from '@angular/router';
import { SignInAction } from '../actions/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  private apiUrl = environment.apiUrl;
  user: any;

  constructor(
    private http: HttpClient,
    private store: Store<AuthState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.pipe(select((state) => state.user)).subscribe((user) => {
      this.user = user;
    });
  }
  onSbmit(
    nom: string,
    prenom: string,
    email: string,
    adress: string,
    num_tel: string
  ) {
    this.http
      .post(`${this.apiUrl}/user/edit-profile/${this.user.user.userId}`, {
        nom,
        prenom,
        adresse: adress,
        email,
        num_tel,
      })
      .subscribe(
        (response) => {
          console.log(response);
          // Update the reservation list
          this.store.dispatch(SignInAction({ payload: response }));

          this.router.navigate(['accueil']);
        },
        (error) => {
          console.log('Error occurred while accepting reservation:', error);
        }
      );
  }
}
