import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-meeting-minutes',
  templateUrl: './meeting-minutes.component.html',
  styleUrls: ['./meeting-minutes.component.css']
})
export class MeetingMinutesComponent implements OnInit {
  projectlist
  projectID
  Attendees1
  Attendees2
  Attendeeslist1
  Attendeeslist2
  MeetingDate
  MeetingTime
  MeetingName
  MeetingMinutes
  Location
  FileName2
  FileType2
  paramID
  typeID
  UserID: any
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {
    this.MeetingType = 0;
    this.UserID = localStorage.getItem('UserID');
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.id == localStorage.getItem('ProjectID'));
    })
    this.projectID = localStorage.getItem('ProjectID');
    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.GetMeetingMinutesByID(this.paramID);
      }
    }
    );


    this.fmsservice.GetProjectTeam().subscribe(
      res => {
        debugger;
        let temp: any = res
        this.Attendeeslist1 = temp.filter(x => x.projectID == localStorage.getItem('ProjectID'));
      }
    )
    this.fmsservice.Get_ClientContacts().subscribe(data => {
      debugger
      let temp: any = data;
      this.Attendeeslist2 = temp.filter(x => x.projectID == localStorage.getItem('ProjectID'));
    })


  }

  public GetMeetingMinutesByID(ProjectID) {
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.id == localStorage.getItem('ProjectID'));
    })
    this.fmsservice.GetProjectTeam().subscribe(
      res => {
        debugger;
        let temp: any = res
        this.Attendeeslist1 = temp.filter(x => x.projectID == localStorage.getItem('ProjectID'));
      }
    )
    this.fmsservice.Get_ClientContacts().subscribe(data => {
      debugger
      let temp: any = data;
      this.Attendeeslist2 = temp.filter(x => x.projectID == localStorage.getItem('ProjectID'));
    })



    this.fmsservice.GetMeetingMinutes().subscribe(data => {
      debugger
      let temp: any = data;
      this.MeetingMinutes = temp.filter(x => x.id == ProjectID);
      let Project = this.MeetingMinutes[0];
      this.projectID = Project["projectID"];
      this.MeetingDate = this.datepipe.transform(Project["meetingDate"], 'yyyy-MM-dd');
      this.MeetingName = Project["meetingName"];
      this.Password = Project["password"];
      this.Attendees1 = Project["attendees1"];
      this.Attendees2 = Project["attendees2"];
      this.MeetingMinutes = Project["meetingMinutes"];
      this.Location = Project["location"];
      this.MeetingTime = Project["time"];
      this.MeetingType = Project["meetingType"];
      this.meetingLink = Project["meetingLink"];
    })

  }

  public GetProjectID(event) {
    this.projectID = event.target.value;
    this.fmsservice.Get_ClientContacts().subscribe(data => {
      debugger
      let temp: any = data;
      this.Attendeeslist2 = temp.filter(x => x.projectID == this.projectID);
    })

  }



  AttendeesEmailID: any;
  Location1: any;
  Attendeeslist11: any;
  StaffOne: any
  public GetAttendees1(event) {
    debugger;
    this.Attendees1 = event.target.value;
    // this.fmsservice.GetStaff(1).subscribe(
    //   res => {
    //     debugger;
    //     let temp: any = res
    //     this.Attendeeslist11 = temp.filter(x => x.buildingid == localStorage.getItem('ProjectID') && x.id == this.Attendees1);
    //     this.AttendeesEmailID = this.Attendeeslist11[0].emailID;
    //     this.Location1 = this.Attendeeslist11[0].address;
    //     this.StaffOne = this.Attendeeslist11[0].name
    //   }
    // )
  }



  AttendeestwoEmailID: any;
  Location2;
  StaffTwo: any;
  Attendeeslist22: any;
  public GetAttendees2(event) {
    debugger;
    this.Attendees2 = event.target.value;

    this.fmsservice.GetStaff(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.Attendeeslist22 = temp.filter(x => x.buildingid == localStorage.getItem('ProjectID') && x.id == this.Attendees2);
        this.AttendeestwoEmailID = this.Attendeeslist22[0].emailID;
        this.Location2 = this.Attendeeslist22[0].address;
        this.StaffTwo = this.Attendeeslist22[0].name;
      }
    )
  }
  handleFileSelect2(evt) {
    debugger
    //console.log(evt);
    var File2 = evt.target.value;
    // console.log(File);
    let subStringData = File2.substr(12, 10000);
    //console.log(X);
    var FileName2 = subStringData.split('.')[0];
    var FileType2 = subStringData.split('.')[1];
    console.log(FileName2);
    console.log(FileType2);
    this.FileName2 = FileName2;
    this.FileType2 = FileType2;
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded2.bind(this);
      reader.readAsBinaryString(file);
    }


  }
  base64textString2
  base64textString
  _handleReaderLoaded2(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString2 = btoa(binaryString);
    console.log(this.base64textString);
  }

  meetingLink
  Password
  public Save() {
    debugger
    let object = {
      'ProjectID': this.projectID,
      'MeetingDate': this.MeetingDate,
      'MeetingTime': this.MeetingTime,
      'Attendees1': this.Attendees1,
      'Attendees2': this.Attendees2,
      'MeetingName': this.MeetingName,
      'Location': this.Location,
      'meetingType': this.MeetingType,
      'meetingLink': this.meetingLink,
      'Password': this.Password
    }

    this.fmsservice.InsertMeetingMinutes(object).subscribe(res => {
      debugger
      Swal.fire('Meeting  Saved Successfully!');
      location.href = "#/MeetingMinutesdash";
    })

    let Entity2 = {
      'Name': this.StaffOne,
      'Email': this.AttendeesEmailID,
      'Location': this.Location1,
      'StartDate': this.MeetingDate,
      'EndDate': this.MeetingDate,
      'Subject': this.MeetingName,
      'Body': this.MeetingName
    }

    this.fmsservice.CreateOutlookMeetings(Entity2).subscribe(res => {
      debugger

    })



    // let Entity3 = {
    //   'Name': this.StaffTwo,
    //   // 'Email': this.AttendeestwoEmailID,
    //   'Email': "mamata@amazeinc.in",
    //   'Location': this.Location2,
    //   'StartDate': this.MeetingDate,
    //   'EndDate': this.MeetingDate,
    //   'Subject': this.MeetingName,
    //   'Body': this.MeetingName
    // }

    // this.fmsservice.CreateOutlookMeetings(Entity3).subscribe(res => {
    //   debugger


    // })


  }

  public Update() {

    let object = {
      'Id': this.paramID,
      'ProjectID': this.projectID,
      'MeetingDate': this.MeetingDate,
      'MeetingTime': this.MeetingTime,
      'Attendees1': this.Attendees1,
      'Attendees2': this.Attendees2,
      'MeetingName': this.MeetingName,
      'MeetingMinutes': this.MeetingMinutes,
      'Location': this.Location,
      'meetingLink': this.meetingLink,
      'Password': this.Password
    }
    this.fmsservice.Update_MeetingMinutes(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Meeting  Updated Successfully!');
      location.href = "#/MeetingMinutesdash";
    })
  }

  MeetingType
  public GetMeetingType(evn) {
    this.MeetingType = evn.target.value;
  }

}
