import {TestBed} from '@angular/core/testing';
import {UtilsHelperService} from './utils-helper.service';

describe('UtilsHelperService', () => {
  let utilsHelperService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilsHelperService
      ]
    });

    utilsHelperService = TestBed.get(UtilsHelperService);
  });

  it('should create instance', (() => {
    expect(utilsHelperService).toBeDefined();
  }));

  it('should return fadeInOut trigger', (() => {
    expect(UtilsHelperService.fadeInOut().name).toBe('fadeInOut');
  }));

  it('should focus in element', (() => {
    const div = document.createElement('div');
    expect(UtilsHelperService.scrollToElement(div)).toBe(undefined);
  }));

  it('should check if is palindrome', (() => {
    expect(UtilsHelperService.isPalindrome('')).toBe(true);
    expect(UtilsHelperService.isPalindrome('asd')).toBe(false);
    expect(UtilsHelperService.isPalindrome('aas')).toBe(false);
    expect(UtilsHelperService.isPalindrome('ass')).toBe(false);
    expect(UtilsHelperService.isPalindrome('aassaa')).toBe(true);
    expect(UtilsHelperService.isPalindrome('asa')).toBe(true);
    expect(UtilsHelperService.isPalindrome('asswssa')).toBe(true);
  }));

  it('should check if browser is valid', (() => {
    expect(UtilsHelperService.isBrowserValid()).toBe(true);
  }));
});
