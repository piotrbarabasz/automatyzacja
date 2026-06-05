import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ProblemItem {
  title: string;
  description: string;
}

@Component({
  selector: 'app-problem-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './problem-section.component.html',
  styleUrls: ['./problem-section.component.scss']
})
export class ProblemSectionComponent {
  readonly problems: ProblemItem[] = [
    {
      title: 'Ciągle te same pytania klientów',
      description: 'Zespół traci czas na odpowiedzi o ceny, terminy, zakres usług i dostępność.'
    },
    {
      title: 'Dużo maili i wiadomości',
      description: 'Zapytania z formularzy, skrzynek i strony WWW wpadają bez jasnego priorytetu.'
    },
    {
      title: 'Brak czasu na szybką obsługę',
      description: 'Klienci oczekują odpowiedzi od razu, a właściciel firmy ma już pełny kalendarz.'
    },
    {
      title: 'Utracone zapytania po godzinach',
      description: 'Wieczorne i weekendowe wiadomości łatwo uciekają, zanim ktoś do nich wróci.'
    }
  ];
}
