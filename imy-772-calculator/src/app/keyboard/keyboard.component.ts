import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [NgFor],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss'
})
export class KeyboardComponent {
  @Input () allClear : boolean = true; // Clear all input
  // if allClear is true, key displays 'AC' and clears all input
  // if allClear is false, key displays 'CE' and acts like a backspace key
  
  // Keys 
  numberKeys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0',];
  letterKeys = ['E', 'F', 'C', 'D', 'A', 'B'];
  operatorKeys = ['+', '-', 'x', '÷']; // decided on x instead of * or × and ÷ instead of /
  
  // Key pressed
  @Output() selectedKey = new EventEmitter<string>();

  // Key press
  keyPress(key: string) {
    this.selectedKey.emit(key);
  } // could have additional logic here to handle key presses but it's probably better if this is just a display component

  constructor() { }
}
