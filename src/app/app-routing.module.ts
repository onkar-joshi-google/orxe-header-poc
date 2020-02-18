import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'hotel',
    loadChildren: () => import('./hotels/hotels.module').then(m => m.HotelsModule)
  },
  {
    path: 'flight',
    loadChildren: () => import('./flights/flights.module').then(m => m.FlightsModule)
  },
  {
    path: 'cruise',
    loadChildren: () => import('./cruise/cruise.module').then(m => m.CruiseModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
