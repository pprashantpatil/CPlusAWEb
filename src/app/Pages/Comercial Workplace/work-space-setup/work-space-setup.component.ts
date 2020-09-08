import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-work-space-setup',
  templateUrl: './work-space-setup.component.html',
  styleUrls: ['./work-space-setup.component.css']
})
export class WorkSpaceSetupComponent implements OnInit {

  public pageMenuTitle;
  public workSpace_PageTitle;
  public workSpace_BreadChrumb;
  public workSpace_Floor;
  public workSpace_Unit;
  public workSpace_Save;
  public FloorsList;
  public BuildingFilterList;
  public Buildinglist;
  public FloorsFilterLists;
  public WSlist;
  public searchBuildinglist;
  public SelectedWSType;
  public floordetails = [];
  public Fulldetails = [];
  public FloorEntity = {
    FloorID: 0,
    BuildingID: 0,
    Floor: "",
    Unit: "",
    WorkStationType: 0
  }

  constructor(public fmsservice: FmsService) { }

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.getComercualWorkspaceLanguagebyID(selectedlanguage);
    this.GetFloorTypebyBID(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.Get_WorkStationType_Master(selectedlanguage);
  }
  getComercualWorkspaceLanguagebyID(id) {
    this.fmsservice.getCommercialWorkSpaceSetup(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.workSpace_PageTitle = res[0].workSpace_PageTitle;
        this.workSpace_BreadChrumb = res[0].workSpace_BreadChrumb;
        this.workSpace_Floor = res[0].workSpace_Floor;
        this.workSpace_Unit = res[0].workSpace_Unit;
        this.workSpace_Save = res[0].workSpace_Save;
      }

    )
  }

  public GetFloorTypebyBID(BID) {
    this.fmsservice.GetFloorTypebyBID(BID).subscribe(
      res => {
        debugger;
        this.FloorsList = res;

      }
    )
  }

  public GetBuildinglist(languageid) {
    debugger;
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        this.Buildinglist = res;
      }
    )
  }


  public Get_WorkStationType_Master(languageid) {
    debugger;
    this.fmsservice.Get_WorkStationType_Master(languageid).subscribe(
      res => {

        this.WSlist = res;

      }
    )
  }

  public FilterByBuildingname(evn) {
    debugger;
    let selectedBuildingID = evn.target.value;
    this.GetFloorTypebyBID(selectedBuildingID);
  }




  public Getfloorunitdetails(evn, Floor) {
    debugger;
    if (this.SelectedWSType != undefined || this.SelectedWSType == "") {
      let ffff = {
        "FloorID": Floor.id,
        "BuildingID": Floor.buildingID,
        "Floor": Floor.floor,
        "Unit": evn.target.value,
        "WorkStationType": this.SelectedWSType
      }
      this.floordetails.push(ffff);
    }
    else {
      Swal.fire("Please Select WorkStation Type!!");
      evn.target.value = "";
    }

  }

  public InsertWorkSpace_Master() {
    debugger;
    let test = this.floordetails;
    for (let i = 0; i < this.floordetails.length; i++) {
      this.fmsservice.InsertWorkSpace_Master(this.floordetails[i]).subscribe(res => {
        debugger;
      })
      Swal.fire('Workspace Setup Saved Sucessfully');
      this.Clear();
    }


  }

  public Clear() {
    debugger
    this.FloorEntity.FloorID = 0;
    this.FloorEntity.BuildingID = 0;
    this.FloorEntity.Floor = "";
    this.FloorEntity.Unit = "";
    this.FloorEntity.WorkStationType = 0;


  }

  public WSType(evn) {
    this.SelectedWSType = evn.target.value;
  }

  // public FilterByBuildingname(evn, buildingName) {
  //   debugger;
  //   let selectedBuildingID = evn;
  //   this.searchBuildinglist = buildingName;

  //   if (evn == undefined) {

  //   }
  //   else {
  //     this.GetFloorTypebyBID(selectedBuildingID);
  //   }
  //   document.getElementById("myDropdown").classList.toggle("show");
  // }

  // public searchWSlist;
  // public WSType(evn, WSName) {
  //   debugger;
  //   this.SelectedWSType = evn;
  //   this.searchWSlist = WSName;
  //   document.getElementById("myDropdown1").classList.toggle("show");
  // }
  // myFunction() {
  //   document.getElementById("myDropdown").classList.toggle("show");
  // }

  // myFunction1() {
  //   document.getElementById("myDropdown1").classList.toggle("show");
  // }
}
