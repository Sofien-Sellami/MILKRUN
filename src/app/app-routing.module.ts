import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./table/home.component";
import {AppComponent} from "./app.component";
import {HomepageComponent} from "./homepage/homepage.component";


export const routes = [
  {
    path: '',
    component: HomepageComponent,
    label: 'table',
  },
  {

    path: 'list',
    component: HomeComponent,
    // canActivate: [AuthGuardService]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
