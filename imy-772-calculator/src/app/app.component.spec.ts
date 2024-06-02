import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // Stub the children
  @Component({ 
    standalone: true, 
    selector: 'app-calculator', 
    template: `<app-calculator></app-calculator>`
  })
  class CalculatorComponentStub {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CalculatorComponentStub],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Render children
  it('should have a calculator', () => {
    const calculator = fixture.nativeElement.querySelector('app-calculator');
    expect(calculator).toBeTruthy();
  });

  it('should have a title of Hexadecimal Calculator', () => {
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toContain('Hexadecimal Calculator');
  });
});
