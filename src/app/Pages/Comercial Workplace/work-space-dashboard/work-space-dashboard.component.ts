import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
@Component({
  selector: 'app-work-space-dashboard',
  templateUrl: './work-space-dashboard.component.html',
  styleUrls: ['./work-space-dashboard.component.css']
})
export class WorkSpaceDashboardComponent implements OnInit {

  public pageMenuTitle;
  public workSpaceDashboard_PageTitle;
  public workSpaceDashboard_breadchrumb;
  public WorkSpaceDetails;
  public Buildinglist;
  public BuildingID;
  public Floorlist;
  public WSlist;
  public FloorID;
  public FilteredWorkSpaceDetails;
  public detailsofWs;



  public BookedBit;
  public WSName;
  public floorname;
  public WSid;
  public BuildingName;
  public TypeOfworkspace;
  public workSpaceID;
  public companyName;
  public email;
  public endDate;
  public endTime;
  public facilities;
  public mobileNumber;
  public name;
  public startDate;
  public startTime;
  public unit;
  public Status;
  public ShowDetails: boolean;

  constructor(public fmsservice: FmsService) { }

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetWorkSpaceDashboardLanguage(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.Get_WorkStationType_Master(selectedlanguage);
    this.ShowDetails = false;
  }

  GetWorkSpaceDashboardLanguage(id) {
    this.fmsservice.GetWorkSpaceDashboardLanguage(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.workSpaceDashboard_PageTitle = res[0].workSpaceDashboard_PageTitle;
        this.workSpaceDashboard_breadchrumb = res[0].workSpaceDashboard_breadchrumb;
      }
    )
  }
  public GetWorkSpaceDetails(BID, FID) {
    this.fmsservice.GetWorkSpaceDetails(BID, FID).subscribe(
      res => {
        debugger;
        this.WorkSpaceDetails = res;
        this.FilteredWorkSpaceDetails = this.WorkSpaceDetails;
      }
    )
  }

  public GetBuildinglist(languageID) {
    this.fmsservice.GetBuildinglist(languageID).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;
      }
    )
  }




  public WorkSpaceFilter(evn) {
    debugger;

    if (evn.target.value == "none") {

      this.FilteredWorkSpaceDetails = this.WorkSpaceDetails;
    }
    else {
      let SelectedType = evn.target.value;
      this.FilteredWorkSpaceDetails = this.WorkSpaceDetails.filter(x => x.short == SelectedType);

    }
  }

  public searchTypelist;
  // public WorkSpaceFilter(evn) {
  //   debugger;
  //   this.searchTypelist = evn;
  //   if (evn == undefined) {
  //     this.FilteredWorkSpaceDetails = this.WorkSpaceDetails;
  //   }
  //   else {
  //     let SelectedType = evn;
  //     this.FilteredWorkSpaceDetails = this.WorkSpaceDetails.filter(x => x.short == SelectedType);
  //   }
  //   document.getElementById("myDropdown2").classList.toggle("show");
  // }




  public Get_WorkStationType_Master(languageID) {
    this.fmsservice.Get_WorkStationType_Master(languageID).subscribe(
      res => {
        debugger;
        this.WSlist = res;
      }
    )
  }

  public GetWorkplaceRequestWeb(WorkStationID) {
    this.fmsservice.GetWorkplaceRequestWeb(WorkStationID).subscribe(
      res => {
        debugger;
        this.detailsofWs = res;
        this.companyName = res[0].company;
        this.email = res[0].email;
        this.endDate = res[0].endDate;
        this.endTime = res[0].endTime;
        this.facilities = res[0].facilities;
        this.mobileNumber = res[0].mobileNumber;
        this.name = res[0].name;
        this.startDate = res[0].startDate;
        this.startTime = res[0].startTime;
        this.unit = res[0].unit;


      }
    )
  }

  public WSDetails(evn) {
    debugger;
    this.BookedBit = evn.booked;
    if (this.BookedBit == 1) {
      this.Status = "Not Booked";
    }
    else {
      this.Status = "Booked";
    }

    this.WSName = evn.description;
    this.floorname = evn.floor;
    this.WSid = evn.id;
    this.BuildingName = evn.name;
    this.TypeOfworkspace = evn.short;
    this.workSpaceID = evn.workSpaceID;
    this.GetWorkplaceRequestWeb(this.WSid);
    this.ShowDetails = true;
  }

  public searchBuildinglist;
  public GetFloor(evn) {
    debugger;

    let building= this.Buildinglist.filter(x=>x.id==evn.target.value);
    this.searchBuildinglist = building[0].name ;
    this.BuildingID = evn.target.value;
    if (evn == undefined) {

    }
    else {
      this.fmsservice.GetFloor(this.BuildingID).subscribe(
        res => {
          debugger;
          this.Floorlist = res;

        }
      )
    }
    document.getElementById("myDropdown").classList.toggle("show");
  }

  public searchFloorlist;
  public GetFloorID(evn) {
    debugger;
    let floor = this.Floorlist.filter(x=>x.id==evn.target.value)
    // this.searchFloorlist =  FloorName;
    this.FloorID = evn.target.value;
    if (evn == undefined) {

    }
    else {
      this.GetWorkSpaceDetails(this.BuildingID, this.FloorID);
    }
    document.getElementById("myDropdown1").classList.toggle("show");
  }

  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  myFunction1() {
    document.getElementById("myDropdown1").classList.toggle("show");
  }

  myFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show");
  }

}
