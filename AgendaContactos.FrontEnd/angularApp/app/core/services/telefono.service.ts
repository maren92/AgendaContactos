import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Configuration } from './../../app.constants';
import { Telefono } from './../../models/telefono';
import { Contacto } from "../../models/contacto";

@Injectable()
export class TelefonoService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private http: HttpClient, private configuration: Configuration) {

        this.actionUrl = configuration.Server + 'api/Telefonoes/';

        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }

    getAll(): Observable<Telefono[]> {
        return this.http.get<Telefono[]>(this.actionUrl, { headers: this.headers });
    }

    getSingle(id: number): Observable<Telefono> {
        return this.http.get<Telefono>(this.actionUrl + id, { headers: this.headers });
    }

    getTelefonoByContacto(contacto: Contacto): Observable<Telefono[]> {
        return this.http.get<Telefono[]>(this.actionUrl + 'contacto/' + contacto.id, { headers: this.headers });
    }

    add(TelefonoToAdd: Telefono): Observable<Telefono> {
        const toAdd = JSON.stringify({ numero: TelefonoToAdd.numero, contactoId: TelefonoToAdd.contacto.id });

        return this.http.post<Telefono>(this.actionUrl, toAdd, { headers: this.headers });
    }

    update(id: number, itemToUpdate: any): Observable<Telefono> {
        return this.http
            .put<Telefono>(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers });
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(this.actionUrl + id, { headers: this.headers });
    }
}
