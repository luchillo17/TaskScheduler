import {
  OnInit,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { Store } from '@ngrx/store';

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

  public selectedList = -1;

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
        console.log('scheduleLists: ', scheduleLists);
        this.scheduleLists = scheduleLists
      })
  }

  public setSelectedList(index: number) {
    this.selectedList = index;
    console.log('Selected index: ', index);
  }

  public createItem() {
    this.store.dispatch({
      type: 'ADD_LIST',
      payload: {
        name: `List${new Date().getTime()}`,
        active: true,
        taskSchedules: [],
      } as ScheduleList
    })
  }
}
