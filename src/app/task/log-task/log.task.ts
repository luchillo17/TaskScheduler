import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";

import { BaseTaskComponent } from "..";
import { Observable } from "rxjs";
import { SelectItem } from "primeng/primeng";

@Component({
  selector: 'log-task',
  templateUrl: 'log.task.html',
  styleUrls: ['log.task.scss']
})

export class LogTaskComponent extends BaseTaskComponent {

  public currentTask: Task;
  public taskSchedules$: Observable<SelectItem[]>;

  public static taskName: string = 'Tarea tipo log';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<RXState>,
    private location: Location,
  ) {
    super()

    store.select<Task>('currentTask')
      .subscribe((task) => {
        this.taskForm = formBuilder.group({
          id:   [task.id,   Validators.required],
          name: [task.name, Validators.required],
          text: ['',        Validators.required],
          taskScheduleId: [task.taskScheduleId, Validators.required],
        });
      });

    this.taskSchedules$ = store
      .select<TaskSchedule[]>('taskSchedules')
      .map((taskSchedules) => taskSchedules
        .map((taskSchedule) => ({
          label: taskSchedule.name,
          value: taskSchedule.id,
        })
      ))
  }
  ngOnInit() {
    console.log('Init log task.');
  }

  public initNew() {
    this.location.back()
  }

  public goBack() {
    this.location.back();
  }

  public saveTask() {
    if (this.taskForm.invalid) {
      return;
    }
    let {text, ...value} = this.taskForm.value;
    this.store.dispatch({
      type: 'ADD_TASK',
      payload: {
        ...value,
        data: {
          text
        }
      },
    });
    this.store.dispatch({
      type: 'RESET_CURRENT_TASK',
    });
  }

}

export const LogTaskType: TaskType = {
    name: LogTaskComponent.taskName,
    type: LogTaskComponent.name,
    component: LogTaskComponent,
    executor: null,
}