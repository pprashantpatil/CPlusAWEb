import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projectfiles',
  templateUrl: './projectfiles.component.html',
  styleUrls: ['./projectfiles.component.css']
})
export class ProjectfilesComponent implements OnInit {
  projectlist: any
  projectID
  constructor(public fmsservice: FmsService, public router: Router, private route: ActivatedRoute, public datepipe: DatePipe) { }
  ProjectID: any;
  ngOnInit() {
    this.ProjectID = localStorage.getItem('ProjectID');
    this.GetProjectID(this.ProjectID);
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist = data;
    })
  }

  Project: any;
  filteredprojects
  public GetProjectID(ProjectID) {
    debugger;
    this.projectID = ProjectID;
    this.filteredprojects = this.projectlist.filter(x => x.id == this.projectID);
    this.Project = this.filteredprojects[0].name;


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
  FileName
  description
  OwnerName
  public Save() {
    let object = {
      'ProjectName': this.projectID,
      'FileName': this.FileName,
      'Description': this.description,
      'OwnerName': this.OwnerName
      // 'FileName2': this.FileName2,
      // 'FileType2': this.FileType2,
      // 'modifieddate2': new Date(),
      // 'Base64Data2': this.base64textString2 != undefined ? this.base64textString2 : "",
    }
    this.fmsservice.Insert_ProjectFiles(object).subscribe(res => {
      debugger
      this.router.navigate(['/ResourcesLibrary', this.Project, this.FileName]);

    })




  }

}


