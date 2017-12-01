import { Component } from '@angular/core';
import { Contacto } from '../../../models/contacto';
import { ContactoService } from "../../../core/services/contacto.service";

@Component({
    selector: './index_contacto.component.html',
    templateUrl: 'index_contacto.component.html'
})

export class IndexContactoComponent {
    public message: string;
    public contactos: Contacto[] = [];

    constructor(private dataService: ContactoService) {
        this.message = 'Listado de Contactos';
    }

    ngOnInit() {
        this.getAllContactos();
    }

    public deleteContacto(contacto: Contacto) {
        this.dataService
            .delete(contacto.id)
            .subscribe(() => {
                this.getAllContactos();
            }, (error) => {
                console.log(error);
            });
    }

    private getAllContactos() {
        this.dataService
            .getAll()
            .subscribe(
            data => this.contactos = data,
            error => console.log(error),
            () => console.log('Get all complete')
            );
    }
}