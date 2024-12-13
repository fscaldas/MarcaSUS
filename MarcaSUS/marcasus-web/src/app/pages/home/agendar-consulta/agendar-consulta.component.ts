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
import { formatDateToApi } from '../../../utils/date';

const COLORS: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
};

@Component({
  selector: 'app-agendar-consulta',
  templateUrl: './agendar-consulta.component.html',
  styleUrl: './agendar-consulta.component.scss',
})
export class AgendarConsultaComponent {
  view: CalendarView = CalendarView.Week;
  dirty = false;
  INTERVAL = 15;

  today = new Date();
  startDate = this.today;
  viewDate = this.startDate;

  events: CalendarEvent[] = [];

  refresh = new Subject<void>();

  medicoSelecionado?: Medico;
  medicos$ = defer(() => this.api.get<Medico[]>('medicos'));
  medicoSelecionado$ = new Subject<Medico>();

  horarios$: Observable<AgendaAPI[]> = this.medicoSelecionado$.pipe(
    switchMap((medicoSelecionado: Medico) => {
      this.medicoSelecionado = medicoSelecionado;
      return this.api
        .get<{
          agendasDisponiveis: AgendaAPI[];
          agendasOcupadas: AgendaAPI[];
        }>(
          // `agendas/disponiveis-por-medico/{crm}?crm=${medico.crm}`
          `agendas/disponiveis-vs-ocupadas`
        )
        .pipe(
          map(({ agendasDisponiveis, agendasOcupadas }) => {
            const horarios = [
              ...agendasDisponiveis.map((value) => ({
                ...value,
                ocupada: false,
              })),
              ...agendasOcupadas.map((value) => ({
                ...value,
                ocupada: true,
              })),
            ].filter(({ medico }) => medico.crm === medicoSelecionado.crm);
            return horarios;
          })
        );
    })
  );

  constructor(private api: ApiService, private spinner: NgxSpinnerService) {
    this.horarios$.subscribe({
      next: (value) => {
        this.events = value.map((agenda) => {
          const date = parse(agenda.horario, 'yyyy-MM-dd HH:mm:ss', new Date());
          return {
            id: agenda.id,
            start: date,
            end: addMinutes(date, this.INTERVAL),
            title: agenda.ocupada ? `Horário ocupado` : `Horário aberto`,
            color: agenda.ocupada ? COLORS.red : COLORS.blue,
          };
        });
      },
    });
  }

  get buttonDisabled() {
    return isBefore(addDays(this.viewDate, -7), this.startDate);
  }

  refreshDate(delta: number) {
    this.viewDate = addDays(this.viewDate, delta);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  hourSegmentClicked(ev: any) {
    const { date } = ev;
    if (isBefore(date, this.today)) return;
    this.events = [
      ...this.events,
      {
        start: date,
        end: addMinutes(date, this.INTERVAL),
        title: `Horário aberto`,
      },
    ];

    this.dirty = true;
  }

  salvar() {
    if (this.medicoSelecionado === undefined) return;
    this.spinner.show();
    const medSel = this.medicoSelecionado;
    const horarios = this.events.reduce((arr, curr) => {
      if (curr.id !== undefined) return arr;
      return [
        ...arr,
        {
          medico: medSel,
          posto: { id: config.posto },
          horario: formatDateToApi(curr.start),
        },
      ];
    }, [] as { medico: Medico; posto: any; horario: string }[]);

    combineLatest(horarios.map((horario) => this.api.post('agendas', horario)))
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.medicoSelecionado$.next(medSel);
          this.dirty = false;
        },
        error: () => {
          this.spinner.hide();
        },
        complete: () => {
          this.spinner.hide();
        },
      });
  }

  eventClicked(ev: {
    event: CalendarEvent;
    sourceEvent: MouseEvent | KeyboardEvent;
  }) {
    if (ev.event.color === COLORS.red) {
      return;
    }

    const event = this.events.splice(this.events.indexOf(ev.event), 1).pop();
    if (event?.id !== undefined) {
      this.api.delete(`agendas/${event.id}?id=${event.id}`).subscribe({
        next: (data) => {
          console.log(data);
        },
      });
    }
    this.refresh.next();
  }
}
