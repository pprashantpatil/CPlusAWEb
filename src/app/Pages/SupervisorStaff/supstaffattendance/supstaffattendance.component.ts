import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-supstaffattendance',
  templateUrl: './supstaffattendance.component.html',
  styleUrls: ['./supstaffattendance.component.css']
})
export class SupstaffattendanceComponent implements OnInit {

  options: NgDateRangePickerOptions;
  startdate:any
  enddate:any;
  abSearch:any;
  datelist:any;
  AttendanceL:any;
  value:any;
  constructor(public fmsservice: FmsService, public router: Router,public datePipe:DatePipe) { }

  ngOnInit() {

    this.startdate= this.datePipe.transform(new Date(new Date().getFullYear(), 0, 1),'yyyy/MM/dd');
    this.enddate = this.datePipe.transform(new Date(new Date().getFullYear(), 11, 31),'yyyy/MM/dd');
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
  public GetAllAttendance() {
    debugger
    this.fmsservice.GetAllAttendance(this.startdate,this.enddate).subscribe(
      
      res => {
        debugger;
        this.AttendanceL = res;
        let StaffID = localStorage.getItem("userid")
        var list=this.AttendanceL.filter(x=>x.supervisorID==StaffID)
        this.AttendanceLists=list

      }
    )
  }


  selectedDate(value){
   

    debugger
    this.datelist = value.split('-')

    this.startdate = this.datelist[0]
    this.enddate = this.datelist[1]
    debugger

    this.fmsservice.GetAllAttendance(this.startdate,this.enddate).subscribe(
      
      res => {
        debugger;
        this.AttendanceL = res;
        let StaffID = localStorage.getItem("userid")
        var list=this.AttendanceL.filter(x=>x.supervisorID==StaffID)

        this.AttendanceLists=list

      }
    )
  }
}
