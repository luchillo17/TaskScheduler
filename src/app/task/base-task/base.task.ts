import {
  Component,
  OnInit,
} from '@angular/core';
import { Location } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { SelectItem } from "primeng/primeng";

@Component({
  selector: 'base-task',
  templateUrl: 'base.task.html',
  styleUrls: ['base.task.scss'],
})

export class BaseTaskComponent implements OnInit {

  public static taskName: string = "Tarea base";

  public taskName: string;
  public taskForm: FormGroup;
  public taskSchedules$: Observable<SelectItem[]>;

  constructor(
    public store: Store<RXState>,
    public location: Location,
  ) {
    this.taskName = (<typeof BaseTaskComponent>this.constructor).taskName;

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
    console.log('Init base task.');
  }

  public goBack() {
    this.location.back();
  }
}
