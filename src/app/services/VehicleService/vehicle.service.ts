import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from 'src/utils/auth.service';



@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicles: any[] = [];

  private apiUrlVehicle = 'http://localhost:8000/api/vehicle/';

  private vehiclesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public vehicles$: Observable<any[]> = this.vehiclesSubject.asObservable();

  private vehicleUpdate = new Subject<void>();
  vehicleUpdate$ = this.vehicleUpdate.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  notifyVehicleUpdate() {
    this.vehicleUpdate.next();
  }

  registerVehicle(vehicleData: any) {
    const headers = this.getHeaders();
    this.http
      .post<any>('http://localhost:8000/api/vehicle/create/', vehicleData, { headers })
      .subscribe(
        response => {
          // alert('Vehículo registrado exitosamente');
          this.onVehicleRegistered(response);
          this.getUserVehicles();
          this.notifyVehicleUpdate();
        },
        error => {
          console.error(error);
          alert('Error al registrar el vehículo');
        }
      );
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

  onVehicleRegistered(vehicle: any) {
    const currentVehicles = this.vehiclesSubject.value;
    const updatedVehicles = [...currentVehicles, vehicle];
    this.vehiclesSubject.next(updatedVehicles);
  }

  getUserVehicles(): Observable<any[]> {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');
    if (userId && token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      const url = `${this.apiUrlVehicle}user_list/?user_id=${userId}`;
      return this.http.get<any[]>(url, { headers });
    } else {
      return new Observable<any[]>(observer => {
        observer.error('User ID or Access Token not available');
      });
    }
  }

  deleteVehicle(idVehicle: number): Observable<any> {
    const token = localStorage.getItem('access_token')
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    const url = `${this.apiUrlVehicle}delete/${idVehicle}/`
    return this.http.delete<any>(url, { headers })
  }

}
