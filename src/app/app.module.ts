import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule desde @angular/forms

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NabvarComponent } from './components/nabvar/nabvar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListServicesComponent } from './components/list-services/list-services.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VehicleService } from './pages/dashboard/VehicleService/vehicle.service';
import { ListVehicleComponent } from './components/list-vehicle/list-vehicle.component';


@NgModule({
  declarations: [
    AppComponent,
    NabvarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ListServicesComponent,
    DashboardComponent,
    ListVehicleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, 
  ],
   providers: [VehicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
