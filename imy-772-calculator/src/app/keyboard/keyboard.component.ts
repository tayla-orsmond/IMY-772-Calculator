import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss'
})
export class KeyboardComponent {
  @Input () allClear : boolean = true; // Clear all input
  // if allClear is true, key displays 'AC' and clears all input
  // if allClear is false, key displays 'CE' and acts like a backspace key
  
  // Keys 
  private numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  private letterKeys = ['A', 'B', 'C', 'D', 'E', 'F'];
  private operatorKeys = ['+', '-', 'x', '÷']; // decided on x instead of * or × and ÷ instead of /
  
  // Key pressed
  @Output() selectedKey = new EventEmitter<string>();

  // Key press
  keyPress(key: string) {
    this.selectedKey.emit(key);
  } // could have additional logic here to handle key presses but it's probably better if this is just a display component

  constructor() { }
}
