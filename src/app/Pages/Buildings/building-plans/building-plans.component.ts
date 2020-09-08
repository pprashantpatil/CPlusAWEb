import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-building-plans',
  templateUrl: './building-plans.component.html',
  styleUrls: ['./building-plans.component.css']
})
export class BuildingPlansComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }
  public buildingPlansTitle;
  public buildingPlans_BreadChrumb;
  public buildingPlans_AddNewButton;
  public buildingPlans_Building;
  public buildingPlans_PlanName;
  public buildingPlans_Plans;
  public buildingPlans_Actions;
  public pageMenuTitle;
  public BuildingPlanList;
  public Buildinglist;
  public selectedlanguage;
  public BuildingPlanFilterList;
  public BuildingSearch;
  dataModel: any;
  LoginTypeID;
  ProjectID: any;
  modifiedby: any;
  DistinctPlans: any;
  VersionLists: any;
  ngOnInit() {
    debugger;
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetBuildingPlansLanguage(this.selectedlanguage);
    this.GetBuildingPlanList(this.selectedlanguage);
    this.GetBuildinglist(this.selectedlanguage);
    this.GetUploadedBy();

    this.fmsservice.GetDistinctBuildingPlanList(1).subscribe(
      res => {
        debugger;
        this.DistinctPlans = res;
      }
    )


    this.fmsservice.GetVersionMaster().subscribe(
      res => {
        debugger;
        this.VersionLists = res;
      }
    )
  }

  UploadedByssss
  public GetUploadedBy() {
    debugger
    this.fmsservice.GetUploadedBy().subscribe(
      res => {
        debugger;
        this.UploadedByssss = res;
      }
    )

  }




  public GetBuildingPlansLanguage(languageid) {
    this.fmsservice.GetBuildingPlansLanguage(languageid).subscribe(
      res => {

        this.buildingPlansTitle = res[0].buildingPlansTitle;
        this.buildingPlans_BreadChrumb = res[0].buildingPlans_BreadChrumb;
        this.buildingPlans_AddNewButton = res[0].buildingPlans_AddNewButton;
        this.buildingPlans_Building = res[0].buildingPlans_Building;
        this.buildingPlans_PlanName = res[0].buildingPlans_PlanName;
        this.buildingPlans_Plans = res[0].buildingPlans_Plans;
        this.buildingPlans_Actions = res[0].buildingPlans_Actions;
        this.pageMenuTitle = res[0].pageMenuTitle;
      }
    )
  }

  public GetBuildingPlanList(languageid) {
    debugger
    this.fmsservice.GetBuildingPlanList(languageid).subscribe(
      res => {
        debugger;
        this.BuildingPlanList = res;
        this.BuildingPlanFilterList = this.BuildingPlanList.filter(x => x.buildingID == this.ProjectID);
        debugger

        for (var i = 0; i < this.BuildingPlanFilterList.length; i++) {
          debugger
          if (this.BuildingPlanFilterList[i].buildingPlan.includes(".pdf")) {
            this.BuildingPlanFilterList[i]['frame'] = 1
          }
          else if (this.BuildingPlanFilterList[i].buildingPlan.includes(".xlsx")) {
            this.BuildingPlanFilterList[i]['frame'] = 2
          }
          else {
            this.BuildingPlanFilterList[i]['frame'] = 0
          }

        }

      }
    )
  }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {

        this.Buildinglist = res

        this.Buildinglist.sort(function (a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            debugger
            return -1;
          }
          debugger
          if (nameA > nameB) {
            debugger
            return 1;
          }
          debugger
          // names must be equal
          return 0;
        });

        debugger
      }
    )
  }


  UploadedBy: any;

  public FilterByBuildingname(evn) {
    debugger;
    this.UploadedBy = evn.target.value;
    // if (evn.target.value == "none") {
    //   //this.GetBuildingPlanList(this.selectedlanguage)
    //   this.BuildingPlanFilterList = this.BuildingPlanList;
    // }
    // else {
    //   let selectedBuildingPlan = evn.target.value;
    //   this.BuildingPlanFilterList = this.BuildingPlanList.filter(x => x.buildingName == selectedBuildingPlan);

    // }

  }

  BuildingPlanName;
  DeleteBuildingPlan(ID, BuildingPlan) {
    debugger
    this.BuildingPlanName = BuildingPlan;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Building Plan!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsservice.Delete_BuildingPlan(ID).subscribe(data => {
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your Building Plan has been deleted.',
              'success'
            )

            this.GetBuildingPlansLanguage(this.selectedlanguage);
            this.GetBuildingPlanList(this.selectedlanguage);
            this.GetBuildinglist(this.selectedlanguage);
            this.InsertLoginDetails();
          }
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Building Plan is safe :)',
          'error'
        )
      }
    })

  }

  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Buidling Plan' + this.BuildingPlanName + ' Deleted',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Buidling Plan",
      "Action": 'Delete Building Plan',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }


  BuildingPlainsID: any;
  public Views(evn) {
    debugger;
    this.BuildingPlainsID = evn.id;
    localStorage.setItem('BuidingPlainsID', this.BuildingPlainsID);

    // window.location.href=""
  }

  ///////////////Start photo///////////////////////
  PlaneName: any;
  FileName: any;
  FileType: any;
  base64textString: any;
  public filenamedetails = [];
  public filetypedetails = [];
  public base64textStringdetails = [];
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




  Description: any;
  VersionNo: any;
  Isempty: boolean;
  InsertBuildingPlan() {
    debugger
    var Entity1 = {
      'PlanName': this.PlaneName,
      'BuildingID': localStorage.getItem('ProjectID'),
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
          'BuildingID': localStorage.getItem('ProjectID'),
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
          location.href = "#/BuildingPlans";
        }
      }
    }
  }



  public GetPlansDetails(data) {
    debugger;

    this.PlaneName = data.planName

  }

  public GetPlanName(evn) {
    debugger;
    if (evn.target.value == 'none') {
      this.fmsservice.GetBuildingPlanList(1).subscribe(
        res => {
          debugger;
          this.BuildingPlanList = res;
          this.BuildingPlanFilterList = this.BuildingPlanList.filter(x => x.buildingID == this.ProjectID);
          debugger

          for (var i = 0; i < this.BuildingPlanFilterList.length; i++) {
            debugger
            if (this.BuildingPlanFilterList[i].buildingPlan.includes(".pdf")) {
              this.BuildingPlanFilterList[i]['frame'] = 1
            }
            else if (this.BuildingPlanFilterList[i].buildingPlan.includes(".xlsx")) {
              this.BuildingPlanFilterList[i]['frame'] = 2
            }
            else {
              this.BuildingPlanFilterList[i]['frame'] = 0
            }

          }

        }
      )
    } else {
      this.fmsservice.GetBuildingPlanList(1).subscribe(
        res => {
          debugger;
          this.BuildingPlanList = res;
          this.BuildingPlanFilterList = this.BuildingPlanList.filter(x => x.buildingID == this.ProjectID && x.planName == evn.target.value);
          debugger

          for (var i = 0; i < this.BuildingPlanFilterList.length; i++) {
            debugger
            if (this.BuildingPlanFilterList[i].buildingPlan.includes(".pdf")) {
              this.BuildingPlanFilterList[i]['frame'] = 1
            }
            else if (this.BuildingPlanFilterList[i].buildingPlan.includes(".xlsx")) {
              this.BuildingPlanFilterList[i]['frame'] = 2
            }
            else {
              this.BuildingPlanFilterList[i]['frame'] = 0
            }

          }

        }
      )
    }
  }



  public GetVersionNo(evn) {

    if (evn.target.value == 'none') {
      this.fmsservice.GetBuildingPlanList(1).subscribe(
        res => {
          debugger;
          this.BuildingPlanList = res;
          this.BuildingPlanFilterList = this.BuildingPlanList.filter(x => x.buildingID == this.ProjectID);
          debugger

          for (var i = 0; i < this.BuildingPlanFilterList.length; i++) {
            debugger
            if (this.BuildingPlanFilterList[i].buildingPlan.includes(".pdf")) {
              this.BuildingPlanFilterList[i]['frame'] = 1
            }
            else if (this.BuildingPlanFilterList[i].buildingPlan.includes(".xlsx")) {
              this.BuildingPlanFilterList[i]['frame'] = 2
            }
            else {
              this.BuildingPlanFilterList[i]['frame'] = 0
            }

          }

        }
      )
    } else {
      this.fmsservice.GetBuildingPlanList(1).subscribe(
        res => {
          debugger;
          this.BuildingPlanList = res;
          this.BuildingPlanFilterList = this.BuildingPlanList.filter(x => x.buildingID == this.ProjectID && x.versionNo == evn.target.value);
          debugger

          for (var i = 0; i < this.BuildingPlanFilterList.length; i++) {
            debugger
            if (this.BuildingPlanFilterList[i].buildingPlan.includes(".pdf")) {
              this.BuildingPlanFilterList[i]['frame'] = 1
            }
            else if (this.BuildingPlanFilterList[i].buildingPlan.includes(".xlsx")) {
              this.BuildingPlanFilterList[i]['frame'] = 2
            }
            else {
              this.BuildingPlanFilterList[i]['frame'] = 0
            }

          }

        }
      )
    }

  }

}
