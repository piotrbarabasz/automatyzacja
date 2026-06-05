import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ChatMessage, ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot-widget.component.html',
  styleUrls: ['./chatbot-widget.component.scss']
})
export class ChatbotWidgetComponent implements AfterViewChecked {
  @ViewChild('messageList') private messageList?: ElementRef<HTMLDivElement>;

  private readonly chatService = inject(ChatService);
  private shouldScrollToBottom = true;
  private conversationId?: string;

  readonly maxMessageLength = 1000;

  messages: ChatMessage[] = [
    {
      role: 'assistant',
      content:
        'Cześć. Jestem demo chatbota AI. Zapytaj o pakiety, proces wdrożenia albo automatyzację obsługi klientów.',
      createdAt: new Date()
    }
  ];

  draft = '';
  isLoading = false;
  errorMessage = '';

  ngAfterViewChecked(): void {
    if (!this.shouldScrollToBottom) {
      return;
    }

    this.scrollToBottom();
    this.shouldScrollToBottom = false;
  }

  sendPresetQuestion(question: string): void {
    this.draft = question;
    this.sendMessage();
  }

  sendMessage(): void {
    const message = this.draft.trim();

    if (!message || this.isLoading) {
      return;
    }

    if (message.length > this.maxMessageLength) {
      this.errorMessage = `Wiadomość może mieć maksymalnie ${this.maxMessageLength} znaków.`;
      return;
    }

    this.errorMessage = '';
    this.draft = '';
    this.pushMessage('user', message);
    this.isLoading = true;

    this.chatService
      .sendMessage(message, this.conversationId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.conversationId = response.conversationId;
          this.pushMessage('assistant', response.answer);
        },
        error: () => {
          this.errorMessage = 'Nie udało się pobrać odpowiedzi. Sprawdź backend i spróbuj ponownie.';
          this.pushMessage(
            'assistant',
            'Mam chwilowy problem z połączeniem z backendem. Spróbuj ponownie za moment.'
          );
        }
      });
  }

  handleEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.shiftKey) {
      return;
    }

    keyboardEvent.preventDefault();
    this.sendMessage();
  }

  private pushMessage(role: ChatMessage['role'], content: string): void {
    this.messages = [
      ...this.messages,
      {
        role,
        content,
        createdAt: new Date()
      }
    ];
    this.shouldScrollToBottom = true;
  }

  private scrollToBottom(): void {
    const element = this.messageList?.nativeElement;

    if (!element) {
      return;
    }

    element.scrollTop = element.scrollHeight;
  }
}
