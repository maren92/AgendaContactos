import { RouterModule, Routes } from '@angular/router';

import { ContactoComponent } from './contacto.component';
import { IndexContactoComponent } from './index_contacto.component';
import { AddEditContactoComponent } from './add_edit_contacto.component';

const routes: Routes = [
    {
        path: '', component: ContactoComponent,
        children: [
            { path: '', component: IndexContactoComponent },
            { path: 'add', component: AddEditContactoComponent },
            { path: 'edit/:id', component: AddEditContactoComponent }]
    }
];

export const ContactoRoutes = RouterModule.forChild(routes);