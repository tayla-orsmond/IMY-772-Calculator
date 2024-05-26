import { Component } from '@angular/core';
import { KeyboardComponent } from '../keyboard/keyboard.component';
import { ScreenComponent } from '../screen/screen.component';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [KeyboardComponent, ScreenComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  equation : string = '';
  result : string = '';
  constructor(private calculatorService: CalculatorService) {}

  handleKeyPress(key: string) {
    if(key === '=') {
      switch (this.equation.split(' ')[1]) {
        case '+':
          this.result = this.calculatorService.add(this.equation.split(' ')[0], this.equation.split(' ')[2]);
          break;
        case '-':
          this.result = this.calculatorService.subtract(this.equation.split(' ')[0], this.equation.split(' ')[2]);
          break;
        case 'x':
          this.result = this.calculatorService.multiply(this.equation.split(' ')[0], this.equation.split(' ')[2]);
          break;
        case '÷':
          this.result = this.calculatorService.divide(this.equation.split(' ')[0], this.equation.split(' ')[2]);
          break;
      }
    } else if (key === 'CE') { // clear - right now this just clears the equation like a CE button
      if(this.equation.length === 0) return;
      else if(this.equation.length === 1) {
        this.equation = '';
        return;
      } else if(this.equation[this.equation.length - 1] === ' ' || this.equation[this.equation.length - 1] === '') {
        this.equation = this.equation.slice(0, -3);
      } else {
        this.equation = this.equation.slice(0, -1);
      }
    }
    else if (key === '+' || key === '-' || key === 'x' || key === '÷') {
      this.equation += ' ' + key + ' ';
    } else {
      this.equation += key;
    }
  }
}
