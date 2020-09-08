import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-newmeetingminutes',
  templateUrl: './newmeetingminutes.component.html',
  styleUrls: ['./newmeetingminutes.component.css']
})
export class NewmeetingminutesComponent implements OnInit {
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

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  MeetingID
  UserID
  mid
  ProjectID
  Meetinglist: any
  ngOnInit() {

    this.ProjectID = localStorage.getItem('ProjectID');
    this.UserID = localStorage.getItem('UserID');
    this.fmsservice.GetMeetingMinutes().subscribe(data => {
      debugger
      let temp: any = data;
      this.Meetinglist = temp.filter(x => x.projectID == localStorage.getItem('ProjectID') && x.dateflag == 0&&x.mmadded==null);
    })

    this.MeetingID = 0;
    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.GetNewMeetingMinutesByID(this.paramID);
      }
      if (params['mid'] != undefined) {
        this.mid = params['mid'];
        this.MeetingID=this.mid;
        //this.GetNewMeetingMinutesByID(this.paramID);
      }
    }
    );

  }

  public GetNewMeetingMinutesByID(ID) {
    this.fmsservice.GetNewMeetingminutes().subscribe(data => {
      debugger
      let temp: any = data;
      this.MeetingMinutes = temp.filter(x => x.id == ID);
      this.fmsservice.GetMeetingMinutes().subscribe(data => {
        debugger
        let temp: any = data;
        this.Meetinglist = temp.filter(x => x.projectID == localStorage.getItem('ProjectID') && x.dateflag == 0);
      })

      let Project = this.MeetingMinutes[0];
      this.Date = this.datepipe.transform(Project["date"], 'yyyy-MM-dd');
      this.MeetingID = Project["meetingID"];
      this.MeetingMinutes = Project["meetingMinutes"];
    })
  }

  public GetMeetingID(event) {
    this.MeetingID = event.target.value;
  }

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
  Date: any
  MeetingMinutes: any
  public Save() {
    debugger;
    let object = {
      'Date': new Date(),
      'MeetingID': this.MeetingID,
      'MeetingMinutes': this.MeetingMinutes,
      'ProjectID': this.ProjectID,
      'FileName2': this.FileName2,
      'FileType2': this.FileType2,
      'modifieddate2': new Date(),
      'Base64Data2': this.base64textString2 != undefined ? this.base64textString2 : "",
    }

    this.fmsservice.InsertNewMeetingminutes(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Meeting Minutes Saved Successfully!');
      location.href = "#/Newmeetingminutesdash";
    })
  }
  paramID
  public Update() {
    let Entity = {
      'ID': this.paramID,
      'Date': this.Date,
      'MeetingID': this.MeetingID,
      'MeetingMinutes': this.MeetingMinutes,
      'ProjectID': this.ProjectID,
    }
    this.fmsservice.UpdateNewMeetingminutes(Entity).subscribe(res => {
      debugger;
      Swal.fire('Updated Successfully!');
      location.href = "#/Newmeetingminutesdash";

    })
  }

}
