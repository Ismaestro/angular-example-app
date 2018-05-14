import {inject, TestBed} from '@angular/core/testing';

import {NgxExampleLibraryService} from './ngx-example-library.service';

describe('NgxExampleLibraryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxExampleLibraryService]
    });
  });

  it('should be created', inject([NgxExampleLibraryService], (service: NgxExampleLibraryService) => {
    expect(service).toBeTruthy();
  }));
});
