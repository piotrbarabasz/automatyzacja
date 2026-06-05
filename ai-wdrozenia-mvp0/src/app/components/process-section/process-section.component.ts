import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ProcessStep {
  title: string;
  description: string;
}

@Component({
  selector: 'app-process-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process-section.component.html',
  styleUrls: ['./process-section.component.scss']
})
export class ProcessSectionComponent {
  readonly steps: ProcessStep[] = [
    {
      title: 'Krótka rozmowa',
      description: 'Ustalamy cele, typowe zapytania i zakres pierwszego wdrożenia.'
    },
    {
      title: 'Analiza strony, FAQ i dokumentów',
      description: 'Porządkujemy materiały, z których rozwiązanie będzie korzystać.'
    },
    {
      title: 'Konfiguracja rozwiązania',
      description: 'Przygotowuję chatbota, automatyzacje albo oba elementy w wybranym zakresie.'
    },
    {
      title: 'Testy',
      description: 'Sprawdzamy odpowiedzi, formularze, scenariusze rozmów i jakość komunikacji.'
    },
    {
      title: 'Uruchomienie',
      description: 'Wdrażamy rozwiązanie i zostawiamy prosty plan dalszego rozwoju.'
    }
  ];
}
