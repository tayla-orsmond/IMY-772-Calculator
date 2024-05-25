import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '../calculator.service';
import { Component, isStandalone } from '@angular/core';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  const calculatorServiceStub : Partial<CalculatorService> = { // stub the calculator service
    add: (n1 :string , n2 : string) => 0,
    subtract: (n1 :string , n2 : string) => 0,
    multiply: (n1 :string , n2 : string) => 0,
    divide: (n1 :string , n2 : string) => 0
  };

  // stub the children
  @Component({standalone: true, selector: 'app-keyboard', template: '<app-keyboard></app-keyboard>'})
  class KeyboardStubComponent {}

  @Component({standalone: true, selector: 'app-screen', template: '<app-screen></app-screen>'})
  class ScreenStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent, KeyboardStubComponent, ScreenStubComponent],
      providers: [{ provide: CalculatorService, useValue: calculatorServiceStub }]
    })
    .compileComponents();

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

  it('should handle key presses [operator +]', () => {
    const key = '+'; // likely to be a symbol instead
    const spy = spyOn(component, 'handleKeyPress');
    component.handleKeyPress(key);
    expect(spy).toHaveBeenCalledWith(key);
  });


  // Display
  it('should display [2] when pressing [2]', () => {
    const key = '2';
    component.handleKeyPress(key);
    expect(component.equation).toBe('2');
    expect(component.result).toBe('');

    // test it displays in child component in e2e / child tests (test host)
  });

  it('should display [2 +] when pressing [2 +]', () => {
    const keys = ['2', '+'];
    keys.forEach(key => {
      component.handleKeyPress(key);
    });

    expect(component.equation).toBe('2 +');
    expect(component.result).toBe('');
  });

  it('should display [2 + D] when pressing [2 plus D]', () => {
    const keys = ['2', '+', 'D'];
    keys.forEach(key => {
      component.handleKeyPress(key);
    });

    expect(component.equation).toBe('2 + D');
    expect(component.result).toBe('');
  });
  
   // Operation logic
   it('should call service.add() when evaluating [2 + 3]', () => {
    const keys = ['2', '+', '3', '='];
    const spy = spyOn(calculatorServiceStub, 'add');
    keys.forEach(key => {
      component.handleKeyPress(key);      
    });

    expect(spy).toHaveBeenCalledWith('2', '3');
  });

  it('should call service.subtract() when evaluating [ABC - 456]', () => {
    const keys = ['A', 'B', 'C', '-', '4', '5', '6', '='];
    const spy = spyOn(calculatorServiceStub, 'subtract');
    keys.forEach(key => {
      component.handleKeyPress(key);      
    });

    expect(spy).toHaveBeenCalledWith('ABC', '456');
  });

  it('should call service.multiply() when evaluating [98 * FEE]', () => {
    const keys = ['9', '8', '×', 'F', 'E', 'E', '=']; // we'll see how well these * and / symbols work
    const spy = spyOn(calculatorServiceStub, 'multiply');
    keys.forEach(key => {
      component.handleKeyPress(key);      
    });

    expect(spy).toHaveBeenCalledWith('98', 'FEE');
  });

  it('should call service.divide() when evaluating [123 / C]', () => {
    const keys = ['1', '2', '3', '÷', 'C', '=']; // we'll see how well these * and / symbols work
    const spy = spyOn(calculatorServiceStub, 'divide');
    keys.forEach(key => {
      component.handleKeyPress(key);      
    });

    expect(spy).toHaveBeenCalledWith('123', 'C');
  });

  // Result display
  it('should display the result of [2 + 3]', () => {
    const keys = ['2', '+', '3', '='];
    keys.forEach(key => {
      component.handleKeyPress(key);      
    });

    expect(component.result).toBe('5');

    // test it displays in child component in e2e / child tests (test host)
  });

  it('should display the result of [ABC - 456]', () => {
    const keys = ['A', 'B', 'C', '-', '4', '5', '6', '='];
    keys.forEach(key => {
      component.handleKeyPress(key);      
    });

    expect(component.result).toBe('666');
  });

  it('should display the result of [980 * FEE]', () => {
    const keys = ['9', '8', '0', '×', 'F', 'E', 'E', '='];
    keys.forEach(key => {
      component.handleKeyPress(key);      
    });

    expect(component.result).toBe('975500');
  });

  it('should display the result of [123 / C]', () => {
    const keys = ['1', '2', '3', '÷', 'C', '='];
    keys.forEach(key => {
      component.handleKeyPress(key);      
    });

    expect(component.result).toBe('18'); // 18 remainder 3 - display remainder?
  });

   // Clear 
   it('should clear the display when pressing [clear]', () => {
    const keys = ['2', '+', '3', 'clear'];
    keys.forEach(key => {
      component.handleKeyPress(key);      
    });

    expect(component.equation).toBe('2plus');
    expect(component.result).toBe('');

    // still figuring this out (if it should be CE / AC or if there should be two buttons)
  });
});
