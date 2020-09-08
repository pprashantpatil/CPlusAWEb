import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
@Component({
  selector: 'app-projectteamdash',
  templateUrl: './projectteamdash.component.html',
  styleUrls: ['./projectteamdash.component.css']
})
export class ProjectteamdashComponent implements OnInit {
  Search: any
  constructor(public fmsservice: FmsService, ) { }
  projectlist1;
  LoginTypeID;
  StaffID;
  ProjectID;
  ProjectType: any;
  StaffTypelist: any;
  StaffTypeID: any;
  ngOnInit() {

    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.StaffID = localStorage.getItem('UserID')
    this.ProjectType = localStorage.getItem('ProjectType');
    this.StaffTypeID = 0
    this.GetProjectTeam();
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist1 = data;
    })

    this.fmsservice.GetStaffType(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffTypelist = temp.filter(x => x.id > 11);
      }
    )

  }

  projectlist;
  Count: any;
  public GetProjectTeam() {
    if (this.LoginTypeID == '1') {
      this.fmsservice.GetProjectTeam().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
        this.Count = this.projectlist.length;
      })
    } else if (this.LoginTypeID == '7') {
      this.fmsservice.GetProjectTeam().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == 109);
        this.Count = this.projectlist.length;
      })
    } else {
      this.fmsservice.GetProjectTeam().subscribe(data => {
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
      this.GetProjectTeam();
    }
    else {
      // this.fmsservice.GetProjectTeam().subscribe(data => {
      //   debugger
      //   let temp: any = data;
      //   this.projectlist = temp.filter(x => x.projectID == projectID);
      // })

      if (this.LoginTypeID == '1') {
        this.fmsservice.GetProjectTeam().subscribe(data => {
          debugger
          this.projectlist = data.filter(x => x.projectID == projectID);
          this.Count = this.projectlist.length;
        })
      } else {
        this.fmsservice.GetProjectTeam().subscribe(data => {
          debugger
          this.projectlist = data.filter(x => x.projectID == projectID);
          this.Count = this.projectlist.length;
        })
      }


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
        this.fmsservice.DeleteProjectTeam(id).subscribe(res => {
          let test = res;
          this.GetProjectTeam();
        })
        Swal.fire(
          'Deleted!',
          'Project been deleted.',
          'success'
        )
      }
      else {
        this.GetProjectTeam();
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


  public SendEmail() {
    debugger;
    var mailentity = {
      ToEmail: this.emailID,
      Subject: 'DigiCMS',
      FromEmail: 'digiCMS@gmail.com',
      ContentType: "text/html",
      Content: this.TextMessage,
      // 'Dear ' + this.doctorname + ' I am referring my Patient ' + this.patientname + ' for further investigation.<br> My Notes About The Patient Is Given Below. <br>' + this.referalnotes + ' Please Feel Free To Reach Out To Me. If You Have Any Queries.<br><br> Regards<br>' + this.user,
    };
    debugger
    this.fmsservice.SendMail(mailentity).subscribe(data => {
      debugger;
      this.TextMessage = "";
      Swal.fire('Mail sent successfully.');
    })
  }



  public getStaffTypeID(evn) {
    debugger;
    this.StaffTypeID = evn.target.value;

    if (this.StaffTypeID == "0") {
      this.fmsservice.GetProjectTeam().subscribe(data => {
        debugger
        this.projectlist = data.filter(x => x.projectID == localStorage.getItem('ProjectID'));
        this.Count = this.projectlist.length;
      })
    } else {
      this.fmsservice.GetProjectTeam().subscribe(data => {
        debugger
        this.projectlist = data.filter(x => x.projectID == localStorage.getItem('ProjectID') && x.staffTypeID == evn.target.value);
        this.Count = this.projectlist.length;
      })
    }


  }

  public onFilesAddedAttachment(evn) {

  }


}
