import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {MaterialModule} from './material.module';

const modules = [
  FormsModule,
  FlexLayoutModule,
  MaterialModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class SharedModule {}
