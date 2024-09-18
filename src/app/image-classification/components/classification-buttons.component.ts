import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { ImageClassificationService } from '../services/image-classification.service';
import { StorytellingService } from '../services/storytelling.service';
import { CategoryScore } from '../types/image-classification.type';

@Component({
  selector: 'app-classification-buttons',
  standalone: true,
  template: `
    <button (click)="openFileDialog.emit()">Choose an image</button>
    <button (click)="classify()" [disabled]="buttonState().disabled()">{{ buttonState().classifyText() }}</button>
    <button (click)="generateStory()" [disabled]="buttonState().disabled()">{{ buttonState().generateText() }}</button>
  `,
  styles: `
    button {
      margin-right: 0.25rem;
    }

    button:last-of-type {
      margin-right: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassificationButtonsComponent {
  
  model = input.required<string>();
  imageSource = input.required<HTMLImageElement>();
  hasImage = input(false);

  categories = signal<string[]>([]);

  buttonState = computed(() => ({
    classifyText: signal('Classify the image'),
    generateText: signal('Generate a story'),
    disabled: signal(!this.hasImage()),
  }));

  results = output<CategoryScore[]>();
  story = output<string>();
  openFileDialog = output();

  classificationService = inject(ImageClassificationService);
  storytellingService = inject(StorytellingService);

  classify() {
    this.buttonState().disabled.set(true);
    this.buttonState().classifyText.set('Classifying...');
    const { categoryScores, categories } = this.classificationService.classify(this.model(), this.imageSource());
    this.results.emit(categoryScores);
    this.categories.set(categories);
    this.buttonState().classifyText.set('Classify the image');
    this.buttonState().disabled.set(false);  
  }

  async generateStory() {
    this.buttonState().disabled.set(true);
    this.buttonState().generateText.set('Generating...');
    const story = await this.storytellingService.generateStory(this.categories());
    this.story.emit(story);
    this.buttonState().generateText.set('Generate a story');
    this.buttonState().disabled.set(false);  
  }
}
