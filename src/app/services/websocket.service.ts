import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = new WebSocketSubject('ws://your-websocket-url');
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  getMessages() {
    return this.socket$.asObservable();
  }
}