import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatFormFieldModule } from '@angular/material';

const UI_MODULES = [
  FlexLayoutModule,

  MatCardModule,
  MatFormFieldModule
];

@NgModule({
  imports: [],
  exports: UI_MODULES
})
export class UiModule { }
