import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  answer: string;
  conversationId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  sendMessage(message: string, conversationId?: string): Observable<ChatResponse> {
    const payload: ChatRequest = {
      message,
      ...(conversationId ? { conversationId } : {})
    };

    return this.http.post<ChatResponse>(`${this.apiUrl}/chat`, payload);
  }
}
