import {
  AfterViewInit,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

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
export class TaskListComponent implements AfterViewInit {
  public selectedTaskScheduleId = "";

  public taskScheduleDialogState: DialogState = { show: false, type: 'NEW' };

  public taskSchedules: TaskSchedule[] = [];

  // NewListDialog
  public taskScheduleForm: FormGroup;

  constructor(
    private store: Store<RXState>,
    private fb: FormBuilder,
  ) {
    this.taskScheduleForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', [Validators.required, , Validators.minLength(4)]],
      scheduleListId: ['', Validators.required],
      active: [true, Validators.required],
      useDateRange: [true, Validators.required],
      start: [new Date()],
      end: [new Date()],

      second: ['*'],
      minute: ['*', Validators.required],
      hour: ['*', Validators.required],
      dayOfMonth: ['*', Validators.required],
      month: ['*', Validators.required],
      dayOfWeek: ['*', Validators.required],
    });
    global['taskScheduleDialogForm'] = this.taskScheduleForm;


    this.store.select<TaskSchedule[]>('taskSchedules')
      .subscribe((taskLists) => {
        this.taskSchedules = taskLists
      })

    this.store.select<ListsState>('listsState')
      .subscribe(({ selectedTaskScedule }) => {
        this.selectedTaskScheduleId = selectedTaskScedule;
      });
  }

  public ngAfterViewInit() {
    this.store
      .select<DialogState>('taskScheduleDialogState')
      .subscribe((taskScheduleDialogState) => {
        this.taskScheduleDialogState = taskScheduleDialogState
      })
  }

  public setSelectedTaskSchedule(taskSchedule: TaskSchedule) {
    this.store.dispatch({
      type: 'SHOW_TASK_SCHEDULE',
      payload: taskSchedule.id,
    });
  }

  public toogleTaskScheduleDialog(isShow: boolean) {
    this.taskScheduleForm.reset({
      id: uuidV1(),
      name: '',
      active: true,
    })
    this.store.dispatch({
      type: isShow ? 'SHOW_TASK_SCHEDULE_DIALOG' : 'HIDE_TASK_SCHEDULE_DIALOG',
      payload: this.taskScheduleDialogState.type,
    })
  }
  public openTaskScheduleDialog(type: string) {
    switch (type) {
      case 'UPDATE':
        if (this.selectedTaskScheduleId === '') return;
        let selectedTaskSchedule = this.taskSchedules
          .find((taskList) => taskList.id === this.selectedTaskScheduleId)


        this.taskScheduleForm.reset({
          id: selectedTaskSchedule.id,
          name: selectedTaskSchedule.name,
          active: selectedTaskSchedule.active,
        })
        break;
      case 'DELETE':
        if (this.selectedTaskScheduleId === '') return;
        break;

      case 'NEW':
      default:
        this.taskScheduleForm.reset({
          id: uuidV1(),
          name: '',
          active: true,
          scheduleListId: '',
          useDateRange: true,
          start: new Date(),
          end: new Date(),

          second: '*',
          minute: '*',
          hour: '*',
          dayOfMonth: '*',
          month: '*',
          dayOfWeek: '*',
        })
        break;
    }
    this.store.dispatch({
      type: 'SHOW_TASK_SCHEDULE_DIALOG',
      payload: type,
    })
  }

  public saveTaskScheduleDialog() {
    switch (this.taskScheduleDialogState.type) {
      case 'DELETE':
        let selectedTaskSchedule = this.taskSchedules
          .find((taskSchedule) => taskSchedule.id === this.selectedTaskScheduleId)

        this.store.dispatch({
          type: 'DELETE_TASK_SCHEDULE',
          payload: selectedTaskSchedule,
        })
        break;
      case 'UPDATE':
        if (this.taskScheduleForm.invalid) {
          return;
        }
        this.store.dispatch({
          type: 'UPDATE_TASK_SCHEDULE',
          payload: this.taskScheduleForm.value,
        })

        break;

      case 'NEW':
      default:
        if (this.taskScheduleForm.invalid) {
          return;
        }
        this.store.dispatch({
          type: 'ADD_TASK_SCHEDULE',
          payload: this.taskScheduleForm.value,
        })
        break;
    }
    this.toogleTaskScheduleDialog(false)
  }
}
