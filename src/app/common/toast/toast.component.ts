// toast.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports:[FormsModule, CommonModule],
  templateUrl:'toast.component.html',
  styles: [
    `
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in {
        animation: fade-in 0.3s ease forwards;
      }
    `,
  ],
})
export class ToastComponent {
  @Input() message: string | null = null;
}
