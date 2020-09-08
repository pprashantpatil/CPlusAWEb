import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-daily-reports-dashboard',
  templateUrl: './daily-reports-dashboard.component.html',
  styleUrls: ['./daily-reports-dashboard.component.css']
})
export class DailyReportsDashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }
  projectlist1;
  value: any;
  pickeroptions: any;
  LoginTypeID: any
  UserID: any
  ProjectID: any
  ngOnInit() {
    this.projectID = 0;
    this.StaffID = 0;
    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data
      this.memberlist = temp.filter(x => x.projectID == localStorage.getItem('ProjectID'));
    })
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.UserID = localStorage.getItem('UserID');
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.Get_DailyReport();
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist1 = data;
    })
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
    if (this.LoginTypeID == 3) {
      this.fmsservice.Get_DailyReportByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.DailyReports = temp.filter(x => x.projectID == this.ProjectID);
      })
    }
    else if (this.LoginTypeID == 1) {
      this.fmsservice.Get_DailyReportByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.DailyReports = temp.filter(x => x.createdBy == this.UserID && x.projectID == this.ProjectID);
      })
    }
    else if (this.LoginTypeID == 8) {
      this.fmsservice.Get_DailyReportByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.DailyReports = temp.filter(x => x.projectID == this.ProjectID);
      })
    }
  }
  DailyReports

  public Get_DailyReport() {
    debugger;
    if (this.LoginTypeID == 3) {
      this.fmsservice.Get_DailyReport().subscribe(data => {
        debugger
        let temp: any = data;
        this.DailyReports = temp.filter(x => x.projectID == this.ProjectID);
      })
    }
    else if (this.LoginTypeID == 1) {
      this.fmsservice.Get_DailyReport().subscribe(data => {
        debugger
        let temp: any = data;
        this.DailyReports = temp.filter(x => x.createdBy == this.UserID && x.projectID == this.ProjectID);
      })
    }
    else if (this.LoginTypeID == 8) {
      this.fmsservice.Get_DailyReportByDate('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        let temp: any = data;
        this.DailyReports = temp.filter(x => x.projectID == this.ProjectID);
      })
    }

  }
  memberlist
  projectID
  GetProjectID(event) {
    this.projectID = event.target.value;
    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data
      this.memberlist = temp.filter(x => x.projectID == this.projectID);
    })
    if (event.target.value == 0) {
      this.Get_DailyReport();
    }
    else {
      this.fmsservice.Get_DailyReport().subscribe(data => {
        debugger
        let temp: any = data;
        this.DailyReports = temp.filter(x => x.projectID == this.projectID);
      })
    }
  }
  StaffID
  public GetStaffID(event) {
    this.StaffID = event.target.value;
    if (this.StaffID == 0) {
      this.Get_DailyReport();
    }
    else {
      this.fmsservice.Get_DailyReport().subscribe(data => {
        debugger
        let temp: any = data;
        this.DailyReports = temp.filter(x => x.projectID == this.ProjectID && x.createdBy == this.StaffID);
      })
    }
  }
  public DeleteProject(id) {
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
        this.fmsservice.Delete_DailyReport(id).subscribe(res => {
          let test = res;
          this.Get_DailyReport();
        })
        Swal.fire(
          'Deleted!',
          'Daily Report has been deleted.',
          'success'
        )
      }
      else {
        this.Get_DailyReport();
      }
    })
  }

  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Doc'));
    this.exportAsExcelFile(hhh, "Daily Report");
  }

  public tableToJson(table) {
    debugger
    var data = []; // first row needs to be headers
    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi, '');
    }
    // go through cells 
    for (var i = 1; i < table.rows.length; i++) {
      var tableRow = table.rows[i];
      var rowData = {};
      for (var j = 0; j < tableRow.cells.length - 1; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerHTML;
      } data.push(rowData);
    }
    return data;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    debugger;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  NewList: any
  photo: any
  supportlist1 = []
  photo1: any;
  ImagesOne: any;
  public GetPhotos(evn) {
    debugger
    let id = evn.id;
    this.fmsservice.GetDailyReportPhotos().subscribe(data => {
      debugger
      let temp: any = data;
      this.supportlist1 = temp.filter(x => x.dailyReportID == id);
      this.ImagesOne = this.supportlist1[0].photos;
    })
  }
}
