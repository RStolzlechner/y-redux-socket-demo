import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-traditional-approach-demo',
  imports: [CommonModule],
  template: `
    <div>Hi there! This is a demo component for the traditional approach</div>
  `,
  standalone: true,
})
export class TraditionalApproachDemoComponent {}
