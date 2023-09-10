import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from './VehicleService/vehicle.service';
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

  goToRegisterVehicle() {
    this.showForm = true;
  }

  goToRequestService() {
    this.router.navigate(['/request-service']);
  }

  registerVehicle() {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.vehicleData.client = Number(userId);
      const headers = this.getHeaders();

      this.http
        .post<any>('http://localhost:8000/api/vehicle/create/', this.vehicleData, { headers })
        .subscribe(
          response => {
            // alert('Vehículo registrado exitosamente');
            this.vehicleService.onVehicleRegistered(response);
            this.resetForm();
            this.vehicleService.getUserVehicles();
            this.vehicleService.notifyVehicleRegistered();
          },
          error => {
            console.error(error);
            alert('Error al registrar el vehículo');
          }
        );
    }
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

  private getHeaders() {
    const token = localStorage.getItem('access_token');
    const headersConfig: { [header: string]: string | string[] } = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    return headersConfig;
  }

}
