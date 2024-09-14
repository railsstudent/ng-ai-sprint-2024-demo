import { Injectable } from '@angular/core';
import { createImageClassifier } from '../utils/load-classifier';
import { ImageClassifier } from '@mediapipe/tasks-vision';
import config from '~assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class ImageClassificationService {
  classifiers: ImageClassifier[] = [];

  async setup() {
    console.log('config.modelLocations[1].path', config.modelLocations[0].path);
    const classifier = await createImageClassifier(config.modelLocations[0].path);
    console.log(classifier);
  }
}
