import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css'],
})
export class CategoryAdminComponent {
  categories: any[] = [];
  newCategory: string = '';
  newCategoryType: string = '';

  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  ngOnInit() {
    this.getAllCategories();
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

  addCategory() {
    if (this.newCategory && this.newCategoryType) {
      const category = {
        libelle: this.newCategory,
        type: this.newCategoryType,
      };

      this.http.post(`${this.apiUrl}/categoryService`, category).subscribe(
        (response) => {
          // Category added successfully, update the categories array
          this.categories.push(category);

          // Clear the input fields
          this.newCategory = '';
          this.newCategoryType = '';

          this.getAllCategories();
        },
        (error) => {
          console.log('Error occurred while adding category:', error);
        }
      );
    }
  }
  deleteCategory(categoryId: number) {
    this.http.delete(`${this.apiUrl}/categoryService/${categoryId}`).subscribe(
      (response) => {
        // Remove the category from the categories array
        this.categories = this.categories.filter(
          (category) => category.id !== categoryId
        );
        this.getAllCategories();
      },
      (error) => {
        console.log('Error occurred while deleting category:', error);
      }
    );
  }
}
