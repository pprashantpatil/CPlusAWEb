import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visitor-parking',
  templateUrl: './visitor-parking.component.html',
  styleUrls: ['./visitor-parking.component.css']
})
export class VisitorParkingComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }
  public pageMenuTitle;
  public visitorParkingLanguage_PageTitle;
  public visitorParkingLanguage_breadchrumb;
  public visitorParkingLanguage_button_NewParkingAllocation;
  public visitorParkingLanguage_button_allocate;
  public visitorParkingLanguage_ALLOTTEDPARKINGSLOTS;
  public visitorParkingLanguage_PARKINGLOTS;
  public visitorParkingLanguage_PhoneNumber;
  public visitorParkingLanguage_slot;
  public visitorParkingLanguage_Name;
  public visitorParkingLanguage_PhNumbe;
  public visitorParkingLanguage_Unit;
  public visitorParkingLanguage_Floor;
  public buildinglist;
  public parkinglist;

  selectvisitorname;
  selectvisitorphone;
  selectvisitortype;
  filteredparkinglist;
  visitorid = 0;
  unitID: any;

  selectedtenantslot;
  selectedtenantfloor;
  selectedtenantunit;
  selectedtenantPhoneNumber;
  selectedtenantName;
  selectedtenantImage;
  selectedVisitor;

  floorlist;
  visitorList;
  SlotList;
  Tenants;
  visitorPhonenumber;
  slotforallocation = [];
  tname: any;
  tphone: any;


  public slotdetails = false;
  public newparking = false;

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetVisitorParkingLanguageByLanguageID(selectedlanguage);
    this.getbuildinglist(selectedlanguage);
    this.getbuildinglist(selectedlanguage);
    this.GetParkingAllottedlist();
  }
  public GetVisitorParkingLanguageByLanguageID(languageid) {
    this.fmsservice.GetVisitorParkingLanguageByLanguageID(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.visitorParkingLanguage_PageTitle = res[0].visitorParkingLanguage_PageTitle;
        this.visitorParkingLanguage_breadchrumb = res[0].visitorParkingLanguage_breadchrumb;
        this.visitorParkingLanguage_button_NewParkingAllocation = res[0].visitorParkingLanguage_button_NewParkingAllocation;
        this.visitorParkingLanguage_button_allocate = res[0].visitorParkingLanguage_button_allocate;
        this.visitorParkingLanguage_ALLOTTEDPARKINGSLOTS = res[0].visitorParkingLanguage_ALLOTTEDPARKINGSLOTS;
        this.visitorParkingLanguage_PARKINGLOTS = res[0].visitorParkingLanguage_PARKINGLOTS;
        this.visitorParkingLanguage_PhoneNumber = res[0].visitorParkingLanguage_PhoneNumber;
        this.visitorParkingLanguage_slot = res[0].visitorParkingLanguage_slot;
        this.visitorParkingLanguage_Name = res[0].visitorParkingLanguage_Name;
        this.visitorParkingLanguage_PhNumbe = res[0].visitorParkingLanguage_PhNumbe;
        this.visitorParkingLanguage_Unit = res[0].visitorParkingLanguage_Unit;
        this.visitorParkingLanguage_Floor = res[0].visitorLanguage_Floor;
      }
    )
  }

  public getbuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(res => {
      debugger;
      this.buildinglist = res;
    })
  }

  newparkingallocation() {

    if (this.newparking) {
      this.newparking = false;
    } else {
      this.newparking = true;
    }

  }

  public getparkingslotsbybuildingid(evn) {
    debugger;
    let buildingid = evn.target.value;
    if (buildingid == "none") {
      this.filteredparkinglist = this.parkinglist;
      debugger
    }
    else {
      debugger
      this.filteredparkinglist = this.parkinglist.filter(x => x.building == parseInt(buildingid));
      debugger
    }
  }


  selectedVisitorPhoto
  public getslotdetails(slotdetails) {
    this.slotdetails = true;
    debugger
    this.selectedtenantslot = slotdetails.slot;
    this.selectedtenantfloor = slotdetails.floor;
    this.selectedtenantunit = slotdetails.unitneme;
    this.selectedtenantPhoneNumber = slotdetails.tenantPhoneNumber;
    this.selectedtenantName = slotdetails.tenantName;
    this.selectedtenantImage = slotdetails.photoURL;
    this.selectedVisitorPhoto = slotdetails.attachment;

    this.selectvisitorname = slotdetails.visitorperson;
    this.selectvisitorphone = slotdetails.visitorPhoneNo;
    this.selectvisitortype = slotdetails.visitortype;
    this.tname = slotdetails.tname
    this.tphone = slotdetails.tphone


  }
  getFloorlist(evnent) {
    let buildingid = evnent.target.value;
    debugger;

    this.fmsservice.GetParkingTypebybuilding(buildingid).subscribe(res => {
      debugger;
      this.floorlist = res;
      this.GetVisitorbytodaydate(buildingid);
    })
  }
  GetVisitorbytodaydate(buildingid) {
    debugger;
    this.fmsservice.GetVisitorbytodaydate(buildingid).subscribe(res => {
      debugger;
      this.visitorList = res;

    })
  }

  GetSlotListByID(evn) {

    debugger;
    let floor_id = evn.target.value;
    let floordet = this.floorlist.filter(x => x.floorID == floor_id);
    debugger
    let buildingdet = this.buildinglist.filter(x => x.id == floordet[0].building);
    let building_id = buildingdet[0].id;



    this.fmsservice.GetSlotListByID(building_id, floor_id).subscribe(res => {
      debugger;
      this.SlotList = res;

      this.Tenants = this.parkinglist.filter(x => x.building == res[0].building);

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
          debugger
          if (list1 == null && this.SlotList[i].unit != undefined) {
            debugger
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


      debugger


    })
  }
  getvisitordetails(evn) {
    debugger;
    let visitorDetails = this.visitorList.filter(x => x.id == evn.target.value);
    this.visitorid = evn.target.value;
    this.visitorPhonenumber = visitorDetails[0].visitorPhoneNo;
    this.selectedVisitor = visitorDetails[0].visitorName;
    this.unitID = visitorDetails[0].unit
  }

  onslotselect(even, slot) {
    debugger;
    if (even.target.checked == true) {

      this.slotforallocation.push(slot)
    }
    else {
      for (var i = this.slotforallocation.length - 1; i >= 0; i--) {
        if (this.slotforallocation[i].selectedslot == slot.slotID) {
          this.slotforallocation.splice(i, 1);
        }
      }
    }


  }

  allocateParking() {
    debugger;
    for (let i = 0; i < this.slotforallocation.length; i++) {
      var slotentity = {
        Building: this.slotforallocation[i].buildingID,
        Floor: this.slotforallocation[i].floorID,
        Unit: this.unitID,
        TenantName: this.selectedVisitor,
        PhoneNo: this.visitorPhonenumber,
        SlotID: this.slotforallocation[i].slotID,
        Type: 2,
        VisitorID: this.visitorid
      }

      this.fmsservice.InsertParkingAllocation(slotentity).subscribe(res => {
        debugger;
        let result = res;


      })


    }
    Swal.fire("Parking Allocated Successfully");
  }

  public GetParkingAllottedlist() {
    debugger
    this.fmsservice.GetParkingAllottedForTenantlist().subscribe(res => {
      debugger
      this.parkinglist = res;
      debugger


      for (var i = 0; i < this.parkinglist.length; i++) {
        debugger



        var list1: any = this.parkinglist[i].exitTime;
        debugger
        var today: any = new Date();
        var Christmas: any = new Date(this.parkinglist[i].exitDate);
        var list: any = new Date(this.parkinglist[i].exitTime);
        debugger
        var diffMs = (Christmas - today); // milliseconds between now & Christmas
        var diffMs1 = (list - today); // milliseconds between now & Christmas
        var diffDays = Math.floor(diffMs / 86400000) + 1;
        var diffMins = Math.round(((diffMs1 % 86400000) % 3600000) / 60000); // minutes
        debugger

        if (list1 == null) {

          this.parkinglist[i]['kkk'] = 2

        }

        else {
          if (diffDays >= 0 && diffMins >= 0) {
            debugger

            this.parkinglist[i]['kkk'] = 2

          }
          else if (diffDays > 0 && diffMins < 0) {
            debugger
            this.parkinglist[i]['kkk'] = 2
          }

          else if (diffDays < 0 && diffMins > 0) {
            debugger
            this.parkinglist[i]['kkk'] = 2
          }

          else {
            debugger
            this.parkinglist[i]['kkk'] = 0
            this.parkinglist[i]['tenantName'] = ''
            this.parkinglist[i]['visitorPhoneNo'] = ''
            this.parkinglist[i]['tenantPhoneNumber'] = ''
          }
        }
        debugger
      }





      this.filteredparkinglist = this.parkinglist;
    })
  }


}
