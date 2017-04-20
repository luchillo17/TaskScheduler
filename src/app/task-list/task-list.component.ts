import {
  Component,
  ViewChild,
  OnDestroy,
  HostBinding,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

import { Router } from "@angular/router";

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AutoComplete } from 'primeng/primeng';

import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';

import { v1 as uuidV1 } from 'uuid';

@Component({
  selector: 'task-list',
  styleUrls: [ './task-list.component.scss' ],
  templateUrl: './task-list.component.html',
  // encapsulation: ViewEncapsulation.None,
})
export class TaskListComponent implements AfterViewInit, OnDestroy {
  @HostBinding('id') private id = 'task-list-panel';

  private tasks: Task[] = [];
  private selectedTaskId: string;
  private taskDialogState: DialogState = { show: false, type: 'NEW' };

  private tasks$: Subscription;
  private selectedTask$: Subscription;
  private taskDialogState$: Subscription;

  constructor(
    private router: Router,
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
        this.tasks = tasks;
      });

    this.selectedTask$ = this.store.select<ListsState>('listsState')
      .subscribe(({ selectedTask }) => {
        this.selectedTaskId = selectedTask;
      });
  }

  public ngAfterViewInit() {
    this.taskDialogState$ = this.store
      .select<DialogState>('taskDialogState')
      .subscribe((taskDialogState) =>
        this.taskDialogState = taskDialogState
      );
  }

  public ngOnDestroy() {
    this.tasks$ && this.tasks$.unsubscribe();
    this.selectedTask$ && this.selectedTask$.unsubscribe();
    this.taskDialogState$ && this.taskDialogState$.unsubscribe();
  }

  public filterTasks(
    tasks: Task[],
    taskSchedules: TaskSchedule[],
    { selectedScheduleList, selectedTaskSchedule }: ListsState
  ) {
    let filteredTaskSchedulesIds = taskSchedules
      .filter((taskSchedule) =>
        taskSchedule.id !== '' &&
        // Filter by selectedScheduleList if any selected
        (
          selectedScheduleList === '' ||
          taskSchedule.scheduleListId === selectedScheduleList
        ) &&
        // Filter by selectedScheduleList if any selected
        (
          selectedTaskSchedule === '' ||
          taskSchedule.id === selectedTaskSchedule
        )
      )
      .map(TaskSchedule => TaskSchedule.id);

    return tasks.filter((task) => filteredTaskSchedulesIds.includes(task.taskScheduleId));
  }

  private setSelectedTask(task: Task) {
    console.log('SetSelected: ', task);
    this.store.dispatch({
      type: 'SHOW_TASK',
      payload: task.id,
    });
  }

  private openTaskDialog(type: string) {
    switch (type) {
      case 'UPDATE':
        this.router.navigate(['/task', {
          id: this.selectedTaskId,
          method: 'UPDATE',
        }]);
        break;

      case 'DELETE':

        break;

      case 'NEW':
      default:
        this.store.dispatch({
          type: 'SHOW_TASK_DIALOG',
        });
        break;
    }
  }
}
