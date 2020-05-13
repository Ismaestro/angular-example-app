import { Component, OnInit } from '@angular/core';
import moment from 'moment';

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
