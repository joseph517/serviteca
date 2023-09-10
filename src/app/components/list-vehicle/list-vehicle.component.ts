import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/VehicleService/vehicle.service';

@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.css']
})
export class ListVehicleComponent implements OnInit {
  vehicles: any[] = [];

  constructor(
    private vehicleService: VehicleService,
  ) { }

  ngOnInit() {
    this.fetchUserVehicles();
    this.vehicleService.vehicleRegistered$.subscribe(() => {
      this.fetchUserVehicles();
    });
  }

  fetchUserVehicles() {
    this.vehicleService.getUserVehicles().subscribe(
      (response) => {
        this.vehicles = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteVehicle(id:number){
  this.vehicleService.deleteVehicle(id).subscribe(
    (Response) =>{
        this.fetchUserVehicles();
    },
    (error) => {
      console.error(error)
    }
  )
  }

}
