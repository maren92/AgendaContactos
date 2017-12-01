import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../core/services/auth.service";

@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    public usuario: string;
    public pass: string;

    constructor(private router: Router, private AuthService: AuthService) { }

    ngOnInit() {
    }

    public Autenticarse() {
        if (this.usuario == 'admin' && this.pass == '123') {
            this.AuthService
                .login(this.usuario, this.pass)
                .subscribe(() => {
                    this.router.navigate(['agenda']);
                }, (error) => {
                    console.log(error);
                });
        }
        else {
            this.router.navigate(['login']);
        }

    }
}