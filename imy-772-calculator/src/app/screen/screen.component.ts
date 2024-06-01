import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.scss'
})
export class ScreenComponent {
  @Input() lastEquation: string = '';
  @Input() equation: string = '';
  @Input() result: string = '';
  @Input() error: string = '';

  constructor() { }
}
