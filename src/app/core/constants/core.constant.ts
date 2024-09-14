import { ImageClassifier } from '@mediapipe/tasks-vision';
import { InjectionToken } from '@angular/core';

export const IMAGE_CLASSIFIERS = new InjectionToken<{ [key: string]: ImageClassifier }>('IMAGE_CLASSIFIERS');

