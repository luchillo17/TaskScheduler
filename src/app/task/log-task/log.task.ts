import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseTaskComponent } from "..";

@Component({
  selector: 'log-task',
  templateUrl: 'log.task.html',
  styleUrls: ['log.task.scss']
})

export class LogTaskComponent extends BaseTaskComponent {
  public static taskName: string = 'Tarea tipo log';

  public taskForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    super()
    this.taskForm = formBuilder.group({
      text: ['', Validators.required],
    });
  }

  ngOnInit() { }
}