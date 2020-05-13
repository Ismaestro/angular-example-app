import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-ngx-example-library',
  template: `<span>{{ date }}</span>`,
})
export class NgxExampleLibraryComponent implements OnInit {
  date: string;

  constructor() {}

  ngOnInit() {
    this.date = new Date().toDateString();
  }
}
