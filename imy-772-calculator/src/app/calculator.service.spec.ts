import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Hex Calculator
  // limit operations to two numbers only (i.e., no chaining of operations)?

  // Addition
  it('should add two 0 hex numbers and return 0', () => {
    let n1 = '000';
    let n2 = '000';
    let expected = '0';
    
    expect(service.add(n1, n2)).toBe(expected);
  });

  it('should add AAA to BBB and return 1665', () => {
    let n1 = 'AAA';
    let n2 = 'BBB';
    let expected = '1665';

    expect(service.add(n1, n2)).toBe(expected);
  });

  it('should add 56C to 2F3 and return 12F2', () => {
    let n1 = '56C';
    let n2 = '2F3';
    let expected = '12F2';

    expect(service.add(n1, n2)).toBe(expected);
  })

  it('should add FFF to FFF and return 1FFE', () => {
    let n1 = 'FFF';
    let n2 = 'FFF';
    let expected = '1FFE';

    expect(service.add(n1, n2)).toBe(expected);
  });
});
