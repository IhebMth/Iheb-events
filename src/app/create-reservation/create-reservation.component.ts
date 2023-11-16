import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../reduiser/auth.reducer';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css'],
})
export class CreateReservationComponent {
  user!: any;
  private apiUrl = environment.apiUrl;
  categories: any[] = [];
  selectedCategory: any = {};

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

  onSubmit(
    dated: string,
    datef: string,
    description: string,
    Montant: string,
    Title: string
  ) {
    console.log(dated);
    console.log(datef);
    console.log(description);
    console.log(Title);
    console.log(Montant);
    this.http
      .post(`${this.apiUrl}/reservationInfo`, {
        Title,
        description,
        Montant,
        dated,
        datef,
        userId: this.user.user.userId,
      })
      .subscribe(
        (response) => {
          console.log('reservationInfo added successfully!', response);
          // Handle the success response
          this.router.navigate(['/commande']);
        },
        (error) => {
          console.error('Error adding service:', error);
          // Handle the error response
        }
      );
  }
}
