import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ApiTaskData } from './index';
import { BaseTaskExecutor } from '../index';
import {
  Http,
  // Headers,
} from '@angular/http';
import request = require('request-promise-native');

@Injectable()
export class ApiTaskExecutor implements BaseTaskExecutor {

  constructor(
    private http: Http
  ) {}

  public async executeTask(task: Task, data: any[] = [], taskIndex: number = 0) {
    const {
      url,
      method,
      authPath,
      authInBody,
      authorization,
      dataFromMemory,
      requestPath,
      requestData,
    } = task.data as ApiTaskData;
    console.log('Api task data: ', task.data);
    const headers = {
      authorization,
      'content-type': 'application/json',
    }

    let body = dataFromMemory ? data[requestPath] : requestData

    if (authInBody) {
      body[authPath] = authorization
      delete headers.authorization
    }

    if (typeof body !== 'string') {
      body = JSON.stringify(body)
    }

    // Try Angular's http to overcome SOAP no-cors preflight issue
    // const response = await fetch(url, {
    //   headers: new Headers(headers),
    //   mode: mode || 'cors',
    //   method,
    //   body,
    // });

    // const response = await this.http.request(url, {
    //   headers: new Headers({
    //     authorization,
    //     'accept': '*/*',
    //     'content-type': 'application/json',
    //   }),
    //   method,
    //   body,
    // }).toPromise();

    // if (!response.ok) {
    //   throw await response.json()
    // }

    // data.push(await response.json())

    const response = await request({
        uri: url,
        json: true,
        simple: false,
        method,
        headers,
        body
        // Todo revisar mensajes de error
    })

    data.push(response)

    console.log('ApiTask response: ', response, data)
  }
}
