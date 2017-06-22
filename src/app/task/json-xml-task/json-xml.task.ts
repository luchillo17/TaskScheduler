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
import { JsonXmlTaskData } from "./index";

@Component({
  selector: 'json-xml-task',
  templateUrl: 'json-xml.task.html',
  styleUrls: ['json-xml.task.scss'],
})

export class JsonXmlTaskComponent
  extends BaseTaskComponent
  implements OnInit {

  public static taskName: string = 'Tarea tipo JSON-XML'

  public currentTask: Task

  constructor(
    public store: Store<RXState>,
    public location: Location,
    private formBuilder: FormBuilder,
  ) {
    super(store, location)

    global['jsonXmlTask'] = this

    this.currentTaskSub = store
      .select<Task>('currentTask')
      .subscribe((task) => {
        this.currentTask = task;
        const {
          from,
          path,
        } = (task.data || {}) as JsonXmlTaskData;

        this.taskForm = formBuilder.group({
          id  : [task.id,   Validators.required],
          name: [task.name, Validators.required],
          taskScheduleId: [task.taskScheduleId, Validators.required],

          // Api task specific
          from: [from, Validators.required],
          path: [path, Validators.required],
        });
      });
  }
  public ngOnInit() {
    console.log('Init Json-Xml task.');
  }

  public saveTask() {
    if (this.isFormInvalid()) {
      return;
    }

    this.goBack()
    const { crudMethod, ...currentTask } = this.currentTask;
    const {
      from,
      path,
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
          path,
        } as JsonXmlTaskData,
      },
    });
    setTimeout(() => {
      this.store.dispatch({
        type: 'RESET_CURRENT_TASK',
      });
    }, 300)
  }
}
