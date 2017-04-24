import {
  AfterViewChecked,
  EventEmitter,
  Component,
  ViewChild,
  Output,
  OnInit,
} from '@angular/core';
import {
  SelectItem,
  Dropdown,
} from 'primeng/primeng';

import { tasksTypes } from '.';

@Component({
  selector: 'task-selector',
  template: `
    <p>Seleccione el tipo de tarea que desea crear:</p>
    <div>
      <p-dropdown #dropdown
        filter='true'
        [style.width.px]="225"
        [options]="selectTaskTypes"
        [(ngModel)]="selectedTaskType"
        (ngModelChange)="taskTypeSelected.emit($event)"
      ></p-dropdown>
    </div>
  `
})

export class TaskSelectorComponent implements OnInit, AfterViewChecked {
  @ViewChild('dropdown') dropdown: Dropdown;
  @Output()
  taskTypeSelected = new EventEmitter<TaskType>();


  public selectTaskTypes: SelectItem[];
  public selectedTaskType: TaskType;

  constructor() {
    global['TaskSelector'] = this;
    this.selectTaskTypes = tasksTypes
      .map((taskType) => ({label: taskType.name, value: taskType}))

    this.selectedTaskType = tasksTypes[0];
  }

  ngOnInit() {
    this.taskTypeSelected.emit(this.selectedTaskType);
  }

  ngAfterViewChecked() {
    this.dropdown.updateDimensions();
  }
}
