import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'application',
    pathMatch: 'full',
  },
  {
    path: 'application',
    loadChildren: () => import('./application/application.module').then(x => x.ApplicationModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
