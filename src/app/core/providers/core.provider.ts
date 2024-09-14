import { APP_INITIALIZER, Provider } from '@angular/core';
import { ImageClassificationService } from '~app/image-classification/services/image-classification.service';

export function provideAppInitializer(): Provider {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (service: ImageClassificationService) => () => service.init(),
        deps: [ImageClassificationService]
    } as Provider;
}
