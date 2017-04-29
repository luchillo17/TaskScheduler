import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Store } from '@ngrx/store';

import { v1 as uuidV1 } from 'uuid';

import { tasksTypes } from ".";

@Component({
  selector: 'task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.scss']
})

export class TaskComponent implements OnInit {
  public name: string = '';
  public type: Component;
  public method: string = 'NEW';

  public component: Component;

  constructor(
    private route: ActivatedRoute,
    private store: Store<RXState>,
  ) {
    global['task'] = this;
    this.route.params
      .subscribe((params: Params) => {
        this.method = params.method;
      });
  }

  public ngOnInit() {
    let typeString: string, id: string;
    ({ method: this.method, id: id, type: typeString } = this.route.snapshot.params);

    let type: TaskType = JSON.parse(typeString);
    this.type = tasksTypes.find((taskType) => taskType.type == type.type);

    if (this.method === 'NEW') {
      id = uuidV1();
      this.store.dispatch({
        type: 'CREATE_CURRENT_TASK',
        payload: {
          id,
          type
        } as Task,
      });
    } else {


    }
  }
}
