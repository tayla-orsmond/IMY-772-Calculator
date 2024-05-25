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
    // Add in test for A-F?
  });

  it('should have 4 operator keys', () => {
    const operatorKeys = fixture.nativeElement.querySelectorAll('.operator-key');
    expect(operatorKeys.length).toBe(4);
  });

  it('should have 1 clear key', () => {
    const clearKey = fixture.nativeElement.querySelector('.clear-key');
    expect(clearKey).toBeTruthy();
    // this may turn into a CE key / or AC key or there will be 2
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

  it('should emit the key pressed after keyPress is called [operator divide]', () => {
    let expectedKey = 'divide'; // likely to be a symbol instead of a word
    let selectedKey = '';
    component.selectedKey.pipe().subscribe(key => {
      selectedKey = key;
    });

    component.keyPress(expectedKey);
    expect(selectedKey).toBe(expectedKey);
  });

  it('should emit the key pressed after keyPress is called [clear]', () => {
    let expectedKey = 'clear'; // still figuring out how to do AC / CE - might have separate keys or just stick to CE
    let selectedKey = '';
    component.selectedKey.pipe().subscribe(key => {
      selectedKey = key;
    });

    component.keyPress(expectedKey);
    expect(selectedKey).toBe(expectedKey);
  });

  it('should emit the key pressed after keyPress is called [equals]', () => {
    let expectedKey = 'equals'; // likely to be a symbol instead of a word
    let selectedKey = '';
    component.selectedKey.pipe().subscribe(key => {
      selectedKey = key;
    });

    component.keyPress(expectedKey);
    expect(selectedKey).toBe(expectedKey);
  });

  // should have calculate functionality in the keyboard or just emit the key and let the calculator handle it?
});
