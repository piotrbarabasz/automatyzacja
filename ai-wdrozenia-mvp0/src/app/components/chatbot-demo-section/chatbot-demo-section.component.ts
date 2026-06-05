import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChatbotWidgetComponent } from '../chatbot-widget/chatbot-widget.component';

@Component({
  selector: 'app-chatbot-demo-section',
  standalone: true,
  imports: [CommonModule, ChatbotWidgetComponent],
  templateUrl: './chatbot-demo-section.component.html',
  styleUrls: ['./chatbot-demo-section.component.scss']
})
export class ChatbotDemoSectionComponent {
  readonly sampleQuestions = [
    'Ile kosztuje wdrożenie chatbota?',
    'Czy chatbot może odpowiadać na podstawie mojej strony?',
    'Dla jakich firm to rozwiązanie ma sens?',
    'Ile trwa wdrożenie?',
    'Czy można później dodać automatyzację maili?'
  ];
}
