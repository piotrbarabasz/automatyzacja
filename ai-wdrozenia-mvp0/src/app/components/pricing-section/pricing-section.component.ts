import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface PricingPackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

@Component({
  selector: 'app-pricing-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-section.component.html',
  styleUrls: ['./pricing-section.component.scss']
})
export class PricingSectionComponent {
  readonly packages: PricingPackage[] = [
    {
      name: 'Pakiet Start',
      price: 'od 1990 zł',
      description: 'Dla firmy, która chce szybko uruchomić chatbot AI na stronie.',
      highlighted: false,
      features: [
        'chatbot AI na stronę',
        'odpowiedzi na podstawie FAQ/oferty',
        'formularz kontaktowy',
        'podstawowa konfiguracja',
        '1 miesiąc wsparcia'
      ]
    },
    {
      name: 'Pakiet Biznes',
      price: 'od 4990 zł',
      description: 'Dla firmy, która chce połączyć chatbota z obsługą maili i leadów.',
      highlighted: true,
      features: [
        'chatbot AI',
        'automatyzacja maili',
        'integracja z formularzem kontaktowym',
        'zbieranie leadów',
        'podsumowanie rozmów klientów',
        '1 miesiąc wsparcia'
      ]
    }
  ];
}
