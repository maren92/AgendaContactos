import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Configuration } from './../../app.constants';
import { GrupoContactos } from './../../models/grupoContactos';
import { Contacto } from "../../models/contacto";
import { Grupo } from "../../models/grupo";

@Injectable()
export class GrupoContactosService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private http: HttpClient, private configuration: Configuration) {

        this.actionUrl = configuration.Server + 'api/GrupoContactos/';

        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }

    getAll(): Observable<GrupoContactos[]> {
        return this.http.get<GrupoContactos[]>(this.actionUrl, { headers: this.headers });
    }

    getSingle(id: number): Observable<GrupoContactos> {
        return this.http.get<GrupoContactos>(this.actionUrl + id, { headers: this.headers });
    }

    getByContacto(contacto: Contacto): Observable<GrupoContactos[]> {
        return this.http.get<GrupoContactos[]>(this.actionUrl + 'contacto/' + contacto.id, { headers: this.headers });
    }

    getByGrupo(grupo: Grupo): Observable<GrupoContactos[]> {
        return this.http.get<GrupoContactos[]>(this.actionUrl + 'grupo/' + grupo.id, { headers: this.headers });
    }

    add(GrupoContactosToAdd: GrupoContactos): Observable<GrupoContactos> {
        const toAdd = JSON.stringify({ contactoId: GrupoContactosToAdd.contacto.id, grupoId: GrupoContactosToAdd.grupo.id });

        return this.http.post<GrupoContactos>(this.actionUrl, toAdd, { headers: this.headers });
    }

    update(id: number, itemToUpdate: any): Observable<GrupoContactos> {
        return this.http
            .put<GrupoContactos>(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers });
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(this.actionUrl + id, { headers: this.headers });
    }
}
