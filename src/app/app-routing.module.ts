import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentComponent } from './current/current.component';
import { FiveDayComponent } from './five-day/five-day.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RainCheckComponent } from './rain-check/rain-check.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'current'},
  {path: 'current', component: CurrentComponent},
  {path: '5day', component: FiveDayComponent},
  {path: '404',component: NotFoundComponent},
  {path: 'check', component: RainCheckComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
