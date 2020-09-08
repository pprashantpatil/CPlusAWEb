import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
import { Router } from '../../../../../node_modules/@angular/router';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-transmittals-dashboard',
  templateUrl: './transmittals-dashboard.component.html',
  styleUrls: ['./transmittals-dashboard.component.css']
})
export class TransmittalsDashboardComponent implements OnInit {

  value: any;
  pickeroptions
  constructor(public fmsservice: FmsService, public router: Router) { }
  projectlist1: any;
  ProjectID: any
  LoginTypeID:any
  ngOnInit() {
    this.ProjectID = localStorage.getItem('ProjectID');
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
    this.Get_Transmittals();
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist1 = data;
    })
  }


  TransmittalsLit
  public Get_Transmittals() {
    this.fmsservice.Get_Transmittals().subscribe(data => {
      debugger
      let temp: any = data;
      this.TransmittalsLit = temp.filter(x => x.projectID == this.ProjectID);
    })
  }

  GetProjectID(event) {
    let projectID = event.target.value;
    if (event.target.value == 0) {
      this.Get_Transmittals();
    }
    else {
      this.fmsservice.Get_Transmittals().subscribe(data => {
        debugger
        let temp: any = data;
        this.TransmittalsLit = temp.filter(x => x.projectID == projectID);
      })
    }
  }

  public Edit(ID) {
    this.router.navigate(['/Transmittals', ID]);
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
    this.fmsservice.Get_TransmittalsByDate(this.startdate, this.enddate).subscribe(data => {
      debugger
      let temp: any = data;
      this.TransmittalsLit = temp.filter(x => x.projectID == this.ProjectID);
    })
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
        this.fmsservice.Delete_Transmittals(id).subscribe(res => {
          let test = res;
          this.Get_Transmittals();
        })
        Swal.fire(
          'Deleted!',
          'Transmittal has been deleted.',
          'success'
        )
      }
      else {
        this.Get_Transmittals();
      }
    })
  }
  Attachmentlist
  public Attachment(evn) {
    let id = evn.id;
    this.fmsservice.Get_TransmittalsByDate('2020-01-01', '2022-12-31').subscribe(data => {
      debugger
      let temp: any = data;
      this.Attachmentlist = temp.filter(x => x.id == id);
      if (this.Attachmentlist[0].attachment.includes(".pdf")) {
        this.Attachmentlist[0]['frame'] = 1
      }
      else if (this.Attachmentlist[0].attachment.includes(".xlsx")) {
        this.Attachmentlist[0]['frame'] = 2
      }
      else {
        this.Attachmentlist[0]['frame'] = 0
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

}
