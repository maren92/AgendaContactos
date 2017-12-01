import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContactoComponent } from './contacto.component';
import { AddEditContactoComponent } from './add_edit_contacto.component';
import { IndexContactoComponent } from './index_contacto.component';
import { ContactoRoutes } from './contacto.routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ContactoRoutes,
        NgbModule
    ],

    declarations: [
        ContactoComponent,
        AddEditContactoComponent,
        IndexContactoComponent
    ]
})

export class ContactoModule { }