import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedIn, isntLoggedIn } from './guards/login.guard';
import { AgendarConsultaComponent } from './pages/home/agendar-consulta/agendar-consulta.component';
import { CadastrarConsultaComponent } from './pages/home/cadastrar-consulta/cadastrar-consulta.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isntLoggedIn],
  },
  {
    path: 'criar-agendamento',
    component: AgendarConsultaComponent,
    canActivate: [isLoggedIn],
  },
  {
    path: 'cadastrar-consulta',
    component: CadastrarConsultaComponent,
    canActivate: [isLoggedIn],
  },
  {
    path: '**',
    redirectTo: 'criar-agendamento',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
