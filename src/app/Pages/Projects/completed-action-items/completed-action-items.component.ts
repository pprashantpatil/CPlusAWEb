import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
import { ExportToCsv } from '../../../../../node_modules/export-to-csv';

@Component({
  selector: 'app-completed-action-items',
  templateUrl: './completed-action-items.component.html',
  styleUrls: ['./completed-action-items.component.css']
})
export class CompletedActionItemsComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  ActionItemsListsToDO: any;
  ActionItemsListsDoing: any;
  ActionItemsListsDone: any;
  pickeroptions: any
  ToDoCount: any;
  ProjectID
  ProjectTeamList: any
  DoingCount: any;
  DoneCount: any;
  value: any;
  LoginTypeID: any;
  Priority: any;
  ngOnInit() {
    this.SID = 'none';
    this.Priority = "none";
    this.LoginTypeID = localStorage.getItem('LoginTypeID')
    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      this.ProjectTeamList = data.filter(x => x.projectID == localStorage.getItem('ProjectID'));
    })
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
    this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
      debugger
      this.ActionItemsListsDone = data.filter(x => x.projectId == this.ProjectID && x.status == 'Done');
      this.DoneCount = this.ActionItemsListsDone.length;

      for (let i = 0; i < this.ActionItemsListsDone.length; i++) {
        if (this.ActionItemsListsDone[i].ageing < 0) {
          this.ActionItemsListsDone[i].ageing = 0
        }

      }
    })
  }
  SID
  public GetStaffID(evn) {
    this.SID = evn.target.value
    if (this.SID == 'none') {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDone = data.filter(x => x.projectId == this.ProjectID && x.status == 'Done');
        this.DoneCount = this.ActionItemsListsDone.length;

        for (let i = 0; i < this.ActionItemsListsDone.length; i++) {
          if (this.ActionItemsListsDone[i].ageing < 0) {
            this.ActionItemsListsDone[i].ageing = 0
          }

        }
      })
    }
    else {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDone = data.filter(x => x.staffID == this.SID && x.projectId == this.ProjectID && x.status == 'Done');
        this.DoneCount = this.ActionItemsListsDone.length;

        for (let i = 0; i < this.ActionItemsListsDone.length; i++) {
          if (this.ActionItemsListsDone[i].ageing < 0) {
            this.ActionItemsListsDone[i].ageing = 0
          }

        }
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
    this.fmsservice.Get_ActionItems(this.startdate, this.enddate).subscribe(data => {
      debugger
      this.ActionItemsListsDone = data.filter(x => x.projectId == this.ProjectID && x.status == 'Done');
      this.DoneCount = this.ActionItemsListsDone.length;
      for (let i = 0; i < this.ActionItemsListsDone.length; i++) {
        if (this.ActionItemsListsDone[i].ageing < 0) {
          this.ActionItemsListsDone[i].ageing = 0
        }

      }
    })

  }
  exporttoexcelActionItemsListsDone() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Action Items  Done Lists',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Action Items  Done Lists'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.ActionItemsListsDone);
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


  public GetPriority(evn) {
    debugger
    if (evn.target.value == "none") {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDone = data.filter(x => x.projectId == this.ProjectID && x.status == 'Done');
        this.DoneCount = this.ActionItemsListsDone.length;

        for (let i = 0; i < this.ActionItemsListsDone.length; i++) {
          if (this.ActionItemsListsDone[i].ageing < 0) {
            this.ActionItemsListsDone[i].ageing = 0
          }

        }
      })
    } else {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDone = data.filter(x => x.projectId == this.ProjectID && x.status == 'Done' && x.priority == evn.target.value);
        this.DoneCount = this.ActionItemsListsDone.length;

        for (let i = 0; i < this.ActionItemsListsDone.length; i++) {
          if (this.ActionItemsListsDone[i].ageing < 0) {
            this.ActionItemsListsDone[i].ageing = 0
          }

        }
      })
    }
  }
}




