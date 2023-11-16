import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthState } from '../reduiser/auth.reducer';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css'],
})
export class CreateServiceComponent {
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
    this.getAllCategories();
  }

  onSubmit(titre: string, description: string, prix: string, photo: string) {
    // Make the HTTP request to add the service
    // Adjust the URL and payload based on your API
    this.http
      .post(`${this.apiUrl}/service`, {
        nom_service: titre,
        description,
        prix,
        photo,
        userId: this.user.user.userId,
        categoryServiceId: this.selectedCategory,
      })
      .subscribe(
        (response) => {
          console.log('Service added successfully!', response);
          // Handle the success response
          this.router.navigate(['/service']);
        },
        (error) => {
          console.error('Error adding service:', error);
          // Handle the error response
        }
      );
  }

  getAllCategories() {
    this.http.get<any[]>(`${this.apiUrl}/categoryService`).subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.log('Error occurred while retrieving categories:', error);
      }
    );
  }
}
