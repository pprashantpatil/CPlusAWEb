import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ThemeService } from 'ng2-charts';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Router } from '../../../../../node_modules/@angular/router';


@Component({
  selector: 'app-applystaffleaves',
  templateUrl: './applystaffleaves.component.html',
  styleUrls: ['./applystaffleaves.component.css']
})
export class ApplystaffleavesComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe, public router: Router) {
    this.minDate = new Date();
    this.minDate1 = new Date();

    this.minDate.setDate(this.minDate.getDate() - 0);
    this.minDate1.setDate(this.minDate1.getDate() - 0);

  }
  public pageMenuTitle;
  public applyStaffLeaves_PageTitle;
  public applyStaffLeaves_BreadChrumb;
  public applyStaffLeaves_AddNewButton;
  public applyStaffLeaves_Building;
  public applyStaffLeaves_StaffName;
  public applyStaffLeaves_LeaveType;
  public applyStaffLeaves_StartDate;
  public applyStaffLeaves_EndDate;
  public applyStaffLeaves_Reason;
  public applyStaffLeaves_Save;

  selectedlanguage: any;
  Buildinglist: any;
  BuildingID: any;
  Stafflist: any;
  staffID: any;
  leavelist: any;
  leaveID: any;
  coveringstaff: any;
  reason: any;
  BuildingName: any;
  Staffname: any;
  diffDays: any;
  halfday: any;
  Isempty: any;

  Date1: any;
  DateChanged1: boolean = false;
  ////====Date Formate====////
  Date: any;
  DateChanged: boolean = false;

  minDate: Date;
  minDate1: Date;
  maxDate: Date;
  UserID: any;
  ProjectID: any;
  LoginTypeID: any;
  ngOnInit() {
    this.UserID = localStorage.getItem('UserID');
    this.LoginTypeID = localStorage.getItem('LoginTypeID');

    this.BuildingID = localStorage.getItem('ProjectID');
    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      this.Stafflist = data.filter(x => x.projectID == this.BuildingID);
      this.Staffname = this.Stafflist[0].name
    })
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this
    this.GetApplystaffleavesLanguage(this.selectedlanguage);

    this.fmsservice.GetBuildinglist1(this.selectedlanguage).subscribe(data => {
      debugger
      let temp: any = data;
      this.Buildinglist = temp.filter(x => x.companyID == this.UserID);

    })

    this.fmsservice.GetLeaveType(this.selectedlanguage).subscribe(data => {
      debugger
      this.leavelist = data;
    })
  }

  DateChange() {
    debugger
    this.DateChanged = true;
    this.minDate1 = this.Date
    this.Date.toLocaleDateString();
    var date = this.Date.getFullYear() + '-' + (this.Date.getMonth() + 1) + '-' + this.Date.getDate();
    this.Date = date;
    debugger
    console.log(this.Date)

  }

  DateChange1() {
    debugger
    this.DateChanged1 = true;
    this.maxDate = this.Date1;
    this.Date1.toLocaleDateString();
    var date1 = this.Date1.getFullYear() + '-' + (this.Date1.getMonth() + 1) + '-' + this.Date1.getDate();
    this.Date1 = date1;
    debugger
    console.log(this.Date1)
    this.getdate(this.Date, this.Date1);
  }


  getdate(startDate, endDate) {
    debugger
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(startDate);
    var secondDate = new Date(endDate);
    debugger
    this.halfday = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    debugger
  }

  getbuildingID(Building) {
    debugger
    this.BuildingID = Building.target.value
    debugger
    var build = this.Buildinglist.filter(X => X.id == this.BuildingID)

    this.BuildingName = build[0].name

    this.fmsservice.GetStaffByBuildID(this.BuildingID).subscribe(data => {
      debugger
      this.Stafflist = data;

      this.Staffname = this.Stafflist[0].name
    })
  }

  getleaveID(leaveID) {
    debugger
    this.leaveID = leaveID.target.value;
  }

  getstaffID(staffID) {
    debugger
    this.staffID = staffID.target.value;
    this.getcoveringstaff();
  }

  CoveringStaff;
  filteredStafflist;
  CoveringStafflist;
  public getcoveringstaff() {
    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data;
      this.CoveringStafflist = temp.filter(x => x.staffID != this.staffID && x.projectID == this.BuildingID);
      //   this.filteredStafflist = this.CoveringStafflist.filter(x =>x. buildingid==this.BuildingID);
      //   this.CoveringStaff = this.filteredStafflist[0].name;

    })
  }


  public GetApplystaffleavesLanguage(languageid) {
    this.fmsservice.GetApplystaffleavesLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.applyStaffLeaves_PageTitle = res[0].applyStaffLeaves_PageTitle;
        this.applyStaffLeaves_BreadChrumb = res[0].applyStaffLeaves_BreadChrumb;
        this.applyStaffLeaves_AddNewButton = res[0].applyStaffLeaves_AddNewButton;
        this.applyStaffLeaves_Building = res[0].applyStaffLeaves_Building;
        this.applyStaffLeaves_StaffName = res[0].applyStaffLeaves_StaffName;
        this.applyStaffLeaves_LeaveType = res[0].applyStaffLeaves_LeaveType;
        this.applyStaffLeaves_StartDate = res[0].applyStaffLeaves_StartDate;
        this.applyStaffLeaves_EndDate = res[0].applyStaffLeaves_EndDate;
        this.applyStaffLeaves_Reason = res[0].applyStaffLeaves_Reason;
        this.applyStaffLeaves_Save = res[0].applyStaffLeaves_Save;
      }
    )
  }



  InsertStaffLeaves() {
    debugger

    var mand = {
      'Building': this.BuildingID,
      'StaffName': this.staffID,
      'LeaveType': this.leaveID
    }


    let validate = this.fmsservice.isEmpty(mand);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;


      debugger
    }

    else {

      var Filter = {
        'Building': this.BuildingID,
        'StaffName': this.staffID,
        'SDateOfLeave': this.Date,
        'EDateOfLeave': this.Date1,
        'NoOfDays': this.diffDays != undefined ? 'Half Day' : this.halfday + 1,
        'LeaveReason': this.reason,
        'LanguageID': this.selectedlanguage,
        'LeaveType': this.leaveID,
        'Coveringstaff': this.coveringstaff
      }
      debugger
      this.fmsservice.InsertStaffLeaves(Filter).subscribe(data => {
        debugger

        if (data != undefined) {
          this.InsertLoginDetails();
          this.InsertNotification();
          // location.href = "#/staffleaves";

          this.router.navigate(['/staffleaves']);
        }
      });
    }

  }

  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Staff Leaves for ' + this.Staffname + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Staff Leaves",
      "Action": 'Add New Staff Leaves',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        this.clear();
      }
    })

  }



  InsertNotification() {
    debugger

    var Filter = {
      'Date': new Date(),
      'Event': 'Leave',
      'FromUser': 'Admin',
      'ToUser': this.Staffname,
      'Message': this.reason,
      'Photo': 'photo',
      'Building': this.BuildingName,
    }


    this.fmsservice.InsertNotification(Filter).subscribe(data => {
      debugger
      if (data != undefined) {
        Swal.fire("Staff leave Applied  Successfully")
        // location.href = "/#staffleaves";

        this.router.navigate(['/staffleaves']);

      }
    })

  }


  clear() {
    this.BuildingID = '',
      this.staffID = '',
      this.Date = '',
      this.Date1 = '',
      this.diffDays = '',
      this.reason = ''

  }

}
