import { Routes } from '@angular/router';
import { HomeComponent } from './car/home/home.component';

export const routes: Routes = [
  { path: 'car/home', component: HomeComponent },
  { path: 'car', redirectTo: 'car/home', pathMatch: 'full' },
  { path: '', redirectTo: 'car/home', pathMatch: 'full' }, // Rota raiz redirecionando para /car/home
];
