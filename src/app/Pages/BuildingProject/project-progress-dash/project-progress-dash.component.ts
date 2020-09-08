import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-progress-dash',
  templateUrl: './project-progress-dash.component.html',
  styleUrls: ['./project-progress-dash.component.css']
})
export class ProjectProgressDashComponent implements OnInit {
  ProjectSearch: any;
  Projectlist: any;
  FilteredProjectList: any;
  photo: any;
  public pickeroptions: any;
  video = [];
  BuildingList: any;
  BuildingID: any;
  Buildingstageslist: any;
  stageID: any;
  StatusTypelist: any;
  statusID: any;
  CountVis: boolean;
  RejectComments: any;
  LoginTypeID: any;
  StaffID: any;
  FloorList: any
  ProjectID: any;
  value: any;
  Contractorlist: any
  Contractorid: any
  constructor(public fmsService: FmsService) { }

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
    this.CountVis = false;
    this.FloorID = 0;
    this.Contractorid = 0;
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.StaffID = localStorage.getItem('UserID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.fmsService.Get_SubContractor().subscribe(data => {
      debugger
      let temp: any = data;
      this.Contractorlist = temp.filter(x => x.companyID == localStorage.getItem('UserID'));
    })
    this.fmsService.GetFloorTypebyBID(this.ProjectID).subscribe(
      res => {
        this.FloorList = res;
      }
    )
    if (this.LoginTypeID == '1') {
      this.fmsService.GetBuildingProjectProgress().subscribe(data => {
        debugger
        this.Projectlist = data;
        this.FilteredProjectList = this.Projectlist.filter(x => x.staffID == this.StaffID && x.buildingID == this.ProjectID);
      })
    } else {
      this.fmsService.GetBuildingProjectProgress().subscribe(data => {
        debugger
        this.Projectlist = data;
        this.FilteredProjectList = this.Projectlist.filter(x => x.buildingID == this.ProjectID);
      })
    }



    this.fmsService.GetBuildinglist(1).subscribe(
      res => {
        debugger;
        this.BuildingList = res;
      }
    )


    this.fmsService.GetBuildingStages().subscribe(
      res => {
        debugger;
        this.Buildingstageslist = res;
      }
    )

    this.fmsService.GetStatusType().subscribe(
      res => {
        debugger;
        this.StatusTypelist = res;
      }
    )
  }


  getstage(data) {
    debugger

    this.stageID = data.target.value;
  }


  getstatusID(data) {
    debugger

    this.statusID = data.target.value;
  }

  CompletedStages
  getbuildingID(data) {
    debugger;
    this.CountVis = true;

    this.BuildingID = data.target.value;

    if (this.BuildingID == 0) {
      this.FilteredProjectList = this.Projectlist;
      this.CountVis = false;
    } else {
      this.FilteredProjectList = this.Projectlist.filter(x => x.buildingID == this.BuildingID)
      this.CompletedStages = this.FilteredProjectList.filter(x => x.buildingID == this.BuildingID && x.statusID == 2).length;

      this.fmsService.GetProjectProgressTracking(this.BuildingID).subscribe(
        res => {
          debugger;
          this.ProjectProgressTrackingList = res;
          this.CurMilestone = res[0].milestone

        }
      )
    }


  }


  // getphpto(data) {
  //   debugger
  //   this.photo = data;
  // }

  Invoicephoto
  GetInvoice(data) {
    debugger
    this.Invoicephoto = data;
  }

  // getVideo(data) {
  //   debugger
  //   this.video.length = 0
  //   this.video.push(data);
  //   debugger
  // }


  Progress(data) {
    debugger
    this.fmsService.UpdateBuildingProjectProgress(data, 15).subscribe(data => {
      debugger
      if (data != undefined) {
        this.fmsService.GetBuildingProjectProgress().subscribe(data => {
          debugger
          this.Projectlist = data;
          this.FilteredProjectList = this.Projectlist;
        })
      }
    })
  }

  ID
  Approve(data) {
    debugger
    this.ID = data;
  }

  ApprovalComments
  public UpdateBuildingProjectProgressApproval() {
    this.fmsService.UpdateBuildingProjectProgressApproval(this.ID, this.ApprovalComments).subscribe(data => {
      debugger;
      if (data != undefined) {
        this.fmsService.GetBuildingProjectProgress().subscribe(data => {
          debugger
          this.Projectlist = data;
          this.FilteredProjectList = this.Projectlist;
        })

        this.ApprovalComments = "";
        Swal.fire("Approved Successfully")
      }
    })
  }

  RID
  Reject(data) {
    debugger
    this.RID = data;
  }



  public UpdateBuildingProjectProgressReject() {
    this.fmsService.UpdateBuildingProjectProgressReject(this.RID, this.RejectComments).subscribe(data => {
      debugger;
      if (data != undefined) {
        this.fmsService.GetBuildingProjectProgress().subscribe(data => {
          debugger
          this.Projectlist = data;
          this.FilteredProjectList = this.Projectlist;
        })

        this.RejectComments = "";
        Swal.fire("Rejected Successfully")
      }
    })
  }

  Completed(data) {
    debugger

    this.fmsService.UpdateBuildingProjectProgress(data, 2).subscribe(data => {
      debugger
      if (data != undefined) {
        this.fmsService.GetBuildingProjectProgress().subscribe(data => {
          debugger
          this.Projectlist = data;
          this.FilteredProjectList = this.Projectlist;
        })
      }
    })

  }

  NorStarted(data) {
    debugger

    this.fmsService.UpdateBuildingProjectProgress(data, 16).subscribe(data => {
      debugger

      if (data != undefined) {


        this.fmsService.GetBuildingProjectProgress().subscribe(data => {
          debugger

          this.Projectlist = data;
          this.FilteredProjectList = this.Projectlist;
        })
      }
    })

  }


  ProjectProgressTrackingList;
  CurMilestone;
  public GetBuildingID(evn) {
    debugger;
    let BuildingID = evn.target.value;
    this.fmsService.GetProjectProgressTracking(BuildingID).subscribe(
      res => {
        debugger;
        this.ProjectProgressTrackingList = res;
        this.CurMilestone = res[0].milestone

      }
    )

  }

  videos
  public getVideo(id) {
    debugger
    this.fmsService.GetStaffUploadedVideos(id).subscribe(data => {
      debugger
      this.videos = data;
    })
  }


  photos
  public getphpto(id) {
    debugger
    this.fmsService.GetStaffUploadedPhotos(id).subscribe(data => {
      debugger
      this.photos = data;
    })
  }


  qcphotos
  public getQCphpto(id) {
    this.fmsService.GetBuildingProjectProgresQCApprovalPhotos(id).subscribe(data => {
      debugger
      this.qcphotos = data;
    })
  }

  video1 = [];
  public getQCVideo(data) {
    debugger;
    this.video1.length = 0
    this.video1.push(data);
    debugger
  }
  FloorID
  UserRoleList
  public GetFloorID(evn) {
    this.FloorID = evn.target.value;
    this.GetUnit_MasterbyfloorID(evn.target.value);
    if (this.FloorID == 0) {
      if (this.LoginTypeID == '1') {
        this.fmsService.GetBuildingProjectProgress().subscribe(data => {
          debugger
          this.Projectlist = data;
          this.FilteredProjectList = this.Projectlist.filter(x => x.staffID == this.StaffID && x.buildingID == this.ProjectID);
        })
      } else {
        this.fmsService.GetBuildingProjectProgress().subscribe(data => {
          debugger
          this.Projectlist = data;
          this.FilteredProjectList = this.Projectlist.filter(x => x.buildingID == this.ProjectID);
        })
      }
    }
    else {
      if (this.LoginTypeID == '1') {
        this.fmsService.GetBuildingProjectProgress().subscribe(data => {
          debugger
          this.Projectlist = data;
          this.FilteredProjectList = this.Projectlist.filter(x => x.staffID == this.StaffID && x.buildingID == this.ProjectID);
        })
      } else {
        this.fmsService.GetBuildingProjectProgress().subscribe(data => {
          debugger
          this.Projectlist = data;
          this.FilteredProjectList = this.Projectlist.filter(x => x.buildingID == this.ProjectID);
        })
      }
    }

  }
  public GetUnit_MasterbyfloorID(FloorID) {
    this.fmsService.GetUnit_MasterbyfloorID(FloorID).subscribe(
      res => {
        this.UserRoleList = res;
      }
    )
  }


  datelist: any;
  startdate: any;
  enddate: any;
  public selectedDate(value) {
    debugger
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    debugger

    this.fmsService.GetBuildingProjectProgressByDate(this.startdate, this.enddate).subscribe(data => {
      debugger
      this.Projectlist = data;
      this.FilteredProjectList = this.Projectlist.filter(x => x.buildingID == this.ProjectID);
    })
  }


}
