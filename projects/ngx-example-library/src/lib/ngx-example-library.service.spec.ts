import { TestBed } from '@angular/core/testing';
import { NgxExampleLibraryService } from './ngx-example-library.service';

describe('NgxExampleLibraryService', () => {
  let ngxExampleLibraryService: NgxExampleLibraryService;

  TestBed.configureTestingModule({
    providers: [NgxExampleLibraryService],
  }).compileComponents();

  beforeEach(() => {
    ngxExampleLibraryService = TestBed.inject(NgxExampleLibraryService);
  });

  it('should be created', () => {
    expect(ngxExampleLibraryService).toBeTruthy();
  });
});
