import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { BillsService } from '../../../core/services/bills.service';
import { BillPhotoDialogComponent } from '../../../shared/dialogs/bill-photo-dialog/bill-photo-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-bill-image',
  templateUrl: './bill-image.component.html',
  styleUrls: ['./bill-image.component.scss']
})
export class BillImageComponent implements OnInit {
  public imagePreview;
  private imagePath: Blob = null;
  @Output() imagePathEmit = new EventEmitter<Blob>();
  @Input() selectedBillPhotoUrl: string;
  public isMobile: boolean;

  constructor(private billsService: BillsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.onResize();
  }

  onImagePicked(event): void {
    const file = event.target.files[0];
    const fileToUpload = (event.target as HTMLInputElement).files.item(0);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
    this.uploadFile(fileToUpload);
  }

  uploadFile(fileToUpload: Blob): void {
    this.billsService.uploadPhoto(fileToUpload).subscribe(
      data => {
        this.imagePath = data[0].filename;
        this.imagePathEmit.emit(this.imagePath);
      },
      error => {
        console.error('err: ', error);
      }
    );
  }

  showBillPhoto(): void {
    const dialogWidth = this.isMobile ? '100vw' : '350px';
    this.dialog.open(BillPhotoDialogComponent, {
      width: dialogWidth,
      data: { urlPhoto: this.selectedBillPhotoUrl }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const innerWidth = window.innerWidth;
    this.isMobile = innerWidth < 660;
  }
}
