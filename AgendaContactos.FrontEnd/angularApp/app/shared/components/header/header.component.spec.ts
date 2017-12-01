import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeaderComponent } from './header.component';
import { AuthService } from '../../../core/services/auth.service';

describe('HeaderComponent', () => {

    let comp: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    //async beforeEach para los casos donde el template y los css esten en ficheros aparte
    beforeEach(async(() => {
        let authServiceStub = {
            isLoggedIn: true,
            user: { name: 'Test User' }
        };

        TestBed.configureTestingModule({
            declarations: [HeaderComponent], // declare the test component
            providers: [{ provide: AuthService, useValue: authServiceStub }]
            })
            .compileComponents();  // compile template and css
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);

        comp = fixture.componentInstance; // HeaderComponent test instance
        let authService = fixture.debugElement.injector.get(AuthService);
        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('header .navbar-brand'));
        el = de.nativeElement;
    });

    it('should display original title', () => {
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.titulo);
    });

    it('should display a different test title', () => {
        comp.titulo = 'Test Title';
        fixture.detectChanges();
        expect(el.textContent).toContain('Test Title');
    });

});