import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HeaderService } from './header.service';
import { ENVIRONMENT } from '~core/tokens/environment.token';

describe('HeaderService', () => {
  let service: HeaderService;
  let mockDocument: {
    querySelector: ReturnType<typeof vi.fn>;
  };
  const mockEnvironment = {
    domain: 'https://example.com',
  };

  beforeEach(() => {
    mockDocument = {
      querySelector: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        HeaderService,
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: ENVIRONMENT, useValue: mockEnvironment },
      ],
    });

    service = TestBed.inject(HeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setCanonical', () => {
    it('should update canonical link with full domain and normalized path', () => {
      const mockLink = { setAttribute: vi.fn() };
      mockDocument.querySelector.mockReturnValue(mockLink);

      service.setCanonical('/test-path#fragment');

      expect(mockDocument.querySelector).toHaveBeenCalledWith('link[rel=canonical]');
      expect(mockLink.setAttribute).toHaveBeenCalledWith('href', 'https://example.com/test-path');
    });

    it('should work without leading slash', () => {
      const mockLink = { setAttribute: vi.fn() };
      mockDocument.querySelector.mockReturnValue(mockLink);

      service.setCanonical('test-path');

      expect(mockLink.setAttribute).toHaveBeenCalledWith('href', 'https://example.com/test-path');
    });

    it('should do nothing if canonical link is not found', () => {
      mockDocument.querySelector.mockReturnValue(null);

      expect(() => {
        service.setCanonical('/test');
      }).not.toThrow();
    });
  });
});
