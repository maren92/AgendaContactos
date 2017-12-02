import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './agenda.component.html'
})

export class AgendaComponent {
    contacto: boolean = false;
    grupo: boolean = false;

    MostrarContacto() {
        this.grupo = false;
        this.contacto = true;
    }

    MostrarGrupo() {
        this.contacto = false;
        this.grupo = true;
    }
}