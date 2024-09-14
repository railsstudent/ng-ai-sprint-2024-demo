import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ImageClassificationService } from '../services/image-classification.service';
import { ClassificationComponent } from './classification.component';
import { GeneratedStoryComponent } from './generated-story.component';
import { ImageClassificationResult } from '../types/image-classification.type';

@Component({
  selector: 'app-classification-container',
  standalone: true,
  imports: [ClassificationComponent, GeneratedStoryComponent],
  template: `
    <div>
      <h2 class="title">Storytelling by MediaPipe Image Classifier Task and Gemma 2</h2>
      <app-classification [models]="service.modelNames()" class="classification" 
        (classificationResults)="results.set($event)" />
      <app-generated-story [results]="results()" [story]="story()" /> 
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
  results = signal<ImageClassificationResult[]>([]);
  story = signal('No story has generated.');

  service = inject(ImageClassificationService);
}
