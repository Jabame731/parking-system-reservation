import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

type Label = string;

interface DialogData {
  label: Label;
}

@Component({
  selector: 'app-delete-item-modal',
  imports: [MatDialogModule, MatButton],
  templateUrl: './delete-item-modal.html',
  styleUrl: './delete-item-modal.scss',
})
export class DeleteItemModal {
  constructor(
    public dialogRef: MatDialogRef<DeleteItemModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
