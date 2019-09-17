import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientGridComponent } from './client-grid/client-grid.component';
import { ServerGridComponent } from './server-grid/server-grid.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

const routes: Routes = [
  { path: 'client-grid', component: ClientGridComponent},
  { path: 'server-grid', component: ServerGridComponent},
  { path: 'date-picker', component: DatePickerComponent},
  { path: 'multi-select', component: MultiSelectComponent},
  { path: '', redirectTo: '/date-picker', pathMatch: 'full' },
  { path: '**', redirectTo: '/date-picker'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
