import {
  Component,
  OnDestroy,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';

import { v1 as uuidV1 } from 'uuid';

@Component({
  selector: 'schedule-list',
  host: {
    id: 'schedule-list-panel',
  },
  styleUrls: [ './schedule-list.component.scss' ],
  templateUrl: './schedule-list.component.html',
  // encapsulation: ViewEncapsulation.None,
})
export class ScheduleListComponent implements AfterViewInit, OnDestroy {
  private listsState$: Subscription;
  private scheduleLists$: Subscription;
  private listDialogState$: Subscription;

  public selectedListId = "";

  public listDialogState: DialogState = { show: false, type: 'NEW' };

  public scheduleLists: ScheduleList[] = [];

  // NewListDialog
  public listDialogForm: FormGroup;

  constructor(
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
        this.scheduleLists = scheduleLists
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
        this.listDialogState = listDialogState
      })
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

  public toogleListDialog(isShow: boolean) {
    this.listDialogForm.reset({
      id: uuidV1(),
      name: '',
      active: true,
    })
    this.store.dispatch({
      type: isShow ? 'SHOW_LIST_DIALOG' : 'HIDE_LIST_DIALOG',
      payload: this.listDialogState.type,
    })
  }
  public openListDialog(type: string) {
    switch (type) {
      case 'UPDATE':
        if (this.selectedListId === '') return;
        let selectedList = this.scheduleLists
          .find((scheduleList) => scheduleList.id === this.selectedListId)


        this.listDialogForm.reset({
          id: selectedList.id,
          name: selectedList.name,
          active: selectedList.active,
        })
        break;
      case 'DELETE':
        if (this.selectedListId === '') return;
        break;

      case 'NEW':
      default:
        this.listDialogForm.reset({
          id: uuidV1(),
          name: '',
          active: true,
        })
        break;
    }
    this.store.dispatch({
      type: 'SHOW_LIST_DIALOG',
      payload: type,
    })
  }

  public saveListDialog() {
    switch (this.listDialogState.type) {
      case 'DELETE':
        let selectedList = this.scheduleLists
          .find((scheduleList) => scheduleList.id === this.selectedListId)

        this.store.dispatch({
          type: 'DELETE_LIST',
          payload: selectedList,
        })
        break;
      case 'UPDATE':
        if (this.listDialogForm.invalid) {
          return;
        }
        this.store.dispatch({
          type: 'UPDATE_LIST',
          payload: this.listDialogForm.value,
        })

        break;

      case 'NEW':
      default:
        if (this.listDialogForm.invalid) {
          return;
        }
        this.store.dispatch({
          type: 'ADD_LIST',
          payload: this.listDialogForm.value,
        })
        break;
    }
    this.toogleListDialog(false)
  }
}
