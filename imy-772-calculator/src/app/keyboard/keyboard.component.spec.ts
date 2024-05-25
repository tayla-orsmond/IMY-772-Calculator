import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardComponent } from './keyboard.component';

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

  // Commented out until phase 3 when UI is implemented
  // Keys tests
  // it('should have 10 number keys (0-9)', () => {
  //   const numberKeys : HTMLButtonElement [] = fixture.nativeElement.querySelectorAll('.number-key');
  //   expect(numberKeys.length).toBe(10);

  //   numberKeys.forEach(numberKey => {
  //     expect(numberKey.textContent).toMatch(/[0-9]/);
  //   });
  // });

  // it('should have 6 letter keys (A-F)', () => {
  //   const letterKeys = fixture.nativeElement.querySelectorAll('.letter-key');
  //   expect(letterKeys.length).toBe(6);
  // });

  // it('should have 4 operator keys', () => {
  //   const operatorKeys = fixture.nativeElement.querySelectorAll('.operator-key');
  //   expect(operatorKeys.length).toBe(4);
  // });

  // it('should have 1 clear key', () => {
  //   const clearKey = fixture.nativeElement.querySelector('.clear-key');
  //   expect(clearKey).toBeTruthy();
  // });

  // it('should have 1 equals key', () => {
  //   const equalsKey = fixture.nativeElement.querySelector('.equals-key');
  //   expect(equalsKey).toBeTruthy();
  // });
  
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

  it('should emit the key pressed after keyPress is called [clear]', () => {
    let expectedKey = 'C';
    let selectedKey = '';
    component.selectedKey.pipe().subscribe(key => {
      selectedKey = key;
    });

    component.keyPress(expectedKey);
    expect(selectedKey).toBe(expectedKey);
  });

  it('should emit the key pressed after keyPress is called [equals]', () => {
    let expectedKey = '=';
    let selectedKey = '';
    component.selectedKey.pipe().subscribe(key => {
      selectedKey = key;
    });

    component.keyPress(expectedKey);
    expect(selectedKey).toBe(expectedKey);
  });
});
