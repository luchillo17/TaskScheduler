import {
  OnInit,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { v1 as uuidV1 } from 'uuid';

@Component({
  selector: 'schedule-list',
  providers: [
  ],
  styleUrls: [ './schedule-list.component.scss' ],
  templateUrl: './schedule-list.component.html',
  // encapsulation: ViewEncapsulation.None,
})
export class ScheduleListComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };

  public selectedListId = "";

  public scheduleLists = [];
  public taskLists = [];
  public taskQueue = [];
  // TypeScript public modifiers
  constructor(
    private store: Store<RXState>,
  ) {
  }

  public ngOnInit() {
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

  public createItem() {
    this.store.dispatch({
      type: 'ADD_LIST',
      payload: {
        id: uuidV1(),
        name: `List${new Date().getTime()}`,
      } as ScheduleList,
    })
  }
}
