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
  selector: 'schedule-list',
  providers: [
  ],
  styleUrls: [ './schedule-list.component.scss' ],
  templateUrl: './schedule-list.component.html',
  // encapsulation: ViewEncapsulation.None,
})
export class ScheduleListComponent implements AfterViewInit {
  public selectedListId = "";

  public newListDialogState: Observable<boolean>;

  public scheduleLists = [];
  public taskLists = [];
  public taskQueue = [];

  // NewListDialog
  public newListDialogForm: FormGroup;

  public isValid = false;
  constructor(
    private store: Store<RXState>,
    private fb: FormBuilder,
  ) {
    this.newListDialogForm = this.fb.group({
      id: [{ value: uuidV1() }, Validators.required],
      name: ['', [Validators.required, , Validators.minLength(4)]],
      active: [true, Validators.required],
    });
    global['newListDialogForm'] = this.newListDialogForm;
  }

  public ngAfterViewInit() {
    this.newListDialogState = this.store.select<boolean>('newListDialogState')

    this.store.select<ScheduleList[]>('scheduleLists')
      .subscribe((scheduleLists) => {
        this.scheduleLists = scheduleLists
      })

    this.store.select<ListsState>('listsState')
      .subscribe((listsState) => {
        this.selectedListId = listsState.selectedScheduleList;
      });
  }

  public setSelectedList(scheduleList: ScheduleList) {
    this.store.dispatch({
      type: 'SHOW_LIST',
      payload: scheduleList.id,
    });
  }

  public sendNewListDialog() {
    if (this.newListDialogForm.invalid) {
      return;
    }
    this.store.dispatch({
      type: 'ADD_LIST',
      payload: this.newListDialogForm.value as ScheduleList,
    });
    this.toogleNewListDialog(false);
  }

  public toogleNewListDialog(isShow: boolean) {
    this.newListDialogForm.reset({
      id: { value: uuidV1() },
      name: '',
      active: true,
    })
    this.store.dispatch({
      type: isShow ? 'SHOW_NEW_LIST_DIALOG' : 'HIDE_NEW_LIST_DIALOG',
    })
  }
}
