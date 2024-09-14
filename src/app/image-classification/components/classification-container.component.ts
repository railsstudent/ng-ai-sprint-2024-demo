import { ChangeDetectionStrategy, Component } from '@angular/core';
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
      <app-generated-story /> 
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassificationContainerComponent {

}
