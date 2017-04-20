import { NgModule } from '@angular/core';

import { SharedModule } from "..";
import {
  TaskComponent,
  TaskSelectorComponent,
} from '.';

@NgModule({
  imports: [ SharedModule ],
  exports: [
    TaskSelectorComponent,
  ],
  declarations: [
    TaskComponent,
    TaskSelectorComponent,
  ],
  entryComponents: [
    // Base task
  ],
  providers: [],
})
export class TaskModule { }
