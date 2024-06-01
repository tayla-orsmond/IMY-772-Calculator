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
  lastEquation : string = ''; // last equation evaluated (for display)
  equation : string = ''; // current equation / answer
  result : string = ''; // result of last equation evaluated
  error : string = ''; // error message
  allClear : boolean = true; // true if equation has just been evaluated (= pressed) or if it's the first equation ever
  // equationEvaluated

  constructor(private calculatorService: CalculatorService) {}

  handleKeyPress(key: string) {
    if(!this.checkValidEquation(key)) return;
    if(this.allClear) { // equation has just been evaluated (= pressed)
      this.equation = '';
    }
    switch (key) {
      case '=':
        this.evaluateEquation();
        break;
      case 'CE':
        this.clearEntry();
        break;
      case 'AC':
        this.clearAll();
        break;
      default:
        this.updateEquation(key);
        break;
    }
  }

  private checkValidEquation(key : string) {
    const operator = /[\+\-x÷]/g;
    if(key === '=') { // key is =
      if(this.equation.length < 1 || !this.equation.match(operator) || this.equation.split(' ')[2].length < 1) { 
        // check for two operands > 0 digits and an operator
        this.error = 'Equation is not complete, nothing to evaluate';
        return false;
      }
    } else if(key === '+' || key === 'x' || key === '÷' || key === '-') { // key is an operator
      if(this.equation.length === 0 || this.allClear) { // equation is empty or just evaluated (= pressed)
        this.error = 'Equation cannot start with an operator';
        return false;
      } else if(this.equation.match(operator)) {
        this.error = 'Equation cannot have more than one operator';
        return false;
      }
    } else if(key !== 'CE' && key !== 'AC') { // key is a number / letter
      // check input is <= 3 digits
      if(!this.equation.match(operator)){ // 1 operand (no operator yet)
        if(this.equation.length === 3) {
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

  private evaluateEquation() {
    this.lastEquation = this.equation + ' =';
    const equArray = this.equation.split(' ');
    switch (equArray[1]) {
      case '+':
        this.result = this.calculatorService.add(equArray[0], equArray[2]);
        break;
      case '-':
        this.result = this.calculatorService.subtract(equArray[0], equArray[2]);
        break;
      case 'x':
        this.result = this.calculatorService.multiply(equArray[0], equArray[2]);
        break;
      case '÷':
        this.result = this.calculatorService.divide(equArray[0], equArray[2]);
        break;
    }
    this.equation = this.result;
    this.allClear = true; // equation has just been evaluated
  }

  private clearEntry() {
    const operator = /[\+\-x÷]/g;
    if(this.equation.length < 1) return;
      else if(this.equation.length === 1) {
        this.equation = '';
      } else if(this.equation.match(operator) && this.equation.split(' ')[2] === '') {
        this.equation = this.equation.slice(0, -3);
      } else {
        this.equation = this.equation.slice(0, -1);
      }
  }

  private clearAll() {
    this.lastEquation = (this.result ? 'Ans = ' + this.result : '');
    this.equation = '';
    this.result = '';
    this.allClear = false;
  }

  private updateEquation(key : string) {
    if (key === '+' || key === '-' || key === 'x' || key === '÷') {
      this.equation += ' ' + key + ' ';
    } else {
      this.equation += key;
    }
    this.allClear = false; // initially AC is true
  }

}
