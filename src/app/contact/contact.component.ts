import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  sendEmail() {
    const subject = 'Contact Form Submission';
    const body = `Name: ${this.name}\nEmail: ${this.email}\nMessage: ${this.message}`;
    console.log(body);

    const mailtoLink = `mailto:doniaalyani@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink);
  }
}
