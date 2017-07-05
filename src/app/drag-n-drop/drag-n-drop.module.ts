import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DraggableDirective,
  DroppableDirective,
} from './';

export const DragNDropServices = [
]

@NgModule({
  declarations: [
    DraggableDirective,
    DroppableDirective,
  ],
  imports: [ CommonModule ],
  exports: [
    DraggableDirective,
    DroppableDirective,
  ],
})
export class DragNDropModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DragNDropModule,
      providers: DragNDropServices,
    }
  }
}
