import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {} // Inject Router

  // Method to navigate to the credit request page
  navigateToCreditRequest() {
    this.router.navigate(['/credit-request']);
  }

  backToHome(){
    this.router.navigate(['/']);

  }


}
