import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScreenComponent } from './screen.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ScreenComponent inside a Test Host', () => {
  let component: ScreenComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;

  // Test host
  @Component({
    standalone: true,
    imports: [ScreenComponent],
    template: `
      <app-screen [equation]="equation" [result]="result" [lastEquation]="lastEquation" [error]="error"></app-screen>
    `
  })
  class TestHostComponent {
    lastEquation = '1 + 1 =';
    equation = '1 + 1';
    result = '2';
    error = '';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenComponent, TestHostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(ScreenComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
    expect(component).toBeTruthy();
  });

  // Data binding with test host
  it('should have a last equation of "1 + 1 =" initially', () => {
    expect(testHost.lastEquation).toBe('1 + 1 =');
    expect(component.lastEquation).toBe('1 + 1 =');
    // expect(fixture.nativeElement.querySelector('.last-equation-display').textContent).toContain('1 + 1 ='); // Commented out until phase 3 when UI is implemented
  });
  
  it('should have an equation of "1 + 1" initially', () => {
    expect(testHost.equation).toBe('1 + 1');
    expect(component.equation).toBe('1 + 1');
    // expect(fixture.nativeElement.querySelector('.equation-display').textContent).toContain('1 + 1'); // Commented out until phase 3 when UI is implemented
  });

  it('should have a result of "2" initially', () => {
    expect(testHost.result).toBe('2');
    expect(component.result).toBe('2');
    // expect(fixture.nativeElement.querySelector('.result-display').textContent).toContain('2'); // Commented out until phase 3 when UI is implemented
  });

  it('should have an empty error initially', () => {
    expect(testHost.error).toBe('');
    expect(component.error).toBe('');
  });

  it('should change last equation to "2 + 2 =" when set to "2 + 2 ="', () => {
    testHost.lastEquation = '2 + 2 =';
    fixture.detectChanges();
    expect(component.lastEquation).toBe('2 + 2 =');
    // expect(fixture.nativeElement.querySelector('.last-equation-display').textContent).toContain('2 + 2 ='); // Commented out until phase 3 when UI is implemented
  });

  it('should change equation to "2 + 2" when set to "2 + 2"', () => {
    testHost.equation = '2 + 2';
    fixture.detectChanges();
    expect(component.equation).toBe('2 + 2');
    // expect(fixture.nativeElement.querySelector('.equation-display').textContent).toContain('2 + 2'); // Commented out until phase 3 when UI is implemented
  });

  it('should change result to "4" when set to "4"', () => {
    testHost.result = '4';
    fixture.detectChanges();
    expect(component.result).toBe('4');
    // expect(fixture.nativeElement.querySelector('.result-display').textContent).toContain('4'); // Commented out until phase 3 when UI is implemented
  });

  it('should change error to "Error" when set to "Error"', () => {
    testHost.error = 'Error';
    fixture.detectChanges();
    expect(component.error).toBe('Error');
  });

  // Commented out test until phase 3 when UI is implemented
  // Display
  // it('should have an equation display element', () => {
  //   const element = fixture.nativeElement.querySelector('.equation-display');
  //   expect(element).toBeTruthy();
  // });

  // it('should have a result display element', () => {
  //   const element = fixture.nativeElement.querySelector('.result-display');
  //   expect(element).toBeTruthy();
  // });
});
