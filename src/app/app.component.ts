import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageClassificationService } from './image-classification/services/image-classification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-ai-sprint-2024-demo';
  service = inject(ImageClassificationService); 

  testClassifier() {
    this.service.setup();
  }
}
