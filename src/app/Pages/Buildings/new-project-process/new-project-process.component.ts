import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-new-project-process',
  templateUrl: './new-project-process.component.html',
  styleUrls: ['./new-project-process.component.css']
})
export class NewProjectProcessComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, private datePipe: DatePipe) { }


  FileName: any;
  FileType: any;

  base64textString: any;
  selectedlanguage: any;
  public filenamedetails = [];
  public filetypedetails = [];
  public base64textStringdetails = [];


  public ProjectProgressEntity = {
    BuildingID: 0,
    FloorID: 0,
    UnitID: 0,
    Date: "",
    Comments: "",
    Stages: "",
    Photo: "NULL",
    Video: "NULL"
  }

  ngOnInit() {
    this.getbuildingList(1);
  }

  buildinglist;
  public getbuildingList(languageid) {
    debugger;
    this.fmsservice.GetBuildinglist(languageid).subscribe(res => {
      this.buildinglist = res;
    })
  }

  floorlist;
  BuildingID;
  public getfloorlist(buildingid) {
    debugger;
    if (buildingid != 0) {
      this.BuildingID = buildingid;
      this.fmsservice.GetFloor(buildingid).subscribe(res => {
        debugger;
        this.floorlist = res.filter(x => x.floor != 'Basement 1' && x.floor != 'Basement 2' && x.floor != 'Basement 3' && x.floor != 'Basement 4');

      })
    }

  }
  unitList
  public getunitlist(floorid) {
    //this.tenant.FloorID = floorid;
    this.fmsservice.GetUnit_MasterbybID(this.BuildingID, floorid).subscribe(res => {
      this.unitList = res;
    })
  }


  handleFileSelect1(evt) {
    debugger
    for (var i = 0; i < evt.target.files.length; i++) {
      debugger
      //console.log(evt);
      var File = evt.target.files[i];
      debugger
      // console.log(File);
      //let subStringData=File.substr(12,27);
      //console.log(X);
      var FileName = File.name.split('.')[0];
      var FileType = File.name.split('.')[1];

      debugger
      console.log(FileName);
      console.log(FileType);
      this.FileName = FileName;
      this.FileType = FileType;
      //this.filenamedetails.push({fname:this.FileName,ffile:this.FileType,base:this.base64textString});
      //this.filetypedetails.push(this.FileType);

      var files = evt.target.files;
      var file = files[i];
      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded1.bind(this);
        reader.readAsBinaryString(file);
      }

      this.filenamedetails.push({ fname: this.FileName, ffile: this.FileType, base: this.base64textStringdetails });
      debugger
    }

  }
  _handleReaderLoaded1(readerEvt) {

    debugger
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.base64textStringdetails.push(this.base64textString)
    console.log(this.base64textString);
    debugger
  }

  public UploadedAttachments = [];
  public AssetsAttachment = [];
  onFilesAddedAttachment(files: File[]) {
    this.AssetsAttachment.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.AssetsAttachment.push(files[i]);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Document Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }



  public UploadAssetsAttachments(ProjectProgressID) {
    this.fmsservice.ProjectProgressPhotosUpload(this.AssetsAttachment).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        let AttachmentsEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.UploadedAttachments.push(AttachmentsEntity);
      }
      this.InsertProjectProgressPhotos(ProjectProgressID);
      //Swal.fire('Updated Successfully!');
    })
  }




  public InsertProjectProgressPhotos(ProjectProgressID) {
    for (let i = 0; i < this.UploadedAttachments.length; i++) {
      let entity = {
        ProjectProgressID: ProjectProgressID,
        Attachment: this.UploadedAttachments[i].docpathURL1,
        ModifiedBy: 'Admin',
      }
      this.fmsservice.InsertProjectProgressPhotos(entity).subscribe(res => {
        debugger;
        //Swal.fire('Successfully Saved!');
      })
    }
  }



  public InsertProjectProgress() {
    this.fmsservice.InsertProjectProcess(this.ProjectProgressEntity).subscribe(res => {
      debugger;
      Swal.fire("Saved Successfully");
      this.UploadAssetsAttachments(res);
      this.InsertProjectProgressvideos(res);
    })
  }



  public InsertProjectProgressvideos(ProjectProcessID) {
    debugger;
    for (let j = 0; j < this.filenamedetails.length; j++) {

      var obj = {
        'ProjectProgressID': ProjectProcessID,
        "FileType": this.filenamedetails[j].ffile,
        "FileName": this.filenamedetails[j].fname,
        "modifieddate": new Date(),
        "Base64Data": this.filenamedetails[j].base[j]
      }
      debugger;
      this.fmsservice.InsertProjectProgressvideos(obj).subscribe(data => {
        debugger
        if (data != undefined) {
        }
      })
    }
  }
}
