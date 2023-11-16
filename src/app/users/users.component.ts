import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}
  private apiUrl = environment.apiUrl;

  ngOnInit() {
    this.getAllUsers();
  }
  goToCreateUser() {
    this.router.navigate(['/admin/create-user']);
  }
  getAllUsers() {
    this.http.get<any[]>(`${this.apiUrl}/user`).subscribe(
      (response) => {
        this.users = response.filter((user) => user.type == 'P');
      },
      (error) => {
        console.log('Error occurred while retrieving categories:', error);
      }
    );
  }
  removeUser(userId: number) {
    if (confirm('Are you sure you want to remove this user?')) {
      this.http.delete(`${this.apiUrl}/user/${userId}`).subscribe(
        () => {
          // User successfully removed, update the user list
          this.getAllUsers();
        },
        (error) => {
          console.log('Error occurred while removing user:', error);
        }
      );
    }
  }
}
