import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatCardModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatDividerModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';

const UI_MODULES = [
  FlexLayoutModule,

  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatMenuModule,
  MatDividerModule,
  MatDialogModule,
  MatSnackBarModule
];

@NgModule({
  imports: [],
  exports: UI_MODULES
})
export class UiModule { }
