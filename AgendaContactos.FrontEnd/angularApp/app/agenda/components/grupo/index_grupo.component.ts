import { Component } from '@angular/core';
import { Grupo } from '../../../models/grupo';
import { GrupoService } from "../../../core/services/grupo.service";

@Component({
    selector: 'index-grupo',
    templateUrl: 'index_grupo.component.html'
})

export class IndexGrupoComponent {
    public message: string;
    public grupos: Grupo[] = [];

    constructor(private dataService: GrupoService) {
        this.message = 'Listado de Grupos';
    }

    ngOnInit() {
        this.getAllGrupos();
    }

    public deleteGrupo(grupo: Grupo) {
        this.dataService
            .delete(grupo.id)
            .subscribe(() => {
                this.getAllGrupos();
            }, (error) => {
                console.log(error);
            });
    }

    private getAllGrupos() {
        this.dataService
            .getAll()
            .subscribe(
            data => this.grupos = data,
            error => console.log(error),
            () => console.log('Get all complete')
            );
    }
}