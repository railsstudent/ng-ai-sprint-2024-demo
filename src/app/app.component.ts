import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClassificationContainerComponent } from './image-classification/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClassificationContainerComponent],
  template: '<app-classification-container />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = inject(Title);

  constructor() {
    this.title.setTitle('Storytelling by MediaPipe Image Classifier Task');
  }
}
