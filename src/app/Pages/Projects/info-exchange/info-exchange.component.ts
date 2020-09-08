import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-info-exchange',
  templateUrl: './info-exchange.component.html',
  styleUrls: ['./info-exchange.component.css']
})
export class InfoExchangeComponent implements OnInit {
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
  ClientContacts
  projectlist
  projectID
  ContactID
  paramID
  Info_Exchange
  typeID
  ProjectID
  Username: any
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  UserID
  ngOnInit() {
    this.UserID = localStorage.getItem('UserID');
    this.Username = localStorage.getItem('username');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.id == localStorage.getItem('ProjectID'));
    })
    this.projectID = this.ProjectID;
    this.GetProjectID(this.ProjectID);
    this.ContactID = 0;
    this.From = 0;
    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.Get_Info_ExchangebyID(this.paramID);
      }
    }
    );




  }


  public Get_Info_ExchangebyID(ProjectID) {


    this.fmsservice.Get_Info_Exchange('2020-01-01', '2020-12-31').subscribe(data => {
      debugger
      let temp: any = data;
      this.Info_Exchange = temp.filter(x => x.id == ProjectID);
      this.fmsservice.GetBuildinglist(1).subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.id == localStorage.getItem('ProjectID'));
      })
      let Project = this.Info_Exchange[0];
      this.projectID = Project["projectID"];
      this.fmsservice.GetProjectTeam().subscribe(data => {
        debugger
        let temp: any = data
        this.memberlist = temp.filter(x => x.projectID == Project["projectID"]);
      })
      this.fmsservice.Get_ClientContacts().subscribe(data => {
        let temp: any = data;
        this.ClientContacts = temp.filter(x => x.projectID == Project["projectID"]);
      })
      this.ContactID = Project["contactID"];
      this.From = Project["from1"];
      this.Body = Project["body"];

    })

  }
  memberlist
  public GetProjectID(id) {
    debugger
    this.projectID = id;
    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data
      this.memberlist = temp.filter(x => x.projectID == this.projectID);
    })
    this.fmsservice.Get_ClientContacts().subscribe(data => {
      let temp: any = data;
      this.ClientContacts = temp.filter(x => x.projectID == this.projectID);
    })
  }
  GetMemberID(event) {
    this.From = event.target.value;
  }
  public GetContactID(event) {
    this.ContactID = event.target.value;
  }

  FileName2
  filenamedetails
  FileType2
  base64textStringdetails
  handleFileSelect2(evt) {
    debugger
    //console.log(evt);
    var File2 = evt.target.value;
    // console.log(File);
    let subStringData = File2.substr(12, 10000);
    //console.log(X);
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

  From
  To
  Body
  public Save() {

    let object = {
      'ProjectID': this.projectID,
      'ContactID': this.ContactID,
      'From': this.UserID,
      'To': this.To,
      'Body': this.Body,
      'FileName2': this.FileName2,
      'FileType2': this.FileType2,
      'modifieddate2': new Date(),
      'Base64Data2': this.base64textString2 != undefined ? this.base64textString2 : "",
    }
    this.fmsservice.Insert_Info_Exchange(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Info Exchange Saved Successfully!');
      location.href = "#/infoexchangedash";
    })


    var mailentity = {
      ToEmail: 'vamsivardhan01@gmail.com',
      Subject: 'DigiCMS',
      FromEmail: 'digiCMS@gmail.com',
      ContentType: "text/html",
      Content: this.Body,
      // 'Dear ' + this.doctorname + ' I am referring my Patient ' + this.patientname + ' for further investigation.<br> My Notes About The Patient Is Given Below. <br>' + this.referalnotes + ' Please Feel Free To Reach Out To Me. If You Have Any Queries.<br><br> Regards<br>' + this.user,
    };
    debugger
    this.fmsservice.SendMail(mailentity).subscribe(data => {
      debugger;
      this.Body = "";
      Swal.fire('Mail sent successfully.');
    })
  }

  public Update() {

    let object = {
      'Id': this.paramID,
      'ProjectID': this.projectID,
      'ContactID': this.ContactID,
      'From': this.UserID,
      'To': this.To,
      'Body': this.Body,
    }
    this.fmsservice.Update_Info_Exchange(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Info Exchange Updated Successfully!');
      location.href = "#/infoexchangedash";
    })
  }

}
