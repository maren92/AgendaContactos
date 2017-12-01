import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(usuario: string, pass: string): Observable<boolean> {
        if (usuario == 'admin' && pass == '123') {
            localStorage.setItem('logueado', 'si');
            return Observable.of(true).delay(1000).do(val => this.isLoggedIn = val);
        }
        return Observable.of(false).delay(1000).do(val => this.isLoggedIn = true);
    }

    logout(): void {
        localStorage.setItem('logueado','no');
    }
}