import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cloneDeep } from 'lodash'

import { JsonTaskData } from './index';
import { BaseTaskExecutor } from '../index';
import { UtilService } from '../../index';

@Injectable()
export class JsonTaskExecutor implements BaseTaskExecutor {

  public async executeTask(task: Task, data: any[] = [], taskIndex: number = 0) {
    const {
      from,
      format,
      errorFormat,
    } = task.data as JsonTaskData;

    const newJson = UtilService.formatJson(data[from], cloneDeep(format));

    console.log('Json task data: ', task.data, newJson);

    const error = UtilService.getError(newJson, errorFormat)

    if (error !== undefined) { throw error; }

    data.push(newJson)

    console.log('JsonTask result: ', newJson, data)
  }
}
