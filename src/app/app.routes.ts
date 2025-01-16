import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreditRequestComponent } from './components/credit-request/credit-request.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'credit-request', component: CreditRequestComponent },
];
