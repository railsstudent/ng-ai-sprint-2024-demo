import { ChangeDetectionStrategy, Component, computed, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { ImageClassificationResult } from '../types/image-classification.type';
import { ClassificationButtonsComponent } from './classification-buttons.component';

@Component({
  selector: 'app-preview-image',
  standalone: true,
  imports: [ClassificationButtonsComponent],
  template: `
    <div>
      <input type="file" #fileInput style="display: none;" accept=".jpg, .jpeg, .png" (change)="previewImage($event)" />
      <div id="imageContainer"><img #imagePreview /></div>

      <button #btnImg (click)="openFileDialog()">Choose an image</button>
      <app-classification-buttons [model]="selectedModel()" [imageSource]="imageElement()" 
        [hasImage]="hasImage()" 
        (classificationResults)="classificationResults.emit($event)" 
        (story)="story.emit($event)" />
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewImageComponent {
  selectedModel = input.required<string>();
  fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');
  imagePreview = viewChild.required<ElementRef<HTMLImageElement>>('imagePreview');

  hasImage = signal(false);
  imageElement = computed(() => this.imagePreview().nativeElement);

  classificationResults = output<ImageClassificationResult[]>();
  story = output<string>();

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
        this.hasImage.set(true);
      }
    }

    this.hasImage.set(false);
    const file = this.getFirstFile(event);
    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
