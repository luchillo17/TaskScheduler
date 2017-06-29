import {
  Component,
  ViewChild,
  OnDestroy,
  HostBinding,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AutoComplete, ConfirmationService } from 'primeng/primeng';
import { Observable, Subject, Subscription } from 'rxjs';

import { v1 as uuidV1 } from 'uuid';

import { ScheduleService } from '../shared';
import { CustomTaskListsValidators } from '.';

@Component({
  selector: 'task-schedule',

  styleUrls: [ './task-schedule.component.scss' ],
  templateUrl: './task-schedule.component.html',
  // encapsulation: ViewEncapsulation.None,
})
export class TaskScheduleComponent implements OnDestroy {
  @HostBinding('id') private id = 'task-schedule-panel';

  @ViewChild('taskFolderAutocomplete') private taskFolderAutocomplete: AutoComplete;

  private taskSchedules$: Subscription;
  private selectedTaskSchedule$: Subscription;
  private taskScheduleDialogState$: Subscription;

  public selectedTaskScheduleId = '';

  public taskScheduleDialogState: DialogState = { show: false, type: 'NEW' };

  public folders: Observable<Folder[]>;
  public taskSchedules: TaskSchedule[] = [];

  // NewListDialog
  public taskScheduleForm: FormGroup;

  constructor(
    private confirmDialogService: ConfirmationService,
    private scheduleService: ScheduleService,
    private store: Store<RXState>,
    private fb: FormBuilder,
  ) {
    this.taskScheduleForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      folder: [null, [
        Validators.required,
        CustomTaskListsValidators.ScheduleListDropdownValidator
      ]],
      active: [true, Validators.required],
      mailNotify: [true, Validators.required],
      mailAddress: [''],
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

    // global['taskScheduleForm'] = this.taskScheduleForm

    this.folders = this.store
      .select<Folder[]>('folders')
      .map((folders) => {
        return folders.filter((folder) => folder.id !== '');
      });

    this.taskSchedules$ = Observable.combineLatest(
      this.store.select<TaskSchedule[]>('taskSchedules'),
      this.store.select<ListsState>('listsState'),
      (taskSchedules, { selectedFolder }) => {
        return taskSchedules.filter((taskSchedule) => {
          return selectedFolder === '' ||
            taskSchedule.id === '' ||
            taskSchedule.folderId === selectedFolder;
        });
      })
      .subscribe((taskSchedules) => {
        this.taskSchedules = taskSchedules;
      });

    this.selectedTaskSchedule$ = this.store.select<ListsState>('listsState')
      .subscribe(({ selectedTaskSchedule }) => {
        this.selectedTaskScheduleId = selectedTaskSchedule;
      });
    this.taskScheduleDialogState$ = this.store
      .select<DialogState>('taskScheduleDialogState')
      .subscribe((taskScheduleDialogState) => {
        this.taskScheduleDialogState = taskScheduleDialogState;
      });
  }

  public ngOnDestroy() {
    this.taskSchedules$ && this.taskSchedules$.unsubscribe();
    this.selectedTaskSchedule$ && this.selectedTaskSchedule$.unsubscribe();
    this.taskScheduleDialogState$ && this.taskScheduleDialogState$.unsubscribe();
  }

  public async executeTaskSchedule(taskExecButton: HTMLButtonElement, taskSchedule: TaskSchedule) {
    taskExecButton.disabled = true
    await this.scheduleService.executeTasks(taskSchedule)
    taskExecButton.disabled = false
  }

  public importTaskSchedule() {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.onchange = (event) => {
      const fileName = input.files && input.files[0]
      if (!fileName) return;
      const reader = new FileReader()
      reader.onload = (e: any) => {
        const dataurl: string = e.target.result
        const json = JSON.parse(atob(dataurl.split(',')[1]))
        this.store.dispatch({
          type: 'UPDATE_TASK_SCHEDULE',
          payload: json.selectedTaskSchedule,
        });
        for (const task of json.tasks) {
          this.store.dispatch({
            type: 'UPDATE_TASK',
            payload: task,
          });
        }
      }
      reader.readAsDataURL(fileName)
    }
    input.click()
  }

