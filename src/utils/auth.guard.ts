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

    if (!accessToken) {
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión si no hay token válido
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class IsLogged implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      this.router.navigate(['/dashboard']); // Redirige a la página si hay token válido
      return false;
    }
    return true;
  }
}
