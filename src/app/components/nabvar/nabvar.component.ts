import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent {
  constructor(private router: Router) {}

  isHomeRoute(): boolean {
    return this.router.url === '/';
  }

  isSignupRoute(): boolean {
    return this.router.url === '/signup';
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return token !== null;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    // Realizar cualquier otra acción necesaria al cerrar sesión, como redireccionar a una página de inicio de sesión.
    this.router.navigate(['/']);
  }
}
