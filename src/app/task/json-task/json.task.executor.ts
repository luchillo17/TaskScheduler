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
    } = task.data as JsonTaskData;
    console.log('Json task data: ', task.data);

    const newJson = UtilService.formatJson(data[from], cloneDeep(format));

    data.push(newJson)

    console.log('JsonTask result: ', newJson, data)
  }
}
