import { FilesetResolver, ImageClassifier } from '@mediapipe/tasks-vision';
import config from '~assets/config.json';
import { ImageClassifierModel } from '../types/image-classifier.type';

async function createImageClassifier(modelAssetPath: string): Promise<ImageClassifier> {
    const vision = await FilesetResolver.forVisionTasks(config.taskVisionUrl);
    return ImageClassifier.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath
      },
      maxResults: config.maxResults,
      runningMode: 'IMAGE',
    });
}

export async function loadClassifiers() {
  const classifierMap: {[key: string]: ImageClassifier } = {};

  const promises = config.modelLocations.map(async (model) => {
    const classifier = await createImageClassifier(model.path);
    return {
      name: model.name,
      classifier,
    } as ImageClassifierModel;
  })

  const classifiers = await Promise.all(promises);
  for (const { name, classifier } of classifiers) {
    classifierMap[name] = classifier;
  }
  
  return classifierMap;
}