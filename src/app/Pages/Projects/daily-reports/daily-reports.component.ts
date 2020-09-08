import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-daily-reports',
  templateUrl: './daily-reports.component.html',
  styleUrls: ['./daily-reports.component.css']
})

export class DailyReportsComponent implements OnInit {
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
  projectlist: any;
  htmlContent: any;
  paramID
  BuildingID;
  StageList: any;
  public filenamedetails = [];
  FloorList: any;
  ngOnInit() {

    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.Get_DailyReportByID(this.paramID);
      }
    }
    );
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.id == localStorage.getItem('ProjectID'));
    })
    this.BuildingID = localStorage.getItem('ProjectID');
    this.fmsservice.GetFloorTypebyBID(localStorage.getItem('ProjectID')).subscribe(
      res => {
        this.FloorList = res;
      }
    )

    this.fmsservice.GetBuildingStages().subscribe(data => {
      debugger
      this.StageList = data;
    })
    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data
      this.memberlist = temp.filter(x => x.projectID == localStorage.getItem('ProjectID'));
    })

  }
  memberlist

  DailyReport
  public Get_DailyReportByID(ProjectID) {
    this.fmsservice.Get_DailyReport().subscribe(data => {
      debugger
      let temp: any = data;
      this.DailyReport = temp.filter(x => x.id == ProjectID);
      this.fmsservice.GetBuildinglist(1).subscribe(data1 => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.id == localStorage.getItem('ProjectID'));
      })
      let Project = this.DailyReport[0];
      this.BuildingID = Project["projectID"];
      this.fmsservice.GetProjectTeam().subscribe(data => {
        debugger
        let temp: any = data
        this.memberlist = temp.filter(x => x.projectID == localStorage.getItem('ProjectID'));
      })
      this.Date = this.datepipe.transform(Project["date"], 'yyyy-MM-dd');
      this.Observation = Project["observation"];
      this.Description = Project["description"];
      this.Equipment = Project["equipment"];
      this.SubContractor = Project["subContractor"];
      this.InventoryObservation = Project["inventoryObservation"];


    })

  }



  FloorID: any;
  UserRoleList: any;
  public GetFloorID(evn) {
    this.FloorID = evn.target.value;
    this.GetUnit_MasterbyfloorID(evn.target.value)
  }

  public GetUnit_MasterbyfloorID(FloorID) {
    this.fmsservice.GetUnit_MasterbyfloorID(FloorID).subscribe(
      res => {
        this.UserRoleList = res;
      }
    )
  }


  UnitID: any;
  public GetUnits(evn) {
    debugger;
    this.UnitID = evn.target.value;
  }

  ProjectID: any;
  Date: any;
  CreatedBy: any;
  Observation: any;
  Description: any;
  Equipment: any;
  SubContractor: any;
  InventoryObservation: any;
  StagesID: any;
  StageID: any;
  public Save() {
    debugger;
    let object = {
      'ProjectID': this.BuildingID,
      'Date': this.Date,
      'CreatedBy': localStorage.getItem('UserID'),
      'Observation': this.Observation,
      'Description': 'NA',
      'Equipment': 'NA',
      'SubContractor': 'NA',
      'InventoryObservation': 'NA',
      'FloorID': this.FloorID,
      'UnitID': this.UnitID,
      'StagesID': this.StageID
    }

    this.fmsservice.Insert_DailyReport(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Daily Report Saved Successfully!');
      this.InsertDailyReportPhotos(res);
      location.href = "#/DailyReportsDashboard";
    })
  }

  public InsertDailyReportPhotos(id) {
    debugger
    for (let j = 0; j < this.filenamedetails.length; j++) {
      var obj = {
        "DailyReportID": id,
        "FileType": this.filenamedetails[j].ffile,
        "FileName": this.filenamedetails[j].fname,
        "modifieddate": new Date(),
        "Base64Data": this.filenamedetails[j].base[j]

      }
      debugger;
      this.fmsservice.InsertDailyReportPhotos(obj).subscribe((data) => {
        if (data != null && data != undefined) {
          debugger;
          Swal.fire('Photos Uploaded  Successfully');
        }
      })
    }
  }
  public Update() {
    debugger;
    let object = {
      'ID': this.paramID,
      'ProjectID': this.BuildingID,
      'Date': this.Date,
      'CreatedBy': localStorage.getItem('UserID'),
      'Observation': this.Observation,
      'Description': 'NA',
      'Equipment': 'NA',
      'SubContractor': 'NA',
      'InventoryObservation': 'NA'
    }

    this.fmsservice.Update_DailyReport(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Daily Report Updated Successfully!');
      location.href = "#/DailyReportsDashboard";
    })
  }
  public base64textStringdetails1 = [];
  FileName1: any;
  FileType1: any;
  base64textString1: any;
  handleFileSelect1(evt) {
    debugger
    for (var i = 0; i < evt.target.files.length; i++) {
      debugger

      var File = evt.target.files[i];
      debugger

      var FileName = File.name.split('.')[0];
      var FileType = File.name.split('.')[1];

      debugger
      console.log(FileName);
      console.log(FileType);
      this.FileName1 = FileName;
      this.FileType1 = FileType;


      var files = evt.target.files;
      var file = files[i];
      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded1.bind(this);
        reader.readAsBinaryString(file);


      }

      this.filenamedetails.push({ fname: this.FileName1, ffile: this.FileType1, base: this.base64textStringdetails1 });
      debugger

      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Photos Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })

    }

  }
  _handleReaderLoaded1(readerEvt) {

    debugger
    var binaryString = readerEvt.target.result;
    this.base64textString1 = btoa(binaryString);
    this.base64textStringdetails1.push(this.base64textString1)
    console.log(this.base64textString1);
    debugger

  }

}
