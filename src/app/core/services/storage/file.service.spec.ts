import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FileService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(FileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFileAsText', () => {
    it('should fetch file as text', () => {
      const mockUrl = 'assets/test.txt';
      const mockContent = 'test content';

      service.getFileAsText(mockUrl).subscribe((content) => {
        expect(content).toBe(mockContent);
      });

      const request = httpMock.expectOne(mockUrl);
      expect(request.request.method).toBe('GET');
      expect(request.request.responseType).toBe('text');
      request.flush(mockContent);

      httpMock.verify();
    });
  });
});
