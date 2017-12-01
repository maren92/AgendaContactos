import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from "./components/home/home.component";

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        RouterModule
    ],

    declarations: [
        FooterComponent,
        HeaderComponent,
        HomeComponent
    ],

    exports: [
        FooterComponent,
        HeaderComponent,
        HomeComponent
    ]
})

export class SharedModule { }
