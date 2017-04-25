import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";

import { BaseTaskComponent } from "..";

@Component({
  selector: 'log-task',
  templateUrl: 'log.task.html',
  styleUrls: ['log.task.scss']
})

export class LogTaskComponent extends BaseTaskComponent {

  public currentTask: Task;

  public static taskName: string = 'Tarea tipo log';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<RXState>,
  ) {
    super()

    store.select<Task>('currentTask')
      .subscribe((task) => {
        this.taskForm = formBuilder.group({
          id  : [task.id, Validators.required],
          name: [task.name, Validators.required],
          text: ['', Validators.required],
        });
      });
  }
  ngOnInit() {
    console.log('Init log task.');
  }

  public initNew() {

  }

}

export const LogTaskType: TaskType = {
    name: LogTaskComponent.taskName,
    type: LogTaskComponent.name,
    component: LogTaskComponent,
    executor: null,
}