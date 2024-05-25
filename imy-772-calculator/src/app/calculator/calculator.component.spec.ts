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

});
