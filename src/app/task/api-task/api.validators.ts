import { AbstractControl, FormGroup } from "@angular/forms";

export class ApiValidators {

  constructor() { }

  static requestDataByMethod(group: FormGroup): { [key: string]: any} {
    let requestControl = group.controls['requestData'] as AbstractControl;
    let methodControl  = group.controls['method'] as AbstractControl;

    if (
      methodControl.value !== 'GET' &&
      (
        requestControl.value == null ||
        requestControl.value.length == 0
      )
    ) {
      requestControl.setErrors({ required: true })
    } else {
      let errors = Object.assign({}, requestControl.errors, {required: false})
      requestControl.setErrors(errors)
    }


    return null
  }

  static validateJson(control: AbstractControl) {
    if (control.value === '') {
      return null
    }

    try {
      let o: Object = JSON.parse(control.value)
      if (o !== undefined && typeof o === 'object') {
        return null;
      }

      return { invalidJson: true }
    } catch (error) {
      return { invalidJson: true }
    }
  }
}
