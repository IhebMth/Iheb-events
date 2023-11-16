import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../reduiser/auth.reducer';

@Component({
  selector: 'app-service-admin',
  templateUrl: './service-admin.component.html',
  styleUrls: ['./service-admin.component.css'],
})
export class ServiceAdminComponent {
  services: any[] = [];
  newService: any = {};

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getAllServices();
  }
  getAllServices() {
    this.http.get<any[]>(`${this.apiUrl}/service`).subscribe(
      (response) => {
        console.log(response);

        const array = new Array();

        response.forEach((service) => {
          this.http
            .get<any[]>(`${this.apiUrl}/user/${service.userId}`)
            .subscribe(
              (user) => {
                console.log(user);
                if (user) {
                  array.push({ service: service, user: user });
                }
              },
              (error) => {
                console.log('Error occurred while retrieving services:', error);
              }
            );
        });
        console.log(array);

        this.services = array;
      },
      (error) => {
        console.log('Error occurred while retrieving services:', error);
      }
    );
  }

  addService() {
    this.http.post(`${this.apiUrl}/service`, this.newService).subscribe(
      (response) => {
        console.log('Service added successfully');
        // Reset the form and update the service list
        this.newService = {};
        this.getAllServices();
      },
      (error) => {
        console.log('Error occurred while adding service:', error);
      }
    );
  }
  acceptService(serviceId: number) {
    this.http
      .put(`${this.apiUrl}/service/${serviceId}`, { valid: true })
      .subscribe(
        () => {
          console.log('Service accepted successfully');
          // Update the service list
          this.getAllServices();
        },
        (error) => {
          console.log('Error occurred while accepting service:', error);
        }
      );
  }

  refuseService(serviceId: number) {
    this.http
      .put(`${this.apiUrl}/service/${serviceId}`, { valid: false })
      .subscribe(
        () => {
          console.log('Service refused successfully');
          // Update the service list
          this.getAllServices();
        },
        (error) => {
          console.log('Error occurred while refusing service:', error);
        }
      );
  }
}
