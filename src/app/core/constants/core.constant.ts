import { InjectionToken } from '@angular/core';
import { ImageClassifier } from '@mediapipe/tasks-vision';

export const IMAGE_CLASSIFIERS = new InjectionToken<{ [key: string]: ImageClassifier }>('IMAGE_CLASSIFIERS');
