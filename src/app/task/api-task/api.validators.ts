import { AbstractControl, FormGroup } from '@angular/forms';

export class ApiValidators {

  public static requestDataByMethod(group: FormGroup): { [key: string]: any} {
    const requestControl = group.controls['requestData'] as AbstractControl;
    const methodControl  = group.controls['method'] as AbstractControl;

    if (
      methodControl.value !== 'GET' &&
      (
        requestControl.value === null ||
        requestControl.value.length === 0
      )
    ) {
      requestControl.setErrors({ required: true })
    } else if (requestControl.errors !== null) {
      const {required, ...errors} = requestControl.errors;
      // let errors = Object.assign({}, requestControl.errors)
      requestControl.setErrors(errors)
    }

    return null
  }

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
