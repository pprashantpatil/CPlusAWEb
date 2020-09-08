import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-staff-workdash',
  templateUrl: './staff-workdash.component.html',
  styleUrls: ['./staff-workdash.component.css']
})
export class StaffWorkdashComponent implements OnInit {

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public detailslist: any;
  public schedulename: any;

  public term: any;
  public searchdate: any;
  //callender variables;
  public callenderyear;
  public callenderMonth;
  public callenderstartday;
  public callenderendday;
  public callenderdaysdount = [];
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');
  public videos: any;
  public stafflist: any;
  public photos: any;
  public photo: any;
  LoginTypeID: any;
  StaffID: any;
  BuildingList: any
  ProjectID: any
  FloorList: any
  pickeroptions: any
  ngOnInit() {
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.buildingid = 0;
    this.FloorID = 0;
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.StaffID = localStorage.getItem('UserID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.fmsservice.GetFloorTypebyBID(this.ProjectID).subscribe(
      res => {
        this.FloorList = res;
      }
    )
    this.getdetails()
    this.fmsservice.GetStafff().subscribe(data => {
      debugger
      let temp: any = data;
      this.stafflist = temp.filter(x => x.companyID == localStorage.getItem('userid') && x.building == localStorage.getItem('ProjectID'));
    })
    this.fmsservice.GetBuildinglist(1).subscribe(
      res => {
        debugger;
        this.BuildingList = res;
      }
    )
  }
  public DeleteSchdule(id) {
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
        this.fmsservice.DeleteStaffWorkSchedule(id).subscribe(res => {
          let test = res;
          this.getdetails()
        })
        Swal.fire(
          'Deleted!',
          'Schedule been deleted.',
          'success'
        )
      }
      else {
        this.getdetails()

      }
    })
  }

  public getdetails() {

    if (this.LoginTypeID == '1') {

      this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
        debugger
        this.detailslist = data.filter(x => x.staffID == this.StaffID && x.buildingID == this.ProjectID);
        this.buildcallender(this.detailslist);
      })
    } else {

      this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
        debugger
        this.detailslist = data.filter(x => x.buildingID == this.ProjectID);
        this.buildcallender(this.detailslist);
      })
    }


  }
  public GetScheduleNameID(even) {
    this.schedulename = even.target.value;
  }
  value:any

  showorhidecontent;
  changeStatus(evn) {

    if (evn.currentTarget.checked) {
      this.showorhidecontent = false;
    }
    else {
      this.showorhidecontent = true;
    }

  }



  public previousmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.detailslist);
  }
  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.detailslist);
  }

  public buildcallender(detailslist) {
    this.callenderdaysdount.length = 0;
    this.callenderyear = this.callenderBindData.getFullYear();
    this.callenderMonth = this.datePipe.transform(this.callenderBindData, 'MMMM');
    this.callenderstartday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth(), 1);
    this.callenderendday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth() + 1, 0);
    this.callenderdaysdount.length = this.callenderendday.getDate();
    let o = 0;
    for (let i = 0; i < this.callenderdaysdount.length; i++) {
      let sdate = this.callenderstartday;
      let _date;
      if (sdate.getDate() == 1 && o == 0) {
        _date = sdate.setDate(sdate.getDate() + 0);
        o++
      }
      else {
        _date = sdate.setDate(sdate.getDate() + 1);
      }
      _date = this.datePipe.transform(sdate, 'dd');
      let _day = this.datePipe.transform(sdate, 'EEE');
      let dateformat = this.datePipe.transform(sdate, 'yyyy-MM-ddTHH:mm:ss');

      this.callenderdaysdount[i] = { date: _date, day: _day, dateformat: dateformat };
    }

    //Events Binding

    for (let j = 0; j < detailslist.length; j++) {
      debugger;
      let currenteventlist = this.callenderdaysdount.filter(x => this.datePipe.transform(x.dateformat, 'yyyy-MM-dd') == this.datePipe.transform(detailslist[j].searchdate, 'yyyy-MM-dd'));
      if (currenteventlist.length > 0) {

        this.callenderdaysdount[currenteventlist[0].date - 1]['StaffName'] = detailslist[j].name;
        this.callenderdaysdount[currenteventlist[0].date - 1]['StaffType'] = detailslist[j].short;
        // this.callenderdaysdount[currenteventlist[0].date - 1]['Floor'] = detailslist[j].floor;
        // this.callenderdaysdount[currenteventlist[0].date - 1]['Status'] = detailslist[j].status;
        // this.callenderdaysdount[currenteventlist[0].date - 1]['vendorName'] = detailslist[j].vendorName;
        // this.callenderdaysdount[currenteventlist[0].date - 1]['Phone'] = detailslist[j].vendorphone;

        if (this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] == undefined) {
          this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] = "";
        }
        if (detailslist[j].short == 'Engineer') {
          this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] = this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] + "<span class='DemoStaffWorkScheduleCalendar_2' id='" + detailslist[j].id + "'> Staff : " + detailslist[j].name + "</span>";
        }
        else if (detailslist[j].short == 'Project Reviewer') {
          this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] = this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] + "<span class='DemoStaffWorkScheduleCalendar_1' id='" + detailslist[j].id + "'> Staff : " + detailslist[j].name + "</span>";
        }
        else if (detailslist[j].short == 'Architect') {
          this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] = this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] + "<span class='DemoStaffWorkScheduleCalendar_3' id='" + detailslist[j].id + "'> Staff : " + detailslist[j].name + "</span>";
        }
        else if (detailslist[j].short == 'Gardener') {
          this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] = this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] + "<span class='DemoStaffWorkScheduleCalendar_4' id='" + detailslist[j].id + "'> Staff : " + detailslist[j].name + "</span>";
        }
      }

    }
  }
  public ShowStaffDetails(evn) {
    debugger;
    var html = evn.srcElement.innerText.split(' :');

    if (html.length <= 2) {
      let StaffDetails = this.detailslist.filter(x => x.name == html[1].trim());
      debugger;
      Swal.fire(({
        title: '<strong>Staff <u>Details</u></strong>',
        type: 'info',
        html:
          '<p style="font-size: 14px;text-align: start;margin-left: 32px;">Staff Name: ' + html[1] +
          '       <br>' +
          'Staff Type: ' + StaffDetails[0].short +
          '       <br>' +
          'Date: ' + StaffDetails[0].date +
          '       <br>' +
          'Work Description: ' + StaffDetails[0].workDescription +
          '</p>'
        ,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,

      }));

    }
    else {

    }
  }

  public getVideo(id) {
    debugger
    this.fmsservice.GetStaffUploadedVideos(id).subscribe(data => {
      debugger
      this.videos = data;
    })
  }

  public getphpto(id) {
    debugger
    this.fmsservice.GetStaffUploadedPhotos(id).subscribe(data => {
      debugger
      this.photos = data;
    })
  }
  buildingid
  public fliterbuilding(event) {
    debugger
    this.buildingid = event.target.value;
    if (this.buildingid == 0) {
      if (this.LoginTypeID == 1) {
        this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
          debugger
          this.detailslist = data.filter(x => x.staffID == this.StaffID);
        })
      }
      else {
        this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
          debugger
          this.detailslist = data;
        })
      }

    }
    else {

      if (this.LoginTypeID == 1) {
        this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
          debugger
          this.detailslist = data.filter(x => x.staffID == this.StaffID && x.buildingID == this.buildingid);
        })
      }
      else {
        this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
          debugger
          this.detailslist = data.filter(x => x.buildingID == this.buildingid);
        })
      }
    }
  }
  FloorID
  UserRoleList
  public GetFloorID(evn) {
    this.FloorID = evn.target.value;
    this.GetUnit_MasterbyfloorID(evn.target.value);
    if (this.FloorID == 0) {
      this.getdetails();
    }
    else {
      if (this.LoginTypeID == '1') {

        this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
          debugger
          this.detailslist = data.filter(x => x.staffID == this.StaffID && x.buildingID == this.ProjectID && x.floorID == this.FloorID);
          this.buildcallender(this.detailslist);
        })
      } else {

        this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
          debugger
          this.detailslist = data.filter(x => x.buildingID == this.ProjectID && x.floorID == this.FloorID);
          this.buildcallender(this.detailslist);
        })
      }
    }

  }
  UnitID
  public GetUnitID(evn) {
    this.UnitID = evn.target.value;
    if (this.FloorID == 0) {
      Swal.fire('Select Floor First');
    }
    else {
      if (this.UnitID == 0) {
        if (this.LoginTypeID == '1') {

          this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
            debugger
            this.detailslist = data.filter(x => x.staffID == this.StaffID && x.buildingID == this.ProjectID && x.floorID == this.FloorID);
            this.buildcallender(this.detailslist);
          })
        } else {

          this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
            debugger
            this.detailslist = data.filter(x => x.buildingID == this.ProjectID && x.floorID == this.FloorID);
            this.buildcallender(this.detailslist);
          })
        }
      }
      else {
        if (this.LoginTypeID == '1') {

          this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
            debugger
            this.detailslist = data.filter(x => x.staffID == this.StaffID && x.buildingID == this.ProjectID && x.floorID == this.FloorID && x.unitID == this.UnitID);
            this.buildcallender(this.detailslist);
          })
        } else {

          this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
            debugger
            this.detailslist = data.filter(x => x.buildingID == this.ProjectID && x.floorID == this.FloorID && x.unitID == this.UnitID);
            this.buildcallender(this.detailslist);
          })
        }
      }
    }


  }

  public GetUnit_MasterbyfloorID(FloorID) {
    this.fmsservice.GetUnit_MasterbyfloorID(FloorID).subscribe(
      res => {
        this.UserRoleList = res;
      }
    )
  }
  datelist;
  startdate: Date;
  enddate: Date;
  public selectedDate(value) {
    debugger
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    debugger
    //Date date= new Date('dd-MM-yyyy');
    if (this.LoginTypeID == '1') {

      this.fmsservice.GetStaffWorkScheduleByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.detailslist = data.filter(x => x.staffID == this.StaffID && x.buildingID == this.ProjectID);
        this.buildcallender(this.detailslist);
      })
    } else {

      this.fmsservice.GetStaffWorkScheduleByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.detailslist = data.filter(x => x.buildingID == this.ProjectID);
        this.buildcallender(this.detailslist);
      })
    }

  }

}
