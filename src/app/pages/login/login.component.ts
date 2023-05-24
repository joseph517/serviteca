import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient) { }

  login() {
    const email = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    const data = {
      email: email,
      password: password
    };

    this.http.post<any>('http://localhost:8000/api/token/', data).subscribe(
      response => {
        // Guardar el token de acceso en el localStorage
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('user_id', response.user_id);


        // Redireccionar a la página principal
        window.location.href = 'http://localhost:4200/dashboard';
      },
      error => {
        alert('datos incorrectos')
        // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
      }
    );
  }

}