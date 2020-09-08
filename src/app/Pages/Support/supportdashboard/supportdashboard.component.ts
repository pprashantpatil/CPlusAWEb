import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supportdashboard',
  templateUrl: './supportdashboard.component.html',
  styleUrls: ['./supportdashboard.component.css']
})
export class SupportdashboardComponent implements OnInit {
  BuildingSearch: any;
  supportlist: any;
  constructor(public fmsService: FmsService) { }
  stafflist;
  LoginTypeID;
  Search
  WorkDate
  Comments
  pickeroptions: any
  value: any
  ngOnInit() {
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };



    this.fmsService.GetStafff().subscribe(data => {
      debugger
      this.stafflist = data;
    })
    if (this.LoginTypeID == 2) {
      this.fmsService.GetSupport().subscribe(data => {
        debugger
        let temp: any = data;
        this.supportlist11 = temp.filter(x => x.unit != 3);
      })
    }
    else {
      this.fmsService.GetSupport().subscribe(data => {
        debugger
        let temp: any = data;
        this.supportlist11 = temp.filter(x => x.unit != 3 && x.roleType == localStorage.getItem('username'));
      })
    }

  }
  public handleFileSelect1(event) {

  }
  photourl
  supportlist1
  public GetDetails(project) {
    debugger
    this.fmsService.GetSupport().subscribe(data => {
      debugger
      let temp: any = data;
      this.supportlist1 = temp.filter(x => x.id == project.id);
      this.photourl = this.supportlist1[0].photoURL;
    })

  }

  public AcceptTicket(project) {
    debugger
    this.fmsService.UpdateSupport(project.id).subscribe(data => {
      debugger
      Swal.fire("Support Ticket Accepted ");
      this.ngOnInit();
    })
  }
  public CompleteTicket() {
    debugger
    this.fmsService.CompleteSupport(this.SupportID).subscribe(data => {
      debugger
      Swal.fire("Support Ticket Completed ");
      this.ngOnInit();
    })
  }
  public CloseTicket(project) {
    debugger
    this.fmsService.CloseTicket(project.id).subscribe(data => {
      debugger
      Swal.fire("Support Ticket Closed ");
      this.ngOnInit();
    })
  }
  public ReopenTicket(project) {
    debugger
    this.fmsService.ReopenTicket(project.id).subscribe(data => {
      debugger
      Swal.fire("Support Ticket ReOpened ");
      this.ngOnInit();
    })
  }
  SupportID
  public Comleted(project) {
    this.SupportID = project.id;
  }

  public AssignSupportticket() {
    Swal.fire("Support Ticket Assigned Successfully");
  }
  datelist;
  startdate: Date;
  enddate: Date;
  supportlist11: any
  public selectedDate(value) {
    debugger
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    debugger

    //Date date= new Date('dd-MM-yyyy');
    if (this.LoginTypeID == 3) {
      this.fmsService.GetSupportByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.supportlist11 = temp.filter(x => x.unit != 3 && x.companyID == Number(localStorage.getItem('userid')));
      })
    }
    else {
      this.fmsService.GetSupportByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.supportlist11 = temp.filter(x => x.unit != 3 && x.roleType == localStorage.getItem('username'));
      })
    }
  }

}
