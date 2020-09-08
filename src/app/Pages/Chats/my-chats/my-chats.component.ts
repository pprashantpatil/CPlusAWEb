import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { document } from 'ngx-bootstrap';
import { timer } from '../../../../../node_modules/rxjs';
@Component({
  selector: 'app-my-chats',
  templateUrl: './my-chats.component.html',
  styleUrls: ['./my-chats.component.css']
})
export class MyChatsComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  StaffID: any;
  UserID: any;
  LoginTypeID: any;
  ExistingChat: any;
  ChatBox = [];
  ngOnInit() {
    this.UserID = localStorage.getItem('UserID');
    this.route.params.subscribe(params => {
      this.StaffID = params['id'];
      this.LoginTypeID = localStorage.getItem('LoginTypeID');

      if (this.LoginTypeID == '3') {
        this.GetChatConversationDetailsByUserID(14, this.StaffID);
      } else {
        if (this.StaffID == 14) {
          this.GetChatConversationDetailsByUserID(14, this.UserID);
        }
        else {
          this.GetChatConversationDetailsByStaffID(this.UserID, this.StaffID);
        }

      }

      this.oberserableTimer();
    }
    );
  }


  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      // this.getPreviousChat();
      // this.updateusertyping();
      // this.getusertyping();
      // var objDiv = document.getElementById("chatboxdiv");
      // objDiv.scrollTop = objDiv.scrollHeight;
      if (this.LoginTypeID == '3') {
        this.GetChatConversationDetailsByUserID(14, this.StaffID);
      } else {
        if (this.StaffID == 14) {
          this.GetChatConversationDetailsByUserID(14, this.UserID);
        }
        else {
          this.GetChatConversationDetailsByStaffID(this.UserID, this.StaffID);
        }
      }
    });
  }





  UserChatDetails: any;
  PrevChatBox = [];
  Date: any;
  public GetChatConversationDetailsByUserID(UserID, RecieverID) {

    this.fmsservice.GetChatConversationDetailsByUserID(UserID, RecieverID).subscribe(
      res => {
        debugger;
        this.UserChatDetails = res;
        this.ChatID = this.UserChatDetails[0].id;
        this.ExistingChat = this.UserChatDetails[0].conversation;
        this.Date = this.UserChatDetails[0].date;

        this.PrevChatBox = this.UserChatDetails[0].conversation.split('#;');


        if (this.PrevChatBox.length > this.ChatBox.length) {
          this.ChatBox.length = 0;
          for (let i = 0; i < this.PrevChatBox.length; i++) {


            let Something = this.PrevChatBox[i].substring(
              this.PrevChatBox[i].lastIndexOf("[Msg:") + 5,
              this.PrevChatBox[i].lastIndexOf(",time:")
            );


            let ChatEntity = {
              Chat: this.PrevChatBox[i],
              Date:this.Date,
              ChatMesg: this.PrevChatBox[i].substring(
                this.PrevChatBox[i].lastIndexOf("[Msg:") + 5,
                this.PrevChatBox[i].lastIndexOf(",time:")
              ),
              MesgFrom: this.PrevChatBox[i].substring(
                this.PrevChatBox[i].lastIndexOf("Sender_") + 7,
                this.PrevChatBox[i].lastIndexOf(":-[Msg:")
              ),
              Time: this.PrevChatBox[i].substring(
                this.PrevChatBox[i].lastIndexOf(",time:") + 6,
                this.PrevChatBox[i].lastIndexOf("]")
              )

            }


            this.ChatBox.push(ChatEntity);



          }
        }



      }
    )
  }

  StaffChatDetails
  public GetChatConversationDetailsByStaffID(StaffID, RecieverID) {
    debugger;
    this.fmsservice.GetChatConversationDetailsByStaffID(StaffID, RecieverID).subscribe(
      res => {
        this.StaffChatDetails = res;
        this.ChatID = this.StaffChatDetails[0].id;
        this.ExistingChat = this.StaffChatDetails[0].conversation;
        this.Date = this.UserChatDetails[0].date;
        this.PrevChatBox = this.StaffChatDetails[0].conversation.split('#;');


        if (this.PrevChatBox.length >= this.ChatBox.length) {
          this.ChatBox.length = 0;
          for (let i = 0; i < this.PrevChatBox.length; i++) {


            let Something = this.PrevChatBox[i].substring(
              this.PrevChatBox[i].lastIndexOf("[Msg:") + 5,
              this.PrevChatBox[i].lastIndexOf(",time:")
            );


            let ChatEntity = {
              Chat: this.PrevChatBox[i],
              Date:this.Date,
              ChatMesg: this.PrevChatBox[i].substring(
                this.PrevChatBox[i].lastIndexOf("[Msg:") + 5,
                this.PrevChatBox[i].lastIndexOf(",time:")
              ),
              MesgFrom: this.PrevChatBox[i].substring(
                this.PrevChatBox[i].lastIndexOf("Sender_") + 7,
                this.PrevChatBox[i].lastIndexOf(":-[Msg:")
              ),
              Time: this.PrevChatBox[i].substring(
                this.PrevChatBox[i].lastIndexOf(",time:") + 6,
                this.PrevChatBox[i].lastIndexOf("]")
              )

            }


            this.ChatBox.push(ChatEntity);



          }
        }

      }
    )
  }

  ChatID = 0;
  chatconversation: any;

  public dosendmsg() {
    debugger;
    if (this.ChatID == 0) {
      if (this.LoginTypeID == '3') {
        let UserEntity = {
          UserID: localStorage.getItem('UserID'),
          ReceiverID: this.StaffID,
          Conversation: 'Sender_' + this.UserID + ':-[Msg:' + this.chatconversation + ',time:' + new Date(new Date().getTime()).toLocaleTimeString() + ']',
          Date: new Date(),
          Attachments: 'NULL'
        }
        this.fmsservice.InsertChatDetailsUser(UserEntity).subscribe(res => {
          debugger;
        })

      }
      else {

        let StaffEntity = {
          SenderID: localStorage.getItem('UserID'),
          ReceiverID: this.StaffID,
          Conversation: 'Sender_' + this.UserID + ':-[Msg:' + this.chatconversation + ',time:' + new Date(new Date().getTime()).toLocaleTimeString() + ']',
          Date: new Date(),
          Attachments: 'NULL'
        }
        this.fmsservice.InsertChatDetails(StaffEntity).subscribe(res => {
          debugger;
        })
      }
    } else {
      debugger;
      let ChatEntity = {
        ID: this.ChatID,
        Conversation: this.ExistingChat + '#;Sender_' + this.UserID + ':-[Msg:' + this.chatconversation + ',time:' + new Date(new Date().getTime()).toLocaleTimeString() + ']',
        Date: new Date(),
      }

      this.fmsservice.UpdateChatDetails(ChatEntity).subscribe(res => {
        debugger;
      })
    }


    this.chatconversation = "";


  }


}
