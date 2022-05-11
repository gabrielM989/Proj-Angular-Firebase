import { FuncionarioAdmComponent } from './components/funcionario/funcionario-adm/funcionario-adm.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/templates/home/home.component';
import { NgModule } from '@angular/core';
import { FuncionarioCardComponent } from './components/funcionario/funcionario-card/funcionario-card.component';
import { AutorizadoGuard } from './components/guards/autorizado.guard';
import { CargoListaComponent } from './components/cargo/cargo-lista/cargo-lista.component';

const routes: Routes = [
{path:"", component: HomeComponent},
{path:"func-adm", component:FuncionarioAdmComponent, canActivate: [AutorizadoGuard]},
{path:"cards-func", component:FuncionarioCardComponent},
{path:"lista-cargo", component: CargoListaComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingsModule {}
