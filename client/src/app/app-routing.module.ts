import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataRegistrationComponent } from './component/data-registration/data-registration.component';
import { ListDetailComponent } from './component/list-detail/list-detail.component';
import { ListComponent } from './component/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'detail/:id', component: ListDetailComponent },
  { path: 'register', component: DataRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
