import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";

import { BaseTaskComponent } from "..";
import { Observable, Subscription } from "rxjs";
import { SelectItem } from "primeng/primeng";

@Component({
  selector: 'log-task',
  templateUrl: 'log.task.html',
  styleUrls: ['log.task.scss']
})

export class LogTaskComponent extends BaseTaskComponent {

  public currentTask: Task;

  public static taskName: string = 'Tarea tipo log';

  constructor(
    public store: Store<RXState>,
    public location: Location,
    private formBuilder: FormBuilder,
  ) {
    super(store, location)

    this.currentTaskSub = store
      .select<Task>('currentTask')
      .subscribe((task) => {
        this.currentTask = task;
        let {text, logTasksData} = task.data || {} as any;
        this.taskForm = formBuilder.group({
          id:   [task.id,    Validators.required],
          name: [task.name,  Validators.required],
          text: [text || '', Validators.required],
          logTasksData: [logTasksData || false, Validators.required],
          taskScheduleId: [task.taskScheduleId, Validators.required],
        });
      });
  }
  ngOnInit() {
    console.log('Init log task.');
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
