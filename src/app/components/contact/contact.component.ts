import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';  // Required for *ngFor in standalone components

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NgFor,NgClass], // Import necessary Angular modules
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'], // Fix typo from "styleUrl" to "styleUrls"
})
export class ContactComponent {
  contactCards = [
    { iconClass: 'fas fa-phone', label: 'CALL US!' },
    { iconClass: 'fas fa-envelope', label: 'SEND US AN EMAIL' },
    { iconClass: 'fas fa-map-marker-alt', label: 'FIND AN AGENCY' },
    { iconClass: 'fas fa-question-circle', label: 'FAQ' },
  ];
}
