import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleService } from 'src/app/services/VehicleService/vehicle.service';

@Component({
  selector: 'app-alert-delete',
  templateUrl: './alert-delete.component.html',
  styleUrls: ['./alert-delete.component.css']
})
export class AlertDeleteComponent {
  constructor(
    private vehicleService: VehicleService,

    public dialogRef: MatDialogRef<AlertDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idVehicle: number }
  ){}

  deleteVehicle() {
    const idVehicle = Number(this.data)
    this.vehicleService.deleteVehicle(idVehicle).subscribe(
      (Response) => {
        this.vehicleService.notifyVehicleUpdate()
      },
      (error) => {
        console.error(error)
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
