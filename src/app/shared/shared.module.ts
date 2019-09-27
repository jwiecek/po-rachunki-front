import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BillPhotoDialogComponent } from './dialogs/bill-photo-dialog/bill-photo-dialog.component';
import { InputChipComponent } from './components/input-chip/input-chip.component';
import { CommonModule } from '@angular/common';

const modules = [
  FormsModule,
  FlexLayoutModule,
  MaterialModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [
    BillPhotoDialogComponent,
    InputChipComponent
  ],
  imports: [
    ...modules,
    CommonModule
  ],
  exports: [
    ...modules,
    InputChipComponent
  ],
  entryComponents: [BillPhotoDialogComponent],
})
export class SharedModule {}
