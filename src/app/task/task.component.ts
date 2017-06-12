import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Store } from '@ngrx/store';

import { v1 as uuidV1 } from 'uuid';

import { tasksTypes } from '.';

@Component({
  selector: 'task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.scss']
})

export class TaskComponent implements OnInit {
  public name: string = '';
  public type: TaskType;
  public method: CrudMethod = 'NEW';

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
    let id: string
    let typeString: string
    ({ method: this.method, id, type: typeString } = this.route.snapshot.params);

    let type: TaskType;

    if (this.method === 'NEW') {
      id = uuidV1();
      type = JSON.parse(typeString)
      this.type = tasksTypes.find((taskType) => taskType.type === type.type);
      this.store.dispatch({
        type: 'CREATE_CURRENT_TASK',
        payload: {
          id,
          type
        } as Task,
      });
    } else {
      this.store
        .select<Task[]>('tasks')
        .take(1)
        .subscribe((tasks) => {
          const selectedTask: Task = { ...tasks.find((task) => task.id === id), crudMethod: this.method };
          type = selectedTask.type
          this.type = tasksTypes.find((taskType) => taskType.type === type.type);
          this.store.dispatch({
            type: 'CREATE_CURRENT_TASK',
            payload: selectedTask as Task,
          });
        })
    }

  }
}
