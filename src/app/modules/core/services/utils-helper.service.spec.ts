import { TestBed, waitForAsync } from '@angular/core/testing';
import { UtilsHelperService } from './utils-helper.service';

describe('UtilsHelperService', () => {
  let utilsHelperService: UtilsHelperService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [UtilsHelperService],
      });

      utilsHelperService = TestBed.inject(UtilsHelperService);
    })
  );

  it('should check if is palindrome', () => {
    expect(UtilsHelperService.isPalindrome('')).toBe(true);
    expect(UtilsHelperService.isPalindrome('asd')).toBe(false);
    expect(UtilsHelperService.isPalindrome('aas')).toBe(false);
    expect(UtilsHelperService.isPalindrome('ass')).toBe(false);
    expect(UtilsHelperService.isPalindrome('aassaa')).toBe(true);
    expect(UtilsHelperService.isPalindrome('asa')).toBe(true);
    expect(UtilsHelperService.isPalindrome('asswssa')).toBe(true);
  });

  it('should check if browser is valid', () => {
    expect(UtilsHelperService.isBrowserValid()).toBe(true);
  });
});
