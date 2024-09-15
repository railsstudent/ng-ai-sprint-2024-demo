import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, map, Observable } from 'rxjs';
import config from '~assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class StorytellingService {
  httpClient = inject(HttpClient);

  generateStory(categories: string[]): Promise<string> {
    return lastValueFrom(this.httpClient.post<{ story: string }>(`${config.backendUrl}/storytelling`, {
        categories
      }).pipe(map(({ story }) => story))
    );
  }
}
