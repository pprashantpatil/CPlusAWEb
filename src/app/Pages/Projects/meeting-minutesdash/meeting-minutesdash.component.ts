import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-meeting-minutesdash',
  templateUrl: './meeting-minutesdash.component.html',
  styleUrls: ['./meeting-minutesdash.component.css']
})
export class MeetingMinutesdashComponent implements OnInit {

  constructor(public fmsservice: FmsService,) { }
  projectlist1
  pickeroptions
  value;
  LoginTypeID;
  StaffID;
  ProjectID: any
  ngOnInit() {
    this.StatusID = 2;
    this.MeetingTypeID = 0;
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.StaffID = localStorage.getItem('UserID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.GetMeetingMinutes();
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist1 = data;
    })

  }
  StatusID;
  Count: any;
  public GetStsusID(event) {
    this.StatusID = event.target.value;
    if (this.StatusID == 2) {
      this.GetMeetingMinutes();
    }
    else {
      if (this.LoginTypeID == '1') {
        this.fmsservice.GetMeetingMinutes().subscribe(data => {
          debugger
          this.projectlist = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID && x.dateflag == this.StatusID);
          this.Count = this.projectlist.length;

        })
      } else if (this.LoginTypeID == '7') {
        this.fmsservice.GetMeetingMinutes().subscribe(data => {
          debugger
          this.projectlist = data.filter(x => x.dateflag == this.StatusID && x.dateflag == 1);
          this.Count = this.projectlist.length;
        })
      } else {
        this.fmsservice.GetMeetingMinutes().subscribe(data => {
          debugger
          this.projectlist = data.filter(x => x.projectID == this.ProjectID && x.dateflag == this.StatusID);
          this.Count = this.projectlist.length;
        })
      }
    }
  }
  MeetingTypeID
  public GetMeetingTypeID(event) {
    this.MeetingTypeID = event.target.value;
    if (this.MeetingTypeID == 0) {
      this.GetMeetingMinutes();
    }
    else {
      if (this.LoginTypeID == '1') {
        this.fmsservice.GetMeetingMinutes().subscribe(data => {
          debugger
          this.projectlist = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID && x.meetingType == this.MeetingTypeID && x.dateflag == 1);
          this.Count = this.projectlist.length;
        })
      } else {
        this.fmsservice.GetMeetingMinutes().subscribe(data => {
          debugger
          this.projectlist = data.filter(x => x.projectID == this.ProjectID && x.meetingType == this.MeetingTypeID && x.dateflag == 1);
          this.Count = this.projectlist.length;
        })
      }
    }
  }


  projectlist
  public GetMeetingMinutes() {


    if (this.LoginTypeID == '1') {
      this.fmsservice.GetMeetingMinutes().subscribe(data => {
        debugger
        this.projectlist = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID && x.dateflag == 1);
        this.Count = this.projectlist.length;
      })
    } else if (this.LoginTypeID == '7') {
      this.fmsservice.GetMeetingMinutes().subscribe(data => {
        debugger
        this.projectlist = data.filter(x => x.dateflag == 1);
        this.Count = this.projectlist.length;
      })
    } else {
      this.fmsservice.GetMeetingMinutes().subscribe(data => {
        debugger
        this.projectlist = data.filter(x => x.projectID == this.ProjectID && x.dateflag == 1);
        this.Count = this.projectlist.length;
      })
    }


  }

  Attachmentlist
  public Attachment(evn) {
    let id = evn.id;
    this.fmsservice.GetMeetingMinutes().subscribe(data => {
      debugger
      let temp: any = data;
      this.Attachmentlist = temp.filter(x => x.id == id);

    })
  }

  GetProjectID(event) {
    let projectID = event.target.value;
    if (event.target.value == 0) {
      this.GetMeetingMinutes();
    }
    else {
      this.fmsservice.GetMeetingMinutes().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == projectID);
        this.Count = this.projectlist.length;
      })
    }
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
    if (this.LoginTypeID == 1) {
      this.fmsservice.GetMeetingMinutesByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp = data;
        this.projectlist = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID && x.dateflag == 1);
        this.Count = this.projectlist.length;
      })
    }
    else {
      this.fmsservice.GetMeetingMinutesByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp = data;
        this.projectlist = data.filter(x => x.projectID == this.ProjectID && x.dateflag == 1);
        this.Count = this.projectlist.length;
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
        this.fmsservice.DeleteMeetingMinutes(id).subscribe(res => {
          let test = res;
          this.GetMeetingMinutes();
        })
        Swal.fire(
          'Deleted!',
          'Meeting Minutes has been deleted.',
          'success'
        )
      }
      else {
        this.GetMeetingMinutes();
      }
    })
  }
  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Doc'));
    this.exportAsExcelFile(hhh, "Meeting Minutes");
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



}
