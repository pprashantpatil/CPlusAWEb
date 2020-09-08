import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-occupancy',
  templateUrl: './occupancy.component.html',
  styleUrls: ['./occupancy.component.css']
})
export class OccupancyComponent implements OnInit {

  constructor(public fmsservice: FmsService, private datePipe: DatePipe, public router: Router) { }
  public parkingAllotmentList;
  public Buildinglist;
  public BuildingID;
  public Floorlist;
  public FloorID;
  public Total;
  public FilteredparkingAllotmentList;
  public ShowDetails: Boolean;
  public Search;
  public TenentTypelist;
  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetBuildinglist(selectedlanguage);
    this.BuildingID = 80;
    this.ShowDetails = false;
    this.GetFloor(80);
    this.fmsservice.getTenentTypelistbyLanguage(selectedlanguage).subscribe(res => {

      this.TenentTypelist = res;

    })
  }

  public GetBuildinglist(languageID) {
    this.fmsservice.GetBuildinglist(languageID).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;
      }
    )
  }

  

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

  changeStatus(evn) {

    if (evn.currentTarget.checked) {
     
    }
    else {
      this.router.navigate(['/OccupancyListView']);
    }

  }

  public GetFloorID(evn) {
    debugger;
    this.FloorID = evn.target.value;

    if (this.FloorID == "none") {
      this.GettenantdetailsByUnit(this.BuildingID, 0);
    }

    else {
      //  this.GettenantdetailsByUnit(this.BuildingID, this.FloorID);

      this.fmsservice.GettenantdetailsByUnit(this.BuildingID, 0).subscribe(
        res => {
          debugger;
          this.parkingAllotmentList = res;
          this.FilteredparkingAllotmentList = this.parkingAllotmentList.filter(x => x.floorID == this.FloorID && x.tenantHidden!=1);
          // this.Total = this.FilteredparkingAllotmentList.length;
          // this.TenantCount = this.FilteredparkingAllotmentList.filter(x => x.booked == 2).length;
          // this.OwnerCount = this.FilteredparkingAllotmentList.filter(x => x.booked == 3).length;



        }
      )
    }

  }

  TypeID
  public GetType(evn) {
    debugger;
    this.TypeID = evn.target.value;

    this.FilteredparkingAllotmentList = this.parkingAllotmentList.filter(x => x.type == this.TypeID)
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

  public booked;
  public buildingID;
  public electricMeterNo;
  public floor;
  public floorID;
  public gasMeterNo;
  public leaseEndDate;
  public leaseStartDate;
  public maintenanceAmount;
  public noOfPets;
  public noOfResidents;
  public phoneNo;
  public profilePhoto;
  public rentPerMonth;
  public short;
  public tenantName;
  public unitID;
  public waterMeterNo;

  public ParkingDetails(evn) {
    debugger;
    this.booked = evn.booked;
    this.buildingID = evn.buildingID;
    this.electricMeterNo = evn.electricMeterNo;
    this.floor = evn.floor;
    this.floorID = evn.floorID;
    this.gasMeterNo = evn.gasMeterNo;
    this.leaseEndDate = this.datePipe.transform(evn.leaseEndDate, 'MMM d, y');
    this.leaseStartDate = this.datePipe.transform(evn.leaseStartDate, 'MMM d, y')
    this.maintenanceAmount = evn.maintenanceAmount;
    this.noOfPets = evn.noOfPets;
    this.noOfResidents = evn.noOfResidents;
    this.phoneNo = evn.phoneNo;
    this.profilePhoto = evn.profilePhoto;
    this.rentPerMonth = evn.rentPerMonth;
    this.short = evn.short;
    this.tenantName = evn.tenantName;
    this.unitID = evn.unitID;
    this.waterMeterNo = evn.waterMeterNo;
    if (evn.booked == 1) {
      this.ShowDetails = false;
    }
    else {
      this.ShowDetails = true;
    }
  }
}
