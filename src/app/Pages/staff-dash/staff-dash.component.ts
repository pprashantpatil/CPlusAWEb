import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../services/fms.service';
import { DatePipe } from '../../../../node_modules/@angular/common';
@Component({
  selector: 'app-staff-dash',
  templateUrl: './staff-dash.component.html',
  styleUrls: ['./staff-dash.component.css']
})
export class StaffDashComponent implements OnInit {

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  StaffLeaves: any;
  NoOfStaffLeavesCount: any;
  StaffLeaves2: any;
  ApprovedCount: any;
  StaffLeaves3: any;
  RejectedCount: any;
  detailslist: any;
  AssignedProjectsCounts: any;
  AnnouncementList: any;
  AnnouncemetsCount: any;
  ActionItemsLists: any;
  StaffID: any;
  ProjectID: any;
  ActionItemsListsToDO: any;
  ActionItemsListsDoing: any;
  ActionItemsListsDone: any;
  LoginTypeID: any;
  pickeroptions: any
  innerWidth: any;
  projectlist: any;
  WorkAssignCount: any;
  MobUI: any;
  workcomplete: any
  workoverduecount: any
  ngOnInit() {
    debugger;

    // this.innerWidth = window.innerWidth;
    // if (this.innerWidth == 360) {
    //   this.MobUI = 1;
    //   localStorage.setItem('MobUI', this.MobUI)
    // } else {
    //   this.MobUI = 1;
    //   localStorage.setItem('MobUI', this.MobUI)

    // }

    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.StaffID = localStorage.getItem('UserID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.MonthID = 0;
    this.fmsservice.GetStaffLeaves(1).subscribe(
      res => {
        let temp: any = res
        this.StaffLeaves = temp.filter(x => x.staffID == localStorage.getItem('userid') && x.buildingid == this.ProjectID);
        this.NoOfStaffLeavesCount = this.StaffLeaves.length;

      }
    )
    this.fmsservice.GetProjectWorkAssign('2020/01/01', '2022/01/01').subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.projectID == this.ProjectID && x.staffID == localStorage.getItem('UserID'));
      this.WorkAssignCount = this.projectlist.length;
    })

    this.fmsservice.GetProjectWorkAssign('2020/01/01', '2022/01/01').subscribe(data => {
      debugger
      let temp: any = data;
      let temp1 = temp.filter(x => x.projectID == this.ProjectID && x.staffID == localStorage.getItem('UserID') && x.text == 1);
      this.workoverduecount = temp1.length;
    })
    this.fmsservice.GetProjectWorkAssign('2020/01/01', '2022/01/01').subscribe(data => {
      debugger
      let temp: any = data;
      let temp2 = temp.filter(x => x.projectID == this.ProjectID && x.staffID == localStorage.getItem('UserID') && x.text == 2);
      this.workcomplete = temp2.length;
    })

    this.fmsservice.GetStaffLeaves(1).subscribe(
      res => {
        let temp: any = res
        this.StaffLeaves2 = temp.filter(x => x.staffID == localStorage.getItem('userid') && x.status == "Approved");
        this.ApprovedCount = this.StaffLeaves2.length;

      }
    )


    this.fmsservice.GetStaffLeaves(1).subscribe(
      res => {
        let temp: any = res
        this.StaffLeaves3 = temp.filter(x => x.staffID == localStorage.getItem('userid') && x.status == "Rejected");
        this.RejectedCount = this.StaffLeaves3.length;

      }
    )


    this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
      debugger
      this.detailslist = data.filter(x => x.staffID == localStorage.getItem('userid'));
      this.AssignedProjectsCounts = this.detailslist.length;

    })


    this.fmsservice.GetAnnouncementList("2019-01-01", "2022-12-31", 1).subscribe(
      res => {
        debugger;
        let temp: any = res;
        let temp1: any = temp.filter(x => x.buildingID == this.ProjectID);
        this.AnnouncementList = temp1.filter(x => x.announcementForID == 1 || x.announcementForID == 3);
        this.AnnouncemetsCount = this.AnnouncementList.length;
      }
    )

    this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
      debugger
      this.ActionItemsLists = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID);
      for (let i = 0; i < this.ActionItemsLists.length; i++) {
        if (this.ActionItemsLists[i].ageing < 0) {
          this.ActionItemsLists[i].ageing = 0
        }
      }

    })


    this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
      debugger
      this.ActionItemsListsToDO = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'To Do');
      for (let i = 0; i < this.ActionItemsListsToDO.length; i++) {
        if (this.ActionItemsListsToDO[i].ageing < 0) {
          this.ActionItemsListsToDO[i].ageing = 0
        }
      }
    })


    this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
      debugger
      this.ActionItemsListsDoing = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'Doing');
      for (let i = 0; i < this.ActionItemsListsDoing.length; i++) {
        if (this.ActionItemsListsDoing[i].ageing < 0) {
          this.ActionItemsListsDoing[i].ageing = 0
        }
      }
    })

    this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
      debugger
      this.ActionItemsListsDone = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'Done');
      for (let i = 0; i < this.ActionItemsListsDone.length; i++) {
        if (this.ActionItemsListsDone[i].ageing < 0) {
          this.ActionItemsListsDone[i].ageing = 0
        }
      }
    })
  }





  MonthID: any;
  public GetMonthID(evn) {
    debugger;
    this.MonthID = evn.target.value;

    if (this.MonthID == 0) {
      this.fmsservice.GetStaffLeaves(1).subscribe(
        res => {
          let temp: any = res
          this.StaffLeaves = temp.filter(x => x.staffID == localStorage.getItem('userid'));
          this.NoOfStaffLeavesCount = this.StaffLeaves.length;

        }
      )

      this.fmsservice.GetStaffLeaves(1).subscribe(
        res => {
          let temp: any = res
          this.StaffLeaves2 = temp.filter(x => x.staffID == localStorage.getItem('userid') && x.status == "Approved");
          this.ApprovedCount = this.StaffLeaves2.length;

        }
      )


      this.fmsservice.GetStaffLeaves(1).subscribe(
        res => {
          let temp: any = res
          this.StaffLeaves3 = temp.filter(x => x.staffID == localStorage.getItem('userid') && x.status == "Rejected");
          this.RejectedCount = this.StaffLeaves3.length;

        }
      )

    }
    else {
      this.fmsservice.GetStaffLeaves(1).subscribe(
        res => {
          let temp: any = res
          this.StaffLeaves = temp.filter(x => x.staffID == localStorage.getItem('userid') && x.monthID == this.MonthID);
          this.NoOfStaffLeavesCount = this.StaffLeaves.length;

        }
      )

      this.fmsservice.GetStaffLeaves(1).subscribe(
        res => {
          let temp: any = res
          this.StaffLeaves2 = temp.filter(x => x.staffID == localStorage.getItem('userid') && x.status == "Approved" && x.monthID == this.MonthID);
          this.ApprovedCount = this.StaffLeaves2.length;

        }
      )


      this.fmsservice.GetStaffLeaves(1).subscribe(
        res => {
          let temp: any = res
          this.StaffLeaves3 = temp.filter(x => x.staffID == localStorage.getItem('userid') && x.status == "Rejected" && x.monthID == this.MonthID);
          this.RejectedCount = this.StaffLeaves3.length;

        }
      )

    }
  }


  datelist;
  startdate;
  enddate;
  value: any;
  public selectedDate(value) {
    debugger;
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];

    this.fmsservice.GetStaffWorkScheduleByDate(this.startdate, this.enddate).subscribe(data => {
      debugger
      this.detailslist = data.filter(x => x.staffID == this.StaffID && x.buildingID == this.ProjectID);
      this.AssignedProjectsCounts = this.detailslist.length;
    })

  }
}
