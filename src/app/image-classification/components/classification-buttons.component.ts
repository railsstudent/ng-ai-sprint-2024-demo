import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { ImageClassificationService } from '../services/image-classification.service';
import { StorytellingService } from '../services/storytelling.service';
import { ImageClassificationResult } from '../types/image-classification.type';

@Component({
  selector: 'app-classification-buttons',
  standalone: true,
  template: `
    @let isDisabled = buttonState().disabled();
    <button (click)="classify()" [disabled]="isDisabled">{{ buttonState().classifyText() }}</button>
    <button (click)="generateStory()" [disabled]="isDisabled">{{ buttonState().generateText() }}</button>
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

  classificationResults = output<ImageClassificationResult[]>();
  story = output<string>();

  classificationService = inject(ImageClassificationService);
  storytellingService = inject(StorytellingService);

  classify() {
    this.buttonState().disabled.set(true);
    this.buttonState().classifyText.set('Classifying...');
    const categories =this.classificationService.classify(this.model(), this.imageSource());
    this.classificationResults.emit(categories);
    this.categories.set(categories.map((item) => item.categoryName));
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
