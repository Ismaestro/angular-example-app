import {CapitalizeFirstPipe} from './capitalize-first.pipe';

describe('CapitalizeFirstPipe', () => {
  const pipe = new CapitalizeFirstPipe();

  it('transforms "abc" to "Abc"', () => {
    expect(pipe.transform('abc', [])).toBe('Abc');
  });

  it('transforms "Abc" to "Abc"', () => {
    expect(pipe.transform('Abc', [])).toBe('Abc');
  });

  it('transforms "Abc as" to "Abc as"', () => {
    expect(pipe.transform('Abc as', [])).toBe('Abc as');
  });

  it('transforms "Abc As" to "Abc as"', () => {
    expect(pipe.transform('Abc As', [])).toBe('Abc as');
  });

  it('transforms "Abc As as" to "Abc as"', () => {
    expect(pipe.transform('Abc As as', [])).toBe('Abc as as');
  });

  it('transforms "Abc As As" to "Abc as"', () => {
    expect(pipe.transform('Abc As As', [])).toBe('Abc as as');
  });

  it('transforms "abc as as" to "Abc as"', () => {
    expect(pipe.transform('abc as as', [])).toBe('Abc as as');
  });
});
