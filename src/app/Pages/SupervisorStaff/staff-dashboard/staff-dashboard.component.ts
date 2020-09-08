import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.GetTodaysLeavesCount();
    this.GetTodaysAttendanceCount();
    this.PendingPOCount();
    this.GetLeavesCount();
  }


  TotalLeavesCount
  public GetTodaysLeavesCount() {
    debugger;
    this.fmsservice.GetTodaysLeavesCount().subscribe(
      res => {
        debugger;
        this.TotalLeavesCount = res[0].total;
      }
    )
  }

  AttendanceCount
  public GetTodaysAttendanceCount() {
    debugger;
    this.fmsservice.GetTodaysAttendanceCount().subscribe(
      res => {
        debugger;
        this.AttendanceCount = res[0].total;
      }
    )
  }

  PendingPO
  public PendingPOCount() {
    debugger;
    this.fmsservice.PendingPOCount().subscribe(
      res => {
        debugger;
        this.PendingPO = res[0].total;
      }
    )
  }

  Leaves
  public GetLeavesCount() {
    debugger;
    this.fmsservice.GetLeavesCount(225).subscribe(
      res => {
        debugger;
        this.Leaves = res;


      }
    )
  }


}
