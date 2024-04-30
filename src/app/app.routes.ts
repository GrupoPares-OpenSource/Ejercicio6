import { Routes } from '@angular/router';
import {HomeComponent} from "../public/components/home/home.component";
import {PeliculasComponent} from "./business/components/peliculas/peliculas.component";

export const routes: Routes = [
  {path: 'business/peliculas', component: PeliculasComponent},
  {path: 'home', component: HomeComponent},
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: '*', pathMatch: 'full', redirectTo: 'home'}
];
