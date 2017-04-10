import {
  Component,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AutoComplete } from "primeng/primeng";

import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { v1 as uuidV1 } from 'uuid';

import { CustomTaskListValidators } from ".";

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
  @ViewChild('taskScheduleListAutocomplete') private taskScheduleListAutocomplete: AutoComplete;

  public selectedTaskScheduleId = "";

  public taskScheduleDialogState: DialogState = { show: false, type: 'NEW' };

  public scheduleLists: Observable<ScheduleList[]>;
  public taskSchedules: TaskSchedule[] = [];

  // NewListDialog
  public taskScheduleForm: FormGroup;

  constructor(
    private store: Store<RXState>,
    private fb: FormBuilder,
  ) {
    this.taskScheduleForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      scheduleList: [null, [Validators.required, CustomTaskListValidators.ScheduleListDropdownValidator]],
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

    this.scheduleLists = Observable.combineLatest(
      this.store.select<ScheduleList[]>('scheduleLists'),
      this.store.select<ScheduleListFilter>('scheduleListsFilter'),
      (scheduleLists, scheduleListsFilter) => {
        if (!scheduleLists || !scheduleListsFilter) return;
        return scheduleListsFilter(scheduleLists);
      },
    )

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
    console.log('SetSelected: ', taskSchedule);
    this.store.dispatch({
      type: 'SHOW_TASK_SCHEDULE',
      payload: taskSchedule.id,
    });
  }

  public toogleTaskScheduleDialog(isShow: boolean) {
    this.taskScheduleForm.reset({
      id: uuidV1(),
      scheduleList: null,
      name: '',
      active: true,
      useDateRange: false,
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

        this.store
          .select<ScheduleList[]>('scheduleLists')
          .take(1)
          .subscribe((scheduleLists) => {
            let taskScheduleList = scheduleLists.find((scheduleList) => scheduleList.id === selectedTaskSchedule.scheduleListId);
            selectedTaskSchedule['scheduleList'] = taskScheduleList || null;
            delete selectedTaskSchedule.scheduleListId;
            console.log(selectedTaskSchedule);
            this.taskScheduleForm.reset(selectedTaskSchedule)
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
          scheduleList: null,
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
    let formValue;
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
        formValue = this.taskScheduleForm.value;
        formValue.scheduleListId = formValue.scheduleList.id;
        delete formValue.scheduleList;

        this.store.dispatch({
          type: 'UPDATE_TASK_SCHEDULE',
          payload: formValue,
        })

        break;

      case 'NEW':
      default:
        if (this.taskScheduleForm.invalid) {
          return;
        }
        formValue = this.taskScheduleForm.value;
        formValue.scheduleListId = formValue.scheduleList.id;
        delete formValue.scheduleList;

        this.store.dispatch({
          type: 'ADD_TASK_SCHEDULE',
          payload: formValue,
        })
        break;
    }
    this.toogleTaskScheduleDialog(false)
  }
  filterLists($event) {
    // setTimeout(() => {
      this.store.dispatch({
        type: 'FILTER_SCHEDULE_LIST_BY_NAME',
        payload: $event.query,
      })
    // });
  }
  handleDropdownClick($event) {
    setTimeout(() => {
      this.store.dispatch({
        type: 'FILTER_SCHEDULE_LIST_NONE',
      })
      this.taskScheduleListAutocomplete.show()
    });
  }
}
