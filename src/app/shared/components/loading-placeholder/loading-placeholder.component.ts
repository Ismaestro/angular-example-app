import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-placeholder',
  templateUrl: './loading-placeholder.component.html',
  styleUrls: ['./loading-placeholder.component.scss']
})
export class LoadingPlaceholderComponent implements OnInit {

  @Input() height: string;
  @Input() width: string;

  constructor() {
  }

  ngOnInit() {
  }

}
