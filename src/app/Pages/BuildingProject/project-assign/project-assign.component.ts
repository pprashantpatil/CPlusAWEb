import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-project-assign',
  templateUrl: './project-assign.component.html',
  styleUrls: ['./project-assign.component.css']
})
export class ProjectAssignComponent implements OnInit {

  constructor(public fmsService: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  ProjectAssignedLists;
  Search: any;
  Buildinglist: any;
  buildingid: any;
  buildingName: any;
  LoginTypeID
  public filenamedetails = [];
  public base64textStringdetails = [];
  FileName: any;
  FileType: any;
  base64textString: any;
  UserID: any
  ProjectID: any
  pickeroptions: any
  Contractorlist: any
  ngOnInit() {
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.UserID = localStorage.getItem('UserID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.buildingid = 0;
    this.StatusID="none";
    this.Contractorid = 0;
    this.fmsService.Get_SubContractor().subscribe(data => {
      debugger
      let temp: any = data;
      this.Contractorlist = temp.filter(x => x.companyID == 1);
    })

    if (this.LoginTypeID == 4) {
      this.fmsService.GetProjectContractorAssign().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.conID == this.UserID && x.workdonebit != 2 && x.buildingID == this.ProjectID);
      })
    }
    else {
      this.fmsService.GetProjectContractorAssign().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.workdonebit != 2 && x.buildingID == this.ProjectID);
      })
    }


    this.fmsService.GetBuildinglist(1).subscribe(
      res => {
        debugger
        this.Buildinglist = res;
        this.buildingid = res[0].id;
        this.buildingName = res[0].name;

        this.Buildinglist.sort(function (a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {

            return -1;
          }

          if (nameA > nameB) {

            return 1;
          }

          // names must be equal
          return 0;
        });
      }

    );
  }

  datelist;
  startdate: Date;
  enddate: Date;
  value: any
  public selectedDate(value) {
    debugger
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    debugger
    if (this.LoginTypeID == 4) {
      this.fmsService.GetProjectContractorAssignByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.conID == this.UserID && x.workdonebit != 2 && x.buildingID == this.ProjectID);
      })
    }
    else {
      this.fmsService.GetProjectContractorAssignByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.workdonebit != 2 && x.buildingID == this.ProjectID);
      })
    }


  }


  // public fliterbuilding(evn) {
  //   debugger;
  //   this.buildingName = evn.target.value;
  //   if (this.buildingName == 0) {
  //     if (this.LoginTypeID == 4) {
  //       this.fmsService.GetProjectContractorAssign().subscribe(data => {
  //         debugger
  //         let temp: any = data;
  //         this.ProjectAssignedLists = temp.filter(x => x.conID == this.UserID && x.workdonebit != 2);
  //       })
  //     }
  //     else {
  //       this.fmsService.GetProjectContractorAssign().subscribe(data => {
  //         debugger
  //         let temp: any = data;
  //         this.ProjectAssignedLists = temp.filter(x => x.workdonebit != 2);
  //       })
  //     }
  //   }
  //   else {
  //     if (this.LoginTypeID == 4) {
  //       this.fmsService.GetProjectContractorAssign().subscribe(data => {
  //         debugger
  //         let temp: any = data;
  //         this.ProjectAssignedLists = temp.filter(x => x.conID == this.UserID && x.buildingName == this.buildingName && x.workdonebit != 2);
  //       })
  //     }
  //     else {
  //       this.fmsService.GetProjectContractorAssign().subscribe(data => {
  //         debugger
  //         let temp: any = data;
  //         this.ProjectAssignedLists = temp.filter(x => x.buildingName == this.buildingName && x.workdonebit != 2);
  //       })
  //     }
  //   }
  // }

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
      this.FileName = FileName;
      this.FileType = FileType;


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

  public GetDetails(project) {
    debugger
    this.ProjectContractorAssignID = project.id;
  }
  public GetStageID(event) {
    debugger
    this.StageID = event.target.value;
  }

  StageList: any
  public GetStageDetails(project) {
    debugger
    this.ProjectContractorAssignID = project.id;
    this.fmsService.GetBuildingStages().subscribe(data => {
      debugger
      this.StageList = data;
    })
  }
  ProjectContractorAssignID
  WorkDate
  Comments
  public Save() {
    debugger

    var obj = {
      "ProjectContractorAssignID": this.ProjectContractorAssignID,
      "WorkDate": this.WorkDate,
      "Comments": this.Comments,
    }
    this.fmsService.InsertProjectContractorAssign_work(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        debugger;
        this.InsertDetails();
        Swal.fire("Work Updated Successfully");
        this.clear();
      }
    })
  }
  StageID
  public SaveStageDetails() {
    debugger

    var obj = {
      "StageID": this.StageID,
      "ProjectContractorAssignID": this.ProjectContractorAssignID,
      "WorkDate": this.WorkDate,
      "Comments": this.Comments,
    }
    this.fmsService.InsertProjectContractorAssign_workStage(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        debugger;
        this.InsertDetails();
        Swal.fire("Stage Complete Details Saved Successfully");
        this.clear();
        this.ngOnInit();
      }
    })
  }

  public InsertDetails() {
    debugger
    for (let j = 0; j < this.filenamedetails.length; j++) {
      var obj = {
        "ProjectContractorAssignID": this.ProjectContractorAssignID,
        "WorkDate": this.WorkDate,
        "Comments": this.Comments,
        "FileType": this.filenamedetails[j].ffile,
        "FileName": this.filenamedetails[j].fname,
        "modifieddate": new Date(),
        "Base64Data": this.filenamedetails[j].base[j]

      }
      debugger;
      this.fmsService.InsertProjectContractorAssign_workPhotos(obj).subscribe((data) => {
        if (data != null && data != undefined) {
          debugger;
        }
      })


    }

  }
  public clear() {
    this.filenamedetails = [];
    this.WorkDate = '';
    this.Comments = ''
  }
  Contractorid
  public GetContractorID(event) {
    debugger
    this.Contractorid = event.target.value;
    if (this.Contractorid == 0) {
      if (this.LoginTypeID == 4) {
        this.fmsService.GetProjectContractorAssign().subscribe(data => {
          debugger
          let temp: any = data;
          this.ProjectAssignedLists = temp.filter(x => x.conID == this.UserID && x.workdonebit != 2 && x.buildingID == this.ProjectID);
        })
      }
      else {
        this.fmsService.GetProjectContractorAssign().subscribe(data => {
          debugger
          let temp: any = data;
          this.ProjectAssignedLists = temp.filter(x => x.workdonebit != 2 && x.buildingID == this.ProjectID);
        })
      }
    }
    else {
      if (this.LoginTypeID == 4) {
        this.fmsService.GetProjectContractorAssign().subscribe(data => {
          debugger
          let temp: any = data;
          this.ProjectAssignedLists = temp.filter(x => x.conID == this.UserID && x.workdonebit != 2 && x.buildingID == this.ProjectID && x.conID == this.Contractorid);
        })
      }
      else {
        this.fmsService.GetProjectContractorAssign().subscribe(data => {
          debugger
          let temp: any = data;
          this.ProjectAssignedLists = temp.filter(x => x.workdonebit != 2 && x.buildingID == this.ProjectID && x.conID == this.Contractorid);
        })
      }
    }
  }
  StatusID
  public GetStatusID(event) {
    this.StatusID = event.target.value;
    if (this.StatusID == "none") {
      if (this.LoginTypeID == 4) {
        this.fmsService.GetProjectContractorAssign().subscribe(data => {
          debugger
          let temp: any = data;
          this.ProjectAssignedLists = temp.filter(x => x.conID == this.UserID && x.workdonebit != 2 && x.buildingID == this.ProjectID);
        })
      }
      else {
        this.fmsService.GetProjectContractorAssign().subscribe(data => {
          debugger
          let temp: any = data;
          this.ProjectAssignedLists = temp.filter(x => x.workdonebit != 2 && x.buildingID == this.ProjectID);
        })
      }

    }
    else {
      if (this.LoginTypeID == 4) {
        this.fmsService.GetProjectContractorAssign().subscribe(data => {
          debugger
          let temp: any = data;
          this.ProjectAssignedLists = temp.filter(x => x.conID == this.UserID && x.workdonebit != 2 && x.buildingID == this.ProjectID && x.statusID == this.StatusID);
        })
      }
      else {
        this.fmsService.GetProjectContractorAssign().subscribe(data => {
          debugger
          let temp: any = data;
          this.ProjectAssignedLists = temp.filter(x => x.workdonebit != 2 && x.buildingID == this.ProjectID && x.statusID == this.StatusID);
        })
      }
    }

  }

}
