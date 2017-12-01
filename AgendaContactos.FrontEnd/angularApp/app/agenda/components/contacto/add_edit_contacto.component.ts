import { Component, OnInit } from '@angular/core';

import { ContactoService } from '../../../core/services/contacto.service';
import { Contacto } from '../../../models/contacto';
import { Router, ActivatedRoute } from "@angular/router";
import { Grupo } from "../../../models/grupo";
import { GrupoService } from "../../../core/services/grupo.service";
import { GrupoContactosService } from "../../../core/services/grupoContactos.service";
import { GrupoContactos } from "../../../models/grupoContactos";
import { TelefonoService } from "../../../core/services/telefono.service";
import { Telefono } from "../../../models/telefono";

@Component({
    selector: 'add_edit_contacto-component',
    templateUrl: './add_edit_contacto.component.html',
})

export class AddEditContactoComponent {
    public message: string;
    public contacto: Contacto = new Contacto();
    public contactos: Contacto[] = [];
    private contactoId: number;
    public grupos: Grupo[] = [];
    public group: any;
    public grupo: Grupo = new Grupo();
    public grupoContacto: GrupoContactos = new GrupoContactos();
    public telefono: Telefono = new Telefono();
    public telefonos: Telefono[] = [];
    private grutelcargados: number = 0;
    private contactoAux: Contacto = null;
    
    constructor(
        private dataService: ContactoService,
        private grupoService: GrupoService,
        private telefonoService: TelefonoService,
        private grupoContactosService: GrupoContactosService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.contactoId = Number(this.route.snapshot.params['id']);
        this.getAllGrupos();
        if (this.contactoId) {
            this.message = 'Modificar contacto';
            this.dataService
                .getSingle(this.contactoId)
                .subscribe(
                data => {
                    this.contactoAux = data;
                    this.fillData();
                },
                error => console.log(error),
                () => console.log('Get all complete')
                );
        } else {
            this.message = 'Adicionar contacto';
        }
    }

    private fillData() {
        if (this.contactoAux && this.grutelcargados === 1) {
            if (this.contactoAux.telefonos && this.contactoAux.telefonos.length > 0) {
                this.telefono = this.contactoAux.telefonos.pop();
                this.telefonos = this.contactoAux.telefonos;
            }

            this.group = [];
            this.contactoAux.grupoContactos.forEach(gc => this.group.push(this.grupos.find(g => g.id === gc.grupo.id)));
            this.contacto = this.contactoAux;
        }
    }

    public saveContacto() {
        if (this.contactoId) {
            this.editContacto();
        }
        else {
            this.addContacto();
        }
    }

    public addContacto() {
        this.telefonos.push(this.telefono);
        this.dataService
            .add(this.contacto, this.telefonos, this.group)
            .subscribe(
            data => {
                this.router.navigate(['agenda/contacto']);
            },
            error => console.log(error),
            () => console.log('Get all complete'));
    }

    public editContacto() {
        this.telefonos.push(this.telefono);
        this.dataService
            .update(this.contactoId, this.contacto, this.telefonos, this.group)
            .subscribe(
            data => this.router.navigate(['agenda/contacto']),
            error => console.log(error),
            () => console.log('Get all complete'));
    }
    
    private getAllGrupos() {
        this.grupoService
            .getAll()
            .subscribe(
            data => {
                this.grupos = data;
                if (this.contactoId) {
                    this.grutelcargados++;
                    this.fillData();
                }
            },
            error => console.log(error),
            () => console.log('Get all complete')
            );
    }

    public addArrTelefono() {
        this.telefonos.push(new Telefono());
    }

    public delArrTelefono(pos: number) {
        if (this.telefonos[pos].id > 0) {
            this.telefonoService.delete(this.telefonos[pos].id).subscribe();
        }
        this.telefonos.splice(pos,1);
    }
   
}