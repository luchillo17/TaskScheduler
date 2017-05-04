import {
  Component,
  OnInit,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'base-task',
  templateUrl: 'base.task.html',
  styleUrls: ['base.task.scss'],
})

export class BaseTaskComponent implements OnInit {

  public static taskName: string = "Tarea base";
  public taskName: string;

  public taskForm: FormGroup;
  constructor() {
    this.taskName = (<typeof BaseTaskComponent>this.constructor).taskName;
  }

  ngOnInit() {
    console.log('Init base task.');
  }
}
