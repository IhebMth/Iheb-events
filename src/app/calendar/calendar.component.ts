import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { environment } from 'src/environments/environment';
import { startOfDay } from 'date-fns';
import { Reservation } from '../model/reservation.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = []; // Array to hold the calendar events

  previousMonth(): void {
    this.viewDate = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth() - 1
    );
  }

  nextMonth(): void {
    this.viewDate = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth() + 1
    );
  }

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAcceptedReservations(); // Fetch the accepted reservations when the component initializes
  }
  getAcceptedReservations() {
    const array: CalendarEvent[] = [];

    this.http
      .get<Reservation[]>(`${this.apiUrl}/reservation/accepted`)
      .subscribe(
        (response) => {
          console.log(response);
          if (response !== null) {
            response.map((reservation) => {
              this.http
                .get<any>(`${this.apiUrl}/user/${reservation.userId}`)
                .subscribe(
                  (user) => {
                    array.push({
                      start: startOfDay(new Date(reservation.date)),
                      title: user == null ? '' : user?.nom + ' ' + user?.pernom,
                      color: {
                        primary: '#1e90ff',
                        secondary: '#D1E8FF',
                      },
                    });
                    this.viewDate = new Date(
                      this.viewDate.getFullYear(),
                      this.viewDate.getMonth() + 1
                    );
                    this.viewDate = new Date(
                      this.viewDate.getFullYear(),
                      this.viewDate.getMonth() - 1
                    );
                  },
                  (error) => {
                    console.log(
                      'Error occurred while retrieving accepted reservations:',
                      error
                    );
                  }
                );
            });
            this.events = array;
            // Update the events array with the new data
          }
        },
        (error) => {
          console.log(
            'Error occurred while retrieving accepted reservations:',
            error
          );
        }
      );
  }
}
