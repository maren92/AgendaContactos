import { RouterModule, Routes } from '@angular/router';

import { AgendaComponent } from './components/agenda.component';

const routes: Routes = [
    {
        path: '', component: AgendaComponent, children: [
            { path: 'contacto', loadChildren: './components/contacto/contacto.module#ContactoModule' },
            { path: 'grupo', loadChildren: './components/grupo/grupo.module#GrupoModule' },
        ]
    }
];


export const AgendaRoutes = RouterModule.forChild(routes);
