import { ValidatorFn, FormControl } from '@angular/forms';

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

}
