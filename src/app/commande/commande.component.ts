import { Component } from '@angular/core';
import { ServiceState } from '../reduiser/service.reducer';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthState } from '../reduiser/auth.reducer';
import { Reservation } from '../model/reservation.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReservationInfo } from '../model/reservationInfo.model';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
})
export class CommandeComponent {
  reservations: Reservation[] = [];
  reservationsInfo: ReservationInfo[] = [];
  user!: any;
  avisList: any = []; // Placeholder for the list of avis

  private apiUrl = environment.apiUrl;

  constructor(
    private Servicestore: Store<ServiceState>,
    private router: Router,
    private store: Store<AuthState>,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.pipe(select((state) => state.user)).subscribe((user) => {
      this.user = user;
    });
    this.fetchReservations();
    this.fetchReservationsInfo();
  }

  fetchReservationsInfo() {
    this.http
      .get<ReservationInfo[]>(
        `${this.apiUrl}/reservationInfo/user/${this.user.user.userId}`
      )
      .subscribe(
        (response) => {
          this.reservationsInfo = response.filter(
            (reservationsInfos) => reservationsInfos.accepted
          );
          console.log(response);
        },
        (error) => {
          console.error('Error retrieving reservations:', error);
        }
      );
  }

  fetchReservations() {
    this.http
      .get<Reservation[]>(
        `${this.apiUrl}/reservation/user/${this.user.user.userId}`
      )
      .subscribe(
        (response) => {
          this.reservations = response;
          console.log(response);
        },
        (error) => {
          console.error('Error retrieving reservations:', error);
        }
      );
  }

  deleteReservation(reservationId: number) {
    this.http.delete(`${this.apiUrl}/reservation/${reservationId}`).subscribe(
      () => {
        console.log('Reservation deleted successfully!');
        this.fetchReservations();
      },
      (error) => {
        console.error('Error deleting reservation:', error);
      }
    );
  }

  navigateToAvis(reservationId: number) {
    this.http
      .get<any[]>(
        `${this.apiUrl}/avis/user/${reservationId}/${this.user.user.userId}`
      )
      .subscribe(
        (response) => {
          this.avisList = response;
          console.log(response);

          if (this.avisList.length == 0) {
            this.router.navigate([
              '/avis',
              reservationId,
              this.user.user.userId,
            ]);
          }
        },
        (error) => {
          console.log('Error occurred while fetching avis:', error);
        }
      );
  }
}
