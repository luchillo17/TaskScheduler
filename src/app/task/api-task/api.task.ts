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

    global['apitask'] = this

    this.apiMethods = ['GET', 'POST'].map((apiMethod) => ({
      label: apiMethod,
      value: apiMethod,
    }))

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
        } = (task.data || {}) as ApiTaskData;

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
      ...value,
    } = this.taskForm.value as ApiTaskData & Task;

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
