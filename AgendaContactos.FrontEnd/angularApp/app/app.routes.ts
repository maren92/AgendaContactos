import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "./core/services/auth_guard.service";
import { HomeComponent } from "./shared/components/home/home.component";

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'agenda', canActivate: [AuthGuardService], loadChildren: './agenda/agenda.module#AgendaModule' }
];

export const AppRoutes = RouterModule.forRoot(routes);
