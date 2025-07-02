// Routes ek Angular ka custom type hai jo internally TypeScript ke interface se bana hai 
// Ye type ensure karta hai ki routing ka structure valid ho

import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

// Yaha `routes` naam ka ek variable banaya gaya hai
// `: Routes` ka matlab hai ki `routes` variable ka type `Routes` interface ke according hoga
// Ye `: Routes` TypeScript ka type annotation hai, jo batata hai ki `routes` ek array hai
// jisme har object ka structure Angular ke `Routes` interface ke rules ko follow karega
// Type annotation = us variable ka data type batana (in TypeScript).
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./pages/detail/detail.component').then(m => m.DetailComponent)
  }
];