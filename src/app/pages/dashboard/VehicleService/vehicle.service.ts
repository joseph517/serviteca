import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/utils/auth.service';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:8000/api/vehicle/';

  private vehiclesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public vehicles$: Observable<any[]> = this.vehiclesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService : AuthService
  ) {
    this.fetchVehicles();
  }

  fetchVehicles() {
    const headers = this.getHeaders();
    this.http.get<any[]>(`${this.apiUrl}user_list/`, { headers }).subscribe(
      response => {
        this.vehiclesSubject.next(response);
      },
      error => {
        console.error(error);
      }
    );
  }

  registerVehicle(vehicleData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}create/`, vehicleData, { headers });
  }

  onVehicleRegistered(vehicle: any) {
    const currentVehicles = this.vehiclesSubject.value;
    const updatedVehicles = [...currentVehicles, vehicle];
    this.vehiclesSubject.next(updatedVehicles);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    const userId = this.authService.getUserIdFromToken();
    const headersConfig: { [header: string]: string | string[] } = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
    if (userId !== null) {
      headersConfig['user_id'] = userId.toString();
    }
    return new HttpHeaders(headersConfig);
  }
  getUserVehicles(): Observable<any[]> {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');
    if (userId && token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      const url = `${this.apiUrl}user_list/?user_id=${userId}`;
      return this.http.get<any[]>(url, { headers });
    } else {
      return new Observable<any[]>(observer => {
        observer.error('User ID or Access Token not available');
      });
    }
  }
}
