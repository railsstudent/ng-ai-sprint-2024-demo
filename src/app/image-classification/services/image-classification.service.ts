import { computed, Injectable, signal } from '@angular/core';
import { ImageClassifier } from '@mediapipe/tasks-vision';
import { loadClassifiers } from '~app/core/utils/load-classifier';
import { ImageClassificationResult } from '../types/image-classification.type';

@Injectable({
  providedIn: 'root'
})
export class ImageClassificationService {
  #classifierMap = signal<{ [key:string]: ImageClassifier }>({});
  modelNames = computed(() => Object.keys(this.#classifierMap()));

  async init() {
    const classifiers = await loadClassifiers();
    this.#classifierMap.set(classifiers);
  }

  classify(modelName: string, source: TexImageSource): ImageClassificationResult {
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

    const categoryScores =  results.classifications[0].categories.map(({ categoryName, displayName, score }) => ({
      categoryName: displayName || categoryName,
      score: (score * 100).toFixed(2),
    }));
    
    const categories = categoryScores.map((item) => item.categoryName);

    return {
      categoryScores,
      categories,
    };
  }
}
