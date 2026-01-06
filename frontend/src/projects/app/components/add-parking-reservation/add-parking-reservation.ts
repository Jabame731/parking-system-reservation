import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatAnchor } from '@angular/material/button';
import { SubmitButton } from '../submit-button/submit-button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

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
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-parking-reservation.html',
  styleUrl: './add-parking-reservation.scss',
})
export class AddParkingReservation {
  performAddReservation(data: NgForm) {
    console.log(data.value);
  }
}
