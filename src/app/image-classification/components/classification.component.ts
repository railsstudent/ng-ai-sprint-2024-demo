import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageClassificationService } from '../services/image-classification.service';
import { ImageClassificationResult } from '../types/image-classification.type';
import { StorytellingService } from '../services/storytelling.service';

@Component({
  selector: 'app-classification',
  standalone: true,
  imports: [FormsModule],
  template: `
    <label for="models">Image Classifier Models: </label>
    <select id="models" name="models" [(ngModel)]="selectedModel">
      @for(model of models(); track model) {
        <option [value]="model">{{ model }}</option>
      }
    </select>
    <div>
      <input type="file" #fileInput style="display: none;" accept=".jpg, .jpeg, .png"
        (change)="previewImage($event)" />
      <div id="imageContainer">
        <img #imagePreview />
      </div>

      @let isDisabled = buttonState().disabled();
      <button #btnImg (click)="openFileDialog()">Choose an image</button>
      <button (click)="classify()" [disabled]="isDisabled">{{ buttonState().classifyText() }}</button>
      <button (click)="generateStory()" [disabled]="isDisabled">{{ buttonState().generateText() }}</button>
    </div>
  `,
  styles: `
    div, select {
      margin-bottom: 1rem;      
    }

    #imageContainer {
      width: 100%;
      height: 300px;
      overflow: auto;
    }

    img {
      width: auto;
      height: auto;
      max-width: none;
    }
    
    button {
      margin-right: 0.25rem;
    }

    button:last-of-type {
      margin-right: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassificationComponent {
  models = input.required<string[]>();
  fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');
  imagePreview = viewChild.required<ElementRef<HTMLImageElement>>('imagePreview');

  selectedModel = signal('EfficientNet-Lite0 model');
  categories = signal<string[]>([]);

  buttonState = computed(() => ({
    classifyText: signal('Classify the image'),
    generateText: signal('Generate a story'),
    disabled: signal(true),
  }));

  classificationResults = output<ImageClassificationResult[]>();
  story = output<string>();

  classificationService = inject(ImageClassificationService);
  storytellingService = inject(StorytellingService);

  openFileDialog() {
    this.fileInput().nativeElement.click();
  }

  getFirstFile(event: Event) {
    return event.target && 'files' in event.target && event.target.files instanceof FileList && event.target.files.length ?
      event.target.files[0] : null;
  }
 
  previewImage(event: Event) {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        this.imagePreview().nativeElement.src = reader.result;
        this.buttonState().disabled.set(false);
      }
    }

    const file = this.getFirstFile(event);
    if (file) {
      this.buttonState().disabled.set(true);
      reader.readAsDataURL(file);
    }
  }

  classify() {
    this.buttonState().disabled.set(true);
    this.buttonState().classifyText.set('Classifying');
    const categories =this.classificationService.classify(this.selectedModel(), this.imagePreview().nativeElement);
    this.classificationResults.emit(categories);
    this.categories.set(categories.map((item) => item.categoryName));
    this.buttonState().classifyText.set('Classify a image');
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
