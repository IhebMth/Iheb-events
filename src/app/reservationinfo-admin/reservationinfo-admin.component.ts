import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReservationInfo } from '../model/reservationInfo.model';

@Component({
  selector: 'app-reservationinfo-admin',
  templateUrl: './reservationinfo-admin.component.html',
  styleUrls: ['./reservationinfo-admin.component.css'],
})
export class ReservationinfoAdminComponent {
  reservationsInfo: any[] = [];

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllReservations();
  }

  getAllReservations() {
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

  acceptReservation(reservationId: number) {
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

  refuseReservation(reservationId: number) {
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
