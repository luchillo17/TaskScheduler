import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { BaseTaskComponent, ApiTaskData } from '..';
import { Observable, Subscription } from 'rxjs';
import { SelectItem } from 'primeng/primeng';
import { ApiValidators } from './api.validators';

@Component({
  selector: 'api-task',
  templateUrl: 'api.task.html',
  styleUrls: ['api.task.scss'],
})

export class ApiTaskComponent
  extends BaseTaskComponent
  implements OnInit {

  public static taskName: string = 'Tarea tipo API'

  public currentTask: Task
  public apiMethods: SelectItem[]

  constructor(
    public store: Store<RXState>,
    public router: Router,
    private formBuilder: FormBuilder,
  ) {
    super(store, router)

    global['apiTask'] = this

    this.apiMethods = ['GET', 'POST'].map((apiMethod) => ({
      label: apiMethod,
      value: apiMethod,
    }))

    const defaultErrorFormat = JSON.stringify(ApiValidators.defaultErrorFormat, null, 2)

    this.currentTaskSub = store
      .select<Task>('currentTask')
      .subscribe((task) => {
        this.currentTask = task;
        const {
          url,
          method,
          authPath,
          authInBody,
          authorization,
          dataFromMemory,
          requestData,
          requestPath,
          errorFormat,
        } = (task.data || {}) as ApiTaskData;

        const errorFormatString = JSON.stringify(errorFormat, null, 2)

        this.taskForm = formBuilder.group({
          id       : [task.id,   Validators.required],
          name     : [task.name, Validators.required],
          taskScheduleId: [task.taskScheduleId, Validators.required],

          // Api task specific
          url          : [url, Validators.required],
          method       : [method || 'GET', Validators.required],

          authInBody   : [authInBody || false, Validators.required],
          authPath     : [authPath],
          authorization: [authorization],

          dataFromMemory: [dataFromMemory || false, Validators.required],
          requestPath   : [requestPath],
          requestData   : [requestData, ApiValidators.validateJson],
          errorFormat   : [errorFormatString || defaultErrorFormat, ApiValidators.validateJson],
        }, {
          validator: ApiValidators.requestDataByMethod,
        });
      });
  }
  public ngOnInit() {
    console.log('Init api task.');
  }

  public saveTask() {
    if (this.isFormInvalid()) {
      return;
    }

    this.goBack()
    const { crudMethod, ...currentTask } = this.currentTask;
    const {
      url,
      method,
      authPath,
      authInBody,
      authorization,
      dataFromMemory,
      requestData,
      requestPath,
      errorFormat: errorFormatString,
      ...value,
    } = this.taskForm.value as ApiTaskData & Task;

    const errorFormat = errorFormatString ? JSON.parse(errorFormatString as any) as ErrorFormat : null

    this.store.dispatch({
      type: crudMethod === 'NEW' ? 'ADD_TASK' : 'UPDATE_TASK',
      payload: {
        ...currentTask,
        ...value,

        // Api task specific
        data: {
          url,
          method,
          authPath,
          authInBody,
          authorization,
          dataFromMemory,
          requestData,
          requestPath,
          errorFormat: errorFormat || ApiValidators.defaultErrorFormat,
        } as ApiTaskData,
      },
    });
    setTimeout(() => {
      this.store.dispatch({
        type: 'RESET_CURRENT_TASK',
      });
    }, 300)
  }
}
