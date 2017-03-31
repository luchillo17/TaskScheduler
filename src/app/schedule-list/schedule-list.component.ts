import {
  Component,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
  selector: 'schedule-list',
  providers: [
  ],
  styleUrls: [ './schedule-list.component.scss' ],
  templateUrl: './schedule-list.component.html'
})
export class ScheduleListComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public scheduleLists = [];
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
