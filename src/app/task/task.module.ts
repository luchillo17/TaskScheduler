import { NgModule } from '@angular/core';

import { SharedModule } from "..";
import {
  TaskComponent,
  BaseTaskComponent,
  TaskSelectorComponent,
} from '.';

@NgModule({
  imports: [ SharedModule ],
  exports: [
    BaseTaskComponent,
    TaskSelectorComponent,
  ],
  declarations: [
    TaskComponent,
    BaseTaskComponent,
    TaskSelectorComponent,
  ],
  entryComponents: [
    // Base task
  ],
  providers: [],
})
export class TaskModule { }
