import {
  Component,
  OnDestroy,
  HostBinding,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { ConfirmationService } from 'primeng/primeng';
import { Observable, Subject, Subscription } from 'rxjs';

import { v1 as uuidV1 } from 'uuid';

@Component({
  selector: 'schedule-list',
  styleUrls: [ './schedule-list.component.scss' ],
  templateUrl: './schedule-list.component.html',
  // encapsulation: ViewEncapsulation.None,
})
export class ScheduleListComponent implements AfterViewInit, OnDestroy {
  @HostBinding('id') private id = 'schedule-list-panel';

  private listsState$: Subscription;
  private scheduleLists$: Subscription;
  private listDialogState$: Subscription;

  public selectedListId = '';

  public listDialogState: DialogState = { show: false, type: 'NEW' };

  public scheduleLists: ScheduleList[] = [];

  // NewListDialog
  public listDialogForm: FormGroup;

  constructor(
    private confirmDialogService: ConfirmationService,
    private store: Store<RXState>,
    private fb: FormBuilder,
  ) {
    this.listDialogForm = this.fb.group({
      id: [uuidV1(), Validators.required],
      name: ['', [Validators.required, , Validators.minLength(4)]],
      active: [true, Validators.required],
    });
    global['listDialogForm'] = this.listDialogForm;

    this.scheduleLists$ = this.store.select<ScheduleList[]>('scheduleLists')
      .subscribe((scheduleLists) => {
        this.scheduleLists = scheduleLists;
      });

    this.listsState$ = this.store.select<ListsState>('listsState')
      .subscribe((listsState) => {
        this.selectedListId = listsState.selectedScheduleList;
      });
  }

  public ngAfterViewInit() {
    this.listDialogState$ = this.store
      .select<DialogState>('listDialogState')
      .subscribe((listDialogState) => {
        this.listDialogState = listDialogState;
      });
  }

  public ngOnDestroy() {
    this.listsState$.unsubscribe();
    this.scheduleLists$.unsubscribe();
    this.listDialogState$.unsubscribe();
  }

  public setSelectedList(scheduleList: ScheduleList) {
    this.store.dispatch({
      type: 'SHOW_LIST',
      payload: scheduleList.id,
    });
  }

  public toggleListDialog(isShow: boolean) {
    this.listDialogForm.reset({
      id: uuidV1(),
      name: '',
      active: true,
    });
    this.store.dispatch({
      type: isShow ? 'SHOW_LIST_DIALOG' : 'HIDE_LIST_DIALOG',
      payload: this.listDialogState.type,
    });
  }
  public openListDialog(type: string) {
    switch (type) {
      case 'UPDATE':
        if (this.selectedListId === '') return;
        const selectedList = this.scheduleLists
          .find((scheduleList) => scheduleList.id === this.selectedListId);

        this.listDialogForm.reset({
          id: selectedList.id,
          name: selectedList.name,
          active: selectedList.active,
        });
        break;
      case 'DELETE':
        if (this.selectedListId === '') return;

        const scheduleListToDelete = this.scheduleLists
          .find((scheduleList) => scheduleList.id === this.selectedListId);

        this.confirmDialogService.confirm({
          message: `¿Esta seguro que desea borrar la lista de calendarios ${scheduleListToDelete.name}?`,
          header: 'Confirmar borrado lista de calendarios',
          icon: 'fa fa-trash',
          accept: () => {
            this.store.dispatch({
              type: 'DELETE_TASK_SCHEDULES_BY_SCHEDULE_LIST_ID',
              payload: scheduleListToDelete.id,
            });
            this.store.dispatch({
              type: 'DELETE_LIST',
              payload: scheduleListToDelete,
            });
          },
        });

        return;

      case 'NEW':
      default:
        this.listDialogForm.reset({
          id: uuidV1(),
          name: '',
          active: true,
        });
        break;
    }
    this.store.dispatch({
      type: 'SHOW_LIST_DIALOG',
      payload: type,
    });
  }

  public saveListDialog() {
    switch (this.listDialogState.type) {
      case 'UPDATE':
        if (this.listDialogForm.invalid) {
          return;
        }
        this.store.dispatch({
          type: 'UPDATE_LIST',
          payload: this.listDialogForm.value,
        });

        break;

      case 'NEW':
      default:
        if (this.listDialogForm.invalid) {
          return;
        }
        this.store.dispatch({
          type: 'ADD_LIST',
          payload: this.listDialogForm.value,
        });
        break;
    }
    this.toggleListDialog(false);
  }
}
