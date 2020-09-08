import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
//import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors, Color } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { timer } from 'rxjs';


import { Router } from '@angular/router';

declare var zingchart: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public pageMenuTitle;
  public dashboard_BreadChrumb;
  public dashboard_Assigned;
  public dashboard_Completed;
  public dashboard_Closed;
  public dashboard_Open;
  public dashboard_ReOpen;
  public dashboard_MaintainanceRequest;
  public dashboard_ScheduledRequest;
  public dashboard_TransportRequest;
  public dashboard_TechnologyRequest;
  public dashboard_ProjectRequest;
  public dashboard_Pharmacy;
  public dashboard_Grocery;
  public BuildingList;
  public doughnutChartLabels: Label[];
  public ageingMonths = [
    { id: 1, Name: "Jan", Noofday: 31 },
    { id: 1, Name: "Feb", Noofday: 28 },
    { id: 1, Name: "March", Noofday: 31 },
    { id: 1, Name: "April", Noofday: 30 },
    { id: 1, Name: "May", Noofday: 31 },
    { id: 1, Name: "June", Noofday: 30 },
    { id: 1, Name: "July", Noofday: 30 },
    { id: 1, Name: "Aug", Noofday: 31 },
    { id: 1, Name: "Sep", Noofday: 30 },
    { id: 1, Name: "October", Noofday: 31 },
    { id: 1, Name: "Nov", Noofday: 30 },
    { id: 1, Name: "Dec", Noofday: 31 },
  ]



  ElectricalCount: number;
  WaterCount: number;
  MaintenanceCount: number;
  SecurityCount: number;
  NoOfUnitsCount: number;
  OccupiedCount: number;
  AvailableModalCount: number;
  ScheduledCount: number;
  MaintenanceModalCount: number;
  ItemsModalCount: number;
  ItemsQuantityModalCount: number;
  ExpiredItemsModalCount: number;
  ExpiringItemsModalCount: number;
  ActivePOModalCount: number;
  PendingOutstandingModalCount: number;
  VisitorsForTodayCount: number;
  VisitorListModalCount: number;
  GuestListModalCount: number;
  DeliveryModalCount: number;
  AmenitiesModalCount: number;
  AmenitiesModalCount1: number;
  TotalStaffModalCount: number;
  StaffLeavesModalCount: number;
  TenantsOccupiedModalCount: number;
  OwnersOccupiedModalCount: number;
  AssetsModalCount: number;
  AssetsModalCount1: number;
  VisitorsModalCount: number;
  NotExitedsModalCount: number;
  RentPendingModalCount: number;
  TenantParkingModalCount: number;
  Buildinglist: any;
  HandoverCount: any;
  UnderConstructionCount: any;
  ProjectAssignedLists: any;


  constructor(public fmsservice: FmsService, public router: Router) { }

  PaymentsGraph: boolean;
  StaffGraph: boolean;
  AssetsGraph: boolean;
  InventoryGraph: boolean;
  VendorGraph: boolean;
  VisitorGraph: boolean;
  TenantsGraph: boolean;
  BuildingStaffList: any[];
  HandedOverList: any;
  UnderConstructionList: any;
  RoomOwnersLists: any;
  RoomOwnersCount: any;
  parkingAllotmentList: any;
  FilteredparkingAllotmentList: any;
  NotSoldTotal: any;
  BuildingID: any;
  StagesList: any;
  VendorDetailsLists5
  FloorCount: any;
  innerWidth:any;
  MobUI:any;
  ngOnInit() {
    debugger;

    this.innerWidth = window.innerWidth;
    if (this.innerWidth == 360) {
      this.MobUI = 1;
      localStorage.setItem('MobUI', this.MobUI)
    } else {
      this.MobUI = 0;
      localStorage.setItem('MobUI', this.MobUI)

    }




    this.BuildingID = localStorage.getItem('ProjectID');
    if (this.BuildingID == 'undefined') {
      debugger;
      this.fmsservice.GetUnit_MasterDashborad(80).subscribe(
        res => {

          this.UnitsList = res;
          for (let i = 0; i < this.UnitsList.length; i++) {

            let iaavail = this.ProjectAssignedLists.filter(x => x.units == this.UnitsList[i].unitID);
            let iaavail_1 = this.UnitsList.filter(x => x.unitID == this.ProjectAssignedLists[i].units);

            if (iaavail.length > 0) {

              this.UnitsList[i]["isinprogress"] == true;
              this.isinprogress = true
            }
            else {

              this.UnitsList[i]["isinprogress"] == false;
              this.isinprogress = false;
            }
          }
        }
      )


      this.fmsservice.GetFloor(80).subscribe(
        res => {
          this.Floorlist = res;
        }
      )

      this.fmsservice.GetNoOfUnits(80).subscribe(
        res => {
          debugger;
          this.NoOfUnitsCount = res[0].total;
        }
      )

    }




    this.FloorID = 0;
    this.AllDetailsBuilding = true;
    this.fmsservice.GetFloor(this.BuildingID).subscribe(
      res => {

        this.Floorlist = res;
        this.FloorCount = this.Floorlist.length;
      }
    )

    this.fmsservice.GetUnit_MasterDashborad(this.BuildingID).subscribe(
      res => {

        this.UnitsList = res;
        for (let i = 0; i < this.UnitsList.length; i++) {

          let iaavail = this.ProjectAssignedLists.filter(x => x.units == this.UnitsList[i].unitID);
          let iaavail_1 = this.UnitsList.filter(x => x.unitID == this.ProjectAssignedLists[i].units);

          if (iaavail.length > 0) {

            this.UnitsList[i]["isinprogress"] == true;
            this.isinprogress = true
          }
          else {

            this.UnitsList[i]["isinprogress"] == false;
            this.isinprogress = false;
          }
        }
      }
    )


    this.fmsservice.GetNoOfUnits(this.BuildingID).subscribe(
      res => {
        debugger;
        this.NoOfUnitsCount = res[0].total
      }
    )



    this.GetBuildinglist(1);
    this.fmsservice.GetBuildingStages().subscribe(
      res => {

        this.StagesList = res;
      }
    )


    this.fmsservice.GetProjectContractorAssign().subscribe(data => {

      this.ProjectAssignedLists = data;
    })

  }


  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        this.Buildinglist = res;
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
    )
  }



  Floorlist;
  selectedBuilding;
  isinprogress: boolean;
  AllDetailsBuilding: boolean;
  public GetFloorByBuildingID(evn) {


    if (evn.target.value == 0) {
      this.AllDetailsBuilding = false;
    }
    else {
      this.AllDetailsBuilding = true;
    }

    this.selectedBuilding = evn.target.value;
    this.fmsservice.GetFloor(this.selectedBuilding).subscribe(
      res => {

        this.Floorlist = res;
      }
    )
    this.fmsservice.GetUnit_MasterDashborad(this.selectedBuilding).subscribe(
      res => {

        this.UnitsList = res;
        for (let i = 0; i < this.UnitsList.length; i++) {

          let iaavail = this.ProjectAssignedLists.filter(x => x.units == this.UnitsList[i].unitID);

          if (iaavail.length > 0) {

            this.UnitsList[i]["isinprogress"] == true;
            this.isinprogress = true
          }
          else {

            this.UnitsList[i]["isinprogress"] == false;
            this.isinprogress = false;
          }
        }
      }
    )



  }


  FloorID;
  UnitsList;
  public GetFloorID(evn) {
    this.FloorID = evn.target.value;

    if (this.FloorID == 0) {
      this.fmsservice.GetUnit_MasterDashborad(this.selectedBuilding).subscribe(
        res => {

          this.UnitsList = res;
        }
      )
    }
    else {
      this.fmsservice.GetUnit_MasterDashborad(this.BuildingID).subscribe(
        res => {

          this.UnitsList = res.filter(x => x.floorID == this.FloorID);
        }
      )
    }


  }

  StageID
  public GetStageID(evn) {

    this.StageID = evn.target.value;

    // this.fmsservice.GetUnit_MasterDashborad(this.BuildingID, this.FloorID, this.StageID).subscribe(
    //   res => {
    //     
    //     this.UnitsList = res;
    //   }
    // )
    // this.GetUnit_MasterDashborad(this.BuildingID, this.FloorID, this.StageID)
  }



  // public GetUnit_MasterDashborad(BuildingID, FloorID, StageID) {
  //   
  //   this.fmsservice.GetUnit_MasterDashborad(BuildingID, FloorID, StageID).subscribe(
  //     res => {
  //       
  //       this.UnitsList = res;
  //     }
  //   )
  // }

  BuildingName;
  UnitName;
  CurrentStage;
  WorkAssignedDate;
  CompletedDate;
  StaffWorkScheduleID
  StaffName;
  BuildingID1;
  StageID1;
  ApprovalStatus;
  projectComment;
  QCApprovalStatus;
  QCVis: boolean;
  StaffDetails1 = [];
  MaintainanceRequestVis: boolean;
  public GetRedHouseDetails(Data) {

    if (Data != undefined) {
      this.MaintainanceRequestVis = true;
      this.AfterVendorAssigned = false;
      this.AfterStaffAssigned = false;
      this.AfterCompletionOfWork = false;
      this.BlackVis = false;
      this.AssignedVis = false;
      this.BuildingName = Data.name;
      this.BuildingID1 = Data.buildingID;
      this.StageID1 = Data.stageID;
      this.UnitName = Data.unitID;
      this.CurrentStage = Data.milestone;
      this.WorkAssignedDate = Data.workScheduleDate;
      this.CompletedDate = Data.finishedDate;
      this.StaffWorkScheduleID = Data.staffWorkScheduleID;
      this.projectComment = Data.projectComment;
      this.VendorName = Data.vendorName
      this.StaffName = Data.staffName;

      this.fmsservice.GetCurrentStage(this.UnitName).subscribe(data => {
        debugger;
        this.StaffDetails = data;
        let completedpecentage = 0;

        this.StaffDetails1.length = 0;
        for (let i = 0; i < this.StaffDetails.length; i++) {
          if (this.StaffDetails[i].approval != false || this.StaffDetails[i].qcApproval != false) {
            completedpecentage = completedpecentage + data[i].unitWt;
            this.StaffDetails1.push(this.StaffDetails[i]);
          }
        }
        if (this.StaffDetails.length > 0) {
          this.StaffStageID = data[0].stageID
          this.milestone = data[0].milestone;
          this.unitWt = Math.round(completedpecentage);
          this.sDate = data[0].sDate;
          this.eDate = data[0].endDate;
          this.projectComment = data[0].projectComment;
          // this.qcVideosURL=data[0].qcVideosURL;
          this.getQCVideo(data[0].qcVideosURL);
        }
        else {
          this.StaffStageID = 0;
          this.milestone = "",
            this.unitWt = 0,
            this.sDate = "",
            this.eDate = "",
            this.projectComment = ""
        }


      })


      // this.fmsservice.GetCompletedStagesByUnit(this.UnitName).subscribe(data => {
      //   debugger;
      //   this.StaffDetails1 = data;
      //   if (this.StaffDetails1.length > 0) {
      //     this.stageName = data[0].stageName
      //    // this.unitWt = data[0].unitWt;
      //   }
      //   else {
      //     this.stageName = "";
      //     this.unitWt = 0

      //   }


      // })





      if (Data.qcReject == true) {
        this.QCApprovalStatus = 'Rejected'
        this.QCVis = true;
      }
      else if (Data.qcReject == false && Data.qcApproval == true) {
        this.QCApprovalStatus = 'Approved'
        this.QCVis = false;
      }
      else {
        this.QCApprovalStatus = '-'
      }


      if (Data.apProvalBIT == false && Data.rejectBIT == true) {
        this.ApprovalStatus = 'Rejected'
      }
      else {
        this.ApprovalStatus = 'Approved'
      }


      this.getphpto(Data.buildingProgressID);
      this.getVideo(Data.buildingProgressID);
      this.getQCphpto(Data.buildingProgressID);

      this.GetStagesVendorDetails(Data.buildingID, Data.stageID, Data.unitID);
      this.GetPrevVendorDetails(Data.buildingID, Data.unitID);

    }
    else {
      this.MaintainanceRequestVis = false;
      this.BlackVis = false;
      this.AssignedVis = false;
      this.AfterStaffAssigned = false;
      this.AfterVendorAssigned = false;
      this.AfterCompletionOfWork = false;
    }

  }

  photos = [];
  ImageOne: any;
  public getphpto(id) {

    this.fmsservice.GetStaffUploadedPhotos(id).subscribe(data => {

      this.photos = data;
      this.ImageOne = this.photos[0].photoURL
    })
  }

  videos
  public getVideo(id) {

    this.fmsservice.GetStaffUploadedVideos(id).subscribe(data => {

      this.videos = data;
    })
  }

  qcphotos
  public getQCphpto(id) {
    this.fmsservice.GetBuildingProjectProgresQCApprovalPhotos(id).subscribe(data => {

      this.qcphotos = data;
    })
  }

  video1 = [];
  public getQCVideo(data) {

    this.video1.length = 0
    this.video1.push(data);

  }
  AssignedVis: boolean;
  public GetBlackHome(evn) {

    let sdj = evn;
    this.MaintainanceRequestVis = false;
    this.AfterCompletionOfWork = false;
    if (evn.stageID == null) {
      this.BlackVis = true;
      this.MaintainanceRequestVis = false;
      this.AssignedVis = false;
      this.AfterStaffAssigned = false;
      this.AfterVendorAssigned = false;
      this.AfterCompletionOfWork = false;
    }
    else {
      this.BlackVis = false;
      this.MaintainanceRequestVis = false;
      this.AssignedVis = true;
      this.AfterStaffAssigned = false;
      this.AfterVendorAssigned = false;
      this.AfterCompletionOfWork = false;
    }
  }

  StaffDetails: any;
  sDate: any;
  eDate: any;
  unitWt: any;
  AfterVendorAssigned: boolean;
  AfterStaffAssigned: boolean;
  StaffStageID: any;
  StaffDetails2: any;
  public GetBlueVendorAssigned(evn) {
    debugger;
    if (evn.vendo != null && evn.staffWorkScheduleID == null) {
      this.AfterVendorAssigned = true;
      this.AfterStaffAssigned = false;
      this.MaintainanceRequestVis = false;
      this.BlackVis = false;
      this.AssignedVis = false;
      this.AfterCompletionOfWork = false;
      this.units = evn.unitID;
      this.VendorName = evn.vendorName;
      this.StageStartDate = evn.startDate;
      this.StageEndDate = evn.endDate;
      this.WorkAssignedDate = evn.workScheduleDate;
      this.CompletedDate = evn.finishedDate;
      if (evn.qcReject == true) {
        this.QCApprovalStatus = 'Rejected'
        this.QCVis = true;
      }
      else if (evn.qcReject == false && evn.qcApproval == true) {
        this.QCApprovalStatus = 'Approved'
        this.QCVis = false;
      }
      else {
        this.QCApprovalStatus = '-'
      }


      if (evn.apProvalBIT == false && evn.rejectBIT == true) {
        this.ApprovalStatus = 'Rejected'
      }
      else {
        this.ApprovalStatus = 'Approved'
      }


      this.getphpto(evn.buildingProgressID);
      this.getVideo(evn.buildingProgressID);
      this.getQCphpto(evn.buildingProgressID);
      this.fmsservice.GetCompletedStagesByUnit(this.units).subscribe(data => {

        this.StaffDetails1 = data;
        let completedpecentage = 0;

        for (let i = 0; i < this.StaffDetails1.length; i++) {

          if (this.StaffDetails1[i].approval != false || this.StaffDetails1[i].qcApproval != false) {
            completedpecentage = completedpecentage + data[i].unitWt;
          }
        }

        if (this.StaffDetails1.length > 0) {
          this.stageName = data[0].stageName
          this.unitWt = completedpecentage;
        }
        else {
          this.stageName = "";
          this.unitWt = 0
        }
      })
      // this.GetStagesVendorDetails(evn.buildingID, evn.vendorStage, evn.unitID);
      //this.GetPrevVendorDetails(evn.buildingID, evn.unitID);
      this.fmsservice.GetPrevVendorDetails(evn.buildingID, evn.unitID).subscribe(data => {

        this.VendorDetailsLists = data;

        if (this.VendorDetailsLists.length > 0) {
          this.TableVisible = true;
        }
        else {
          this.TableVisible = false;
        }
      })

    }
    else {
      this.AfterVendorAssigned = false;
      this.AfterStaffAssigned = true;
      this.MaintainanceRequestVis = false;
      this.BlackVis = false;
      this.AssignedVis = false;
      this.AfterCompletionOfWork = false;
      this.BuildingNames = evn.name;
      this.unit = evn.unitID;
      this.VendorName = evn.vendorName;
      this.StageStartDate = evn.startDate;
      this.StageEndDate = evn.endDate;
      this.StaffName = evn.staffName;
      this.WorkAssignedDate = evn.workScheduleDate;
      this.CompletedDate = evn.finishedDate;

      this.getphpto(evn.buildingProgressID);
      this.getVideo(evn.buildingProgressID);
      this.getQCphpto(evn.buildingProgressID);

      this.fmsservice.GetCurrentStage(this.unit).subscribe(data => {
        debugger;
        this.StaffDetails = data;
        if (this.StaffDetails.length > 0) {
          this.StaffStageID = data[0].stageID;

          this.milestone = data[0].milestone;
          this.unitWt = data[0].unitWt;
          this.sDate = data[0].sDate;
          this.eDate = data[0].endDate;
          this.projectComment = data[0].projectComment;
          this.getQCVideo(data[0].qcVideosURL);
        }
        else {
          this.StaffStageID = 0;
          this.milestone = "",
            this.unitWt = 0,
            this.sDate = "",
            this.eDate = "",
            this.projectComment = ""
        }


      })

      this.fmsservice.GetCompletedStagesByUnit(this.unit).subscribe(data => {

        this.StaffDetails2 = data.filter(x => x.stageName != this.milestone);
        let completedpecentage = 0;

        for (let i = 0; i < this.StaffDetails2.length; i++) {

          if (this.StaffDetails2[i].approval != false || this.StaffDetails2[i].qcApproval != false) {
            completedpecentage = completedpecentage + data[i].unitWt;
          }

          if (this.StaffDetails2[i].approval == true) {
            this.ApprovalStatus = 'Approved'
          }
          else {
            this.ApprovalStatus = 'Rejected'
          }

          if (this.StaffDetails2[i].qcApproval == true) {
            this.ApprovalStatus = 'Rejected'
          }
          else {
            this.ApprovalStatus = 'Approved'
          }








        }
        if (this.StaffDetails2.length > 0) {
          this.stageName = data[0].stageName
          this.unitWt = completedpecentage;
        }
        else {
          this.stageName = "";
          this.unitWt = 0

        }


      })


      // if (evn.qcReject == true) {
      //   this.QCApprovalStatus = 'Rejected'
      //   this.QCVis = true;
      // }
      // else if (evn.qcReject == false && evn.qcApproval == true) {
      //   this.QCApprovalStatus = 'Approved'
      //   this.QCVis = false;
      // }
      // else {
      //   this.QCApprovalStatus = '-'
      // }




      this.GetStagesVendorDetails(evn.buildingID, this.StaffStageID, evn.unitID);
      this.GetStagesStaffDetails(evn.buildingID, this.StaffStageID, evn.unitID);
      // this.fmsservice.GetPrevVendorDetails(evn.buildingID, evn.unitID).subscribe(data => {
      //   
      //   this.VendorDetailsLists = data;

      //   if (this.VendorDetailsLists.length > 0) {
      //     this.TableVisible = true;
      //   }
      //   else {
      //     this.TableVisible = false;
      //   }
      // })

    }

  }

  BlackVis: boolean
  public GetBlackHomeInc(evn) {

    if (evn.stageID == null) {
      this.BlackVis = false;
      this.MaintainanceRequestVis = false;
      this.AssignedVis = false;
      this.AfterVendorAssigned = false;
      this.AfterStaffAssigned = false;
      this.MaintainanceRequestVis = false;
      this.AfterCompletionOfWork = false;
    }
    else {
      this.BuildingName = evn.name;
      this.UnitName = evn.unitID;
      this.CurrentStage = evn.milestone;
      this.BlackVis = false;
      this.MaintainanceRequestVis = false;
      this.AssignedVis = true;
      this.AfterVendorAssigned = false;
      this.AfterStaffAssigned = false;
      this.MaintainanceRequestVis = false;
      this.AfterCompletionOfWork = false;
    }

  }


  BName;
  vendorName: any;
  AfterCompletionOfWork: boolean;
  Startdate: any;
  EndDate: any;
  public GetWorkCompletedDetails(evn) {
    debugger;

    this.AfterCompletionOfWork = true;
    this.BlackVis = false;
    this.MaintainanceRequestVis = false;
    this.AssignedVis = false;
    this.AfterVendorAssigned = false;
    this.AfterStaffAssigned = false;
    this.MaintainanceRequestVis = false;
    this.BuildingName = evn.name;
    this.BuildingID1 = evn.buildingID;
    this.StageID1 = evn.stageID;
    this.UnitName = evn.unitID;
    this.CurrentStage = evn.milestone;
    this.WorkAssignedDate = evn.workScheduleDate;
    this.CompletedDate = evn.finishedDate;
    this.StaffWorkScheduleID = evn.staffWorkScheduleID;
    this.projectComment = evn.projectComment
    this.StaffName = evn.staffName;
    this.vendorName = evn.vendorName;
    this.Startdate = evn.startDate;
    this.EndDate = evn.endDate;
    if (evn.apProvalBIT == false && evn.rejectBIT == true) {
      this.ApprovalStatus = 'Rejected'
    }
    else {
      this.ApprovalStatus = 'Approved'
    }
    this.getphpto(evn.buildingProgressID);
    this.getVideo(evn.buildingProgressID);
    this.GetStagesVendorDetails(evn.buildingID, evn.stageID, evn.unitID);
    this.GetPrevVendorDetails(evn.buildingID, evn.unitID);

  }



  VendorDetailsLists;
  VendorName;
  StageStartDate;
  StageEndDate;
  stageName;
  units
  public GetStagesVendorDetails(BuildID, StageID, Units) {

    this.fmsservice.GetStagesVendorDetails(BuildID, StageID, Units).subscribe(data => {

      this.VendorDetailsLists = data;
      this.VendorName = data[0].vendorName;
      this.StageStartDate = data[0].startDate;
      this.StageEndDate = data[0].endDate;
      this.units = data[0].units;
      this.stageName = data[0].stageName;

    })
  }



  StaffDetailsLists;
  StaffNames;
  unit;
  milestone;
  WorkDesc;
  BuildingNames;
  ReviewDate
  public GetStagesStaffDetails(BuildID, StageID, Units) {

    this.fmsservice.GetStagesStaffDetails(BuildID, StageID, Units).subscribe(data => {

      this.StaffDetailsLists = data;
      this.StaffNames = data[0].staffName;
      this.unit = data[0].unit;
      this.milestone = data[0].milestone;
      this.WorkDesc = data[0].workDescription;
      this.BuildingNames = data[0].buildingName;
      this.ReviewDate = data[0].reviewDate
    })
  }


  VendorDetailsLists1;
  TableVisible: boolean;
  public GetPrevVendorDetails(BuildID, Units) {

    this.fmsservice.GetPrevVendorDetails(BuildID, Units).subscribe(data => {

      this.VendorDetailsLists = data.filter;

      if (this.VendorDetailsLists.length > 0) {
        this.TableVisible = true;
      }
      else {
        this.TableVisible = false;
      }
    })
  }

  UnitID: any;
  PreviousStagesLists: any;
  ContractorName: any;
  public GetUnitName(evn) {
    debugger;
    this.UnitID = evn.unitID;
    this.ContractorName = evn.vendorName;
    this.fmsservice.GetBuildingStagesByUnit(this.UnitID).subscribe(data => {
      debugger
      let temp: any = data;
      this.PreviousStagesLists = temp;
    })

  }




  ngAfterViewInit() {
  }


}



