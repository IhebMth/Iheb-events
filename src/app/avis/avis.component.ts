import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css'],
})
export class AvisComponent implements OnInit {
  reservationId: number = -1;
  userId: number = -1;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  avis: any = {}; // Initialize an empty object to hold the form data
  private apiUrl = environment.apiUrl;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.reservationId = +params['reservationId'];
      this.userId = +params['userId'];
    });
  }

  submitAvis() {
    // Send POST request to the server to submit the avis
    this.http
      .post<any>(`${this.apiUrl}/avis/donneAvis`, {
        ...this.avis,
        reservationId: this.reservationId,
        userId: this.userId,
      })
      .subscribe(
        (response) => {
          console.log('Avis submitted successfully:', response);
          // Clear the form fields
          this.avis = {};
          this.router.navigate(['/services']);
          // Fetch updated avis list
        },
        (error) => {
          console.log('Error occurred while submitting avis:', error);
        }
      );
  }
}
