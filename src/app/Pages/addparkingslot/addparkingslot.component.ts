import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-addparkingslot',
  templateUrl: './addparkingslot.component.html',
  styleUrls: ['./addparkingslot.component.css']
})
export class AddparkingslotComponent implements OnInit {

  public addparkingTitle;
  public addparking_BreadChrumb;
  public pageMenuTitle;
  public addparkingBuilding;
  public addparkingFloor;
  public addparkingFacing;
  public addparking_ParkingSlots;
  public addParkingAllocate;
  selectedlanguage: any;
  Buildinglist: any;
  BuildingID: any;
  Floorlist: any;
  facinglist: any;
  floorID: any;
  facingID: any;
  noofslot: any;
  Isempty: any;

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }

  ngOnInit() {

    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetAddparkingslotLanguage(this.selectedlanguage);

    this.fmsservice.GetBuildinglist1(this.selectedlanguage).subscribe(data => {
      debugger
      this.Buildinglist = data;
    })


    this.fmsservice.GetFacingList(this.selectedlanguage).subscribe(data => {
      debugger
      this.facinglist = data;
    })
  }


  public GetAddparkingslotLanguage(languageid) {
    this.fmsservice.GetAddparkingslotLanguage(languageid).subscribe(
      res => {
        debugger;
        this.addparkingTitle = res[0].addparkingTitle;
        this.addparking_BreadChrumb = res[0].addparking_BreadChrumb;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.addparkingBuilding = res[0].addparkingBuilding;
        this.addparkingFloor = res[0].addparkingFloor;
        this.addparkingFacing = res[0].addparkingFacing;
        this.addparking_ParkingSlots = res[0].addparking_ParkingSlots;
        this.addParkingAllocate = res[0].addParkingAllocate;

      }
    )
  }


  getbuildingID(Building) {
    debugger
    this.BuildingID = Building.target.value
    debugger
    this.fmsservice.GetFloor(this.BuildingID).subscribe(data => {
      debugger
      this.Floorlist = data;
    })
  }

  getfloorID(floorID) {
    debugger
    this.floorID = floorID.target.value;
  }

  getfacingID(facingID) {
    debugger
    this.facingID = facingID.target.value;
  }


  InsertParkingType() {

    var man = {
      'Building': this.BuildingID,
      'Floor': this.floorID,
      //  'Facing':this.facingID,
      'NoOfSlots': this.noofslot,

    }

    let validate = this.fmsservice.isEmpty(man);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;


      debugger
    }


    else {
      debugger
      this.fmsservice.ExistParkingType(this.BuildingID, this.floorID, this.facingID).subscribe(data => {
        debugger
        if (data == 1) {

          Swal.fire("Already Parking Slot Had Been Allocated");

        }

        else {
          var filter = {
            'Building': this.BuildingID,
            'Floor': this.floorID,
            'Unit': "null",
            'Facing': 1,
            'NoOfSlots': this.noofslot,
            'LanguageID': this.selectedlanguage
          }


          this.fmsservice.InsertParkingType(filter).subscribe(data => {
            debugger
            if (data != undefined) {
              Swal.fire("Parking Slot Allocated Successfully");

              this.InsertLoginDetails();

              this.clear();
            }
          })


        }
      });
    }



  }


  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Parking Slots ' + ' Added',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Parking Slots",
      "Action": 'Add New Parking Slots',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        this.clear();
      }
    })

  }

  clear() {
    debugger
    this.Buildinglist.length = 0,
      this.Floorlist.length = 0,
      this.facinglist.length = 0,
      this.floorID = '',
      this.facingID = '',
      this.noofslot = ''

  }

}
