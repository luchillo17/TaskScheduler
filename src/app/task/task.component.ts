import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Store } from '@ngrx/store';

import { v1 as uuidV1 } from 'uuid';

@Component({
  selector: 'task',
  templateUrl: 'task.component.html'
})

export class TaskComponent implements OnInit {
  private id: string = '';
  private name: string = '';
  private method: string = 'NEW';

  public component: Component;

  constructor(
    private route: ActivatedRoute,
    private store: Store<RXState>,
  ) {
    this.route.params
      .subscribe((params: Params) => {
        this.method = params.method;
      });
  }

  public ngOnInit() {
    ({ method: this.method, id: this.id } = this.route.snapshot.params);

    if (this.method === 'NEW') {
      this.id = uuidV1();
    }
  }
}
