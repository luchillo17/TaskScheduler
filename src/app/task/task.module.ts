import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import {
  TaskComponent,
  LogTaskExecutor,
  ApiTaskExecutor,
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
export class TaskModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: this,
      providers: [
        LogTaskExecutor,
        ApiTaskExecutor,
      ],
    };
  }
}
