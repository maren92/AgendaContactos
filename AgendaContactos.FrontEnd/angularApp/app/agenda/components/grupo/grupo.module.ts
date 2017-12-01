import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GrupoComponent } from './grupo.component';
import { AddEditGrupoComponent } from './add_edit_grupo.component';
import { IndexGrupoComponent } from './index_grupo.component';
import { GrupoRoutes } from './grupo.routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        GrupoRoutes,
        NgbModule
    ],

    declarations: [
        GrupoComponent,
        AddEditGrupoComponent,
        IndexGrupoComponent
    ]
})

export class GrupoModule { }