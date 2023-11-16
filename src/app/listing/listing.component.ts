import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Service } from '../model/service.model';
import { Reservation } from '../model/reservation.model';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../reduiser/auth.reducer';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceState } from '../reduiser/service.reducer';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent implements OnInit {
  services: Service[] = [];
  reservations: Reservation[] = [];
  user!: any;
  avisList: any = []; // Placeholder for the list of avis

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store<AuthState>) {}
  
  ngOnInit() {
    this.store.pipe(select((state) => state.user)).subscribe((user) => {
      this.user = user;
    });
    this.fetchServices();
  }

  fetchServices() {
    this.http
      .get<Service[]>(
        `${this.apiUrl}/service/notReserve/${this.user.user.userId}`
      )
      .subscribe(
        (response) => {
          this.services = response;
        },
        (error) => {
          console.error('Error retrieving services:', error);
        }
      );
  }

  postReservation(serviceId: number, description: string, Montant: string) {
    console.log(this.user.user.userId);

    this.http
      .post<Reservation[]>(`${this.apiUrl}/reservation`, {
        serviceId,
        description,
        Montant,
        userId: this.user.user.userId,
      })
      .subscribe(
        (response) => {
          console.log('Reservation added successfully!', response);
          this.fetchServices();
        },
        (error) => {
          console.error('Error adding reservation:', error);
        }
      );
  }
  fetchAvis() {
    // Send GET request to the server to fetch existing avis
  }
}
