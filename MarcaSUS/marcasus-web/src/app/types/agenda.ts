import { Medico } from './medico';

interface AgendaSuper {
  id: number;
  horario: string | Date;
  medico: Medico;
  ocupada: boolean;
}

// INTERFACE DE VERDADE
export interface Agenda extends AgendaSuper {
  horario: Date;
}

// gamby pra nao fazer iso
export interface AgendaAPI extends AgendaSuper {
  horario: string;
}
