// import { TestBed } from '@angular/core/testing';

// import { CalculatorService } from './calculator.service';

// describe('CalculatorService', () => {
//   let service: CalculatorService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(CalculatorService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   // Hex Calculator
//   // *** limit operations to two numbers only (i.e., no chaining of operations)??

//   // Addition
//   it('should add two 0 hex numbers and return 0', () => {
//     let n1 = '000';
//     let n2 = '000';
//     let expected = '0';
    
//     expect(service.add(n1, n2)).toBe(expected);
//   });

//   it('should add AAA to BBB and return 1665', () => {
//     let n1 = 'AAA';
//     let n2 = 'BBB';
//     let expected = '1665';

//     expect(service.add(n1, n2)).toBe(expected);
//   });

//   it('should add 56C to 2F3 and return 12F2', () => {
//     let n1 = '56C';
//     let n2 = '2F3';
//     let expected = '12F2';

//     expect(service.add(n1, n2)).toBe(expected);
//   })

//   it('should add FFF to FFF and return 1FFE', () => {
//     let n1 = 'FFF';
//     let n2 = 'FFF';
//     let expected = '1FFE';

//     expect(service.add(n1, n2)).toBe(expected);
//   });

//   // Subtraction
//   it('should subtract two 0 hex numbers and return 0', () => {
//     let n1 = '000';
//     let n2 = '000';
//     let expected = '0';
    
//     expect(service.subtract(n2, n1)).toBe(expected);
//   });

//   it('should subtract AAA from BBB and return 111', () => {
//     let n1 = 'AAA';
//     let n2 = 'BBB';
//     let expected = '111';

//     expect(service.subtract(n2, n1)).toBe(expected);
//   });

//   it('should subtract 56C from 2F3 and return 279 [absolute value]', () => {
//     let n1 = '56C';
//     let n2 = '2F3';
//     let expected = '279';

//     expect(service.subtract(n2, n1)).toBe(expected);
//   })

//   it('should subtract FFF from FFF and return 0', () => {
//     let n1 = 'FFF';
//     let n2 = 'FFF';
//     let expected = '0';

//     expect(service.subtract(n2, n1)).toBe(expected);
//   });

//   // Multiplication
//   it('should multiply two 0 hex numbers and return 0', () => {
//     let n1 = '000';
//     let n2 = '000';
//     let expected = '0';
    
//     expect(service.multiply(n1, n2)).toBe(expected);
//   });

//   it('should multiply AAA and BBB and return 7D182E', () => {
//     let n1 = 'AAA';
//     let n2 = 'BBB';
//     let expected = '7D182E';

//     expect(service.multiply(n1, n2)).toBe(expected);
//   });

//   it('should multiply 56C and 2F3 and return FFD84', () => {
//     let n1 = '56C';
//     let n2 = '2F3';
//     let expected = 'FFD84';

//     expect(service.multiply(n1, n2)).toBe(expected);
//   })

//   it('should multiply FFF and FFF and return FFE001', () => {
//     let n1 = 'FFF';
//     let n2 = 'FFF';
//     let expected = 'FFE001';

//     expect(service.multiply(n1, n2)).toBe(expected);
//   });

//   // Division
//   // *** should remainder be displayed as separate value (i.e., R = 275)??
//   it('should divide two 0 hex numbers and return error [division by 0]', () => {
//     let n1 = '000';
//     let n2 = '000';
//     let expected = 'error';
    
//     expect(service.divide(n1, n2)).toBe(expected);
//   });

//   it('should divide AAA by BBB and return 0 [no decimal]', () => {
//     let n1 = 'AAA';
//     let n2 = 'BBB';
//     let expected = '0';

//     expect(service.divide(n1, n2)).toBe(expected);
//   });

//   it('should divide 56C by 2F3 and return 1 [no decimal]', () => {
//     let n1 = '56C';
//     let n2 = '2F3';
//     let expected = '1';

//     expect(service.divide(n1, n2)).toBe(expected); // remainder = 279
//   })

