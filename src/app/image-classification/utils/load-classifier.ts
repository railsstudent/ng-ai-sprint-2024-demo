import { FilesetResolver, ImageClassifier } from '@mediapipe/tasks-vision';
import config from '~assets/config.json';

export async function createImageClassifier(modelAssetPath: string): Promise<ImageClassifier> {
    const vision = await FilesetResolver.forVisionTasks(config.taskVisionUrl);
    return ImageClassifier.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath
      },
      maxResults: config.maxResults,
      runningMode: config.runningMode === 'IMAGE' ? 'IMAGE' : 'VIDEO',
    });
}