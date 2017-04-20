import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'base-task',
  template: `
    BaseTask
  `
})

export class BaseTaskComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    console.log('Init base task.');
  }
}
