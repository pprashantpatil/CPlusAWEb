import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-closedsupport-dash',
  templateUrl: './closedsupport-dash.component.html',
  styleUrls: ['./closedsupport-dash.component.css']
})
export class ClosedsupportDashComponent implements OnInit {

  constructor(public fmsService: FmsService) { }
  LoginTypeID
  supportlist: any
  Search
  pickeroptions
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
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    if (this.LoginTypeID == 2) {
      this.fmsService.GetSupport().subscribe(data => {
        debugger
        let temp: any = data;
        this.supportlist = temp.filter(x => x.unit == 3);
      })
    }
    else {
      this.fmsService.GetSupport().subscribe(data => {
        debugger
        let temp: any = data;
        this.supportlist = temp.filter(x => x.unit == 3 && x.roleType == localStorage.getItem('username'));
      })
    }
  }
  datelist;
  startdate: Date;
  enddate: Date;
  value: any
  public selectedDate(value) {
    debugger
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    debugger
    //Date date= new Date('dd-MM-yyyy');
    if (this.LoginTypeID == 2) {
      this.fmsService.GetSupportByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.supportlist = temp.filter(x => x.unit == 3);
      })
    }
    else {
      this.fmsService.GetSupportByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.supportlist = temp.filter(x => x.unit == 3 && x.roleType == localStorage.getItem('username'));
      })
    }
  }

}
