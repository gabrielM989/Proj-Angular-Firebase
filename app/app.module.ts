import { FuncionarioListaComponent } from './components/funcionario/funcionario-lista/funcionario-lista.component';
import { FuncionarioFormComponent } from './components/funcionario/funcionario-form/funcionario-form.component';
import { FuncionarioAdmComponent } from './components/funcionario/funcionario-adm/funcionario-adm.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

//Parte de autenticação
import { AngularFireAuth } from '@angular/fire/compat/auth';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/templates/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingsModule } from './app-routing.module';
import { FuncionarioCardComponent } from './components/funcionario/funcionario-card/funcionario-card.component';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import  localePT  from '@angular/common/locales/pt';
import { LoginComponent } from './components/login/login.component';
import { CargoListaComponent } from './components/cargo/cargo-lista/cargo-lista.component';

registerLocaleData(localePT)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FuncionarioAdmComponent,
    FuncionarioFormComponent,
    FuncionarioListaComponent,
    MainNavComponent,
    FuncionarioCardComponent,
    LoginComponent,
    CargoListaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    AppRoutingsModule,


    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    ReactiveFormsModule

  ],
  providers: [
    AngularFireAuth,

    {provide: LOCALE_ID, useValue: "pt-BR"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
