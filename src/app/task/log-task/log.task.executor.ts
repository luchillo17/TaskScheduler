import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { LogTaskData } from "./index";
import { BaseTaskExecutor } from "../index";

@Injectable()
export class LogTaskExecutor implements BaseTaskExecutor {

  public async executeTask(task: Task, data: any[] = [], taskIndex: number = 0) {
    let taskData: LogTaskData = task.data;
    console.log(taskData.text);
    if (taskData.logTasksData) {
      console.log('Tasks data: ', data);
    }
  }
}
