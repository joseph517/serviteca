import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/pages/dashboard/VehicleService/vehicle.service'; 

@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.css']
})
export class ListVehicleComponent implements OnInit {
  vehicles: any[] = [];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.fetchUserVehicles();
  }

  fetchUserVehicles() {
    this.vehicleService.getUserVehicles().subscribe(
      response => {
        this.vehicles = response;
      },
      error => {
        console.error(error);
      }
    );
  }
}