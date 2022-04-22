import { TestBed } from '@angular/core/testing';
import { NgxExampleLibraryService } from './ngx-example-library.service';

describe('NgxExampleLibraryService', () => {
  let service: NgxExampleLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxExampleLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
