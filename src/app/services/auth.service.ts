import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { SignInAction, SignOutAction } from '../actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  // Sign in with email/password
  SignIn(email: string, password: string) {
    const signInData = { email, password };

    this.http.post<any>(`${this.apiUrl}/user/login`, signInData).subscribe(
      (result) => {
        this.store.dispatch(SignInAction({ payload: result }));
        if (result.type == 'A') {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['profile']);
        }
      },
      (error) => {
        console.log(error);
        window.alert('Email or password is incorrect');
      }
    );
  }

  // Sign up with email/password
  SignUp(
    nom: String,
    pernom: String,
    addresse: String,
    email: string,
    type: string,
    password: string,
    num_tel: string
  ) {
    const signUpData = {
      nom,
      pernom,
      addresse,
      email,
      password,
      type,
      num_tel,
    };

    this.http.post<any>(`${this.apiUrl}/user/register`, signUpData).subscribe(
      (response) => {
        if (response && response.message === 'Registration successful') {
          // Handle success
          this.router.navigate(['signin']);
        } else {
          console.log(response);
        }
      },
      (error) => {
        window.alert(error.message);
      }
    );
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) {
    const resetPasswordData = { email: passwordResetEmail };

    this.http
      .post<any>(`${this.apiUrl}/user/reset-password`, resetPasswordData)
      .subscribe(
        (result) => {
          window.alert('Password reset email sent, check your inbox.');
        },
        (error) => {
          window.alert(error);
        }
      );
  }

  // Returns true when user is logged in
  get isLoggedIn(): boolean {
    // Implement your own logic to check the authentication state from the NgRx store
    // For example, you can use a selector to retrieve the authentication state from the store
    // and check if the user is logged in
    // Example: this.store.select(getIsLoggedIn);
    return false;
  }

  // Sign out
  SignOut() {
    this.store.dispatch(SignOutAction());
    this.router.navigate(['/']);
  }
}
