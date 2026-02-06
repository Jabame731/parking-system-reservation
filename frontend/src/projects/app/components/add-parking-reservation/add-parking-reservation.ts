import { Component, Inject, signal } from '@angular/core';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatAnchor } from '@angular/material/button';
import { SubmitButton } from '../submit-button/submit-button';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ParkingSlotConverted } from '../../models';
import { AsyncPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CallbackOnFailureModel, ErrorProps } from '@parking-system-store/public-api';
import { MatSelect } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { format, parseISO } from 'date-fns';

export interface ParkingModalData {
  slot: ParkingSlotConverted;
  onSubmit: ({
    data,
    onSuccess,
    onFailure,
  }: {
    data: any;
    onSuccess: Function;
    onFailure: Function;
  }) => void;
}

@Component({
  selector: 'app-add-parking-reservation',
  imports: [
    FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatAnchor,
    MatDialogClose,
    SubmitButton,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTimepickerModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-parking-reservation.html',
  styleUrl: './add-parking-reservation.scss',
})
export class AddParkingReservation {
  constructor(
    public dialogRef: MatDialogRef<AddParkingReservation>,
    @Inject(MAT_DIALOG_DATA) public data: ParkingModalData,
  ) {}

  minDate = signal(new Date());

  selectedValue!: string;

  payments = [
    { value: 'payAtTheCounter', viewValue: 'Counter' },
    { value: 'gCash', viewValue: 'G-Cash QR Code' },
  ];

  carTypes = [
    { value: 'Sedan', viewValue: 'Sedan' },
    { value: 'Hatchback', viewValue: 'Hatchback' },
    { value: 'SUV', viewValue: 'SUV' },
    { value: 'Pickup', viewValue: 'Pickup' },
    { value: 'Van', viewValue: 'Van' },
    { value: 'Sports Car', viewValue: 'Sports Car' },
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

  displayCarType(option: { value: string; viewValue: string }): string {
    return typeof option === 'string' ? option : option?.viewValue;
  }

  performAddReservation(form: NgForm) {
    this.submitting$.next(true);

    const { reservationDate, startTime, carPlate, carType, payment } = form.value;

    const ensureDate = (val: any) => {
      if (!val) return null;
      return typeof val === 'string' ? parseISO(val) : val;
    };

    const startObj = ensureDate(startTime);
    const reserveObj = ensureDate(reservationDate);

    const data = {
      startTime: startObj ? format(startObj, 'yyyy-MM-dd HH:mm:ss') : '',
      reservationDate: reserveObj ? format(reserveObj, 'yyyy-MM-dd') : '',
      licensePlate: carPlate,
      slotId: this.data.slot.id,
      carType,
      paymentMethod: payment,
      amount: 25,
    };

    this.data.onSubmit({
      onSuccess: this.handleSuccess.bind(this),
      onFailure: this.handleError.bind(this),
      data,
    });
  }
}
