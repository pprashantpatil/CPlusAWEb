import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-parking-allocation',
  templateUrl: './new-parking-allocation.component.html',
  styleUrls: ['./new-parking-allocation.component.css']
})
export class NewParkingAllocationComponent implements OnInit {
  public pageMenuTitle;
  public visitorParkingAllocation_PageTitle;
  public visitorParkingAllocation_BreadChrumb;
  public visitorParkingAllocation_Button;
  public visitorParkingAllocation_pagemenutitle;
  public visitorParkingAllocation_buildingname;
  public visitorParkingAllocation_parkingslots;
  public buildinglist;
  public parkinglist;
  filteredparkinglist;

  selectedtenantslot;
  selectedtenantfloor;
  selectedtenantunit;
  selectedtenantPhoneNumber;
  selectedtenantName;
  selectedtenantImage;
  selectedVisitor;
  visitorid = 0;

  public slotdetails = false;
  public newparking = false;
  floorlist;
  SlotList;
  Tenants;
  visitorList;
  visitorPhonenumber;
  slotforallocation = [];

 // selectedvisitor;

  constructor(public fmsservice: FmsService) { }

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetvisitorParkingAllocationLanguage(selectedlanguage);
    this.getbuildinglist(selectedlanguage);
    this.GetParkingAllottedlist();
  }
  public GetvisitorParkingAllocationLanguage(languageid) {
    this.fmsservice.GetParkingLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.visitorParkingAllocation_PageTitle = res[0].parkingTitle;
        this.visitorParkingAllocation_BreadChrumb = res[0].parking_BreadChrumb;
        this.visitorParkingAllocation_Button = res[0].parking_AddNewButton;
        this.visitorParkingAllocation_pagemenutitle = res[0].tenantParkingAllocation_ALLOTTED;
        this.visitorParkingAllocation_buildingname = res[0].parking_BuildingName;
        this.visitorParkingAllocation_parkingslots = res[0].parking_ParkingSlots;



      }
    )
  }

  public getbuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(res => {
      this.buildinglist = res;
    })
  }

  public GetParkingAllottedlist() {
    this.fmsservice.GetParkingAllottedForTenantlist().subscribe(res => {

      this.parkinglist = res;

      this.filteredparkinglist = this.parkinglist;
    })
  }

  buildingid
  public getparkingslotsbybuildingid(evn) {
    debugger;
     this.buildingid = evn.target.value;
    if (this.buildingid == "none") {
      this.filteredparkinglist = this.parkinglist;
    }
    else {
      this.filteredparkinglist = this.parkinglist.filter(x => x.building == this.buildingid);
    }
  }
  public getslotdetails(slotdetails) {
    this.slotdetails = true;
    debugger
    this.selectedtenantslot = slotdetails.slot;
    this.selectedtenantfloor = slotdetails.floor;
    this.selectedtenantunit = slotdetails.unit;
    this.selectedtenantPhoneNumber = slotdetails.tenantPhoneNumber;
    this.selectedtenantName = slotdetails.tenantName;
    this.selectedtenantImage = slotdetails.photoURL;


  }
  newparkingallocation() {
    this.newparking = true;
  }
  getFloorlist(evnent) {
    let buildingid = evnent.target.value;
    debugger;

    this.fmsservice.GetFloor(buildingid).subscribe(res => {
      debugger;
      this.floorlist = res;
      this.GetVisitorbytodaydate(buildingid);
    })
  }
  GetSlotListByID(evn) {

    debugger;
    let floor_id = evn.target.value;
    let floordet = this.floorlist.filter(x => x.id == floor_id);
    let buildingdet = this.buildinglist.filter(x => x.id = floordet[0].buildingID);
    let building_id = buildingdet[0].id;

    this.fmsservice.GetSlotListByID(building_id, floor_id).subscribe(res => {
      debugger;
      this.SlotList = res;


      this.Tenants = this.parkinglist.filter(x => x.building == res[0].building);
    })
  }

  GetVisitorbytodaydate(buildingid) {
    debugger;
    this.fmsservice.GetVisitorbytodaydate(buildingid).subscribe(res => {
      this.visitorList = res;

    })
  }
  getvisitorphonumber(evn) {
    debugger;
    let visitordetails = this.visitorList.filter(x => x.slotID == evn.target.value);
    this.visitorPhonenumber = visitordetails[0].visitorPhonenumber;
    // this.selectedTenant = tentdetails[0].tenantName;
  }
  onslotselect(even, slot) {
    debugger;
    if (even.target.checked == true) {

      this.slotforallocation.push(slot)
    }
    else {
      for (var i = this.slotforallocation.length - 1; i >= 0; i--) {
        if (this.slotforallocation[i].selectedslot == slot.id) {
          this.slotforallocation.splice(i, 1);
        }
      }
    }


  }

  allocateParking() {

    for (let i = 0; i < this.slotforallocation.length; i++) {
      var slotentity = {
        Building: this.slotforallocation[i].building,
        Floor: this.slotforallocation[i].floorID,
        Unit: "",
        TenantName: this.selectedVisitor,
        PhoneNo: this.visitorPhonenumber,
        SlotID: this.slotforallocation[i].id,
        Type: 2,
        VisitorID: this.visitorid,
        TenantID:null
      }

      this.fmsservice.InsertParkingAllocation(slotentity).subscribe(res => {
        let result = res;
        Swal.fire("Parking Allocated Successfully");
      })


    }

    
    this.getparkingslotsbybuildingid(this.buildingid);

  }
  getvisitordetails(evn) {
    let tentdetails = this.visitorList.filter(x => x.id == evn.target.value);
    this.visitorid = evn.target.value;
    //\this.tenantPhonenumber = tentdetails[0].tenantPhoneNumber;
    this.selectedVisitor = tentdetails[0].tenantName;
  }

}
