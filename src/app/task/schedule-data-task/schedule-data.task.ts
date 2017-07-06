import {
  Component,
  OnDestroy,
  OnInit,
  Input,
} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SelectItem } from 'primeng/primeng';

import { BaseTaskComponent } from '..';

@Component({
  selector: 'schedule-data-task',
  templateUrl: 'schedule-data.task.html',
  styleUrls: ['schedule-data.task.scss']
})

export class ScheduleDataTaskComponent extends BaseTaskComponent {

  public currentTask: Task;

  public static taskName: string = 'Tarea tipo Schedule Data';

  constructor(
    public store: Store<RXState>,
    public router: Router,
    private formBuilder: FormBuilder,
  ) {
    super(store, router)

    this.currentTaskSub = store
      .select<Task>('currentTask')
      .subscribe((task) => {
        this.currentTask = task;
        const {text, logTasksData} = task.data || {} as any;
        this.taskForm = formBuilder.group({
          id:   [task.id,    Validators.required],
          name: [task.name,  Validators.required],
          taskScheduleId: [task.taskScheduleId, Validators.required],

          // Log task specific
          text: [text || '', Validators.required],
          logTasksData: [logTasksData || false, Validators.required],
        });
      });
  }

  public saveTask() {
    if (this.isFormInvalid()) {
      return;
    }

    this.goBack()
    const { crudMethod, ...currentTask } = this.currentTask;
    const { text, logTasksData, ...value } = this.taskForm.value;
    this.store.dispatch({
      type: crudMethod === 'NEW' ? 'ADD_TASK' : 'UPDATE_TASK',
      payload: {
        ...currentTask,
        ...value,

        // Log task specific
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
