import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '../calculator.service';
import { Component } from '@angular/core';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  const calculatorServiceStub = {
    // stub the calculator service
    add: (n1: string, n2: string) => '0',
    subtract: (n1: string, n2: string) => '0',
    multiply: (n1: string, n2: string) => '0',
    divide: (n1: string, n2: string) => '0',
  };

  // stub the children
  @Component({
    standalone: true,
    selector: 'app-keyboard',
    template: '<app-keyboard></app-keyboard>',
  })
  class KeyboardStubComponent {}

  @Component({
    standalone: true,
    selector: 'app-screen',
    template: '<app-screen></app-screen>',
  })
  class ScreenStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CalculatorComponent,
        KeyboardStubComponent,
        ScreenStubComponent,
      ],
      providers: [
        { provide: CalculatorService, useValue: calculatorServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Render children
    it('should have a keyboard', () => {
      const keyboard = fixture.nativeElement.querySelector('app-keyboard');
      expect(keyboard).toBeTruthy();
    });

    it('should have a screen', () => {
      const screen = fixture.nativeElement.querySelector('app-screen');
      expect(screen).toBeTruthy();
    });

  // Test the calculator service
  it('should have the calculator service', () => {
    const calculatorService = TestBed.inject(CalculatorService);
    expect(calculatorService).toBeTruthy();
  });

  // Default values
  it('should have an empty values initially [equation, result, error, lastEquation]', () => {
    expect(component.equation).toBe('');
    expect(component.result).toBe('');
    expect(component.error).toBe('');
    expect(component.lastEquation).toBe('');
  });

  // Test handling keypresses
  it('should handle key presses [number 2]', () => {
    const key = '2';
    const spy = spyOn(component, 'handleKeyPress');
    component.handleKeyPress(key);
    expect(spy).toHaveBeenCalledWith(key);
  });

  it('should handle key presses [letter D]', () => {
    const key = 'D';
    const spy = spyOn(component, 'handleKeyPress');
    component.handleKeyPress(key);
    expect(spy).toHaveBeenCalledWith(key);
  });

  // Display equation
  // test it displays in child component in e2e / child tests (test host)
  it('should display [2CF + D34] when pressing [2CF + D34]', () => {
    const keys = ['2', 'C', 'F', '+', 'D', '3', '4'];
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.equation).toBe('2CF + D34');
  });

  // Operation logic
  it('should call service.add() when evaluating [2 + 3]', () => {
    const keys = ['2', '+', '3', '='];
    const spy = spyOn(calculatorServiceStub, 'add');

    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(spy).toHaveBeenCalledWith('2', '3');
  });

  it('should call service.subtract() when evaluating [ABC - 456]', () => {
    const keys = ['A', 'B', 'C', '-', '4', '5', '6', '='];
    const spy = spyOn(calculatorServiceStub, 'subtract');

    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(spy).toHaveBeenCalledWith('ABC', '456');
  });

  it('should call service.multiply() when evaluating [98 x F3E]', () => {
    const keys = ['9', '8', 'x', 'F', '3', 'E', '='];
    const spy = spyOn(calculatorServiceStub, 'multiply');
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(spy).toHaveBeenCalledWith('98', 'F3E');
  });

  it('should call service.divide() when evaluating [123 ÷ C]', () => {
    const keys = ['1', '2', '3', '÷', 'C', '='];
    const spy = spyOn(calculatorServiceStub, 'divide');
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(spy).toHaveBeenCalledWith('123', 'C');
  });

  // Result display
  // test it displays in child component in e2e / child tests (test host)
  it('should display the result of [2 + 3]', () => {
    const keys = ['2', '+', '3', '='];
    spyOn(calculatorServiceStub, 'add').and.returnValue('5');
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('2 + 3 =');
    expect(component.equation).toBe('5');
    expect(component.result).toBe('5');
  });

  it('should display the result of [ABC - 456]', () => {
    const keys = ['A', 'B', 'C', '-', '4', '5', '6', '='];
    spyOn(calculatorServiceStub, 'subtract').and.returnValue('666');
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('ABC - 456 =');
    expect(component.equation).toBe('666');
    expect(component.result).toBe('666');
  });

  it('should display the result of [980 x FEE]', () => {
    const keys = ['9', '8', '0', 'x', 'F', 'E', 'E', '='];
    spyOn(calculatorServiceStub, 'multiply').and.returnValue('975500');
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('980 x FEE =');
    expect(component.equation).toBe('975500');
    expect(component.result).toBe('975500');
  });

  it('should display the result of [123 ÷ C]', () => {
    const keys = ['1', '2', '3', '÷', 'C', '='];
    spyOn(calculatorServiceStub, 'divide').and.returnValue('18');
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('123 ÷ C =');
    expect(component.equation).toBe('18');
    expect(component.result).toBe('18'); // 18 remainder 3 - display remainder?
  });

  // Multiple evaluations
  it('should evaluate multiple equations in a row [F4 + 6 = FA, EE x 45 = 4026, 23 - 47 = 24]', () => {
    const eq1 = ['F', '4', '+', '6', '='];
    const eq2 = ['E', 'E', 'x', '4', '5', '='];
    const eq3 = ['2', '3', '-', '4', '7', '='];

    spyOn(calculatorServiceStub, 'add').and.returnValue('FA');
    spyOn(calculatorServiceStub, 'multiply').and.returnValue('4026');
    spyOn(calculatorServiceStub, 'subtract').and.returnValue('24');

    eq1.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('F4 + 6 =');
    expect(component.equation).toBe('FA');
    expect(component.result).toBe('FA');

    eq2.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('EE x 45 =');
    expect(component.equation).toBe('4026');
    expect(component.result).toBe('4026');

    eq3.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('23 - 47 =');
    expect(component.equation).toBe('24');
    expect(component.result).toBe('24'); // absolute value
  });

  // Error handling
  // check if keys disabled in child component in e2e / child tests (test host)
  it('should not allow inputs > 3 digits', () => {
    const keys = ['1', '2', '3', '4'];
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.equation).toBe('123');
    expect(component.error).toBe('Operands must be 3 digits or fewer');
  });

  it('should not allow inputs > 3 digits [second operand]', () => {
    const keys2 = ['1', '2', '3', '+', 'A', 'B', 'C', 'D'];
    keys2.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.equation).toBe('123 + ABC');
    expect(component.error).toBe('Operands must be 3 digits or fewer');
  });

  it('should not evaluate if the equation is not complete [no second arg]', () => {
    const keys = ['2', '+', '='];
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('');
    expect(component.equation).toBe('2 + ');
    expect(component.result).toBe('');
    expect(component.error).toBe(
      'Equation is not complete, nothing to evaluate'
    );
  });

  it('should not evaluate if the equation is not complete [no operator]', () => {
    const keys = ['2', '4', '='];
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('');
    expect(component.equation).toBe('24');
    expect(component.result).toBe('');
    expect(component.error).toBe(
      'Equation is not complete, nothing to evaluate'
    );
    // could also just have it evaluate the equation as X = X
  });

  it('should not add a second operator if the equation already has one', () => {
    const keys = ['2', '+', 'x'];
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.equation).toBe('2 + ');
    expect(component.error).toBe('Equation cannot have more than one operator');
  });

  it('should not add a second operator if the equation already has one [chaining]', () => {
    const keys2 = ['2', '+', '3', 'x'];
    keys2.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.equation).toBe('2 + 3');
    expect(component.error).toBe('Equation cannot have more than one operator');
  });

  it('should not add an operator if the equation is empty', () => {
    const keys = ['+'];
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.equation).toBe('');
    expect(component.error).toBe('Equation cannot start with an operator');
  });

  it('should not evaluate if the equation is empty', () => {
    const keys = ['='];
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('');
    expect(component.equation).toBe('');
    expect(component.result).toBe('');
    expect(component.error).toBe('Equation is not complete, nothing to evaluate');
  });

  // Overwrite (multiple evaluations)
  it('should overwrite the equation when pressing a number after an evaluation', () => {
    const keys = ['A', 'B', 'C', '-', '4', '='];
    const keys2 = ['1', '2'];
    spyOn(calculatorServiceStub, 'subtract').and.returnValue('AB8');
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('ABC - 4 =');
    expect(component.equation).toBe('AB8'); // 3 digit answer to check bug with overwriting
    expect(component.result).toBe('AB8');

    keys2.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('ABC - 4 =');
    expect(component.equation).toBe('12');
    expect(component.result).toBe('AB8');
  });

  // Clear
  it('should clear the last entry (backspace) when pressing [CE]', () => {
    const keys = ['8', 'E', 'E'];
    const clear = 'CE';
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.equation).toBe('8EE');

    component.handleKeyPress(clear);

    expect(component.equation).toBe('8E');

    component.handleKeyPress(clear);

    expect(component.equation).toBe('8');

    component.handleKeyPress(clear);

    expect(component.equation).toBe('');

    const keys2 = ['1', 'B', '+', '7', 'C', '9'];
    keys2.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.equation).toBe('1B + 7C9');

    component.handleKeyPress(clear);

    expect(component.equation).toBe('1B + 7C');

    component.handleKeyPress(clear);
    component.handleKeyPress(clear);

    expect(component.equation).toBe('1B + ');

    component.handleKeyPress(clear);

    expect(component.equation).toBe('1B');

    component.handleKeyPress(clear);
    component.handleKeyPress(clear);

    expect(component.equation).toBe('');

    const keys3 = ['2', 'F','C', '+', '3', 'A', '6'];
    keys3.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.equation).toBe('2FC + 3A6');

    component.handleKeyPress(clear);

    expect(component.equation).toBe('2FC + 3A');

    component.handleKeyPress(clear);
    component.handleKeyPress(clear);
    component.handleKeyPress(clear);

    expect(component.equation).toBe('2FC');

    component.handleKeyPress(clear);

    expect(component.equation).toBe('2F');

    component.handleKeyPress(clear);

    expect(component.equation).toBe('2');

    component.handleKeyPress(clear);
    component.handleKeyPress(clear);

    expect(component.equation).toBe('');

    component.handleKeyPress(clear); // pressing CE when equation is empty should do nothing
    component.handleKeyPress(clear); // pressing CE when equation is empty should do nothing

    expect(component.equation).toBe('');
  });

  // Clear all
  it('should clear the equation and set it to "Ans = X" when pressing [AC]', () => {
    const allClear = 'AC';
    spyOn(calculatorServiceStub, 'multiply').and.returnValue('AA6');

    expect(component.lastEquation).toBe('');
    expect(component.equation).toBe('');
    expect(component.result).toBe('');
    expect(component.allClear).toBe(true); // initially

    component.handleKeyPress(allClear);
    expect(component.lastEquation).toBe('');
    expect(component.equation).toBe('');
    expect(component.result).toBe('');
    expect(component.allClear).toBe(false); // after pressing AC

    const keys = ['2', 'F', 'x', '3', 'A', '='];
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('2F x 3A =');
    expect(component.equation).toBe('AA6');
    expect(component.result).toBe('AA6'); // pressing = evaluates the equation and sets allClear to true
    expect(component.allClear).toBe(true);

    component.handleKeyPress(allClear);

    expect(component.lastEquation).toBe('Ans = AA6');
    expect(component.equation).toBe('');
    expect(component.result).toBe('');
    expect(component.allClear).toBe(false); // pressing AC sets allClear to false
  });

  // Clear all with multiple evaluations
  it('should clear the equation and set it to "Ans = X" when pressing [AC] after multiple evaluations', () => {
    const allClear = 'AC';
    spyOn(calculatorServiceStub, 'add').and.returnValue('FA');
    spyOn(calculatorServiceStub, 'multiply').and.returnValue('4026');
    spyOn(calculatorServiceStub, 'subtract').and.returnValue('24');

    expect(component.lastEquation).toBe('');
    expect(component.equation).toBe('');
    expect(component.result).toBe('');
    expect(component.allClear).toBe(true); // initially

    component.handleKeyPress(allClear);
    expect(component.lastEquation).toBe('');
    expect(component.equation).toBe('');
    expect(component.result).toBe('');
    expect(component.allClear).toBe(false); // after pressing AC

    const eq1 = ['F', '4', '+', '6', '='];
    const eq2 = ['E', 'E', 'x', '4', '5', '='];
    const eq3 = ['2', '3', '-', '4', '7', '='];

    eq1.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('F4 + 6 =');
    expect(component.equation).toBe('FA');
    expect(component.result).toBe('FA');
    expect(component.allClear).toBe(true); // after pressing = evaluates the equation and sets allClear to true

    component.handleKeyPress(allClear);
    expect(component.lastEquation).toBe('Ans = FA');
    expect(component.equation).toBe('');
    expect(component.result).toBe('');
    expect(component.allClear).toBe(false); // pressing AC sets allClear to false

    eq2.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('EE x 45 =');
    expect(component.equation).toBe('4026');
    expect(component.result).toBe('4026'); // pressing = evaluates the equation and sets allClear to true
    expect(component.allClear).toBe(true);

    eq3.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('23 - 47 =');
    expect(component.equation).toBe('24');
    expect(component.result).toBe('24'); // pressing = evaluates the equation and sets allClear to true
    expect(component.allClear).toBe(true);

    component.handleKeyPress(allClear);

    expect(component.lastEquation).toBe('Ans = 24');
    expect(component.equation).toBe('');
    expect(component.result).toBe('');
    expect(component.allClear).toBe(false); // pressing AC sets allClear to false
  });

  it('should not clear the equation on error', () => {
    const keys = ['2', '3', 'x', '5', '6', '='];
    const minus = '-';
    spyOn(calculatorServiceStub, 'multiply').and.returnValue('BC2');
    keys.forEach((key) => {
      component.handleKeyPress(key);
    });

    expect(component.lastEquation).toBe('23 x 56 =');
    expect(component.equation).toBe('BC2');
    expect(component.result).toBe('BC2');

    component.handleKeyPress(minus);
    expect(component.lastEquation).toBe('23 x 56 =');
    expect(component.equation).toBe('BC2');
    expect(component.result).toBe('BC2');
    expect(component.error).toBe('Equation cannot start with an operator');
  });
});
