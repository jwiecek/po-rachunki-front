import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-bill-warranty',
  templateUrl: './bill-warranty.component.html',
  styleUrls: ['./bill-warranty.component.scss']
})
export class BillWarrantyComponent {
  private time: string;
  @Input() selectedWarrantyMonth: number;
  public selectedWarrantyLabel: number | string = 0;
  public selectedWarrantyValue = 0;
  @Output() selectedWarranty = new EventEmitter<number | string>();

  getSelectedWarrantyValue(): number {
    if (this.selectedWarrantyMonth) {
      this.selectedWarrantyValue = this.selectedWarrantyMonth >= 24 ? this.selectedWarrantyMonth / 12 + 22 : this.selectedWarrantyMonth;
    } else {
      this.selectedWarrantyValue = 0;
    }
    this.changeWarrantyValue();
    return this.selectedWarrantyValue;
  }

  getNewWarranty(event: MatSliderChange): void {
    this.selectedWarrantyValue = event.value;
    this.changeWarrantyValue();
    this.selectedWarranty.emit(this.selectedWarrantyMonth);
  }

  changeWarrantyValue(): void {
    if (this.selectedWarrantyValue <= 24) {
      this.selectedWarrantyLabel = this.selectedWarrantyValue;
      this.selectedWarrantyMonth = this.selectedWarrantyLabel;
      document.getElementsByClassName(
        'mat-slider-thumb-label-text'
      )[0].innerHTML = this.selectedWarrantyLabel.toString();
      this.time = 'miesięcy';
      if (this.selectedWarrantyValue === 1) {
        this.time = 'miesiąc';
      }
      if (this.selectedWarrantyValue > 1 && this.selectedWarrantyValue <= 4) {
        this.time = 'miesiące';
      }
      if (this.selectedWarrantyValue >= 5) {
        this.time = 'miesięcy';
      }
    } else {
      this.time = 'lat';
      this.selectedWarrantyLabel = this.selectedWarrantyValue - 22;
      this.selectedWarrantyMonth = this.selectedWarrantyLabel * 12;
      document.getElementsByClassName(
        'mat-slider-thumb-label-text'
      )[0].innerHTML = this.selectedWarrantyLabel.toString();
      if (
        (this.selectedWarrantyValue >= 24 && this.selectedWarrantyValue < 27) ||
        (this.selectedWarrantyValue >= 44 && this.selectedWarrantyValue < 47)
      ) {
        this.time = 'lata';
      }
      if (this.selectedWarrantyValue >= 54) {
        this.selectedWarrantyLabel = 'dożywotnio';
        this.time = '';
        document.getElementsByClassName('mat-slider-thumb-label-text')[0].innerHTML = '*';
      }
    }
  }
}
