import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'base-task',
  templateUrl: 'base.task.html',
  styleUrls: ['base.task.scss'],
})

export class BaseTaskComponent implements OnInit {
  public static taskName: string = "Tarea base";
  public taskName: string;
  constructor() {
    this.taskName = (<typeof BaseTaskComponent>this.constructor).taskName;
  }

  ngOnInit() {
    console.log('Init base task.');
  }
}
