import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientesComponent } from './components/clientes/clientes.component';


import { ImoveisComponent } from './components/imoveis/imoveis.component';
import { ImovelDetalheComponent } from './components/imoveis/imovel-detalhe/imovel-detalhe.component';
import { ImovelListaComponent } from './components/imoveis/imovel-lista/imovel-lista.component';

import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';

import { ContatosComponent } from './components/contatos/contatos.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { DetalheComponent } from './components/detalhe/detalhe.component';
import { SobreComponent } from './components/sobre/sobre.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'registration', component: RegistrationComponent},
    ]
  },
  {
    path: 'user/perfil', component: PerfilComponent, canActivate: [AuthGuard]
  },
  {path: 'imoveis', redirectTo: 'imoveis/lista'},
  {
    path: 'imoveis', component: ImoveisComponent,
    children: [
    {path: 'detalhe/:id', component: ImovelDetalheComponent, canActivate: [AuthGuard]},
    {path: 'detalhe', component: ImovelDetalheComponent, canActivate: [AuthGuard]},
    {path: 'lista', component: ImovelListaComponent, canActivate: [AuthGuard]},
    ]
  },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'informacao/:id', component: DetalheComponent},
  {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
  {path: 'contatos', component: ContatosComponent},
  {path: 'sobre', component: SobreComponent, },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
