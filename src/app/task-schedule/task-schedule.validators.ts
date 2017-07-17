import { ValidatorFn, FormControl, EmailValidator } from '@angular/forms';

export class CustomTaskListsValidators {
  public static ScheduleListDropdownValidator: ValidatorFn = (control: FormControl): {[key: string]: any} => {
    if (
      !control.value ||
      typeof control.value !== 'object' ||
      !control.value.id ||
      control.value.id === ''
    ) {
      return { selection: true };
    }
    return null;
  }

  public static CustomEmailValidator: ValidatorFn = (control: FormControl): {[key: string]: any} => {
    const emailRegex = /^(?:,?\s{0,1}[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)+$/
    if (
      !control.value ||
      control.value === '' ||
      !emailRegex.test(control.value)
    ) {
      return { email: true };
    }
    return null;
  }

}
