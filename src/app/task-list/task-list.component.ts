import {
  Component,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AutoComplete } from "primeng/primeng";

import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';

import { v1 as uuidV1 } from 'uuid';

@Component({
  selector: 'task-list',
  host: {
    id: 'task-list-panel',
  },
  styleUrls: [ './task-list.component.scss' ],
  templateUrl: './task-list.component.html',
  // encapsulation: ViewEncapsulation.None,
})
export class TaskListComponent {

  private tasks: Task[] = [];
  private selectedTaskId: string;

  private tasks$: Subscription;
  private selectedTask$: Subscription;

  constructor(
    private store: Store<RXState>,
    private fb: FormBuilder,
  ) {
    this.tasks$ = Observable.combineLatest(
      this.store.select<Task[]>('tasks'),
      this.store.select<TaskSchedule[]>('taskSchedules'),
      this.store.select<ListsState>('listsState'),
      this.filterTasks,
    )
      .subscribe((tasks) => {
        this.tasks = tasks
      });

    this.selectedTask$ = this.store.select<ListsState>('listsState')
      .subscribe(({ selectedTask }) => {
        this.selectedTaskId = selectedTask;
      });
  }

  filterTasks(tasks: Task[], taskSchedules: TaskSchedule[], { selectedScheduleList, selectedTaskScedule }: ListsState){
    let filteredTaskSchedulesIds = taskSchedules
      .filter((taskSchedule) =>
        taskSchedule.id !== '' &&
        // Filter by selectedScheduleList if any selected
        (
          selectedScheduleList === '' ||
          taskSchedule.scheduleListId == selectedScheduleList
        ) &&
        // Filter by selectedScheduleList if any selected
        (
          selectedTaskScedule == '' ||
          taskSchedule.id == selectedTaskScedule
        )
      )
      .map(TaskSchedule => TaskSchedule.id);

    return tasks.filter((task) => filteredTaskSchedulesIds.includes(task.taskScheduleId));
  }

  setSelectedTask(task: Task) {
    console.log('SetSelected: ', task);
    this.store.dispatch({
      type: 'SHOW_TASK',
      payload: task.id,
    });
  }
}
