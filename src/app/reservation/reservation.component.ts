import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent {
  reservations: any[] = [];
  newReservation: any = {};
  reservationsInfo: any[] = [];

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllReservations();
    this.getAllReservationsinfo();
  }

  getAllReservations() {
    this.http.get<any[]>(`${this.apiUrl}/reservation`).subscribe(
      (response) => {
        const array = new Array();

        response.forEach((reservation) => {
          this.http
            .get<any[]>(`${this.apiUrl}/user/${reservation.userId}`)
            .subscribe(
              (user) => {
                console.log(user);
                if (user) {
                  array.push({ reservation: reservation, user: user });
                }
              },
              (error) => {
                console.log('Error occurred while retrieving services:', error);
              }
            );
        });
        console.log(array);

        this.reservations = array;
      },
      (error) => {
        console.log('Error occurred while retrieving reservations:', error);
      }
    );
  }

  addReservation() {
    this.http.post(`${this.apiUrl}/reservation`, this.newReservation).subscribe(
      (response) => {
        console.log('Reservation added successfully');
        // Reset the form and update the reservation list
        this.newReservation = {};
        this.getAllReservations();
      },
      (error) => {
        console.log('Error occurred while adding reservation:', error);
      }
    );
  }

  acceptReservation(reservationId: number) {
    this.http
      .put(`${this.apiUrl}/reservation/${reservationId}`, { accepted: true })
      .subscribe(
        () => {
          console.log('Reservation accepted successfully');
          // Update the reservation list
          this.getAllReservations();
        },
        (error) => {
          console.log('Error occurred while accepting reservation:', error);
        }
      );
  }

  refuseReservation(reservationId: number) {
    this.http
      .delete(`${this.apiUrl}/reservation/refuse/${reservationId}`)
      .subscribe(
        () => {
          console.log('Reservation refused successfully');
          // Update the reservation list
          this.getAllReservations();
        },
        (error) => {
          console.log('Error occurred while refusing reservation:', error);
        }
      );
  }

  getAllReservationsinfo() {
    this.http.get<any[]>(`${this.apiUrl}/reservationInfo`).subscribe(
      (response) => {
        const array = new Array();

        response.forEach((reservationsInfos) => {
          this.http
            .get<any[]>(`${this.apiUrl}/user/${reservationsInfos.userId}`)
            .subscribe(
              (user) => {
                console.log(user);
                if (user) {
                  array.push({ info: reservationsInfos, user: user });
                }
              },
              (error) => {
                console.log('Error occurred while retrieving services:', error);
              }
            );
        });
        console.log(array);

        this.reservationsInfo = array;
      },
      (error) => {
        console.log('Error occurred while retrieving reservationInfo:', error);
      }
    );
  }

  acceptReservationinfo(reservationId: number) {
    this.http
      .put(`${this.apiUrl}/reservationInfo/accept/${reservationId}`, {})
      .subscribe(
        () => {
          console.log('Reservation accepted successfully');
          // Update the reservation list
          this.getAllReservations();
        },
        (error) => {
          console.log('Error occurred while accepting reservation:', error);
        }
      );
  }

  refuseReservationinfo(reservationId: number) {
    this.http
      .delete(`${this.apiUrl}/reservationInfo/refuse/${reservationId}`)
      .subscribe(
        () => {
          console.log('Reservation refused successfully');
          // Update the reservation list
          this.getAllReservations();
        },
        (error) => {
          console.log('Error occurred while refusing reservation:', error);
        }
      );
  }
}
