import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BillPhotoDialogComponent } from './dialogs/bill-photo-dialog/bill-photo-dialog.component';

const modules = [
  FormsModule,
  FlexLayoutModule,
  MaterialModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [
    BillPhotoDialogComponent
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ],
  entryComponents: [BillPhotoDialogComponent],
})
export class SharedModule {}
