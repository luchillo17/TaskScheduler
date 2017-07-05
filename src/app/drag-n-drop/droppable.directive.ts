import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[NgDroppable]',
})
export class DroppableDirective {
  @Output()
  public ngDrop = new EventEmitter()

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  private onDragOver(event: DragEvent) {
    event.preventDefault()
  }

  @HostListener('drop', ['$event'])
  private ondrop(event: DragEvent) {
    const data = event.dataTransfer.getData('Text')
    if (data === 'undefined') {
      return;
    }

    const dataParsed = JSON.parse(event.dataTransfer.getData('Text'))

    this.ngDrop.next(dataParsed)
  }
}
