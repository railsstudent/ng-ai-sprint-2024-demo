import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ImageClassificationResult } from '../types/image-classification.type';

@Component({
  selector: 'app-generated-story',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h3>Classifications:</h3>
      @for (result of results(); track result.categoryName) {
        <p>{{ result.categoryName }}: {{ result.score }}</p>
      }
      <h3>Prompt:</h3>
      <p><label>System:</label>{{ systemPrompt() }}</p>
      @let userPromptLines = userPrompt().split('\n');
      @for (prompt of userPromptLines; track $index) {
        <p>
          @if ($index === 0) {
            <label>User:</label>
          }
          {{ prompt }}
        </p>
      }
      <h3>Story:</h3>
      <p>{{ story() }}</p>
    </div>
  `,
  styles: `
    p {
      margin-bottom: 0.25rem;
    }

    h3 {
      margin-bottom: 0.4rem;
      text-decoration: underline;
    }

    div {
      padding: 0.5rem;
      border: 0.2rem dashed;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratedStoryComponent {
  results = input<ImageClassificationResult[]>([]);
  story = input('Waiting for the story');

  categories = computed(() => this.results().map(({ categoryName }) => categoryName).join(','));
  systemPrompt = computed(() => 
    'You are a professional storyteller with vivid imagination who can tell a story about given categories.'
  );

  userPrompt = computed(() =>  
    `Please write a story with the following categories delimited by triple dashes:
    ---${this.categories()}---

    The story should be written in one paragraph, 300 words max.
    Story:
    -----------------------------------------------------------
    `);
}
