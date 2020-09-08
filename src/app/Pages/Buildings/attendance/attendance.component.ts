import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  options: NgDateRangePickerOptions;
  startdate: any
  enddate: any;
  abSearch: any;
  datelist: any;
  constructor(public fmsservice: FmsService, public router: Router, public datePipe: DatePipe) { }

  ngOnInit() {

    this.startdate = this.datePipe.transform(new Date(new Date().getFullYear(), 0, 1), 'yyyy/MM/dd');
    this.enddate = this.datePipe.transform(new Date(new Date().getFullYear(), 11, 31), 'yyyy/MM/dd');
    debugger
    this.GetAllAttendance();

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };


  }


  AttendanceLists;
  Count: any;
  public GetAllAttendance() {
    debugger
    this.fmsservice.GetAllAttendance(this.startdate, this.enddate).subscribe(

      res => {
        debugger;
        this.AttendanceLists = res;
        this.Count = this.AttendanceLists.length;

      }
    )
  }


  selectedDate(value) {


    debugger
    this.datelist = value.split('-')

    this.startdate = this.datelist[0]
    this.enddate = this.datelist[1]
    debugger

    this.fmsservice.GetAllAttendance(this.startdate, this.enddate).subscribe(
      res => {
        debugger;
        this.AttendanceLists = res;
        this.Count = this.AttendanceLists.length;

      }
    )

  }

}
