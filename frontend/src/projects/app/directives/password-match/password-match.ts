import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordMatch),
      multi: true,
    },
  ],
})
export class PasswordMatch implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const group = control as any;
    if (!group?.controls) return null;

    const passwordCtrl = group.controls['password'];
    const confirmCtrl = group.controls['cPassword'];
    const emailCtrl = group.controls['email'];

    if (passwordCtrl && confirmCtrl) {
      const password = passwordCtrl.value;
      const confirm = confirmCtrl.value;

      if (confirm && password !== confirm) {
        confirmCtrl.setErrors({
          ...(confirmCtrl.errors ?? {}),
          mismatch: true,
        });
      } else if (confirmCtrl.errors?.['mismatch']) {
        const { mismatch, ...rest } = confirmCtrl.errors;
        confirmCtrl.setErrors(Object.keys(rest).length ? rest : null);
      }
    }

    if (emailCtrl) {
      const email = emailCtrl.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email && !emailRegex.test(email)) {
        emailCtrl.setErrors({
          ...(emailCtrl.errors ?? {}),
          email: true,
        });
      } else if (emailCtrl.errors?.['email']) {
        const { email, ...rest } = emailCtrl.errors;
        emailCtrl.setErrors(Object.keys(rest).length ? rest : null);
      }
    }

    return null;
  }

  constructor() {}
}
