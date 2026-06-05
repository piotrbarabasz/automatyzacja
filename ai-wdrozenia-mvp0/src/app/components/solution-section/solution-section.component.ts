import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Solution {
  title: string;
  description: string;
  features: string[];
}

@Component({
  selector: 'app-solution-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solution-section.component.html',
  styleUrls: ['./solution-section.component.scss']
})
export class SolutionSectionComponent {
  readonly solutions: Solution[] = [
    {
      title: 'AI Chatbot na stronę WWW',
      description: 'Chatbot odpowiada klientom na podstawie FAQ, oferty i ustalonych zasad obsługi.',
      features: [
        'Odpowiedzi na powtarzalne pytania',
        'Zbieranie danych kontaktowych',
        'Wsparcie poza godzinami pracy'
      ]
    },
    {
      title: 'Automatyzacja odpowiedzi mailowych',
      description: 'Wstępna obsługa maili i zapytań pomaga szybciej porządkować komunikację.',
      features: [
        'Szybsza reakcja na nowe wiadomości',
        'Lepsze kwalifikowanie zapytań',
        'Mniej ręcznego przepisywania informacji'
      ]
    }
  ];
}
