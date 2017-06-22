import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import {
  TaskComponent,
  TaskSelectorComponent,

  LogTaskExecutor,
  ApiTaskExecutor,
  JsonTaskExecutor,
  JsonXmlTaskExecutor,

  LogTaskComponent,
  ApiTaskComponent,
  JsonTaskComponent,
  JsonXmlTaskComponent,
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
    JsonXmlTaskComponent,
    TaskSelectorComponent,
  ],
  entryComponents: [
    LogTaskComponent,
    ApiTaskComponent,
    JsonTaskComponent,
    JsonXmlTaskComponent,
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
        JsonXmlTaskExecutor,
      ],
    };
  }
}
