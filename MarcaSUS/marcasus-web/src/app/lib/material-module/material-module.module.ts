import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';

const MAT_MODULES = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
];
@NgModule({
  declarations: [],
  imports: [CommonModule, ...MAT_MODULES],
  exports: [...MAT_MODULES],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class MaterialModuleModule {}
