import { NgModule } from '@angular/core';

import { SharedModule } from "../shared/shared.module";
import {
  TaskComponent,
  LogTaskComponent,
  TaskSelectorComponent,
} from '.';

@NgModule({
  imports: [ SharedModule ],
  exports: [
    TaskSelectorComponent,
  ],
  declarations: [
    TaskComponent,
    LogTaskComponent,
    TaskSelectorComponent,
  ],
  entryComponents: [
    LogTaskComponent,
  ],
  providers: [],
})
export class TaskModule { }
