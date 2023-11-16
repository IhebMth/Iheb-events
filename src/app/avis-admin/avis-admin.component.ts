import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-avis-admin',
  templateUrl: './avis-admin.component.html',
  styleUrls: ['./avis-admin.component.css'],
})
export class AvisAdminComponent {
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

  deleteAvis(avisId: string) {
    // Send DELETE request to the server to delete the avis
    this.http.delete(`${this.apiUrl}/avis/${avisId}`).subscribe(
      () => {
        console.log('Avis deleted successfully');
        // Fetch updated avis list
        this.fetchAvis();
      },
      (error) => {
        console.log('Error occurred while deleting avis:', error);
      }
    );
  }
}
