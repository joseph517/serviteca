import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/VehicleService/vehicle.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDeleteComponent } from '../alert-delete/alert-delete.component';

@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.css']
})
export class ListVehicleComponent implements OnInit {
  vehicles: any[] = [];

  constructor(
    private vehicleService: VehicleService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fetchUserVehicles();
    this.vehicleService.vehicleUpdate$.subscribe(() => {
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

  openDialog(idVehicle:Number){
    this.dialog.open(AlertDeleteComponent,{
      data: idVehicle = idVehicle
    })
  }

}
