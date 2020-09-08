import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { AppModule } from 'src/app/app.module';
import { dateToLocalArray } from '@fullcalendar/core/datelib/marker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {
  public parkingTitle;
  public parking_BreadChrumb;
  public parking_AddNewButton;
  public pageMenuTitle;
  public parking_BuildingName;
  public parking_ParkingSlots;
  selectedlanguage: any;
  Buildinglist: any;
  flordetails: any;
  floorlist: any;
  slotList: any;
  building: any;
  floorID: any;
  buildingName: any;
  floorname: any;
  facinglist: any;
  facingID: any;
  slotList1: any;
  kkkk: any;
  shhooo: any;
  unitname: any;

  tenenrname;
  tenephone;
  tenunit;
  floor;
  ttype;
  tenphoto: any;
  validDate: any;
  validtime: any;
  Christmas: any;
  today: any;
  buildingid: any;
  public BuildingSearch;

  constructor(public fmsservice: FmsService, public datePipe: DatePipe) { }

  ngOnInit() {




    debugger

    this.validDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    this.validtime = this.datePipe.transform(new Date(), "HH:mm:ss")
    debugger
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetParkingLanguage(this.selectedlanguage);

    this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(
      res => {
        debugger
        this.Buildinglist = res;

        this.building = res[0].id;
        this.buildingName = res[0].name;
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
    );

    this.fmsservice.GetFacingList(this.selectedlanguage).subscribe(data => {
      debugger
      this.facinglist = data;
    });

    this.fmsservice.GetParkingSlots(74).subscribe(data1 => {
      debugger

      this.slotList = data1

      for (var i = 0; i < this.slotList.length; i++) {
        debugger

        if (this.slotList[i].hidden == true || this.slotList[i].tenenthidden == true) {
          debugger
          this.slotList[i]['kkk'] = 0
          this.slotList[i]['kkk'] = 0
          this.slotList[i]['tenantName'] = ''
          this.slotList[i]['visitorPhoneNo'] = ''
          this.slotList[i]['tenantPhoneNumber'] = ''
          this.slotList[i]['visitorName'] = ''
          this.slotList[i]['visitorphoto'] = ''
          this.slotList[i]['profilePhoto'] = ''

        }


        else {



          if (this.slotList[i].tenantName == null && this.slotList[i].visitorName == null) {
            debugger
            this.slotList[i]['kkk'] = 0
            this.slotList[i]['kkk'] = 0
            this.slotList[i]['tenantName'] = ''
            this.slotList[i]['visitorPhoneNo'] = ''
            this.slotList[i]['tenantPhoneNumber'] = ''
            this.slotList[i]['visitorName'] = ''
            this.slotList[i]['visitorphoto'] = ''
            this.slotList[i]['profilePhoto'] = ''
          }

          else if (this.slotList[i].tenantName != null && this.slotList[i].visitorName == null) {
            debugger
            this.slotList[i]['kkk'] = 1

          }

          else if (this.slotList[i].tenantName != null && this.slotList[i].visitorName != null) {
            debugger

            var today: any = new Date();
            var Christmas: any = new Date(this.slotList[i].exitDate);
            var list1: any = this.slotList[i].exitTime;
            var list: any = new Date(this.slotList[i].exitTime);
            var diffMs = (Christmas - today); // milliseconds between now & Christmas
            var diffMs1 = (list - today); // milliseconds between now & Christmas
            var diffDays = Math.floor(diffMs / 86400000) + 1;
            var diffMins = Math.round(((diffMs1 % 86400000) % 3600000) / 60000); // minutes

            if (list1 == null) {
              this.slotList[i]['kkk'] = 2
            }

            else {
              if (diffDays >= 0 && diffMins >= 0) {
                debugger

                this.slotList[i]['kkk'] = 2

              }
              else if (diffDays > 0 && diffMins < 0) {
                debugger
                this.slotList[i]['kkk'] = 2
              }

              else if (diffDays < 0 && diffMins > 0) {
                debugger
                this.slotList[i]['kkk'] = 2
              }

              else {
                debugger
                this.slotList[i]['kkk'] = 0
                this.slotList[i]['tenantName'] = ''
                this.slotList[i]['visitorPhoneNo'] = ''
                this.slotList[i]['tenantPhoneNumber'] = ''
                this.slotList[i]['visitorName'] = ''
                this.slotList[i]['visitorphoto'] = ''
                this.slotList[i]['profilePhoto'] = ''


              }
            }

          }
        }
      }
    })

    this.fmsservice.GetParkingAllottedFloors(74).subscribe(data => {
      debugger
      this.flordetails = data
      this.floorlist = this.flordetails.floor
    })

  }

  public GetParkingLanguage(languageid) {
    this.fmsservice.GetParkingLanguage(languageid).subscribe(
      res => {
        debugger;
        this.parkingTitle = res[0].parkingTitle;
        this.parking_BreadChrumb = res[0].parking_BreadChrumb;
        this.parking_AddNewButton = res[0].parking_AddNewButton;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.parking_BuildingName = res[0].parking_BuildingName;
        this.parking_ParkingSlots = res[0].parking_ParkingSlots;
      }
    )
  }


  fliterbuilding(buildingid) {
    debugger
    this.floorID = ''
    this.facingID = ''
    this.building = buildingid.target.value;

    var list1 = this.Buildinglist.filter(X => X.id == this.building)
    debugger
    this.buildingName = list1[0].name

    debugger
    this.fmsservice.GetParkingAllottedFloors(this.building).subscribe(data => {
      debugger
      this.flordetails = data
      this.floorlist = this.flordetails.floor
    })


    this.fmsservice.GetParkingSlots(this.building).subscribe(data1 => {
      debugger

      this.slotList = data1

      for (var i = 0; i < this.slotList.length; i++) {
        debugger

        if (this.slotList[i].hidden == true || this.slotList[i].tenenthidden == true) {
          this.slotList[i]['kkk'] = 0
          this.slotList[i]['kkk'] = 0
          this.slotList[i]['tenantName'] = ''
          this.slotList[i]['visitorPhoneNo'] = ''
          this.slotList[i]['tenantPhoneNumber'] = ''
          this.slotList[i]['visitorName'] = ''
          this.slotList[i]['visitorphoto'] = ''
          this.slotList[i]['profilePhoto'] = ''

        }


        else {



          if (this.slotList[i].tenantName == null && this.slotList[i].visitorName == null) {
            debugger
            this.slotList[i]['kkk'] = 0
            this.slotList[i]['kkk'] = 0
            this.slotList[i]['tenantName'] = ''
            this.slotList[i]['visitorPhoneNo'] = ''
            this.slotList[i]['tenantPhoneNumber'] = ''
            this.slotList[i]['visitorName'] = ''
            this.slotList[i]['visitorphoto'] = ''
            this.slotList[i]['profilePhoto'] = ''
          }

          else if (this.slotList[i].tenantName != null && this.slotList[i].visitorName == null) {
            debugger
            this.slotList[i]['kkk'] = 1

          }

          else if (this.slotList[i].tenantName != null && this.slotList[i].visitorName != null) {
            debugger

            var today: any = new Date();
            var Christmas: any = new Date(this.slotList[i].exitDate);
            var list1: any = this.slotList[i].exitTime;
            var list: any = new Date(this.slotList[i].exitTime);
            var diffMs = (Christmas - today); // milliseconds between now & Christmas
            var diffMs1 = (list - today); // milliseconds between now & Christmas
            var diffDays = Math.floor(diffMs / 86400000) + 1;
            var diffMins = Math.round(((diffMs1 % 86400000) % 3600000) / 60000); // minutes

            if (list1 == null) {
              this.slotList[i]['kkk'] = 2
            }

            else {
              if (diffDays >= 0 && diffMins >= 0) {
                debugger

                this.slotList[i]['kkk'] = 2

              }
              else if (diffDays > 0 && diffMins < 0) {
                debugger
                this.slotList[i]['kkk'] = 2
              }

              else if (diffDays < 0 && diffMins > 0) {
                debugger
                this.slotList[i]['kkk'] = 2
              }

              else {
                debugger
                this.slotList[i]['kkk'] = 0
                this.slotList[i]['tenantName'] = ''
                this.slotList[i]['visitorPhoneNo'] = ''
                this.slotList[i]['tenantPhoneNumber'] = ''
                this.slotList[i]['visitorName'] = ''
                this.slotList[i]['visitorphoto'] = ''
                this.slotList[i]['profilePhoto'] = ''


              }
            }

          }
        }
      }
    })
  }

  filterfloor(floorID) {
    debugger
    this.floorID = floorID.target.value;

    //     if(this.floorID=="none"){
    //       this.fmsservice.GetParkingSlots(this.building).subscribe(data1=>{
    //         debugger
    //   this.slotList=data1
    //       })
    //     }

    //     else{
    //       this.fmsservice.GetParkingSlots(this.building).subscribe(data1=>{
    //         debugger
    //   this.slotList=data1

    //   var list=this.slotList.filter(X=>X.floorID==this.floorID)
    //   this.slotList1=list;
    //   this.slotList=this.slotList1

    //   this.floorname=this.slotList[0].floor
    //       })


    //     }
    //     debugger



  }


  showtenent(data) {
    debugger
    this.shhooo = 1
    this.tenenrname = data.tenantName != null ? data.tenantName : data.visitorName
    this.tenephone = data.tenantPhoneNumber != null ? data.tenantPhoneNumber : data.visitorPhoneNo
    this.tenunit = data.unit
    this.floor = data.floor
    this.ttype = data.kkk == 1 ? 'Tenent' : data.kkk == 2 ? 'Visitor' : ' Available Slot'
    this.tenphoto = data.visitorphoto != null ? data.visitorphoto : data.profilePhoto
    this.unitname = data.unitname
  }


  filterfacing(facingid) {
    debugger
    this.facingID = facingid.target.value;

    //   if(this.floorID=="none"){
    //     this.slotList=this.slotList1
    //   }

    //   else{


    // var list=this.slotList1.filter(X=>X.facing==this.facingID)
    // this.slotList=list;

    // this.floorname=this.slotList[0].floor



    //   }
    //   debugger


  }







}
