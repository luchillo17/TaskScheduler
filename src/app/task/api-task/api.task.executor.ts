import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { ApiTaskData } from "./index";
import { BaseTaskExecutor } from "../index";

@Injectable()
export class ApiTaskExecutor implements BaseTaskExecutor {
  constructor() {
  }

  public async executeTask(task: Task, data: any[] = [], taskIndex: number = 0) {
    let taskData: ApiTaskData = task.data;
    console.log('Api task data: ', taskData);
  }
}
