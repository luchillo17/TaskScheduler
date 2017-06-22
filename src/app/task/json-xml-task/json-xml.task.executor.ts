import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { JsonXmlTaskData } from './index';
import { BaseTaskExecutor } from '../index';
import { UtilService } from '../../index';
import { cloneDeep } from 'lodash';
import xmlJs = require('xml-js')

@Injectable()
export class JsonXmlTaskExecutor implements BaseTaskExecutor {

  public async executeTask(task: Task, data: any[] = [], taskIndex: number = 0) {
    const {
      from,
      path,
    } = task.data as JsonXmlTaskData;
    console.log('Json task data: ', task.data);

    const newJson = cloneDeep(data[from])
    newJson[path] = xmlJs.js2xml(newJson[path], { compact: true })

    data.push(newJson)

    console.log('JsonTask result: ', newJson, data)
  }
}
