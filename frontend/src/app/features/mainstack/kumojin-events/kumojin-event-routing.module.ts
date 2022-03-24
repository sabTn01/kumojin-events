import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KumojinEventListComponent } from './list/kumojin-event-list.component';

const routes: Routes = [
  {
    path: '',
    component: KumojinEventListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KumojinEventRoutingModule {
}
