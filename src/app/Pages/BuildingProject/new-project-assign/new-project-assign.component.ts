import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { document } from 'ngx-bootstrap';
import { stringify } from 'querystring';

@Component({
  selector: 'app-new-project-assign',
  templateUrl: './new-project-assign.component.html',
  styleUrls: ['./new-project-assign.component.css']
})
export class NewProjectAssignComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe, private router: Router) { }
  Buildinglist: any;
  dropdownSettings = {}
  public UserRoleList = [];
  public Entity = {
    BuildingID: 0,
    VendorID: 0,
    // StageID: 0,
    Comments: "",
    StartDate: "",
    EndDate: "",
    Units: "",
    FloorID: 0
  }
  UserID: any;
  ProjectID: any;
  FloorList: any
  ngOnInit() {

    this.UserID = localStorage.getItem('UserID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.fmsservice.GetFloorTypebyBID(this.ProjectID).subscribe(
      res => {
        this.FloorList = res;
      }
    )
    // this.GetUnit_MasterByBuildingID(this.ProjectID);



    this.GetBuildingStages();
    this.GetBuildinglist(1);
    this.getvendorlist(1);

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

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        this.Buildinglist = res.filter(x => x.companyID == this.UserID && x.id == localStorage.getItem('ProjectID'));
      }
    )
  }
  vendorlist
  getvendorlist(languageid) {
    this.fmsservice.Get_SubContractor().subscribe(res => {
      debugger;
      this.vendorlist = res.filter(x => x.companyID == localStorage.getItem('UserID'));
    })
  }

  StagesLists
  GetBuildingStages() {
    this.fmsservice.GetBuildingStages().subscribe(res => {
      debugger;
      this.StagesLists = res;
    })
  }


  public GetBuildingID(evn) {
    let BuildingID = evn.target.value;
    // this.GetUnit_MasterbyfloorID(BuildingID)
  }
  public GetFloorID(evn) {
    this.Entity.FloorID = evn.target.value;
    this.GetUnit_MasterbyfloorID(evn.target.value)
  }


  public GetUnit_MasterbyfloorID(FloorID) {
    this.fmsservice.GetUnit_MasterbyfloorID(FloorID).subscribe(
      res => {
        this.UserRoleList = res;
      }
    )
  }


  public InsertBuildingStagesMaster() {
    debugger

    if (this.selecteditemlist.length == 0) {
      this.Entity.BuildingID = this.ProjectID;
      this.fmsservice.InsertProjectContractorAssign(this.Entity).subscribe(res => {
        debugger;
        Swal.fire('Successfully Saved!');
        this.Clear();
        this.router.navigate(['/Project']);
      })
    }
    else {
      this.Entity.BuildingID = this.ProjectID;
      for (let i = 0; i < this.selecteditemlist.length; i++) {
        this.Entity.Units = this.selecteditemlist[i].unitID
        this.fmsservice.InsertProjectContractorAssign(this.Entity).subscribe(res => {
          debugger;
          Swal.fire('Successfully Saved!');
          this.Clear();
          this.router.navigate(['/Project']);
        })
      }
    }

  }

  public Clear() {
    this.Entity.BuildingID = 0;
    this.Entity.VendorID = 0;
    this.Entity.FloorID = 0;
    // this.Entity.StageID = 0;
    this.Entity.StartDate = "",
      this.Entity.EndDate = "",
      this.Entity.Comments = "",
      this.Entity.Units = ""
  }

}
