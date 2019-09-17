import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-bill-photo-dialog',
  templateUrl: './bill-photo-dialog.component.html',
  styleUrls: ['./bill-photo-dialog.component.scss']
})
export class BillPhotoDialogComponent implements OnInit {
  url: string;

  constructor(
    public dialogRef: MatDialogRef<BillPhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.url = `${environment.API_URL}/bills/${this.data.urlPhoto}`;
  }
}
