import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ptBR } from 'date-fns/locale';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModuleModule } from './lib/material-module/material-module.module';
import { LoginComponent } from './pages/login/login.component';

import { HttpClientModule } from '@angular/common/http';
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarNativeDateFormatter,
  DateAdapter,
  DateFormatterParams,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { format } from 'date-fns';
import { capitalize } from 'lodash';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderComponent } from './components/header/header.component';
import { AgendarConsultaComponent } from './pages/home/agendar-consulta/agendar-consulta.component';
import { CadastrarConsultaComponent } from './pages/home/cadastrar-consulta/cadastrar-consulta.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AgendarConsultaComponent,
    CadastrarConsultaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskDirective,
    NgxSpinnerModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: adapterFactory,
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: AppModule,
        },
      }
    ),
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule extends CalendarNativeDateFormatter {
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }

  public override weekViewColumnHeader({
    date,
    locale,
  }: DateFormatterParams): string {
    return capitalize(format(date, 'EEEE', { locale: ptBR }));
  }
}
