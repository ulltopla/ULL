import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {AccueilComponent} from "./components/pages/accueil/accueil.component";
import {RegisterComponent} from "./components/pages/register/register.component";

const routes: Routes = [
  { path: '', component: AccueilComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: AccueilComponent},
  // Redirection par défaut
  { path: '**', redirectTo: ''}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      useHash: false,
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
