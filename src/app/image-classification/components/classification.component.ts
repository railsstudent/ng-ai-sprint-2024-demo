import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-classification',
  standalone: true,
  imports: [],
  template: `
    <p>
      classification works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassificationComponent {

}
