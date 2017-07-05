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

  @Input()
  set ngDraggable(data: DraggableData) {
    if (data) {
      this.draggableData.data = data
    }
  }

  @HostListener('dragstart', ['$event'])
  private onDragStart(event: DragEvent) {

    const {data} = this.draggableData

    event.dataTransfer.setData('Text', JSON.stringify(data))
  }

  private draggableData: DraggableData = {}
}
