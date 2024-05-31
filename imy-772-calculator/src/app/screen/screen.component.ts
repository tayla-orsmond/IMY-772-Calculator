import { Component, Input } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.scss',
  animations: [
    trigger('resultAnimation', [
      transition('* => *', animate('200ms ease', style({
        opacity: 0.6,
      }))),
    ]),
    trigger('equationAnimation', [
      transition('* => *', animate('100ms ease', style({
        transform: 'scale(1.05)',
      }))),
    ]),
  ],
})
export class ScreenComponent {
  @Input() lastEquation: string = '';
  @Input() equation: string = '';
  @Input() result: string = '';

  constructor() { }

  resultColour() {
    // turn result into a hex colour
    let result : string = '';
    if(this.result.length < 6) {
      result = '0'.repeat(6 - this.result.length) + this.result;
    } else {
      result = this.result;
    }
    return '#' + result;
  }
}
