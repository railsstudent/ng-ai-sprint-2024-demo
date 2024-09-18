import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import config from '~assets/config.json';
import { Story } from '../types/story.type';

@Injectable({
  providedIn: 'root'
})
export class StorytellingService {
  httpClient = inject(HttpClient);

  generateStory(categories: string[]): Promise<string> {
    const storytellingUrl = `${config.backendUrl}/storytelling`;
    return lastValueFrom(this.httpClient.post<Story>(storytellingUrl, {
        categories
      }).pipe(map(({ story }) => story))
    );
  }
}
