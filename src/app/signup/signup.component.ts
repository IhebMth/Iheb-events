import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private authService: AuthService) {}

  onSubmit(
    nom: String,
    pernom: String,
    addresse: String,
    email: string,
    type: string,
    password: string,
    num_tel: string
  ) {
    // Access the nom property and perform necessary operations
    // Call the signup method from the AuthService with form values

    this.authService.SignUp(
      nom,
      pernom,
      addresse,
      email,
      type,
      password,
      num_tel
    ); /* pass the form values */
  }
}
