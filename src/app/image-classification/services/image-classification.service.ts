import { Injectable } from '@angular/core';
import { ImageClassifier } from '@mediapipe/tasks-vision';
import config from '~assets/config.json';
import { ImageClassifierModel } from '../types/image-classifier.type';
import { createImageClassifier } from '../utils/load-classifier';

@Injectable({
  providedIn: 'root'
})
export class ImageClassificationService {
  classifierMap = new Map<string, ImageClassifier>();
  modelNames: string[] = [];

  async setup() {
    const promises = config.modelLocations.map(async (model) => {
      const classifier = await createImageClassifier(model.path);
      return {
        name: model.name,
        classifier,
      } as ImageClassifierModel;
    })

    const classifiers = await Promise.all(promises);
    for (const { name, classifier } of classifiers) {
      this.modelNames.push(name);
      this.classifierMap.set(name, classifier);
    }
    console.log(this.modelNames, this.classifierMap);
  }

  classify(modelName: string, source: TexImageSource) {
    if (!this.classifierMap.has(modelName)) {
      throw new Error(`The model, ${modelName}, does not exist`);
    }

    const classifier = this.classifierMap.get(modelName);
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
