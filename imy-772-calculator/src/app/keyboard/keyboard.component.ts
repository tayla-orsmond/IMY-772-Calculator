import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss'
})
export class KeyboardComponent {
  // Keys 
  numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  letterKeys = ['A', 'B', 'C', 'D', 'E', 'F'];
  operatorKeys = ['+', '-', 'x', '÷']; // decided on x instead of * or × and ÷ instead of /
  clearKey = 'C'; // Might add CE / AC later
  
  // Key pressed
  @Output() selectedKey = new EventEmitter<string>();

  // Key press
  keyPress(key: string) {
    this.selectedKey.emit(key);
  } // could have additional logic here to handle key presses but it's probably better if this is just a display component
}
