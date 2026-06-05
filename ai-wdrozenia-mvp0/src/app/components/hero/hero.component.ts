import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  readonly highlights = [
    { value: '24/7', label: 'odpowiedzi poza godzinami pracy' },
    { value: '2 usługi', label: 'chatbot WWW i automatyzacja maili' },
    { value: 'MVP 0', label: 'gotowe pod późniejszy chatbot demo' }
  ];
}
