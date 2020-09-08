import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }
  allNotifications;
  notificationtypes = [];
  filteredallNotifications;
  NotificationSearch;

  ngOnInit() {
    this.getnotifications();
  }


  getnotifications() {

    this.fmsservice.GetAllNotifications().subscribe(res => {
      debugger;
      this.allNotifications = res;
      this.filteredallNotifications = this.allNotifications;
      this.getnotificationtypes();
    })
  }

  getnotificationtypes() {
    var lookup = {};

    for (var item, i = 0; item = this.allNotifications[i++];) {
      var event = item.event;

      if (!(event in lookup)) {
        lookup[event] = 1;
        this.notificationtypes.push(event);
      }
    }
  }

  markasRead(notification) {
    let ttt = notification
    // this.getnotifications();
  }

  markAllasRead() {
    let UnreadMesg = this.allNotifications.filter(x => x.isRead == false);
    for (let i = 0; i < UnreadMesg.length; i++) {
      this.UpdateReadNotification(UnreadMesg[i].mainID);
    }
    this.getnotifications();
  }
  onselecttype(type) {
    debugger;
    if (type != "none") {
      this.filteredallNotifications = this.allNotifications.filter(x => x.event == type);
    }
    else {
      this.filteredallNotifications = this.allNotifications;
    }

  }
  onselectRead(isread) {
    debugger;
    if (isread == "true") {
      isread = true;
    }
    if (isread == "false") {
      isread = false;
    }
    if (isread != "none") {

      this.filteredallNotifications = this.allNotifications.filter(x => x.isRead == isread);
    } else {
      this.filteredallNotifications = this.allNotifications;
    }

  }

  public ReadMessage(evn) {
    debugger;
    this.UpdateReadNotification(evn.mainID);
  }


  public UpdateReadNotification(ID) {
    this.fmsservice.UpdateReadNotification(ID).subscribe(res => {
      debugger;
      this.getnotifications();
    })
  }

}
