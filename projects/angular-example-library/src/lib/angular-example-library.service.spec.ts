import {inject, TestBed} from '@angular/core/testing';

import {AngularExampleLibraryService} from './angular-example-library.service';

describe('AngularExampleLibraryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularExampleLibraryService]
    });
  });

  it('should be created', inject([AngularExampleLibraryService], (service: AngularExampleLibraryService) => {
    expect(service).toBeTruthy();
  }));
});
