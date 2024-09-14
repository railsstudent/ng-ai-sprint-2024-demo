import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-generated-story',
  standalone: true,
  imports: [],
  template: `
    <div>
    <h3>Categories:</h3>
      <p>{{ categories() }}</p>
      <h3>Prompt:</h3>
      <p>{{ systemPrompt() }}</p>
      @let userPromptLines = userPrompt().split('\n');
      @for (prompt of userPromptLines; track $index) {
        <p>{{ prompt }}</p>
      }
      <h3>Story:</h3>
      <p>{{ story() }}</p>
    </div>
  `,
  styles: `
    * {
      color: darkcyan;
    }

    p {
      margin-bottom: 0.25rem;
      font-size: 1rem;
    }

    h3 {
      margin-bottom: 0.4rem;
      text-decoration: underline;
      font-size: 1.15rem;
    }

    div {
      padding: 0.5rem;
      border: 0.2rem dashed;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratedStoryComponent {
  categories = input('No category');
  story = input('Waiting for the story');

  systemPrompt = computed(() => 
    'System: You are a professional storyteller with vivid imagination who can tell a story about given categories.'
  );

  userPrompt = computed(() =>  
    `User: Please write a story with the following categories delimited by triple dashes:
    ---${this.categories()}---

    The story should be written in one paragraph, 300 words max.
    Story:
    -----------------------------------------------------------
    `);
}
