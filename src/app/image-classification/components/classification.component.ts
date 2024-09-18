import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageClassificationResult } from '../types/image-classification.type';
import { PreviewImageComponent } from './preview-image.component';

@Component({
  selector: 'app-classification',
  standalone: true,
  imports: [FormsModule, PreviewImageComponent],
  template: `
    <label for="models">Image Classifier Models: </label>
    <select id="models" name="models" [(ngModel)]="selectedModel">
      @for(model of models(); track model) {
        <option [value]="model">{{ model }}</option>
      }
    </select>
    <app-preview-image [selectedModel]="selectedModel()" (classificationResults)="classificationResults.emit($event)"
      (story)="story.emit($event)"
    />
  `,
  styles: `
    div, select {
      margin-bottom: 1rem;      
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassificationComponent {
  models = input.required<string[]>();
  selectedModel = signal('EfficientNet-Lite0 model');

  classificationResults = output<ImageClassificationResult[]>();
  story = output<string>();
}
