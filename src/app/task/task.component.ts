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
  private id: string = '';
  private name: string = '';
  private type: Component;
  private method: string = 'NEW';

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
    ({ method: this.method, id: this.id } = this.route.snapshot.params);

    if (this.method === 'NEW') {
      return this.initializeNew();
    }
    this.initializeUpdate();
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(this.method, this.id, this.type);

  }

  public initializeNew() {
    this.id = uuidV1();

    let params = this.route.snapshot.params;

    let type: TaskType = JSON.parse(params.type);

    this.type = tasksTypes.find((taskType) => taskType.type == type.type);
  }

  public initializeUpdate() {


  }
}
