import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chatMessage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private stompClient:any;
  private messageSubject:BehaviorSubject<ChatMessage[]>=new BehaviorSubject<ChatMessage[]>([])

  constructor() {
    this.initConnectionSocket();
   }

  initConnectionSocket(){
    const url='//localhost:3001/chat-socket';
    const socket= new SockJS(url);
    this.stompClient=Stomp.over(socket);
  }

  joinRoom(roomId:any){
    this.stompClient.connect({},()=>{
      this.stompClient.subscribe(`/topic/${roomId}`,(messages:any)=>{
        const messageContent=JSON.parse(messages.body);
        const currentMessage=this.messageSubject.getValue();
        currentMessage.push(messageContent)
        //console.log(messageContent)
        this.messageSubject.next(currentMessage)
      })
    })
  }
  
  sendMessage(roomId:any, ChatMessage:ChatMessage){
    this.stompClient.send(`/app/chat/${roomId}`,{},JSON.stringify(ChatMessage))
  }

  getMessageSubject(){
    return this.messageSubject.asObservable();
  }
}
