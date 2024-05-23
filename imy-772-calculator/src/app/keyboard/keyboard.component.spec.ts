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
    const numberKeys = fixture.nativeElement.querySelectorAll('.number-key');
    expect(numberKeys.length).toBe(10);
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
});
