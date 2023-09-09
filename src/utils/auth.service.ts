import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessTokenKey = 'access_token';

  constructor() {}

  setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('access_token');
    const user_id = localStorage.getItem('user_id')

    return user_id || '';
  }
}
