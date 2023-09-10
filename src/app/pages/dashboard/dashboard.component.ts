import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../../services/VehicleService/vehicle.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/utils/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicles: any[] = [];

  showForm: boolean = false;
  userId: string | null = null;
  vehicleData = {
    client: null as number | null,
    brand: '',
    model: '',
    year: null,
    plate_number: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private vehicleService: VehicleService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserIdFromToken();
  }

  showFormRegisterVehicle() {
    this.showForm = true;
  }

  goToRequestService() {
    this.router.navigate(['/request-service']);
  }

  registerVehicle() {
    const userId = this.authService.getUserIdFromToken();
    this.vehicleData.client = Number(userId)
    this.vehicleService.registerVehicle(this.vehicleData)
    this.resetForm()
  }

  resetForm() {
    this.showForm = false;
    this.vehicleData = {
      client: null,
      brand: '',
      model: '',
      year: null,
      plate_number: ''
    };
  }

}
