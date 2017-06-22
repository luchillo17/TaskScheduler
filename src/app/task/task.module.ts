import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import {
  TaskComponent,
  LogTaskExecutor,
  ApiTaskExecutor,
  LogTaskComponent,
  ApiTaskComponent,
  TaskSelectorComponent,
  JsonTaskComponent,
  JsonTaskExecutor,
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
    JsonTaskComponent,
    TaskSelectorComponent,
  ],
  entryComponents: [
    LogTaskComponent,
    ApiTaskComponent,
    JsonTaskComponent,
  ],
  providers: [],
})
export class TaskModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: TaskModule,
      providers: [
        LogTaskExecutor,
        ApiTaskExecutor,
        JsonTaskExecutor,
      ],
    };
  }
}
