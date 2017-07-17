import {
  OnInit,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { v1 as uuidV1 } from 'uuid';
import { Router } from '@angular/router';
import { version } from '../../../package';

@Component({
  selector: 'schedule',
  providers: [],
  styleUrls: [ './schedule.component.scss' ],
  templateUrl: './schedule.component.html',
  // encapsulation: ViewEncapsulation.None,
})
export class ScheduleComponent {
  public version = version
  constructor(
    public router: Router,
  ) {}
}
