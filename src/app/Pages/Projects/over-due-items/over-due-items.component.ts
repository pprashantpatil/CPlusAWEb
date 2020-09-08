import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-over-due-items',
  templateUrl: './over-due-items.component.html',
  styleUrls: ['./over-due-items.component.css']
})
export class OverDueItemsComponent implements OnInit {
  Search: any
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  projectlist: any;
  ActionItemsLists: any;
  public pickeroptions: any;
  LoginTypeID: any;
  StaffID: any;
  value: any;
  ProjectID;
  ProjectTeamList: any;
  AssignedTo: any;
  ActionItemsListsToDO: any;
  ActionItemsListsDoing: any;
  ActionItemsListsDone: any;
  Count: any;
  Priority: any;
  ngOnInit() {
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.StaffID = localStorage.getItem('UserID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.Priority = 'none';
    this.AssignedTo = 'none';
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      this.ProjectTeamList = data.filter(x => x.projectID == localStorage.getItem('ProjectID'));
    })

    if (this.LoginTypeID == '1') {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsLists = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.ageing > 5);
        this.Count = this.ActionItemsLists.length;
      })


      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsToDO = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'To Do');
      })


      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDoing = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'Doing');
      })

      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDone = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'Done');
      })

    } else {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID && x.ageing > 5);
        this.Count = this.ActionItemsLists.length;
      })
    }
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.Buildinglist = data;
    })

  }

  Buildinglist
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
    this.fmsservice.Get_ActionItems(this.startdate, this.enddate).subscribe(data => {
      debugger
      this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID && x.ageing > 5);
      this.Count = this.ActionItemsLists.length;
    })

    this.fmsservice.Get_ActionItems(this.startdate, this.enddate).subscribe(data => {
      debugger
      this.ActionItemsListsToDO = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'To Do');
    })


    this.fmsservice.Get_ActionItems(this.startdate, this.enddate).subscribe(data => {
      debugger
      this.ActionItemsListsDoing = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'Doing');
    })

    this.fmsservice.Get_ActionItems(this.startdate, this.enddate).subscribe(data => {
      debugger
      this.ActionItemsListsDone = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'Done');
    })
  }




  SID: any;
  public GetStaffID(evn) {
    this.SID = evn.target.value
    if (this.SID == 'none') {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID && x.ageing > 5);
        this.Count = this.ActionItemsLists.length;
      })
    }
    else {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID && x.staffID == this.SID && x.ageing > 5);
        this.Count = this.ActionItemsLists.length;
      })
    }
  }




  Photos = [];
  ImageOne: any;
  public GetActionItemsID(evn) {
    debugger;
    this.fmsservice.Get_ActionItemsAttachments(evn.id).subscribe(data => {
      debugger
      let temp: any = data;
      this.Photos = temp;
      this.ImageOne = this.Photos[0].attachment;
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
        this.fmsservice.Delete_ActionItems(id).subscribe(res => {
          let test = res;
          this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
            debugger
            this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID && x.ageing > 5);
            this.Count = this.ActionItemsLists.length;
          })
        })
        Swal.fire(
          'Deleted!',
          'Action Item has been deleted.',
          'success'
        )
      }
      else {
        this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
          debugger
          this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID && x.ageing > 5);
          this.Count = this.ActionItemsLists.length;
        })
      }
    })
  }

  ParojectID
  GetProjectID(evn) {
    debugger;
    this.ParojectID = evn.target.value;
    if (this.ParojectID == 0) {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsLists = data;
        this.Count = this.ActionItemsLists.length;
      })
    }
    else {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        let temp: any = data;
        this.ActionItemsLists = temp.filter(x => x.projectId == this.ParojectID);
        this.Count = this.ActionItemsLists.length;
      })
    }

  }
  public Save() {
    debugger
    Swal.fire("Saved Successfully!")
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

  public GetPriority(evn) {
    debugger
    if (evn.target.value == "none") {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID && x.ageing > 5);
        this.Count = this.ActionItemsLists.length;
      })
    } else {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID && x.ageing > 5 && x.priority == evn.target.value);
        this.Count = this.ActionItemsLists.length;
      })
    }
  }
}
