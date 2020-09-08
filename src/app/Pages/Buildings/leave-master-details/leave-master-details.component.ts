import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { formatDate } from "@angular/common";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-leave-master-details',
  templateUrl: './leave-master-details.component.html',
  styleUrls: ['./leave-master-details.component.css']
})
export class LeaveMasterDetailsComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  public leavelist: any;
  public leavetypeid: any;
  public typeofleave: any;
  public leavename: any;
  public leavedescription: any;
  public dayearned: any;
  public maxdays: any;
  public Date: any;
  public starofleave: any;
  public todaydate: any;
  public CurrentTime: any;
  public id: any;
  public details: any;
  public leavetype: any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      debugger;
      this.id = params['id'];
    }
    )

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    debugger
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();


    this.GetDetails();
  }
  // public GetLeavetype() {
  //   debugger
  //   this.fmsservice.GetLeaveType(1).subscribe(data => {
  //     debugger
  //     this.leavelist = data;
  //   })
  // }
  // public GetLeaveTypeID(even)
  // {
  //   this.leavetypeid=even.target.value;
  // }
  public GetTypeofLeave(even) {
    debugger
    this.typeofleave = even.target.value;
  }

  public insertdetails() {
    debugger
    var entity = {
      'LeaveType': this.leavetype,
      'LeaveDescription': this.leavedescription,
      'TypeOfLeave': this.typeofleave,
      'DayEarned': this.dayearned,
      'Maxdays': this.maxdays,
      'StartOfLeave': this.starofleave,
      'LeaveName': this.leavename,
      'CompanyID': localStorage.getItem('userid')
    }
    this.fmsservice.InsertLeaves(entity).subscribe(data => {
      debugger
      if (data != undefined) {
        Swal.fire("Saved Successfully");

        location.href = '#LeaveMaster'
        this.InsertLoginDetails();

      }
    })
  }

  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Leave Master ' + this.leavename + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Leave Master",
      "Action": 'Add Leave Master',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  public GetDetails() {
    debugger
    this.fmsservice.GetLeavesByID(this.id).subscribe(data => {
      debugger
      this.details = data[0];
      this.leavetype = this.details.leaveType,
        this.leavename = this.details.leaveName,
        this.leavedescription = this.details.leaveDescription,
        this.typeofleave = this.details.typeOfLeave,
        this.dayearned = this.details.dayEarned,
        this.maxdays = this.details.maxdays,
        this.starofleave = this.datepipe.transform(this.details.startOfLeave, 'yyyy-MM-dd')

    })
  }
  public Updatedetails() {
    debugger
    var entity = {
      'ID': this.id,
      'LeaveType': this.leavetype,
      'LeaveDescription': this.leavedescription,
      'TypeOfLeave': this.typeofleave,
      'DayEarned': this.dayearned,
      'Maxdays': this.maxdays,
      'StartOfLeave': this.starofleave,
      'LeaveName': this.leavename
    }
    this.fmsservice.UpdateLeaves(entity).subscribe(data => {
      debugger
      if (data != undefined) {
        Swal.fire("Updated Successfully");
        location.href = '#LeaveMaster'
        this.InsertLoginDetails1();

      }
    })
  }

  InsertLoginDetails1() {
    debugger
    var obj = {
      "ApplicationName": 'Leave Master ' + this.leavename + ' Updated',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Leave Master Details",
      "Action": 'Update Leave Master',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }
}
