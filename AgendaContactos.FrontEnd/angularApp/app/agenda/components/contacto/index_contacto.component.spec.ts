import { TestBed, ComponentFixture, inject } from '@angular/core/testing';

import { IndexContactoComponent } from './index_contacto.component';
import { ContactoService } from "../../../core/services/contacto.service";
import { IndexContactoStub } from "../../../../testing/mocks";

describe('IndexContactoComponet', () => {
    //instancia del componente
    let fixure: ComponentFixture<IndexContactoComponent>;
    let instancia: IndexContactoComponent;
    let contactoService: ContactoService;

    //config del módulo
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [IndexContactoComponent],
            providers: [
                { provide: ContactoService, useValue: IndexContactoStub },
            ]
        });

        //crear instancias
        fixure = TestBed.createComponent(IndexContactoComponent);
        instancia = fixure.componentInstance;
        contactoService = fixure.debugElement.injector.get(ContactoService);
    });

    //test
    it('preguntar por el listado de contactos', () => {
        spyOn(contactoService, 'getAll').and.callThrough();
        instancia.ngOnInit();
        expect(contactoService.getAll).toHaveBeenCalledWith([]);
    });

    it('eliminar del listado de contactos', () => {
        spyOn(contactoService, 'delete').and.callThrough();
        instancia.ngOnInit();
        expect(contactoService.delete).toHaveBeenCalledWith(0);
    });
});