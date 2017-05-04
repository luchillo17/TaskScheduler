import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Injectable()
export abstract class BaseTaskExecutor implements TaskExecutor{
  constructor() {
  }

  public abstract async executeTask(task: Task, data: any[], taskIndex: number);
}
