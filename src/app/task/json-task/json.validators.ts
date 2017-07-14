import { AbstractControl, FormGroup } from '@angular/forms';
import { TaskFormValidators } from '../task.validators';

export class JSONValidators extends TaskFormValidators {
  public static defaultErrorFormat: ErrorFormat = {
    type: 'array',
    childrenArray: {
      type: 'hasValue',
      to: 's_estado',
      value: 'FALLIDO'
    }
  }
}
