import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatAnchor } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { SubmitButton } from '../submit-button/submit-button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BehaviorSubject } from 'rxjs';
import { CallbackOnFailureModel, ErrorProps } from '@parking-system-store/public-api';
import { AsyncPipe } from '@angular/common';
import { Notification } from '../notification/notification';

export interface AddParkingSlotData {
  onSubmit: ({
    data,
    onSuccess,
    onFailure,
  }: {
    data: {
      slotName: string;
      carPlate: string;
      slotStatus: string;
    };
    onSuccess: Function;
    onFailure: Function;
  }) => void;
}

@Component({
  selector: 'app-add-parking-slot-modal',
  imports: [
    FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatAnchor,
    MatDialogClose,
    SubmitButton,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    Notification,
  ],
  templateUrl: './add-parking-slot-modal.html',
  styleUrl: './add-parking-slot-modal.scss',
})
export class AddParkingSlotModal {
  constructor(
    public dialogRef: MatDialogRef<AddParkingSlotModal>,
    @Inject(MAT_DIALOG_DATA) public data: AddParkingSlotData,
  ) {}

  availableOpts = [
    { value: 'RESERVED', viewValue: 'Reserved' },
    { value: 'AVAILABLE', viewValue: 'Available' },
    { value: 'OCCUPIED', viewValue: 'Occupied' },
  ];

  submitting$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<ErrorProps | null>(null);

  onCancelClick() {
    if (!this.submitting$.getValue()) {
      this.dialogRef.close();
    }
  }

  handleSuccess() {
    this.submitting$.next(false);
    this.error$.next(null);
    this.dialogRef.close();
  }

  handleError(error: CallbackOnFailureModel) {
    this.submitting$.next(false);
    this.error$.next({
      title: 'Error',
      errorType: 'error',
      message: error.errorMsg,
      showClose: false,
    });
  }

  performAddParkingSlot(form: NgForm) {
    this.submitting$.next(true);
    const { slotName, carPlate } = form.value;

    const data = {
      slotName,
      carPlate,
      slotStatus: carPlate ? 'RESERVED' : 'AVAILABLE',
    };

    this.data.onSubmit({
      onSuccess: this.handleSuccess.bind(this),
      onFailure: this.handleError.bind(this),
      data,
    });
  }
}
