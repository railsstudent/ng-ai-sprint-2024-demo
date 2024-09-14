import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClassificationContainerComponent } from './image-classification/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClassificationContainerComponent],
  template: '<app-classification-container />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
