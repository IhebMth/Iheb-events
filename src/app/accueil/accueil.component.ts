import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  avisList: any[] = []; // Placeholder for the list of avis
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch existing avis from the API and populate avisList
    this.fetchAvis();
  }

  fetchAvis() {
    // Send GET request to the server to fetch existing avis
    this.http.get<any[]>(`${this.apiUrl}/avis`).subscribe(
      (response) => {
        this.avisList = response;
      },
      (error) => {
        console.log('Error occurred while fetching avis:', error);
      }
    );
  }
}
