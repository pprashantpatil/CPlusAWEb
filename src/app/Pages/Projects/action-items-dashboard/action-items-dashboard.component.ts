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
  selector: 'app-action-items-dashboard',
  templateUrl: './action-items-dashboard.component.html',
  styleUrls: ['./action-items-dashboard.component.css']
})
export class ActionItemsDashboardComponent implements OnInit {
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
  ToDoCount: any;
  DoingCount: any;
  DoneCount: any;
  Priority: any;
  ngOnInit() {
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.StaffID = localStorage.getItem('UserID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.AssignedTo = 'none';
    this.Priority = 'none'
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
        this.ActionItemsLists = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID);
      })


      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsToDO = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'To Do');

        for (let i = 0; i < this.ActionItemsListsToDO.length; i++) {
          if (this.ActionItemsListsToDO[i].ageing < 0) {
            this.ActionItemsListsToDO[i].ageing = 0
          }

        }


        this.ToDoCount = this.ActionItemsListsToDO.length;
      })


      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDoing = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'Doing');
        this.DoingCount = this.ActionItemsListsDoing.length;
        for (let i = 0; i < this.ActionItemsListsDoing.length; i++) {
          if (this.ActionItemsListsDoing[i].ageing < 0) {
            this.ActionItemsListsDoing[i].ageing = 0
          }

        }
      })

      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDone = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'Done');
        this.DoneCount = this.ActionItemsListsDone.length;

        for (let i = 0; i < this.ActionItemsListsDone.length; i++) {
          if (this.ActionItemsListsDone[i].ageing < 0) {
            this.ActionItemsListsDone[i].ageing = 0
          }

        }
      })

    } else if (this.LoginTypeID == '8' || this.LoginTypeID == '9') {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID);
        for (let i = 0; i < this.ActionItemsLists.length; i++) {
          if (this.ActionItemsLists[i].ageing < 0) {
            this.ActionItemsLists[i].ageing = 0
          }

        }
      })


      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsToDO = data.filter(x => x.projectId == this.ProjectID && x.status == 'To Do');
        this.ToDoCount = this.ActionItemsListsToDO.length;

        for (let i = 0; i < this.ActionItemsListsToDO.length; i++) {
          if (this.ActionItemsListsToDO[i].ageing < 0) {
            this.ActionItemsListsToDO[i].ageing = 0
          }

        }
      })


      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDoing = data.filter(x => x.projectId == this.ProjectID && x.status == 'Doing');
        this.DoingCount = this.ActionItemsListsDoing.length;

        for (let i = 0; i < this.ActionItemsListsDoing.length; i++) {
          if (this.ActionItemsListsDoing[i].ageing < 0) {
            this.ActionItemsListsDoing[i].ageing = 0
          }

        }
      })

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
        this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID);
        for (let i = 0; i < this.ActionItemsLists.length; i++) {
          if (this.ActionItemsLists[i].ageing < 0) {
            this.ActionItemsLists[i].ageing = 0
          }

        }
      })


      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsToDO = data.filter(x => x.projectId == this.ProjectID && x.status == 'To Do');
        this.ToDoCount = this.ActionItemsListsToDO.length;
        for (let i = 0; i < this.ActionItemsListsToDO.length; i++) {
          if (this.ActionItemsListsToDO[i].ageing < 0) {
            this.ActionItemsListsToDO[i].ageing = 0
          }

        }
      })


      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDoing = data.filter(x => x.projectId == this.ProjectID && x.status == 'Doing');
        this.DoingCount = this.ActionItemsListsDoing.length;

        for (let i = 0; i < this.ActionItemsListsDoing.length; i++) {
          if (this.ActionItemsListsDoing[i].ageing < 0) {
            this.ActionItemsListsDoing[i].ageing = 0
          }

        }
      })

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

    if (this.LoginTypeID == 1) {
      this.fmsservice.Get_ActionItems(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.ActionItemsListsToDO = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'To Do');
        this.ToDoCount = this.ActionItemsListsToDO.length;
        for (let i = 0; i < this.ActionItemsListsToDO.length; i++) {
          if (this.ActionItemsListsToDO[i].ageing < 0) {
            this.ActionItemsListsToDO[i].ageing = 0
          }

        }
      })


      this.fmsservice.Get_ActionItems(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.ActionItemsListsDoing = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'Doing');
        this.DoingCount = this.ActionItemsListsDoing.length;
        for (let i = 0; i < this.ActionItemsListsDoing.length; i++) {
          if (this.ActionItemsListsDoing[i].ageing < 0) {
            this.ActionItemsListsDoing[i].ageing = 0
          }

        }
      })

      this.fmsservice.Get_ActionItems(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.ActionItemsListsDone = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'Done');
        this.DoneCount = this.ActionItemsListsDone.length;
        for (let i = 0; i < this.ActionItemsListsDone.length; i++) {
          if (this.ActionItemsListsDone[i].ageing < 0) {
            this.ActionItemsListsDone[i].ageing = 0
          }

        }
      })
    }
    else {
      this.fmsservice.Get_ActionItems(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.ActionItemsListsToDO = data.filter(x => x.projectId == this.ProjectID && x.status == 'To Do');
        this.ToDoCount = this.ActionItemsListsToDO.length;
        for (let i = 0; i < this.ActionItemsListsToDO.length; i++) {
          if (this.ActionItemsListsToDO[i].ageing < 0) {
            this.ActionItemsListsToDO[i].ageing = 0
          }

        }
      })


      this.fmsservice.Get_ActionItems(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.ActionItemsListsDoing = data.filter(x => x.projectId == this.ProjectID && x.status == 'Doing');
        this.DoingCount = this.ActionItemsListsDoing.length;
        for (let i = 0; i < this.ActionItemsListsDoing.length; i++) {
          if (this.ActionItemsListsDoing[i].ageing < 0) {
            this.ActionItemsListsDoing[i].ageing = 0
          }

        }
      })

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

  }




  SID: any;
  public GetStaffID(evn) {
    this.SID = evn.target.value
    if (this.SID == 'none') {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID);
        for (let i = 0; i < this.ActionItemsLists.length; i++) {
          if (this.ActionItemsLists[i].ageing < 0) {
            this.ActionItemsLists[i].ageing = 0
          }

        }
      })

      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsToDO = data.filter(x => x.projectId == this.ProjectID && x.status == 'To Do');
        this.ToDoCount = this.ActionItemsListsToDO.length;
        for (let i = 0; i < this.ActionItemsListsToDO.length; i++) {
          if (this.ActionItemsListsToDO[i].ageing < 0) {
            this.ActionItemsListsToDO[i].ageing = 0
          }

        }
      })


      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDoing = data.filter(x => x.projectId == this.ProjectID && x.status == 'Doing');
        this.DoingCount = this.ActionItemsListsDoing.length;
        for (let i = 0; i < this.ActionItemsListsDoing.length; i++) {
          if (this.ActionItemsListsDoing[i].ageing < 0) {
            this.ActionItemsListsDoing[i].ageing = 0
          }

        }
      })

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
        this.ActionItemsLists = data.filter(x => x.staffID == this.SID && x.projectId == this.ProjectID);


        for (let i = 0; i < this.ActionItemsLists.length; i++) {
          if (this.ActionItemsLists[i].ageing < 0) {
            this.ActionItemsLists[i].ageing = 0
          }

        }
      })


      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsToDO = data.filter(x => x.staffID == this.SID && x.projectId == this.ProjectID && x.status == 'To Do');
        this.ToDoCount = this.ActionItemsListsToDO.length;


        for (let i = 0; i < this.ActionItemsListsToDO.length; i++) {
          if (this.ActionItemsListsToDO[i].ageing < 0) {
            this.ActionItemsListsToDO[i].ageing = 0
          }

        }
      })


      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDoing = data.filter(x => x.staffID == this.SID && x.projectId == this.ProjectID && x.status == 'Doing');
        this.DoingCount = this.ActionItemsListsDoing.length;

        for (let i = 0; i < this.ActionItemsListsDoing.length; i++) {
          if (this.ActionItemsListsDoing[i].ageing < 0) {
            this.ActionItemsListsDoing[i].ageing = 0
          }

        }
      })

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


  public GetPriority(evn) {
    debugger;
    if (evn.target.value == "none") {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsToDO = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID);
        this.ToDoCount = this.ActionItemsListsToDO.length;
        for (let i = 0; i < this.ActionItemsListsToDO.length; i++) {
          if (this.ActionItemsListsToDO[i].ageing < 0) {
            this.ActionItemsListsToDO[i].ageing = 0
          }

        }
      })

      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDoing = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID);
        this.ToDoCount = this.ActionItemsListsDoing.length;
        for (let i = 0; i < this.ActionItemsListsDoing.length; i++) {
          if (this.ActionItemsListsDoing[i].ageing < 0) {
            this.ActionItemsListsDoing[i].ageing = 0
          }

        }
      })

      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDone = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID);
        this.ToDoCount = this.ActionItemsListsDone.length;
        for (let i = 0; i < this.ActionItemsListsDone.length; i++) {
          if (this.ActionItemsListsDone[i].ageing < 0) {
            this.ActionItemsListsDone[i].ageing = 0
          }

        }
      })
    } else {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsToDO = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'To Do' && x.priority == evn.target.value);
        this.ToDoCount = this.ActionItemsListsToDO.length;
        for (let i = 0; i < this.ActionItemsListsToDO.length; i++) {
          if (this.ActionItemsListsToDO[i].ageing < 0) {
            this.ActionItemsListsToDO[i].ageing = 0
          }

        }
      })

      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDoing = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'Doing' && x.priority == evn.target.value);
        this.ToDoCount = this.ActionItemsListsDoing.length;
        for (let i = 0; i < this.ActionItemsListsDoing.length; i++) {
          if (this.ActionItemsListsDoing[i].ageing < 0) {
            this.ActionItemsListsDoing[i].ageing = 0
          }

        }
      })

      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDone = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'Done' && x.priority == evn.target.value);
        this.ToDoCount = this.ActionItemsListsDone.length;
        for (let i = 0; i < this.ActionItemsListsDone.length; i++) {
          if (this.ActionItemsListsDone[i].ageing < 0) {
            this.ActionItemsListsDone[i].ageing = 0
          }

        }
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
            this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID);

            for (let i = 0; i < this.ActionItemsLists.length; i++) {
              if (this.ActionItemsLists[i].ageing < 0) {
                this.ActionItemsLists[i].ageing = 0
              }

            }
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
          this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID);

          for (let i = 0; i < this.ActionItemsLists.length; i++) {
            if (this.ActionItemsLists[i].ageing < 0) {
              this.ActionItemsLists[i].ageing = 0
            }

          }
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

        for (let i = 0; i < this.ActionItemsLists.length; i++) {
          if (this.ActionItemsLists[i].ageing < 0) {
            this.ActionItemsLists[i].ageing = 0
          }

        }
      })
    }
    else {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        let temp: any = data;
        this.ActionItemsLists = temp.filter(x => x.projectId == this.ParojectID);
        for (let i = 0; i < this.ActionItemsLists.length; i++) {
          if (this.ActionItemsLists[i].ageing < 0) {
            this.ActionItemsLists[i].ageing = 0
          }

        }
      })
    }

  }
  public Save() {
    debugger
    Swal.fire("Saved Successfully!")
  }

  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Doc'));
    this.exportAsExcelFile(hhh, "Action Items");
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



  exporttoexcelActionItemsListsToDO() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Action Items To Do Lists ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Action Items To Do Lists'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.ActionItemsListsToDO);
  }



  exporttoexcelActionItemsListsDoing() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Action Items To Doing Lists ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Action Items To Doing Lists'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.ActionItemsListsDoing);
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





}
