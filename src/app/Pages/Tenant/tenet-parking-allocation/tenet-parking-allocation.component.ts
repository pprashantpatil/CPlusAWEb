import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tenet-parking-allocation',
  templateUrl: './tenet-parking-allocation.component.html',
  styleUrls: ['./tenet-parking-allocation.component.css']
})
export class TenetParkingAllocationComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }
  public pageMenuTitle;
  public tenantParkingAllocation_PageTitle;
  public tenantParkingAllocation_BreadChrumb;
  public tenantParkingAllocation_Button;
  public tenantParkingAllocation_ALLOTTED;
  public tenantParkingAllocation_Name;
  public tenantParkingAllocation_Mobile;
  public tenantParkingAllocation_Unit;
  public tenantParkingAllocation_Floor;
  public tenantParkingAllocation_Slot;
  public tenantParkingAllocation_Allocate;
  public parkinglist;
  public filteredparkinglist;
  public buildinglist;
  public floorlist;
  public fascinglist;
  public SlotList;
  public facing;
  public Tenants;
  public tenantPhonenumber;
  public slotdetails = false;
  public newparking = false;
  selectedtenantImage;
  selectedtenantName;
  selectedtenantPhoneNumber;
  selectedtenantunit;
  selectedtenantfloor;
  selectedtenantslot;

  slotforallocation = [];
  selectedTenant;
  selectedTenantid;
  tenantunit;
  face: any;
  TenentNamesList: any;
  selectedlanguage: any;
  public floorid: any;


  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetTenantParkingAllocationLanguage(this.selectedlanguage);
    this.getbuildinglist(this.selectedlanguage);
    this.GetParkingAllottedForTenantlist();
    this.GetFacinglist(this.selectedlanguage);

    debugger;
    this.fmsservice.GetTenantList(this.selectedlanguage).subscribe(
      res => {

        this.TenentNamesList = res;
        // this.filteredtenantlist = this.TenantList;
      }
    )

  }

  // public TenentNamesList;
  // public GetTenantListByBuildingFloorID(BuildingID, FloorID, LanguageID) {
  //   debugger;
  //   //this.tenant.FloorID = floorid;
  //   this.fmsservice.GetTenantListByBuildingFloorID(BuildingID, FloorID, LanguageID).subscribe(res => {
  //     debugger;
  //     this.TenentNamesList = res;
  //   })
  // }

  public GetTenantParkingAllocationLanguage(languageid) {
    this.fmsservice.GetTenantParkingAllocationLanguage(languageid).subscribe(
      res => {

        this.pageMenuTitle = res[0].pageMenuTitle;
        this.tenantParkingAllocation_PageTitle = res[0].tenantParkingAllocation_PageTitle;
        this.tenantParkingAllocation_BreadChrumb = res[0].tenantParkingAllocation_BreadChrumb;
        this.tenantParkingAllocation_Button = res[0].tenantParkingAllocation_Button;
        this.tenantParkingAllocation_ALLOTTED = res[0].tenantParkingAllocation_ALLOTTED;
        this.tenantParkingAllocation_Name = res[0].tenantParkingAllocation_Name;
        this.tenantParkingAllocation_Mobile = res[0].tenantParkingAllocation_Mobile;
        this.tenantParkingAllocation_Unit = res[0].tenantParkingAllocation_Unit;
        this.tenantParkingAllocation_Floor = res[0].tenantParkingAllocation_Floor;
        this.tenantParkingAllocation_Slot = res[0].tenantParkingAllocation_Slot;
        this.tenantParkingAllocation_Allocate = res[0].tenantParkingAllocation_Allocate;


      }
    )
  }

  public GetParkingAllottedForTenantlist() {
    debugger;
    this.fmsservice.GetParkingAllottedForTenantlist1().subscribe(res => {
      debugger
      this.parkinglist = res;
      this.filteredparkinglist = this.parkinglist;
    })
  }

  public getbuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(res => {
      this.buildinglist = res;
    })
  }

  public getparkingslotsbybuildingid(evn) {
    debugger;
    let buildingid = evn.target.value;
    this.getfloorlist(buildingid);
    if (buildingid == "none") {
      this.filteredparkinglist = this.parkinglist;
    }
    else {
      this.filteredparkinglist = this.parkinglist.filter(x => x.building == buildingid);
    }
  }

  public getslotdetails(slotdetails) {
    this.slotdetails = true;
    debugger
    this.selectedtenantslot = slotdetails.slot;
    this.selectedtenantfloor = slotdetails.floor;
    this.selectedtenantunit = slotdetails.unitneme;
    this.selectedtenantPhoneNumber = slotdetails.tenantPhoneNumber;
    this.selectedtenantName = slotdetails.tenantName;
    this.selectedtenantImage = slotdetails.photoURL;


  }

  newparkingallocation() {
    if (this.newparking) {
      this.newparking = false;
    }
    else {
      this.newparking = true;
    }

  }
  getFloorlist(evnent) {
    let buildingid = evnent.target.value;
    debugger;

    // this.fmsservice.GetFloor(buildingid).subscribe(res => {
    //   debugger;
    //   this.floorlist = res;
    // })

    this.fmsservice.GetParkingTypebybuilding(buildingid).subscribe(res => {
      debugger;
      this.floorlist = res;
    });

    this.fmsservice.GetTenantList(this.selectedlanguage).subscribe(
      res => {

        this.TenentNamesList = res;

        var list = this.TenentNamesList.filter(x => x.buildingid == buildingid)
        debugger
        this.TenentNamesList = list
        debugger
      }
    )




  }

  GetFacinglist(LanguageID) {

    this.fmsservice.GetFacinglist(LanguageID).subscribe(res => {
      debugger;
      this.fascinglist = res;
    })
  }

  GetfacingtypeID(facingID) {
    debugger
    this.facing = facingID.target.value;
    debugger
  }

  GetSlotListByID(evn) {

    debugger;
    let floor_id = evn.target.value;
    let floordet = this.floorlist.filter(x => x.floorID == floor_id);
    let buildingdet = this.buildinglist.filter(x => x.id == floordet[0].building);
    let building_id = buildingdet[0].id;

    this.fmsservice.GetTenantSlotListByID1(building_id, floor_id).subscribe(res => {
      debugger;
      this.SlotList = res;
      if (res.length > 0) {
        debugger
        //this.facing = res[0].face;
        this.Tenants = this.parkinglist.filter(x => x.building == res[0].buildingID);
      }

      for (var i = 0; i < this.SlotList.length; i++) {
        debugger



        var list1: any = this.SlotList[i].exitTime;
        debugger
        var today: any = new Date();
        var Christmas: any = new Date(this.SlotList[i].exitDate);
        var list: any = new Date(this.SlotList[i].exitTime);
        debugger
        var diffMs = (Christmas - today); // milliseconds between now & Christmas
        var diffMs1 = (list - today); // milliseconds between now & Christmas
        var diffDays = Math.floor(diffMs / 86400000) + 1;
        var diffMins = Math.round(((diffMs1 % 86400000) % 3600000) / 60000); // minutes
        debugger


        if (this.SlotList[i].hidden == true || this.SlotList[i].tenenthidden == true) {
          debugger
          this.SlotList[i]['kkk'] = 0
        }

        else {
          if (list1 == null && this.SlotList[i].unit != undefined) {

            this.SlotList[i]['kkk'] = 2

          }


          else if (list1 == null && this.SlotList[i].unit == null) {
            this.SlotList[i]['kkk'] = 0
          }

          else {
            if (diffDays >= 0 && diffMins >= 0) {
              debugger

              this.SlotList[i]['kkk'] = 2

            }
            else if (diffDays > 0 && diffMins < 0) {
              debugger
              this.SlotList[i]['kkk'] = 2
            }

            else if (diffDays < 0 && diffMins > 0) {
              debugger
              this.SlotList[i]['kkk'] = 2
            }

            else {
              debugger
              this.SlotList[i]['kkk'] = 0
              this.SlotList[i]['tenantName'] = ''
              this.SlotList[i]['visitorPhoneNo'] = ''
              this.SlotList[i]['tenantPhoneNumber'] = ''



            }
          }

        }


        debugger
      }



    })

    this.getunitlist(floor_id);
    // this.GetTenantListByBuildingFloorID(building_id, floor_id, 1);

  }





  gettenatphonumber(evn) {
    debugger;
    let tentdetails = this.TenentNamesList.filter(x => x.id == evn.target.value);
    this.tenantPhonenumber = tentdetails[0].phoneNo;
    this.selectedTenant = tentdetails[0].tenantName;
    this.SelecttedUnitID = tentdetails[0].unit;
    this.selectedTenantid = evn.target.value;
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

  public SelecttedUnitID;
  public getunitid(UnitID) {
    debugger;
    this.SelecttedUnitID = UnitID
  }

  allocateParking() {
    debugger;
    for (let i = 0; i < this.slotforallocation.length; i++) {
      var slotentity = {
        Building: this.slotforallocation[i].buildingID,
        Floor: this.slotforallocation[i].floorID,
        Unit: this.SelecttedUnitID,
        TenantName: this.selectedTenant,
        PhoneNo: this.tenantPhonenumber,
        SlotID: this.slotforallocation[i].slotID,
        Type: 1,
        VisitorID: 0,
        TenantID: this.selectedTenantid
      }

      this.fmsservice.InsertParkingAllocation(slotentity).subscribe(res => {
        let result = res;
        debugger;
        Swal.fire("Parking Allocated Successfully");
      })


    }
    this.GetParkingAllottedForTenantlist();

  }


  public unitList;
  public getunitlist(floorid) {
    debugger;
    //this.tenant.FloorID = floorid;
    this.fmsservice.GetUnit_MasterbybID(this.floorlist[0].buildingID, floorid).subscribe(res => {
      debugger;
      this.unitList = res;
    })
  }

  public getfloorlist(buildingid) {
    debugger;
    this.fmsservice.GetFloor(buildingid).subscribe(res => {
      debugger;
      this.floorlist = res
    })
  }


  public getfloorid(even) {
    debugger
    this.floorid = even.target.value;
    
  }

}

