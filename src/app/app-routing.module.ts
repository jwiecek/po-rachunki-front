import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { BillsComponent } from './modules/bills/bills.component';
import { BillsAddEditComponent } from './modules/bills-add-edit/bills-add-edit.component';
import { TagsComponent } from './modules/tags/tags.component';

const routes: Routes = [
  { path: '', component: BillsComponent, canActivate: [AuthGuard], data: { title: 'Lista' } },
  { path: 'create', component: BillsAddEditComponent, canActivate: [AuthGuard], data: { title: 'Dodaj rachunek' } },
  {
    path: 'edit/:billId',
    component: BillsAddEditComponent,
    canActivate: [AuthGuard],
    data: { title: 'Edytuj rachunek' }
  },
  { path: 'tags', component: TagsComponent, canActivate: [AuthGuard], data: { title: 'Edycja tagów' } }
];

@NgModule({
  imports: [AuthModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
