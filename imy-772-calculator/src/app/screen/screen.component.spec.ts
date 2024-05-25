// import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenComponent } from './screen.component';
import { Component } from '@angular/core';

describe('ScreenComponent', () => {
  let component: ScreenComponent;
  let fixture: ComponentFixture<ScreenComponent>;
  let testHost: TestHostComponent;

  // Test host
  @Component({
    standalone: true,
    imports: [ScreenComponent],
    template: `
      <app-screen [equation]="equation" [result]="result"></app-screen>
    `
  })
  class TestHostComponent {
    equation = '1 + 1';
    result = '2';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenComponent, TestHostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
    expect(testHost).toBeTruthy(); // since testHost is created, and screen is only implicitly created
    expect(fixture.nativeElement.querySelector('app-screen')).toBeTruthy();
  });

  // Data binding with test host
  it('should have an equation of "1 + 1"', () => {
    expect(testHost.equation).toBe('1 + 1');
  });

  it('should have a result of "2"', () => {
    expect(testHost.result).toBe('2');
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
  
  // it('should have / display an equation of "1 + 1"', () => {
  //   const element = fixture.nativeElement.querySelector('.equation-display');
  //   expect(element.textContent).toContain('1 + 1');
  // });

  // it('should have / display a result of "2"', () => {
  //   const element = fixture.nativeElement.querySelector('.result-display');
  //   expect(element.textContent).toContain('2');
  // });
});
