import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/kumojin-events'
  },
  {
    path: 'kumojin-events',
    loadChildren: () => import('./features/mainstack/kumojin-events/kumojin-event.module').then(m => m.KumojinEventModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