//   it('should divide FFF by FFF and return 1', () => {
//     let n1 = 'FFF';
//     let n2 = 'FFF';
//     let expected = '1';

//     expect(service.divide(n1, n2)).toBe(expected);
//   });
  
//   it('should divide A32 by 519 and return 2', () => {
//     let n1 = 'A32';
//     let n2 = '519';
//     let expected = '2';

//     expect(service.divide(n1, n2)).toBe(expected);
//   });

//   // (Error) Handling Input
//   it('should show undefined when /0', () => {
//     let n1 = '675';
//     let zero = '0';
//     let error = 'undefined';
//     expect(service.divide(n1, 0)).toBe(error);
//   });

//   it('should show error when 0/0', () => {
//     let n1 = '0';
//     let zero = '0';
//     let error = 'error';
//     expect(service.divide(n1, 0)).toBe(error);
//   });

//   it('should not have decimal values in output', () => {
//     let n1 = '678';
//     let n2 = '999';

//     expect(service.divide(n1, n2)).toBe('0'); // Remainder = 678
//     expect(service.divide(n2, n1)).toBe('1'); // Remainder = 321
//   });

//   it('should display absolute value of negative output [disallow negative output]', () => {
//     let n1 = '678';
//     let n2 = '999';
//     let expected = '321';

//     expect(parseInt(service.subtract(n1, n2))).toBeGreaterThan(0);
//     expect(service.subtract(n1, n2)).toBe(expected);
//   });

//   it('should not allow input of over 3 digits', () => {
//     let input = '1234';
//     let n2 = '123';
//     let error = 'error';
    
//     expect(service.add(input, input)).toBe(error);
//     expect(service.add(input, n2)).toBe(error);
//     expect(service.add(n2, input)).toBe(error);

//     expect(service.subtract(input, input)).toBe(error);
//     expect(service.subtract(input, n2)).toBe(error);
//     expect(service.subtract(n2, input)).toBe(error);

//     expect(service.multiply(input, input)).toBe(error);
//     expect(service.multiply(input, n2)).toBe(error);
//     expect(service.multiply(n2, input)).toBe(error);

//     expect(service.divide(input, input)).toBe(error);
//     expect(service.divide(input, n2)).toBe(error);
//     expect(service.divide(n2, input)).toBe(error);
//   });

//   it('should not output values > 6 digits', () => {
//     let n1 = 'FFF';
//     let n2 = 'FFF';

//     expect(service.multiply(n1, n2)).toMatch(/^[a-zA-Z\d]{1,6}$/);
//   });

//   it('should accept lowercase or uppercase letters as input', () => { // output case?
//     let lowercase = 'aaa';
//     let uppercase = 'AAA';
    
//     expect(service.add(lowercase, lowercase)).toBe('1554');
//     expect(service.add(uppercase, lowercase)).toBe('1554');
//     expect(service.add(lowercase, uppercase)).toBe('1554');
//     expect(service.add(uppercase, uppercase)).toBe('1554');

//     expect(service.subtract(lowercase, lowercase)).toBe('0');
//     expect(service.subtract(uppercase, lowercase)).toBe('0');
//     expect(service.subtract(lowercase, uppercase)).toBe('0');
//     expect(service.subtract(uppercase, uppercase)).toBe('0');

//     expect(service.multiply(lowercase, lowercase)).toBe('71B8E4');
//     expect(service.multiply(uppercase, lowercase)).toBe('71B8E4');
//     expect(service.multiply(lowercase, uppercase)).toBe('71B8E4');
//     expect(service.multiply(uppercase, uppercase)).toBe('71B8E4');

//     expect(service.divide(lowercase, lowercase)).toBe('1');
//     expect(service.divide(uppercase, lowercase)).toBe('1');
//     expect(service.divide(lowercase, uppercase)).toBe('1');
//     expect(service.divide(uppercase, uppercase)).toBe('1');
//   });
// });
