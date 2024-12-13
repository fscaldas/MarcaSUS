import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private storage: StorageService, private router: Router) {}

  links = [
    {
      desc: 'Atualizar agenda',
      disabled: false,
      url: '/criar-agendamento',
    },
    {
      desc: 'Cadastrar consulta',
      disabled: false,
      url: '/cadastrar-consulta',
    },
    {
      desc: 'Visualizar consultas',
      disabled: true,
      url: '/consultas',
    },

    {
      desc: 'Cadastrar novo médico',
      disabled: true,
      url: '/novo-medico',
    },
    {
      desc: 'Informações da unidade',
      disabled: true,
      url: '/info',
    },
  ];

  logout() {
    this.storage.remove('cpf').subscribe({
      next: () => {
        this.router.navigateByUrl('/login', {
          replaceUrl: true,
        });
      },
    });
  }
}
