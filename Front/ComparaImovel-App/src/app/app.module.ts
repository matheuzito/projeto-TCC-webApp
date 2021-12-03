import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { NgxCurrencyModule } from 'ngx-currency';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImoveisComponent } from './components/imoveis/imoveis.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { NavComponent } from './shared/nav/nav.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TituloComponent } from './shared/titulo/titulo.component';

import { ImovelService } from './services/imovel.service';
import { PrecoService } from './services/preco.service';

import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { ImovelDetalheComponent } from './components/imoveis/imovel-detalhe/imovel-detalhe.component';
import { ImovelListaComponent } from './components/imoveis/imovel-lista/imovel-lista.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { DetalheComponent } from './components/detalhe/detalhe.component';
import { SobreComponent } from './components/sobre/sobre.component';

defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    ImoveisComponent,
      ClientesComponent,
      ContatosComponent,
      PerfilComponent,
      DashboardComponent,
      NavComponent,
      TituloComponent,
      DateTimeFormatPipe,
      ImovelDetalheComponent,
      ImovelListaComponent,
      UserComponent,
      LoginComponent,
      RegistrationComponent,
      DetalheComponent,
      SobreComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  providers: [
    ImovelService, {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    PrecoService,
    AuthService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
