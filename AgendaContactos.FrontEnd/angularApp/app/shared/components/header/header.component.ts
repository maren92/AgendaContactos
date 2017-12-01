import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent {
    titulo: string = 'Agenda Telefónica';

    get logueado() {
        return localStorage.getItem('logueado') == 'si';
    }
    constructor(private AuthService: AuthService) { }

   public CerrarSesion() {
       this.AuthService
           .logout();
    }
}