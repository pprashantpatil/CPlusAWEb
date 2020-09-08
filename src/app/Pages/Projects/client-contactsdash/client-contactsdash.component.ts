import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
@Component({
  selector: 'app-client-contactsdash',
  templateUrl: './client-contactsdash.component.html',
  styleUrls: ['./client-contactsdash.component.css']
})
export class ClientContactsdashComponent implements OnInit {
  projectlist1
  constructor(public fmsservice: FmsService,) { }
  LoginTypeID: any;
  ProjectID: any
  Search: any
  ngOnInit() {
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.Get_ClientContacts();
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist1 = data;
    })
  }

  projectlist
  Count
  public Get_ClientContacts() {
    if (this.LoginTypeID == 5) {
      this.fmsservice.Get_ClientContacts().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
        this.Count = this.projectlist.length;
      })
    }
    else {
      this.fmsservice.Get_ClientContacts().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
        this.Count = this.projectlist.length;
      })
    }

  }
  GetProjectID(event) {
    let projectID = event.target.value;
    if (event.target.value == 0) {
      this.Get_ClientContacts();
    }
    else {
      this.fmsservice.Get_ClientContacts().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == projectID);
        this.Count = this.projectlist.length;
      })
    }
  }

  public DeleteProject(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.fmsservice.Delete_ClientContacts(id).subscribe(res => {
          let test = res;
          this.Get_ClientContacts();
        })
        Swal.fire(
          'Deleted!',
          'Client Contact has been deleted.',
          'success'
        )
      }
      else {
        this.Get_ClientContacts();
      }
    })
  }


  phoneNo: any;
  emailID: any;
  TextMessage: any;
  public GetSMSDEtails(evn) {
    debugger;
    this.phoneNo = evn.phoneNo;
    this.emailID = evn.emailID;
  }

  public SendMessage() {
    debugger;
    let Entity = {
      'Contacts': this.phoneNo,
      'TextMessage': this.TextMessage
    }
    this.fmsservice.SendSMS(Entity).subscribe(res => {
      debugger;
      this.TextMessage = "";
      Swal.fire("SMS Send Successfully!");

    })

  }

  attachmentsurl: any;
  public SendEmail() {
    debugger;
    this.attachmentsurl = 'https://dwdqz3611m4qq.cloudfront.net/templates/Freelancer-Invoice-Template2-DB.jpg?mtime=20191122133707'
    var mailentity = {
      ToEmail: this.emailID,
      Subject: 'DigiCMS',
      FromEmail: 'digiCMS@gmail.com',
      ContentType: "text/html",
      Content: this.TextMessage,
      attachmenturl: this.attachmentsurl
      // 'Dear ' + this.doctorname + ' I am referring my Patient ' + this.patientname + ' for further investigation.<br> My Notes About The Patient Is Given Below. <br>' + this.referalnotes + ' Please Feel Free To Reach Out To Me. If You Have Any Queries.<br><br> Regards<br>' + this.user,
    };
    debugger
    this.fmsservice.SendMail(mailentity).subscribe(data => {
      debugger;
      this.TextMessage = "";
      Swal.fire('Mail sent successfully.');
    })


  }

  public onFilesAddedAttachment(evn) {

  }

}
