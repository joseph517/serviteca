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

}
