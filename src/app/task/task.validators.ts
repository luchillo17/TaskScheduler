import { AbstractControl, FormGroup } from '@angular/forms';

export class TaskFormValidators {
  public static validateJson(control: AbstractControl) {
    if (control.value === '') {
      return null
    }

    try {
      const o: object = JSON.parse(control.value)
      if (o !== undefined && typeof o === 'object') {
        return null;
      }

      return { invalidJson: true }
    } catch (error) {
      return { invalidJson: true }
    }
  }
}
