import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-placeholder',
  templateUrl: './loading-placeholder.component.html',
  styleUrls: ['./loading-placeholder.component.scss']
})
export class LoadingPlaceholderComponent {

  @Input() height: string = '';
  @Input() width: string = '';

  constructor() {
  }

}
