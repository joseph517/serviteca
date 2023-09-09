import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListServicesComponent } from './components/list-services/list-services.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { AuthGuard, IsLogged } from 'src/utils/auth.guard';

const routes: Routes = [
  { path: '' , component: HomeComponent},
  { path: 'signup', component: SignupComponent, canActivate: [IsLogged] },
  { path: 'login', component: LoginComponent, canActivate: [IsLogged]  },
  { path: 'list_services', component: ListServicesComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
