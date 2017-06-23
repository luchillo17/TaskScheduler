import { AbstractControl, FormGroup } from '@angular/forms';
import { TaskFormValidators } from '../task.validators';

export class ApiValidators extends TaskFormValidators {

  public static requestDataByMethod(group: FormGroup): { [key: string]: any} {
    const dataFromMemoryControl = group.controls['dataFromMemory'] as AbstractControl;
    const requestControl = group.controls['requestData'] as AbstractControl;
    const methodControl  = group.controls['method'] as AbstractControl;

    if (
      methodControl.value !== 'GET' &&
      dataFromMemoryControl.value === false &&
      (
        requestControl.value === null ||
        requestControl.value.length === 0
      )
    ) {
      requestControl.setErrors({ required: true })
    } else if (requestControl.errors !== null) {
      const {required, ...errors} = requestControl.errors;
      // let errors = Object.assign({}, requestControl.errors)
      const errorObj = Object.keys(errors).length === 0 ? null : errors;
      requestControl.setErrors(errorObj)
    }

    return null
  }
}
