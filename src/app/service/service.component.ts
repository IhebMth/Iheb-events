import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../reduiser/auth.reducer';
import { Service } from '../model/service.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit {
  services: Service[] = [];
  private apiUrl = environment.apiUrl;
  user!: any;
  constructor(private store: Store<AuthState>, private http: HttpClient) {}

  ngOnInit() {
    this.store.pipe(select((state) => state.user)).subscribe((user) => {
      this.user = user;
      this.getServices();
    });
  }

  getServices() {
    this.http
      .get<Service[]>(
        `${this.apiUrl}/service/myservice/${this.user.user.userId}`
      )
      .subscribe(
        (response) => {
          console.log(response);

          this.services = response;
        },
        (error) => {
          console.log('Error fetching services:', error);
        }
      );
  }
}
