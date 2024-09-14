import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ImageClassificationService } from '../services/image-classification.service';
import { ClassificationComponent } from './classification.component';
import { GeneratedStoryComponent } from './generated-story.component';

@Component({
  selector: 'app-classification-container',
  standalone: true,
  imports: [ClassificationComponent, GeneratedStoryComponent],
  template: `
    <div>
      <h2 class="title">Storytelling by MediaPipe Image Classifier Task and Gemma 2</h2>
      <app-classification />
      <app-generated-story [categories]="categories()" [story]="story()" /> 
    </div>
  `,
  styles: `
    :host {
      display: block;
      padding: 1rem;
    }

    .title {
      font-style: italic;
      font-size: 1.5rem;
      color: darkcyan;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassificationContainerComponent {
  categories = signal('No categories classified.');
  story = signal('No story has generated.');

  service = inject(ImageClassificationService);

  constructor() {
    // console.log(Object.keys(this.classifiers));
    console.log('modelNames', this.service.modelNames());
  }

  // modelNames = computed(() => Object.keys(this.classifiers));
}
