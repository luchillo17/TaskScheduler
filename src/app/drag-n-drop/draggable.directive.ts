import { Directive, HostBinding, Input, HostListener } from '@angular/core';

export interface DraggableData {
  data?: any;
}

@Directive({
  selector: '[ngDraggable]',
})
export class DraggableDirective {
  @HostBinding('draggable')
  get draggable() {
    return true
  }

  @HostBinding('style.backgroundColor')
  private backgroundColor

  @HostBinding('style.opacity')
  private opacity

  @Input()
  set ngDraggable(data: DraggableData) {
    if (data) {
      this.draggableData.data = data
    }
  }

  @HostListener('dragstart', ['$event'])
  private onDragStart(event: DragEvent) {

    this.backgroundColor = '#5bc0de'
    this.opacity = 0.4

    const {data} = this.draggableData

    event.dataTransfer.setData('Text', JSON.stringify(data))
  }

  @HostListener('dragend', ['$event'])
  private onDragEnd(event: DragEvent) {
    this.backgroundColor = undefined
    this.opacity = undefined
  }

  private draggableData: DraggableData = {}
}
