import { isNgContent, isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from 'src/app/models/chatMessage';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  
  messageInput:string='';
  userId:string='';
  messageList:any[]=[];

  constructor(private chatService:ServicesService, private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.userId=this.route.snapshot.params["userId"]
    this.chatService.joinRoom("ABC");
    this.lisenerMessage()
  }
  
  sendMessage(){
    const chatMessage={
     message:this.messageInput,
     user:this.userId
    }as ChatMessage
    this.chatService.sendMessage("ABC",chatMessage)
    this.messageInput=''
  }
  lisenerMessage(){
    this.chatService.getMessageSubject().subscribe((message:any)=>{
      this.messageList=message.map( (item:any)=>({
        ...item,
        message_side:item.user==this.userId? 'sender':'receiver'
      }));
    })
  }
}
