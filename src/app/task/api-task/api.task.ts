import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";

import { BaseTaskComponent, ApiTaskData } from "..";
import { Observable, Subscription } from "rxjs";
import { SelectItem } from "primeng/primeng";
import { ApiValidators } from "./api.validators";

@Component({
  selector: 'api-task',
  templateUrl: 'api.task.html',
  styleUrls: ['api.task.scss']
})

export class ApiTaskComponent extends BaseTaskComponent {

  public currentTask: Task;

  public static taskName: string = 'Tarea tipo API';

  constructor(
    public store: Store<RXState>,
    public location: Location,
    private formBuilder: FormBuilder,
  ) {
    super(store, location)

    global['apitask'] = this

    this.currentTaskSub = store
      .select<Task>('currentTask')
      .subscribe((task) => {
        this.currentTask = task;
        let {
          url,
          method,
          authorization,
          requestData,
        } = (task.data || {}) as ApiTaskData;

        this.taskForm = formBuilder.group({
          id       : [task.id,   Validators.required],
          name     : [task.name, Validators.required],
          mapFormat: [task.mapFormat],
          taskScheduleId: [task.taskScheduleId, Validators.required],

          // Api task specific
          url          : [url, Validators.required],
          method       : [method, Validators.required],
          requestData  : [requestData, ApiValidators.validateJson],
          authorization: [authorization, Validators.required],
        }, {
          validator: ApiValidators.requestDataByMethod,
        });
      });
  }
  ngOnInit() {
    console.log('Init api task.');
  }

  public saveTask() {
    if (this.isFormInvalid()) {
      return;
    }

    this.goBack()
    let { method, ...currentTask } = this.currentTask;
    let { text, logTasksData, ...value } = this.taskForm.value;
    this.store.dispatch({
      type: method == 'NEW' ? 'ADD_TASK' : 'UPDATE_TASK',
      payload: {
        ...currentTask,
        ...value,

        // Api task specific
        data: {
          text,
          logTasksData,
        }
      },
    });
    setTimeout(() => {
      this.store.dispatch({
        type: 'RESET_CURRENT_TASK',
      });
    }, 300)
  }


}
