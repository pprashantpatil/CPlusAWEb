import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { document } from 'ngx-bootstrap';
import { stringify } from 'querystring';

@Component({
  selector: 'app-stage-complete-menu',
  templateUrl: './stage-complete-menu.component.html',
  styleUrls: ['./stage-complete-menu.component.css']
})
export class StageCompleteMenuComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe, private router: Router) { }
  ProjectID
  StageID
  Buildinglist
  dropdownSettings = {}
  public filenamedetails = [];
  public base64textStringdetails = [];
  FileName: any;
  FileType: any;
  base64textString: any;
  public filenamedetails1 = [];
  public base64textStringdetails1 = [];
  FileName1: any;
  FileType1: any;
  base64textString1: any;
  UserID: any;
  ProjectsID: any;
  FloorList:any
  ngOnInit() {

    this.UserID = localStorage.getItem('UserID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.fmsservice.GetFloorTypebyBID(this.ProjectID).subscribe(
      res => {
        this.FloorList = res;
      }
    )
    this.StageID = 0;
    this.GetBuildinglist(1);
    this.GetBuildingStages();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'unitID',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }
  selecteditemlist1 = [];
  selecteditemlist = [];
  onItemSelect(item: any) {
    debugger;
    this.selecteditemlist.push(item)
  }
  onItemDeSelect(item: any) {
    debugger;
    var index = this.selecteditemlist.findIndex(x => x.id == item.id)
    this.selecteditemlist.splice(index, 1);

  }

  onSelectAll(items: any) {
    debugger;
    console.log(items);
    this.selecteditemlist1.push(items)
    this.selecteditemlist = this.selecteditemlist1[0]
  }
  StageList
  GetBuildingStages() {
    this.fmsservice.GetBuildingStages().subscribe(data => {
      debugger
      this.StageList = data;
    })
  }
  public GetStageID(event) {
    debugger
    this.StageID = event.target.value;
  }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        let temp: any = res;
        this.Buildinglist = temp.filter(x => x.id == this.ProjectID);

      }
    )
  }
  public GetBuildingID(evn) {
    this.ProjectID = evn.target.value;
   
  }
  FloorID
  public GetFloorID(evn) {
    this.FloorID = evn.target.value;
    this.GetUnit_MasterbyfloorID(evn.target.value)
  }
  UserRoleList
  public GetUnit_MasterbyfloorID(FloorID) {
    this.fmsservice.GetUnit_MasterbyfloorID(FloorID).subscribe(
      res => {
        this.UserRoleList = res;
      }
    )
  }
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
        title: 'Document Uploaded Successfully',
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
  handleFileSelect(evt) {
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
      this.FileName = FileName;
      this.FileType = FileType;


      var files = evt.target.files;
      var file = files[i];
      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded2.bind(this);
        reader.readAsBinaryString(file);


      }

      this.filenamedetails1.push({ fname: this.FileName, ffile: this.FileType, base: this.base64textStringdetails });
      debugger
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Document Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })

    }

  }
  _handleReaderLoaded2(readerEvt) {

    debugger
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.base64textStringdetails.push(this.base64textString)
    console.log(this.base64textString);
    debugger

  }
  Description
  public Save() {
    debugger

    var obj = {
      "ProjectID": this.ProjectID,
      "UnitID": this.selecteditemlist.length != 0 ? this.selecteditemlist[0].id : 0,
      "StageID": this.StageID,
      "UPdateID": 2,
      "Description": this.Description,
      "ContractorID": localStorage.getItem("userid"),
      "FloorID": this.FloorID
    }
    this.fmsservice.InsertDailyUpdateMenu(obj).subscribe(res => {
      if (res != null && res != undefined) {
        debugger;
        this.InsertDailyUpdateMenuPhotos(res);
        this.InsertDailyUpdateMenuVideos(res);
        Swal.fire("Stage Complete Updated Successfully");
        location.href = "#/StageCompleteMenuDash";
      }
    })
  }

  public InsertDailyUpdateMenuPhotos(id) {
    debugger
    for (let j = 0; j < this.filenamedetails.length; j++) {
      var obj = {
        "DailyUpdateMenuIDID": id,
        "UpdateID": 2,
        "FileType": this.filenamedetails[j].ffile,
        "FileName": this.filenamedetails[j].fname,
        "modifieddate": new Date(),
        "Base64Data": this.filenamedetails[j].base[j]

      }
      debugger;
      this.fmsservice.InsertDailyUpdateMenuPhotos(obj).subscribe((data) => {
        if (data != null && data != undefined) {
          debugger;
        }
      })


    }
  }
  public InsertDailyUpdateMenuVideos(id) {
    debugger
    for (let j = 0; j < this.filenamedetails1.length; j++) {
      var obj = {
        "DailyUpdateMenuIDID": id,
        "UpdateID": 2,
        "FileType1": this.filenamedetails1[j].ffile,
        "FileName1": this.filenamedetails1[j].fname,
        "modifieddate1": new Date(),
        "Base64Data1": this.filenamedetails1[j].base[j]

      }
      debugger;
      this.fmsservice.InsertDailyUpdateMenuVideos(obj).subscribe((data) => {
        if (data != null && data != undefined) {
          debugger;
        }
      })
    }
  }

}

