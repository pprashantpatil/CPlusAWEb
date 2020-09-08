import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-building-planupdate',
  templateUrl: './building-planupdate.component.html',
  styleUrls: ['./building-planupdate.component.css']
})
export class BuildingPlanupdateComponent implements OnInit {
  public pageMenuTitle;
  public updateBuildingPlan_BreadChrumb;
  public updateBuildingPlan_BuildingName;
  public updateBuildingPlan_PlanName;
  public updateBuildingPlan_BuildingPlan;
  public save;
  Buildinglist: any;
  BuildingID: any;
  PlaneName: any;
  FileName: any;
  FileType: any;
  base64textString: any;
  selectedlanguage: any;
  public filenamedetails = [];
  public filetypedetails = [];
  public base64textStringdetails = [];
  Isempty: any;
  ProjectID
  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.ProjectID = localStorage.getItem('ProjectID');
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.fmsservice.GetBuildinglist1(this.selectedlanguage).subscribe(data => {
      debugger
      let temp: any = data;
      this.Buildinglist = temp.filter(x => x.id == this.ProjectID);
    })
    this.BuildingID = this.ProjectID;
    this.GetUpdateBuildingPlanLanguage(this.selectedlanguage);


  }

  //   handleFileSelect(evt){
  //     //console.log(evt);
  //     var File=evt.target.value;
  //    // console.log(File);
  //      let subStringData=File.substr(12,27);
  //     //console.log(X);
  //     var FileName = subStringData.split('.')[0];
  //     var FileType =subStringData.split('.')[1];
  //     console.log(FileName);
  //    console.log(FileType);
  //    this.FileName=FileName;
  //    this.FileType=FileType;
  //    var files = evt.target.files;
  //     var file = files[0];
  //     if (files && file) {
  //       var reader = new FileReader();
  //       reader.onload =this._handleReaderLoaded.bind(this);
  //       reader.readAsBinaryString(file);
  //   }


  // }
  // _handleReaderLoaded(readerEvt) {
  //   var binaryString = readerEvt.target.result;
  //          this.base64textString= btoa(binaryString);
  //          console.log( this.base64textString);
  //  }

  ///////////////Start photo///////////////////////

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

  ///////////////end photo///////////////////////




  public GetUpdateBuildingPlanLanguage(languageid) {
    this.fmsservice.GetUpdateBuildingPlanLanguage(languageid).subscribe(
      res => {
        debugger;

        this.pageMenuTitle = res[0].pageMenuTitle;
        this.updateBuildingPlan_BreadChrumb = res[0].updateBuildingPlan_BreadChrumb;
        this.updateBuildingPlan_BuildingName = res[0].updateBuildingPlan_BuildingName;
        this.updateBuildingPlan_PlanName = res[0].updateBuildingPlan_PlanName;
        this.updateBuildingPlan_BuildingPlan = res[0].updateBuildingPlan_BuildingPlan;
        this.save = res[0].save;

      }
    )
  }


  // InsertBuildingPlan(){
  //   debugger

  //   var Filter={
  //   'PlanName':this.PlaneName,
  //   'BuildingID':this.BuildingID,
  //   'ModifiedBy':'Admin',
  //   'PDF':null,
  //   'LanguageID':this.selectedlanguage,
  //   'FileName':this.FileName,
  //   'FileType':this.FileType,
  //   'modifieddate':new Date(),
  //   'Base64Data' :this.base64textString,
  //   }

  //   this.fmsservice.InsertBuildingPlan(Filter).subscribe(data=>{
  //     debugger
  //     if(data!=undefined){
  //       alert('Saved Successfully')
  //       this.clear();
  //     }
  //   })
  // }

  


  Description: any;
  VersionNo: any;
  InsertBuildingPlan() {
    debugger
    var Entity1 = {
      'PlanName': this.PlaneName,
      'BuildingID': this.BuildingID,
      "FileType": this.FileType,
    }

    let validate = this.fmsservice.isEmpty(Entity1);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;
      debugger
    }
    else {
      for (let j = 0; j < this.filenamedetails.length; j++) {

        var obj = {
          'PlanName': this.PlaneName,
          'BuildingID': this.BuildingID,
          'ModifiedBy': localStorage.getItem('username'),
          'PDF': null,
          'LanguageID': this.selectedlanguage,
          "FileType": this.filenamedetails[j].ffile,
          "FileName": this.filenamedetails[j].fname,
          "modifieddate": new Date(),
          "Base64Data": this.filenamedetails[j].base[j],
          "Description": this.Description,
          "VersionNo": this.VersionNo
        }
        debugger;
        this.fmsservice.InsertBuildingPlan(obj).subscribe(data => {
          debugger
          if (data != undefined) {
          }
        })
        if ((this.filenamedetails.length - 1) == j) {
          Swal.fire('Property Plan Saved Successfully');
          this.clear();
          this.InsertLoginDetails(obj.PlanName);
          location.href = "#/BuildingPlans";
        }
      }
    }
  }

  public InsertLoginDetails(PlanName) {
    debugger
    var obj = {
      "ApplicationName": 'Buidling Plan' + PlanName + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Building Plan",
      "Action": 'Add New Building Plan',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }


  clear() {
    debugger
    this.PlaneName = '',
      this.BuildingID = ''
  }


}
