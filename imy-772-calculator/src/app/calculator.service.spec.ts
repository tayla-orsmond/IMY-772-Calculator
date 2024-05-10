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
  // *** limit operations to two numbers only (i.e., no chaining of operations)??

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

  // Subtraction
  it('should subtract two 0 hex numbers and return 0', () => {
    let n1 = '000';
    let n2 = '000';
    let expected = '0';
    
    expect(service.subtract(n2, n1)).toBe(expected);
  });

  it('should subtract AAA from BBB and return 111', () => {
    let n1 = 'AAA';
    let n2 = 'BBB';
    let expected = '111';

    expect(service.subtract(n2, n1)).toBe(expected);
  });

  it('should subtract 56C from 2F3 and return 279 [absolute value]', () => {
    let n1 = '56C';
    let n2 = '2F3';
    let expected = '279';

    expect(service.subtract(n2, n1)).toBe(expected);
  })

  it('should subtract FFF from FFF and return 0', () => {
    let n1 = 'FFF';
    let n2 = 'FFF';
    let expected = '0';

    expect(service.subtract(n2, n1)).toBe(expected);
  });

  // Multiplication
  it('should multiply two 0 hex numbers and return 0', () => {
    let n1 = '000';
    let n2 = '000';
    let expected = '0';
    
    expect(service.multiply(n1, n2)).toBe(expected);
  });

  it('should multiply AAA and BBB and return 7D182E', () => {
    let n1 = 'AAA';
    let n2 = 'BBB';
    let expected = '7D182E';

    expect(service.multiply(n1, n2)).toBe(expected);
  });

  it('should multiply 56C and 2F3 and return FFD84', () => {
    let n1 = '56C';
    let n2 = '2F3';
    let expected = 'FFD84';

    expect(service.multiply(n1, n2)).toBe(expected);
  })

  it('should multiply FFF and FFF and return FFE001', () => {
    let n1 = 'FFF';
    let n2 = 'FFF';
    let expected = 'FFE001';

    expect(service.multiply(n1, n2)).toBe(expected);
  });
});
