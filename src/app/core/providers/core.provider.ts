import { APP_INITIALIZER, Provider } from '@angular/core';
import { ImageClassificationService } from '~app/image-classification/services/image-classification.service';
import { loadClassifiers } from '../utils/load-classifier';

function initializeClassifiers(service: ImageClassificationService) {
    return async () => {
        const classifiers = await loadClassifiers();
        service.init(classifiers);
    }
}

export function provideAppInitializer(): Provider {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (service: ImageClassificationService) => initializeClassifiers(service),
        deps: [ImageClassificationService]
    } as Provider;
}