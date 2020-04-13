import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { MessageService } from './../../_services/message.service';
import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(

    private messageService: MessageService,
    private authService: AuthService,
    private alertify: AlertifyService

  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages()
  {

    this.messageService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    .subscribe( responseMessages => {
        this.messages = responseMessages;
    }, error => {
        this.alertify.error(error);
    });

  }

  sendMessage()
  {
    this.newMessage.recipientId = this.recipientId;
    this.messageService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe( (message: Message) => {
        this.messages.unshift(message);
        this.newMessage.content = '';
      }, error =>{
        this.alertify.error(error);
      });
  }

}
