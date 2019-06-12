import {Component, OnInit} from '@angular/core';
import * as moment_ from 'moment';

const moment = moment_;

@Component({
  selector: 'lib-ngx-example-library',
  template: `<span>{{date}}</span>`
})
export class NgxExampleLibraryComponent implements OnInit {
  date: string;

  constructor() {
  }

  ngOnInit() {
    this.date = moment().format('dddd, D MMMM, YYYY LT');
  }
}
