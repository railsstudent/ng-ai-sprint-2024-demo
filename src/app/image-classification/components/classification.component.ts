import { ChangeDetectionStrategy, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
      <img #imagePreview />
      <button #btnImg (click)="openFileDialog()">Choose an image</button>
    </div>
  `,
  styles: `
    label {
      color: darkcyan;
      margin-right: 0.25rem;
    }

    img {
      width: 100%;
      height: 250px;
    }
    
    button {
      padding: 0.5rem;
      border-radius: 0.25rem;
    }

    div {
      margin-bottom: 1rem;
    }
    
    select {
      margin-bottom: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassificationComponent {
  models = input.required<string[]>();
  selectedModel = signal('EfficientNet-Lite0 model');
  fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');
  imagePreview = viewChild.required<ElementRef<HTMLImageElement>>('imagePreview');

  openFileDialog() {
    this.fileInput().nativeElement.click();
  }
 
  previewImage(event: Event) {
    const reader = new FileReader();
    const preview = this.imagePreview();

    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        preview.nativeElement.src = reader.result;
      }
    }

    if (event.target
      && 'files' in event.target 
      && event.target.files instanceof FileList
      && event.target.files.length) {
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
