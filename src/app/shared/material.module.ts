import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatAutocompleteModule, MatBottomSheetModule, MatBottomSheetRef, MatDialogModule, MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatNativeDateModule, MatRadioModule, MatSliderModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDividerModule,
    MatRadioModule,
    MatListModule,
    MatSliderModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatFormFieldModule
  ],
  declarations: [],
  providers: [{ provide: MatBottomSheetRef, useValue: {} }, MatDatepickerModule],
})
export class MaterialModule { }
