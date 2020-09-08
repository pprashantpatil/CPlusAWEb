import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-completed-meeting-minutes-dash',
  templateUrl: './completed-meeting-minutes-dash.component.html',
  styleUrls: ['./completed-meeting-minutes-dash.component.css']
})
export class CompletedMeetingMinutesDashComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    //uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize']
    // ]
  };

  constructor(public fmsservice: FmsService,) { }
  projectlist1
  pickeroptions
  value;
  LoginTypeID;
  StaffID;
  ProjectID: any
  ngOnInit() {
    this.StatusID = 2;
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
  StatusID
  public GetStsusID(event) {
    this.StatusID = event.target.value;
    if (this.StatusID == 2) {
      this.GetMeetingMinutes();
    }
    else {
      if (this.LoginTypeID == '1') {
        this.fmsservice.GetMeetingMinutes().subscribe(data => {
          debugger
          this.projectlist = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID && x.dateflag == this.StatusID && x.dateflag == 0);
        })
      } else {
        this.fmsservice.GetMeetingMinutes().subscribe(data => {
          debugger
          this.projectlist = data.filter(x => x.projectID == localStorage.getItem('ProjectID') && x.dateflag == this.StatusID && x.dateflag == 0);
        })
      }
    }
  }

  projectlist
  public GetMeetingMinutes() {
    debugger
    if (this.LoginTypeID == '1') {
      this.fmsservice.GetMeetingMinutes().subscribe(data => {
        debugger
        this.projectlist = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID && x.dateflag == 0);
      })
    }
    else if (this.LoginTypeID == '7') {
      this.fmsservice.GetMeetingMinutes().subscribe(data => {
        debugger
        this.projectlist = data.filter(x => x.dateflag == 0);
      })
    }
    else {
      this.fmsservice.GetMeetingMinutes().subscribe(data => {
        debugger
        this.projectlist = data.filter(x => x.projectID == this.ProjectID && x.dateflag == 0);
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
      })
    }
  }
  meetingMinutes1: any
  public GetAddedMeetingmintues(project) {
    debugger
    this.fmsservice.GetNewMeetingminutes().subscribe(data => {
      debugger
      let temp: any = data;
      let temp1 = temp.filter(x => x.meetingID == project.id);
      this.meetingMinutes1 = temp1[0].meetingMinutes;
    })
  }

  Newlistq = [];
  video: any
  videolist: any
  video1: any;
  VedioOne: any;
  public GetVideos(evn) {
    debugger
    let id = evn.id;
    this.fmsservice.GetNewMeetingminutes().subscribe(data => {
      debugger
      let temp: any = data;
      this.Newlistq = temp.filter(x => x.meetingID == evn.id);
      this.VedioOne = this.Newlistq[0].meetingvideo;
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
    if (this.LoginTypeID == 1) {
      this.fmsservice.GetMeetingMinutesByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp = data;
        this.projectlist = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID && x.dateflag == 0);
      })
    }
    else {
      this.fmsservice.GetMeetingMinutesByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp = data;
        this.projectlist = data.filter(x => x.projectID == this.ProjectID && x.dateflag == 0);
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
    this.exportAsExcelFile(hhh, "Completed Meetings");
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

  //meetinginutes
  FileName2
  filenamedetails
  FileType2
  base64textStringdetails
  handleFileSelect2(evt) {
    debugger
    var File2 = evt.target.value;
    let subStringData = File2.substr(12, 10000);
    var FileName2 = subStringData.split('.')[0];
    var FileType2 = subStringData.split('.')[1];
    console.log(FileName2);
    console.log(FileType2);
    this.FileName2 = FileName2;
    this.FileType2 = FileType2;
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded2.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  base64textString2
  base64textString
  _handleReaderLoaded2(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString2 = btoa(binaryString);
    console.log(this.base64textString);
  }

  FileName3
  filenamedetails1
  FileType3
  base64textStringdetails1
  handleFileSelect3(evt) {
    debugger
    var File2 = evt.target.value;
    let subStringData = File2.substr(12, 10000);
    var FileName3 = subStringData.split('.')[0];
    var FileType3 = subStringData.split('.')[1];
    console.log(FileName3);
    console.log(FileName3);
    this.FileName3 = FileName3;
    this.FileType3 = FileType3;
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded3.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  base64textString3
  base64textString1
  _handleReaderLoaded3(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString3 = btoa(binaryString);
    console.log(this.base64textString1);
  }
  MeetingID: any
  public GetMeetingmintuesdetails(project) {
    this.MeetingID = project.mid;
  }
  Date: any
  MeetingMinutes: any
  public SaveMeetingMinutes() {
    debugger;
    let object = {
      'Date': new Date(),
      'MeetingID': this.MeetingID,
      'MeetingMinutes': this.MeetingMinutes,
      'ProjectID': this.ProjectID,
      'FileName2': this.FileName2,
      'FileType2': this.FileType2,
      'modifieddate2': new Date(),
      'Base64Data2': this.base64textString3 != undefined ? this.base64textString3 : "",
      'FileName3': this.FileName3,
      'FileType3': this.FileType3,
      'modifieddate3': new Date(),
      'Base64Data3': this.base64textString3 != undefined ? this.base64textString3 : "",

    }

    this.fmsservice.InsertNewMeetingminutes(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Meeting Minutes Saved Successfully!');
      this.MeetingMinutes = '';

      location.href = "#/CompletedMeetingMinutesDash";
    })
  }

}
