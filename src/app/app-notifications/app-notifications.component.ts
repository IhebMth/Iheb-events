import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthState } from '../reduiser/auth.reducer';
import { AddNotification } from '../actions/auth.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-notifications',
  templateUrl: './app-notifications.component.html',
  styleUrls: ['./app-notifications.component.css'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  private intervalSubscription: Subscription = new Subscription();
  notifications: any;
  constructor(private store: Store<AuthState>, private http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  ngOnInit(): void {
    // Start the interval and send request every 10 seconds
    this.intervalSubscription = interval(10000)
      .pipe(switchMap(() => this.getNotifications()))
      .subscribe(
        (notifications) => {
          // Update the state with new notifications
          this.store.dispatch(AddNotification({ payload: notifications }));
          this.notifications = notifications;
          // Display a toast or perform any other action with the notifications
        },
        (error) => {
          console.log('Error occurred while fetching notifications:', error);
        }
      );
  }

  ngOnDestroy(): void {
    // Unsubscribe from the interval when the component is destroyed
    this.intervalSubscription.unsubscribe();
  }

  getNotifications() {
    // Send GET request to the server to fetch notifications
    return this.http
      .get<any[]>(`${this.apiUrl}/notifications`)
      .pipe(map((response) => response));
  }
}