  public async exportTaskSchedule() {
    const selectedTaskSchedule = this.taskSchedules
      .find((taskSchedule) => taskSchedule.id === this.selectedTaskScheduleId)

    const tasks = await this.store.select<Task[]>('tasks')
      .map((taskItems) => taskItems.filter(task => task.taskScheduleId === selectedTaskSchedule.id))
      .take(1)
      .toPromise()

    const anchor = document.createElement('a')
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      selectedTaskSchedule,
      tasks,
    }));
    anchor.setAttribute('href', dataStr)
    anchor.setAttribute('download', selectedTaskSchedule.name + '.json')
    anchor.click()
  }

  public setSelectedTaskSchedule(taskSchedule: TaskSchedule) {
    console.log('SetSelected: ', taskSchedule);
    this.store.dispatch({
      type: 'SHOW_TASK_SCHEDULE',
      payload: taskSchedule.id,
    });
  }

  public toggleTaskScheduleDialog(isShow: boolean) {
    this.taskScheduleForm.reset({
      id: uuidV1(),
      folder: null,
      name: '',
      active: true,
      useDateRange: false,
    });
    this.store.dispatch({
      type: isShow ? 'SHOW_TASK_SCHEDULE_DIALOG' : 'HIDE_TASK_SCHEDULE_DIALOG',
      payload: this.taskScheduleDialogState.type,
    });
  }
  public openTaskScheduleDialog(type: string) {
    switch (type) {
      case 'UPDATE':
        if (this.selectedTaskScheduleId === '') return;
        // Extract folderId of selectedTaskSchedule
        const { folderId, ...selectedTaskSchedule} = this.taskSchedules
          .find((taskList) => taskList.id === this.selectedTaskScheduleId);

        this.store
          .select<Folder[]>('folders')
          .take(1)
          .subscribe((folders) => {
            // Get taskScheduleList object and assign it to the selectedTaskSchedule
            const taskFolder = folders.find((folder) => folder.id === folderId);
            selectedTaskSchedule['folder'] = taskFolder || null;

            // Parse start & end dates to JS Date type
            const [start, end] = [new Date(selectedTaskSchedule.start), new Date(selectedTaskSchedule.end)]
              .map(date => {
                date.setSeconds(0, 0);
                return date;
              });

            this.taskScheduleForm.reset(Object.assign({}, selectedTaskSchedule, {
              start,
              end
            }));
          });

        break;
      case 'DELETE':
        if (this.selectedTaskScheduleId === '') return;

        const taskScheduleToDelete = this.taskSchedules
          .find((taskList) => taskList.id === this.selectedTaskScheduleId);

        this.confirmDialogService.confirm({
          message: `¿Esta seguro que desea borrar el calendario de tareas ${taskScheduleToDelete.name}?`,
          header: 'Confirmar borrado calendario de tareas',
          icon: 'fa fa-trash',
          accept: () => {
            this.store.dispatch({
              type: 'DELETE_TASK_BY_TASK_SCHEDULE_ID',
              payload: taskScheduleToDelete.id,
            });
            this.store.dispatch({
              type: 'DELETE_TASK_SCHEDULE',
              payload: taskScheduleToDelete,
            });
          },
        });

        return;

      case 'NEW':
      default:
        const currentDate = new Date();
        currentDate.setSeconds(0);

        this.taskScheduleForm.reset({
          id: uuidV1(),
          folderId: null,
          name: '',
          active: true,
          folder: null,
          useDateRange: true,
          start: currentDate,
          end: currentDate,
          mailNotify: false,
          mailAddress: null,

          second: '*',
          minute: '*',
          hour: '*',
          dayOfMonth: '*',
          month: '*',
          dayOfWeek: '*',
        } as TaskSchedule);
        break;
    }
    this.store.dispatch({
      type: 'SHOW_TASK_SCHEDULE_DIALOG',
      payload: type,
    });
  }

  public saveTaskSchedule() {
    let formValue;
    switch (this.taskScheduleDialogState.type) {
      case 'UPDATE':
        if (this.taskScheduleForm.invalid) {
          return;
        }
        formValue = this.taskScheduleForm.value;
        formValue.folderId = formValue.folder.id;
        delete formValue.folder;

        this.store.dispatch({
          type: 'UPDATE_TASK_SCHEDULE',
          payload: formValue,
        });

        break;

      case 'NEW':
      default:
        if (this.taskScheduleForm.invalid) {
          return;
        }
        formValue = this.taskScheduleForm.value;
        formValue.folderId = formValue.folder.id;
        delete formValue.folder;

        this.store.dispatch({
          type: 'ADD_TASK_SCHEDULE',
          payload: formValue,
        });
        break;
    }
    this.toggleTaskScheduleDialog(false);
  }
  public filterLists($event) {
    setTimeout(() => {
      this.store.dispatch({
        type: 'FILTER_SCHEDULE_LIST_BY_NAME',
        payload: $event.query,
      });
      this.taskFolderAutocomplete.show();
    });
  }
  public handleDropdownClick($event) {
    setTimeout(() => {
      this.store.dispatch({
        type: 'FILTER_SCHEDULE_LIST_NONE',
      });
      this.taskFolderAutocomplete.show();
    });
  }
}
