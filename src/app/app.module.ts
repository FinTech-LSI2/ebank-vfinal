import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms'; // For [(ngModel)]

// Component imports
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreditRequestComponent } from './components/credit-request/credit-request.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component'; // Add this if missing

@NgModule({
  declarations: [
    // Declare all components here
    AppComponent,
    HomeComponent,
    CreditRequestComponent,
    SearchBarComponent, // Add this for the search bar
  ],
  imports: [
    BrowserModule, 
    FontAwesomeModule, 
    FormsModule, // To enable [(ngModel)]
    RouterModule.forRoot([]), // Define your routes here if using routing
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Optional, remove if unnecessary
  bootstrap: [AppComponent], // Specify the root component to bootstrap
})
export class AppModule {}
