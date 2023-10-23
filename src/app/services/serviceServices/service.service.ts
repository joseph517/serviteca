import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  typeService:any = []
   urlServiceType:string = 'http://localhost:8000/api/service/service-type'

   getTypeService():Observable<any>{
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    const url = `${this.urlServiceType}/list/`
    return this.http.get<any[]>(url, { headers });
   }
}
