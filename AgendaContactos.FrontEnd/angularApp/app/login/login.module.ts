import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routes';

@NgModule({
    imports: [
        RouterModule,
        LoginRoutes,
        FormsModule,
    ],

    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ]

})

export class LoginModule { }