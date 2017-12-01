import { Component, OnInit } from '@angular/core';

import { GrupoService } from '../../../core/services/grupo.service';
import { Grupo } from '../../../models/grupo';
import { Router, ActivatedRoute } from "@angular/router";
import { Contacto } from "../../../models/contacto";
import { GrupoContactos } from "../../../models/grupoContactos";
import { ContactoService } from "../../../core/services/contacto.service";
import { GrupoContactosService } from "../../../core/services/grupoContactos.service";

@Component({
    selector: 'add_edit_grupo-component',
    templateUrl: './add_edit_grupo.component.html',
})

export class AddEditGrupoComponent {
    public message: string;
    public grupo: Grupo = new Grupo();
    public grupos: Grupo[] = [];
    private grupoId: number;
    public contact: any;
    public contacto: Contacto = new Contacto();
    public contactos: Contacto[] = null;
    public grupoContacto: GrupoContactos = new GrupoContactos();
    private grupoAux: Grupo = null;


    constructor(
        private dataService: GrupoService,
        private ContactoService: ContactoService,
        private grupoContactosService: GrupoContactosService,
        private router: Router,
        private route: ActivatedRoute){}
     

    ngOnInit() {
        this.grupoId = Number(this.route.snapshot.params['id']);
        this.getAllContactos();
        if (this.grupoId) {
            this.message = 'Modificar grupo';
            this.dataService
                .getSingle(this.grupoId)
                .subscribe(
                data => {
                this.grupoAux = data;
                this.fillData();
                },
                error => console.log(error),
                () => console.log('Get all complete')
                );
        } else {
            this.message = 'Adicionar grupo';
        }
    }

    private fillData() {
        if (this.grupoAux && this.contactos) {
            this.contact = [];
            this.grupoAux.grupoContactos.forEach(gc => this.contact.push(this.contactos.find(c => c.id === gc.contacto.id)));
            this.grupo = this.grupoAux;
        }
    }
    

    public addGrupo() {
        this.dataService
            .add(this.grupo, this.contact)
            .subscribe(() => {
                this.router.navigate(['agenda/grupo']);
            }, (error) => {
                console.log(error);
            });
    }

    public editGrupo() {
        this.dataService
            .update(this.grupoId, this.grupo, this.contact)
            .subscribe(
            data => this.router.navigate(['agenda/grupo']),
            error => console.log(error),
            () => console.log('Get all complete'));
    }

    public saveGrupo() {
        this.grupoId = Number(this.route.snapshot.params['id']);
        if (this.grupoId) {
            this.editGrupo();
        }
        else {
            this.addGrupo();
        }
    }

    public getAllContactos() {
        this.ContactoService
            .getAll()
            .subscribe(
            data => {
                this.contactos = data;
                if (this.grupoId) {
                    this.fillData();
                }
            },
            error => console.log(error),
            () => console.log('Get all complete')
            );
    }
}