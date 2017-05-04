import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { LogTaskData } from "./index";

@Injectable()
export class LogTaskExecutor implements TaskExecutor{
  private tasks$: Observable<Task[]>;

  constructor() {
  }

  public async executeTask(task: Task, data: any[] = [], taskIndex: number = 0) {
    let taskData: LogTaskData = task.data;
    console.log(taskData.text);
  }
}
