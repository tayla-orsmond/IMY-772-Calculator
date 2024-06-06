import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardComponent } from './keyboard.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('KeyboardComponent', () => {
  let component: KeyboardComponent;
  let fixture: ComponentFixture<KeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Keys tests
  it('should have 10 number keys (0-9)', () => {
    const numberKeys : HTMLButtonElement [] = fixture.nativeElement.querySelectorAll('.number-key');
    expect(numberKeys.length).toBe(10);

    numberKeys.forEach(numberKey => {
      expect(numberKey.textContent).toMatch(/[0-9]/);
    });
  });

  it('should have 6 letter keys (A-F)', () => {
    const letterKeys = fixture.nativeElement.querySelectorAll('.letter-key');
    expect(letterKeys.length).toBe(6);
  });

  it('should have 4 operator keys', () => {
    const operatorKeys = fixture.nativeElement.querySelectorAll('.operator-key');
    expect(operatorKeys.length).toBe(4);
  });

  it('should have 1 clear key', () => {
    const clearKey = fixture.nativeElement.querySelector('.clear-key');
    expect(clearKey).toBeTruthy();
  });

  it('should have 1 equals key', () => {
    const equalsKey = fixture.nativeElement.querySelector('.equals-key');
    expect(equalsKey).toBeTruthy();
  });
  
  // Keypress
  it('should emit the key pressed after keyPress is called [number 3]', () => {
    let expectedKey = '3';
    let selectedKey = '';
    component.selectedKey.pipe().subscribe(key => {
      selectedKey = key;
    });

    component.keyPress(expectedKey);
    expect(selectedKey).toBe(expectedKey);
  });

  it('should emit the key pressed after keyPress is called [letter B]', () => {
    let expectedKey = 'B';
    let selectedKey = '';
    component.selectedKey.pipe().subscribe(key => {
      selectedKey = key;
    });

    component.keyPress(expectedKey);
    expect(selectedKey).toBe(expectedKey);
  });

  it('should emit the key pressed after keyPress is called [operator divide ÷]', () => {
    let expectedKey = '÷';
    let selectedKey = '';
    component.selectedKey.pipe().subscribe(key => {
      selectedKey = key;
    });

    component.keyPress(expectedKey);
    expect(selectedKey).toBe(expectedKey);
  });

  it('should emit the key pressed after keyPress is called [equals =]', () => {
    let expectedKey = '=';
    let selectedKey = '';
    component.selectedKey.pipe().subscribe(key => {
      selectedKey = key;
    });

    component.keyPress(expectedKey);
    expect(selectedKey).toBe(expectedKey);
  });
});

describe('KeyboardComponent inside Test Host', () => {
  let component: KeyboardComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;

  // Test host
  @Component({
    standalone: true,
    imports: [KeyboardComponent],
    template: `
      <app-keyboard [allClear]="allClear" (selectedKey)="onKeyPress($event)"></app-keyboard>
    `
  })
  class TestHostComponent {
    keyPressed = '';
    allClear = true;
    onKeyPress(key: string) {
      this.keyPressed = key;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardComponent, TestHostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(KeyboardComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
    expect(component).toBeTruthy();
  });

  // Data passing
  it('should have allClear set to true initially', () => {
    expect(testHost.allClear).toBe(true);
    expect(component.allClear).toBe(true);
    expect(fixture.nativeElement.querySelector('.clear-key').textContent).toBe('AC');
  });

  it('should change allClear to false when set to false', () => {
    testHost.allClear = false;
    fixture.detectChanges();
    expect(component.allClear).toBe(false);
    expect(fixture.nativeElement.querySelector('.clear-key').textContent).toBe('CE');
  });

  // Keypresses for AC and CE
  it('should emit AC when allClear is true', () => {
    let expectedKey = 'AC';
    let selectedKey = '';
    component.selectedKey.pipe().subscribe(key => {
      selectedKey = key;
    });

    component.keyPress(component.allClear ? 'AC' : 'CE'); // Should be AC - mock the functionality that would be in the UI
    expect(selectedKey).toBe(expectedKey);
    expect(testHost.keyPressed).toBe(expectedKey);
  });

  it('should emit CE when allClear is false', () => {
    let expectedKey = 'CE';
    let selectedKey = '';

    testHost.allClear = false;
    fixture.detectChanges();
    component.selectedKey.pipe().subscribe(key => {
      selectedKey = key;
    });

    component.keyPress(component.allClear ? 'AC' : 'CE'); // Should be CE - mock the functionality that would be in the UI
    expect(selectedKey).toBe(expectedKey);
    expect(testHost.keyPressed).toBe(expectedKey);
  });
  // More in depth testing for keypresses can be done in phase 3 when UI is implemented
});
