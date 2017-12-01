import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Configuration } from './../../app.constants';
import { Grupo } from './../../models/grupo';
import { GrupoCompleto } from "../../models/grupoCompleto";

@Injectable()
export class GrupoService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private http: HttpClient, private configuration: Configuration) {

        this.actionUrl = configuration.Server + 'api/Grupoes/';

        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }

    getAll(): Observable<Grupo[]> {
        return this.http.get<Grupo[]>(this.actionUrl, { headers: this.headers });
    }

    getSingle(id: number): Observable<Grupo> {
        return this.http.get<Grupo>(this.actionUrl + id, { headers: this.headers });
    }

    add(GrupoToAdd: Grupo, Contactos: any): Observable<GrupoCompleto> {
        const toAdd = JSON.stringify({
            grupo: {
                nombre: GrupoToAdd.nombre
            },
            contactos: Contactos ? Contactos : []
    });

        return this.http.post<GrupoCompleto>(this.actionUrl, toAdd, { headers: this.headers });
    }

    update(id: number, itemToUpdate: any, Contactos:any): Observable<GrupoCompleto> {
        const toUpdate = JSON.stringify({
            grupo: {
                id: id,
                nombre: itemToUpdate.nombre
            },
            contactos: Contactos
        });
        return this.http.put<GrupoCompleto>(this.actionUrl + id, toUpdate, { headers: this.headers });
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(this.actionUrl + id, { headers: this.headers });
    }
}
