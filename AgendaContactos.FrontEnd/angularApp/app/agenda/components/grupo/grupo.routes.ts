import { RouterModule, Routes } from '@angular/router';

import { GrupoComponent } from './grupo.component';
import { IndexGrupoComponent } from './index_grupo.component';
import { AddEditGrupoComponent } from './add_edit_grupo.component';

const routes: Routes = [
    {
        path: '', component: GrupoComponent,
        children: [
            { path: '', component: IndexGrupoComponent },
            { path: 'add', component: AddEditGrupoComponent },
            { path: 'edit/:id', component: AddEditGrupoComponent }]
    }
];

export const GrupoRoutes = RouterModule.forChild(routes);