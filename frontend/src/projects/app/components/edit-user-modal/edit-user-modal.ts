import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../models';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { CallbackOnFailureModel, EditUserData, ErrorProps } from '@parking-system-store/public-api';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { SubmitButton } from '../submit-button/submit-button';
import { MatButton } from '@angular/material/button';

export interface EditUserDataModal {
  user: User;
  onSubmit: ({
    user,
    onSuccess,
    onFailure,
  }: {
    user: EditUserData;
    onSuccess: Function;
    onFailure: Function;
  }) => void;
}

@Component({
  selector: 'app-edit-user-modal',
  imports: [
    FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    AsyncPipe,
    MatInput,
    ReactiveFormsModule,
    JsonPipe,
    MatSelect,
    SubmitButton,
    MatOption,
    MatButton,
  ],
  templateUrl: './edit-user-modal.html',
  styleUrl: './edit-user-modal.scss',
})
export class EditUserModal implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditUserModal>,
    @Inject(MAT_DIALOG_DATA) public data: EditUserDataModal,
  ) {}

  roles = [
    { value: 'user', viewValue: 'User' },
    { value: 'admin', viewValue: 'Admin' },
  ];

  userAttributes!: User;

  ngOnInit(): void {
    this.userAttributes = { ...this.data.user };
  }

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

  performEditUser(form: NgForm) {
    this.submitting$.next(true);

    const data = {
      id: this.data.user.id,
      ...form.value,
    };

    this.data.onSubmit({
      onSuccess: this.handleSuccess.bind(this),
      onFailure: this.handleError.bind(this),
      user: data,
    });
  }
}
