import { computed, Injectable, signal } from '@angular/core';
import { ImageClassifier } from '@mediapipe/tasks-vision';

@Injectable({
  providedIn: 'root'
})
export class ImageClassificationService {
  #classifierMap = signal<{ [key:string]: ImageClassifier }>({});
  modelNames = computed(() => Object.keys(this.#classifierMap()));

  init(classifiers: { [key:string]: ImageClassifier }) {
    this.#classifierMap.set(classifiers);
  }

  classify(modelName: string, source: TexImageSource) {
    if (!this.#classifierMap()[modelName]) {
      throw new Error(`The model, ${modelName}, does not exist`);
    }

    const classifier = this.#classifierMap()[modelName];
    if (!classifier) {
      throw new Error('The classifier is undefined.');
    }

    const results = classifier.classify(source)
    if (results.classifications.length <= 0) {
      throw new Error('No result.');
    }

    return results.classifications[0].categories.map(({ categoryName, score }) => ({
      categoryName,
      score,
    }));
  }
}
