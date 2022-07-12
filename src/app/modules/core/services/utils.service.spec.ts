import { TestBed, waitForAsync } from '@angular/core/testing';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let utilsHelperService: UtilsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService],
    });

    utilsHelperService = TestBed.inject(UtilsService);
  }));

  it('should check if is palindrome', () => {
    expect(UtilsService.isPalindrome('')).toBe(true);
    expect(UtilsService.isPalindrome('asd')).toBe(false);
    expect(UtilsService.isPalindrome('aas')).toBe(false);
    expect(UtilsService.isPalindrome('ass')).toBe(false);
    expect(UtilsService.isPalindrome('aassaa')).toBe(true);
    expect(UtilsService.isPalindrome('asa')).toBe(true);
    expect(UtilsService.isPalindrome('asswssa')).toBe(true);
  });

  it('should check if browser is valid', () => {
    expect(UtilsService.isBrowserValid()).toBe(true);
  });
});
