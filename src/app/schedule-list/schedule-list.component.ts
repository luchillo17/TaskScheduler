import {
  AfterViewInit,
  Component,
  ViewEncapsulation,
} from '@angular/core';

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

  public isValid = false;
  constructor(
    private store: Store<RXState>,
  ) {}

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
    if (!this.isValid) {
      return;
    }
    this.toogleNewListDialog(false);
  }

  public toogleNewListDialog(isShow: boolean) {
    this.store.dispatch({
      type: isShow ? 'SHOW_NEW_LIST_DIALOG' : 'HIDE_NEW_LIST_DIALOG',
    })
  }
}
