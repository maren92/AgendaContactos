import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgendaComponent } from './components/agenda.component';
import { AgendaRoutes } from './agenda.routes';

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        RouterModule,
        AgendaRoutes
    ],

    declarations: [
        AgendaComponent
    ],
    exports: [
        AgendaComponent
    ]
    
})

export class AgendaModule { }