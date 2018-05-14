import {Component, Input, OnInit} from '@angular/core';
import * as moment_ from 'moment';

const moment = moment_;

@Component({
  selector: 'lib-angular-example-library',
  template: `<span>{{date}}</span>`,
  styles: []
})
export class AngularExampleLibraryComponent implements OnInit {

  @Input() locale: string;
  date: string;

  constructor() {
  }

  ngOnInit() {
    this.date = moment().locale(this.locale).format('dddd, D MMMM, YYYY LT');
  }
}
