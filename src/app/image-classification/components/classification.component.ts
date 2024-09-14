import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageClassificationService } from '../services/image-classification.service';
import { ImageClassificationResult } from '../types/image-classification.type';

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

      @let isDisabled = disableButtons();
      <button #btnImg (click)="openFileDialog()">Choose an image</button>
      <button (click)="classify()" [disabled]="isDisabled">Classify the image</button>
      <button (click)="generateStory()" [disabled]="isDisabled">Generate Story</button>
    </div>
  `,
  styles: `
    div {
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
  disableButtons = signal(true);

  classificationResults = output<ImageClassificationResult[]>();

  service = inject(ImageClassificationService);

  openFileDialog() {
    this.fileInput().nativeElement.click();
  }
 
  previewImage(event: Event) {
    this.disableButtons.set(true);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        this.imagePreview().nativeElement.src = reader.result;
        this.disableButtons.set(false);
      }
    }

    if (event.target
      && 'files' in event.target 
      && event.target.files instanceof FileList
      && event.target.files.length) {
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  classify() {
    console.log('To be implemented');
    const categories =this.service.classify(this.selectedModel(), this.imagePreview().nativeElement);
    this.classificationResults.emit(categories);
  }

  generateStory() {
    console.log('To be implemented');
  }
}
