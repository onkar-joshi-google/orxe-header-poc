import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@core/services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search/hotel',
  },
  {
    path: 'search/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'results/:id',
    loadChildren: () => import('./results/results.module').then(m => m.ResultsModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./details/details.module').then(m => m.DetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
