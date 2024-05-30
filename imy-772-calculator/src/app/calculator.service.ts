import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private error = "ERROR";
  private undefined = "UNDEF";

  constructor() { }

  checkValidHexInput(hex: string): boolean {
    return /^[0-9A-Fa-f]{1,3}$/.test(hex);
  }
  
  convertToDecimal(hex: string): number {
    return parseInt(hex, 16);
  }

  convertToHex(decimal: number): string {
    return Math.abs(Math.floor(decimal)).toString(16).toUpperCase();
  }

  add(n1: string, n2: string): string {
    if (!this.checkValidHexInput(n1) || !this.checkValidHexInput(n2)) {
      return this.error;
    }
    let result = this.convertToDecimal(n1) + this.convertToDecimal(n2);
    return this.convertToHex(result);
  }

  subtract(n1: string, n2: string): string {
    if (!this.checkValidHexInput(n1) || !this.checkValidHexInput(n2)) {
      return this.error;
    }
    let result = this.convertToDecimal(n1) - this.convertToDecimal(n2);
    return this.convertToHex(result);
  }

  multiply(n1: string, n2: string): string {
    if (!this.checkValidHexInput(n1) || !this.checkValidHexInput(n2)) {
      return this.error;
    }
    let result = this.convertToDecimal(n1) * this.convertToDecimal(n2);
    return this.convertToHex(result);
  }

  divide(n1: string, n2: string): string {
    if (!this.checkValidHexInput(n1) || !this.checkValidHexInput(n2)) {
      return this.error;
    } else if (this.convertToDecimal(n2) === 0) {
      return this.convertToDecimal(n1) === 0 ? this.error : this.undefined;
    }
    let result = this.convertToDecimal(n1) / this.convertToDecimal(n2);
    return this.convertToHex(result);
  }
}
