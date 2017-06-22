import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { BaseTaskComponent, JsonTaskData } from '..';
import { Observable, Subscription } from 'rxjs';
import { SelectItem } from 'primeng/primeng';
import { TaskFormValidators } from '../task.validators';

@Component({
  selector: 'json-task',
  templateUrl: 'json.task.html',
  styleUrls: ['json.task.scss'],
})

export class JsonTaskComponent
  extends BaseTaskComponent
  implements OnInit {

  public static taskName: string = 'Tarea tipo JSON'

  public currentTask: Task

  constructor(
    public store: Store<RXState>,
    public location: Location,
    private formBuilder: FormBuilder,
  ) {
    super(store, location)

    global['jsonTask'] = this

    this.currentTaskSub = store
      .select<Task>('currentTask')
      .subscribe((task) => {
        this.currentTask = task;
        const {
          from,
          format
        } = (task.data || {}) as JsonTaskData;

        const formatString = JSON.stringify(format, null, 2)

        this.taskForm = formBuilder.group({
          id       : [task.id,   Validators.required],
          name     : [task.name, Validators.required],
          taskScheduleId: [task.taskScheduleId, Validators.required],

          // Api task specific
          from    : [from, Validators.required],
          format  : [formatString, TaskFormValidators.validateJson],
        });
      });
  }
  public ngOnInit() {
    console.log('Init Json task.');
  }

  public saveTask() {
    if (this.isFormInvalid()) {
      return;
    }

    this.goBack()
    const { crudMethod, ...currentTask } = this.currentTask;
    const {
      from,
      format,
      ...value,
    } = this.taskForm.value;

    this.store.dispatch({
      type: crudMethod === 'NEW' ? 'ADD_TASK' : 'UPDATE_TASK',
      payload: {
        ...currentTask,
        ...value,

        // Api task specific
        data: {
          from,
          format: JSON.parse(format),
        } as JsonTaskData,
      },
    });
    setTimeout(() => {
      this.store.dispatch({
        type: 'RESET_CURRENT_TASK',
      });
    }, 300)
  }
}
