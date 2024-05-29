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
  error : string = '';
  allClear : boolean = true;

  constructor(private calculatorService: CalculatorService) {}

  handleKeyPress(key: string) {
    if(!this.checkValidEquation(key)) return;
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
    } else if (key === '+' || key === '-' || key === 'x' || key === '÷') {
      this.equation += ' ' + key + ' ';
    } else {
      this.equation += key;
    }
  }

  private checkValidEquation(key : string) {
    const operator = /[\+\-x÷]/g;
    if(key === '=') { // key is =
      if(this.equation.length === 0) {
        this.error = 'Nothing to evaluate';
        return false;
      } else if(this.equation.split(' ').length < 3) { // check for two operands and an operator
        this.error = 'Equation is not complete, nothing to evaluate';
        return false;
      }
    } else if(key === '+' || key === 'x' || key === '÷' || key === '-') { // key is an operator
      if(this.equation.length === 0) {
        this.error = 'Equation cannot start with an operator';
        return false;
      } else if(this.equation.match(operator) !== null) {
        this.error = 'Equation cannot have more than one operator';
        return false;
      }
    } else { // key is a number / letter
      // check input is <= 3 digits
      if(this.equation.match(operator) === null){ // 1 operand
        if(this.equation.split(' ')[0].length >= 3) {
          this.error = 'Operands must be 3 digits or fewer';
          return false;
        }
      } else { // 2 operands
        if(this.equation.split(' ')[2].length >= 3) {
          this.error = 'Operands must be 3 digits or fewer';
          return false;
        }
      }
    }
    this.error = '';
    return true;
  }

}
