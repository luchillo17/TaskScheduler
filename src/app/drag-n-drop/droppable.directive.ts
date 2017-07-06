import { Directive, Output, EventEmitter, HostListener, HostBinding, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Directive({
  selector: '[NgDroppable]',
})
export class DroppableDirective {
  @ViewChildren('div') private children: QueryList<HTMLDivElement>;
  @Output()
  public ngDrop = new EventEmitter()

  @HostBinding('style.border')
  private border

  @HostListener('dragover', ['$event'])
  private onDragOver(event: DragEvent) {
    event.preventDefault()
    return false
  }

  @HostListener('dragenter', ['$event'])
  private onDragEnter(event: DragEvent) {
    this.setPointerEvents()
    this.border = '2px dashed #f3f3f3'
  }

  @HostListener('dragleave', ['$event'])
  private onDragLeave(event: DragEvent) {
    this.setPointerEvents(true)
    this.border = undefined
  }

  @HostListener('drop', ['$event'])
  private ondrop(event: DragEvent) {
    event.stopPropagation()
    const data = event.dataTransfer.getData('Text')
    if (data === 'undefined') {
      return;
    }

    const dataParsed = JSON.parse(event.dataTransfer.getData('Text'))

    this.ngDrop.next(dataParsed)

    return false;
  }

  constructor(
    private el: ElementRef,
  ) {}

  /**
   * This fix issue with mouse triggering `dragleave` event on hover over child
   * HTMLElements, should be called on `dragenter` and `dragleave`
   *
   * @private
   * @param {boolean} [shouldAdd] Decides if child nodes should receive the pointerEvents 'auto' or 'none'
   * @memberof DroppableDirective
   */
  private setPointerEvents(shouldAdd?: boolean) {
    const children = Array.from((this.el.nativeElement as HTMLElement).children) as HTMLElement[];
    for (const child of children) {
      child.style.pointerEvents = shouldAdd ? 'auto' : 'none'
    }
  }
}
