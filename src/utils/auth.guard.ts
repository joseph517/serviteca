import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      // Verifica la validez del token de acceso si es necesario
      // Aquí puedes implementar tu lógica personalizada para validar el token

      return true; // Retorna true si el token es válido
    } else {
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión si no hay token válido
      return false;
    }
  }
}
