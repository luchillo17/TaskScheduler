import { NgModule } from '@angular/core';

import { SharedModule } from "../shared/shared.module";
import {
  TaskComponent,
  LogTaskComponent,
  ApiTaskComponent,
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
    ApiTaskComponent,
    TaskSelectorComponent,
  ],
  entryComponents: [
    LogTaskComponent,
    ApiTaskComponent,
  ],
  providers: [],
})
export class TaskModule { }
