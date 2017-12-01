import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { Configuration } from '../app.constants';
import { ContactoService } from "./services/contacto.service";
import { GrupoService } from "./services/grupo.service";
import { GrupoContactosService } from "./services/grupoContactos.service";
import { TelefonoService } from "./services/telefono.service";
import { AuthGuardService } from "./services/auth_guard.service";
import { AuthService } from "./services/auth.service";


@NgModule({
    imports: [
        CommonModule
    ]
})

export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                Configuration,
                ContactoService,
                GrupoService,
                TelefonoService,
                GrupoContactosService,
                AuthGuardService,
                AuthService,
            ]
        };
    }
}
