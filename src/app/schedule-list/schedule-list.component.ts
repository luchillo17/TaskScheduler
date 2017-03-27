import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';

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
  // TypeScript public modifiers
  constructor(
    public appState: AppState,
  ) {}

  public ngOnInit() {
    console.log('hello `ScheduleListComponent` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
