import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Configuration } from './../../app.constants';
import { Contacto } from './../../models/contacto';
import { ContactoCompleto } from "../../models/contactoCompleto";

@Injectable()
export class ContactoService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private http: HttpClient, private configuration: Configuration) {

        this.actionUrl = configuration.Server + 'api/Contactoes/';

        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }

    getAll(): Observable<Contacto[]> {
        return this.http.get<Contacto[]>(this.actionUrl, { headers: this.headers });
    }

    getSingle(id: number): Observable<Contacto> {
        return this.http.get<Contacto>(this.actionUrl + id, { headers: this.headers });
    }

    add(ContactoToAdd: Contacto, Telefonos: any, Grupos: any): Observable<ContactoCompleto> {
        const toAdd = JSON.stringify({
            contacto: {
                 nombreApe: ContactoToAdd.nombreApe,
                 correo: ContactoToAdd.correo,
                 alias: ContactoToAdd.alias,
                 direccion: ContactoToAdd.direccion
            },
            telefonos: Telefonos,
            grupos: Grupos
        });

        return this.http.post<ContactoCompleto>(this.actionUrl, toAdd, { headers: this.headers });
    }

    update(id: number, itemToUpdate: any, Telefonos: any, Grupos: any): Observable<ContactoCompleto> {
        const toUpdate = JSON.stringify({
            contacto: {
                id: id,
                nombreApe: itemToUpdate.nombreApe,
                correo: itemToUpdate.correo,
                alias: itemToUpdate.alias,
                direccion: itemToUpdate.direccion
            },
            telefonos: Telefonos,
            grupos: Grupos
        });
        return this.http
            .put<ContactoCompleto>(this.actionUrl + id, toUpdate, { headers: this.headers });
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(this.actionUrl + id, { headers: this.headers });
    }
}
