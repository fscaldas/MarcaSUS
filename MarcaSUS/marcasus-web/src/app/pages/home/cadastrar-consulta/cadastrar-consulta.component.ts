import { Component } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { addDays, addMinutes, isBefore, parse } from 'date-fns';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Observable,
  Subject,
  combineLatest,
  defer,
  map,
  switchMap,
  take,
} from 'rxjs';
import config from '../../../config';
import { ApiService } from '../../../services/api.service';
import { AgendaAPI } from '../../../types/agenda';
import { Medico } from '../../../types/medico';
import { Pessoa } from '../../../types/pessoa';
import { formatDateToApi } from '../../../utils/date';

@Component({
  selector: 'app-cadastrar-consulta',
  templateUrl: './cadastrar-consulta.component.html',
  styleUrl: './cadastrar-consulta.component.scss',
})
export class CadastrarConsultaComponent {
  dirty = false;
  INTERVAL = 15;

  today = new Date();
  startDate = this.today;
  viewDate = this.startDate;

  events: CalendarEvent[] = [];

  refresh = new Subject<void>();

  pessoaSelecionada?: Pessoa;
  horarioSelecionado?: any;

  pessoas$ = defer(() => this.api.get<Pessoa[]>('pessoas'));
  pessoaSelecionada$ = new Subject<Pessoa>();
  horarioSelecionado$ = new Subject<any>();

  horarios$ = this.pessoaSelecionada$.pipe(
    switchMap((pessoa) =>
      this.api.get<any>(
        `agendas/disponiveis-por-pessoa/{cpf}?cpf=${pessoa.cpf}`
      )
    )
  );

  constructor(private api: ApiService, private spinner: NgxSpinnerService) {
    this.pessoaSelecionada$.subscribe({
      next: (data) => {
        this.pessoaSelecionada = data;
      },
    });
  }

  salvar() {
    if (!this.pessoaSelecionada) return;
    const pessoaSel = this.pessoaSelecionada;
    this.spinner.show();
    this.api
      .post('consultas', {
        pessoa: {
          cpf: pessoaSel.cpf || '',
        },
        agenda: { id: this.horarioSelecionado.id },
      })
      .subscribe({
        next: (data) => {
          this.pessoaSelecionada$.next(pessoaSel);
          this.spinner.hide();
          this.horarioSelecionado = undefined;
        },
        error: () => {
          this.spinner.hide();
        },
        complete: () => {
          this.spinner.hide();
        },
      });
  }
}
