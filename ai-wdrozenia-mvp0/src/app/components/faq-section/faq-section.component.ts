import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.scss']
})
export class FaqSectionComponent {
  readonly faqs: FaqItem[] = [
    {
      question: 'Czy muszę znać się na AI?',
      answer: 'Nie. Po Twojej stronie potrzebne są tylko informacje o firmie, oferta, FAQ i typowe scenariusze obsługi klientów.'
    },
    {
      question: 'Ile trwa wdrożenie?',
      answer: 'Prosty zakres można przygotować zwykle w ciągu kilku dni roboczych, a dokładny termin zależy od materiałów i integracji.'
    },
    {
      question: 'Czy chatbot może odpowiadać na podstawie moich dokumentów?',
      answer: 'Tak. W kolejnym etapie można przygotować chatbota, który korzysta z FAQ, oferty, regulaminów lub innych uzgodnionych dokumentów.'
    },
    {
      question: 'Czy można później rozbudować system?',
      answer: 'Tak. Strona i formularz są przygotowane tak, żeby później podłączyć backend, chatbot demo albo automatyzacje mailowe.'
    },
    {
      question: 'Czy rozwiązanie działa po polsku?',
      answer: 'Tak. Komunikacja, treści i scenariusze mogą być przygotowane po polsku, z możliwością rozbudowy o inne języki.'
    }
  ];
}
