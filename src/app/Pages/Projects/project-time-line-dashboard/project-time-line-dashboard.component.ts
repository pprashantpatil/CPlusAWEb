import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-project-time-line-dashboard',
  templateUrl: './project-time-line-dashboard.component.html',
  styleUrls: ['./project-time-line-dashboard.component.css']
})
export class ProjectTimeLineDashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }
  value: any;
  projectlist1: any;
  LoginTypeID;
  StaffID;
  pickeroptions: any;
  Buildinglist: any
  ProjectID: any;
  StagesLists: any;
  StaffLists: any;
  ngOnInit() {

    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.StaffID = localStorage.getItem('UserID')
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.Get_ProjectTimeLine();
    this.fmsservice.Get_Projects().subscribe(data => {
      debugger
      this.projectlist1 = data;
    })
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.Buildinglist = data;
    })

    this.fmsservice.GetBuildingStages().subscribe(data => {
      debugger
      this.StagesLists = data;
    })

    this.fmsservice.GetBuildingStaff(1).subscribe(data => {
      debugger
      this.StaffLists = data.filter(x => x.buildingid == localStorage.getItem('ProjectID'));
    })



  }



  StagesID;
  public getStagesID(evn) {
    this.StagesID = evn.target.value;
    if (this.StagesID == 0) {
      this.fmsservice.Get_ProjectTimeLine().subscribe(data => {
        debugger
        this.ProjectTimelineLists = data.filter(x => x.projectID == this.ProjectID);
        this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
      })
    }
    else {

      this.fmsservice.Get_ProjectTimeLine().subscribe(data => {
        debugger
        this.ProjectTimelineLists = data.filter(x => x.projectID == this.ProjectID && x.stageID == this.StagesID);
        this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
      })

    }
  }



  public GetStaffID(evn) {
    this.StaffID = evn.target.value;
    if (this.StaffID == 0) {
      this.fmsservice.Get_ProjectTimeLine().subscribe(data => {
        debugger
        this.ProjectTimelineLists = data.filter(x => x.projectID == this.ProjectID);
        this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
      })
    }
    else {
      this.fmsservice.Get_ProjectTimeLine().subscribe(data => {
        debugger
        this.ProjectTimelineLists = data.filter(x => x.projectID == this.ProjectID && x.staffID == this.StaffID);
        this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
      })
    }
  }


  ProjectTimelineLists;
  FilteredProjectTimelineLists;
  public Get_ProjectTimeLine() {

    if (this.LoginTypeID == '1') {
      this.fmsservice.Get_ProjectTimeLine().subscribe(data => {
        debugger
        this.ProjectTimelineLists = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID);
        this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
      })
    } else {
      this.fmsservice.Get_ProjectTimeLine().subscribe(data => {
        debugger
        this.ProjectTimelineLists = data.filter(x => x.projectID == this.ProjectID);
        this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
      })
    }



  }

  ParojectID
  GetProjectID(evn) {
    debugger;
    this.ParojectID = evn.target.value;
    if (this.ParojectID == 0) {
      this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
    }
    else {
      this.FilteredProjectTimelineLists = this.ProjectTimelineLists.filter(x => x.projectID == this.ParojectID)
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
      this.fmsservice.Get_ProjectTimeLineByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.ProjectTimelineLists = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID);
        this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
      })
    }
    else {
      this.fmsservice.Get_ProjectTimeLineByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.ProjectTimelineLists = data.filter(x => x.projectID == this.ProjectID);
        this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
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
        this.fmsservice.Delete_ProjectTimeLine(id).subscribe(res => {
          let test = res;
          this.Get_ProjectTimeLine();
        })
        Swal.fire(
          'Deleted!',
          'Project TimeLine has been deleted.',
          'success'
        )
      }
      else {
        this.Get_ProjectTimeLine();
      }
    })
  }


  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Doc'));
    this.exportAsExcelFile(hhh, "Project TimeLine");
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
  AccUpateID: any
  public GetAccomplishetID(ptoject) {
    this.AccUpateID = ptoject.id;
    this.Accomplishment = 0;
  }
  Accomplishment: any
  public AddAccomplishment() {
    debugger;
    let object = {
      'ID': this.AccUpateID,
      'Accomplishment': this.Accomplishment,
    }
    this.fmsservice.Update_ProjectTimeLineAddAccomplishment(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Accomplishment Added Successfully!');
      this.Accomplishment = 0;
      location.href = "#/ProjectTimeLineDashboard";
    })
  }

}
