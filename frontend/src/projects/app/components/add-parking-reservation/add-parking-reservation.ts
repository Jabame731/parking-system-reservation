import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
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
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ParkingSlotConverted } from '../../models';
import { JsonPipe } from '@angular/common';

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
    JsonPipe,
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

  performAddReservation(data: NgForm) {
    console.log(data.value);
  }
}
