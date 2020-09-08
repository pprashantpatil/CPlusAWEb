import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ExportToCsv } from 'export-to-csv';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-occupancy-list-views',
  templateUrl: './occupancy-list-views.component.html',
  styleUrls: ['./occupancy-list-views.component.css']
})
export class OccupancyListViewsComponent implements OnInit {


  BuildingSearch: any;
  parkingAllotmentList: any;
  BuildingID: any;
  ConstructionStatusID:any;
  FilteredparkingAllotmentList: any;
  constructor(public fmsservice: FmsService, public datepipe: DatePipe, public router: Router) { }

  ngOnInit() {
    this.BuildingID=0;
    this.ConstructionStatusID=0;
    this.GetBuildinglist(1);
    this.fmsservice.GettenantdetailsByUnit(80, 0).subscribe(
      res => {
        debugger;
        this.parkingAllotmentList = res;
        this.FilteredparkingAllotmentList = this.parkingAllotmentList.filter(x => x.tenantHidden != 1);
        // this.Total = this.FilteredparkingAllotmentList.length;
        // this.TenantCount = this.FilteredparkingAllotmentList.filter(x => x.booked == 2).length;
        // this.OwnerCount = this.FilteredparkingAllotmentList.filter(x => x.booked == 3).length;

      }
    )
  }
  Buildinglist
  public GetBuildinglist(languageID) {
    this.fmsservice.GetBuildinglist(languageID).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;
      }
    )
  }
  Floorlist
  public GetFloor(evn) {
    debugger;
    if (evn.target) {
      this.BuildingID = evn.target.value;
    } else {
      this.BuildingID = evn;
    }
    // this.BuildingID = evn.target.value;
    this.fmsservice.GetFloor(this.BuildingID).subscribe(
      res => {
        debugger;
        this.Floorlist = res;
        this.GettenantdetailsByUnit(this.BuildingID, 0);
      }
    )
  }
  FloorID
  public GetFloorID(evn) {
    debugger;
    this.FloorID = evn.target.value;
    if (this.FloorID == "none") {
      this.GettenantdetailsByUnit(this.BuildingID, 0);
    }

    else {
      this.fmsservice.GettenantdetailsByUnit(this.BuildingID, 0).subscribe(
        res => {
          debugger;
          this.parkingAllotmentList = res;
          this.FilteredparkingAllotmentList = this.parkingAllotmentList.filter(x => x.floorID == this.FloorID && x.tenantHidden!=1);
        
        }
      )
    }

  }

  TenantCount;
  OwnerCount;
  public GettenantdetailsByUnit(BID, FID) {
    debugger;
    this.fmsservice.GettenantdetailsByUnit(BID, FID).subscribe(
      res => {
        debugger;
        this.parkingAllotmentList = res;
        this.FilteredparkingAllotmentList = this.parkingAllotmentList.filter(x=>x.tenantHidden!=1);
        // this.Total = this.FilteredparkingAllotmentList.length;
        // this.TenantCount = this.FilteredparkingAllotmentList.filter(x => x.booked == 2).length;
        // this.OwnerCount = this.FilteredparkingAllotmentList.filter(x => x.booked == 3).length;



      }
    )
  }


   public GetConstructionStatus(evn){
     debugger;

     if(evn.target.value=="NULL"){
      this.FilteredparkingAllotmentList = this.parkingAllotmentList.filter(x=>x.tenantHidden!=1 && x.tenantName==null && x.floorID==this.FloorID);
     }
     else{
      this.FilteredparkingAllotmentList = this.parkingAllotmentList.filter(x=>x.tenantHidden!=1 && x.constructionStatusID==evn.target.value&& x.floorID==this.FloorID);
     }
  
   }


  public GoToPaymentSchedule(evn) {
    debugger;
    evn.buildingID;
    evn.floorID;
    evn.id;
    this.router.navigate(['/PaymentSchedule', evn.buildingID, evn.floorID, evn.id]);
  }

}
