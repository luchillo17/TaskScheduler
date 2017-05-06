import { AbstractControl, FormGroup } from "@angular/forms";

export class ApiValidators {

  constructor() { }

  static requestDataByMethod(group: FormGroup): { [key: string]: any} {
    let requestControl = group.controls['requestData'] as AbstractControl;
    let methodControl  = group.controls['method'] as AbstractControl;

    if (methodControl.value == 'GET' && requestControl.value == '') {
      requestControl.setErrors({ required: true })
    } else {
      requestControl.setErrors({ required: false })
    }


    return null
  }

  static validateJson(control: AbstractControl) {
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
